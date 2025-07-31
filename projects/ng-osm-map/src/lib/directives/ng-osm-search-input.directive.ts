import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  inject,
  NgZone,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AutocompleteSuggestion, AutocompleteSearchContext } from '../models/map-interfaces';
import { AutocompleteService } from '../services/autocomplete.service';
import { NgOsmSearchConnectionService } from '../services/ng-osm-search-connection.service';

@Directive({
  selector: '[ngOsmSearchInput]',
  standalone: true,
  exportAs: 'ngOsmSearchInput'
})
export class NgOsmSearchInputDirective implements OnInit, OnDestroy, OnChanges {
  private readonly autocompleteService = inject(AutocompleteService);
  private readonly ngZone = inject(NgZone);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly connectionService = inject(NgOsmSearchConnectionService);

  @Input() enableAutocomplete: boolean = true;
  @Input() debounceMs: number = 300;
  @Input() maxResults: number = 5;
  @Input() minQueryLength: number = 2;
  @Input() placeholder: string = 'Search location...';
  @Input() autoFocus: boolean = false;
  @Input() showSuggestionsDropdown: boolean = true;
  @Input() dropdownContainer?: string | HTMLElement;
  @Input() customSearchTemplate?: TemplateRef<AutocompleteSearchContext>;
  @Input() connectedMapId?: string; // ID of the map to connect to

  @Output() search = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<AutocompleteSuggestion>();
  @Output() autocompleteResults = new EventEmitter<AutocompleteSuggestion[]>();
  @Output() inputChange = new EventEmitter<string>();

  private inputElement: HTMLInputElement;
  private searchSubject = new Subject<string>();
  private subscription?: Subscription;
  private locationUpdateSubscription?: Subscription;
  private autocompleteDropdown?: HTMLElement;
  private customTemplateView?: EmbeddedViewRef<AutocompleteSearchContext>;
  private currentSuggestions: AutocompleteSuggestion[] = [];
  private isLoading: boolean = false;
  private searchInputId: string;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
    this.inputElement = this.elementRef.nativeElement;
    this.searchInputId = `ng-osm-search-input-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnInit(): void {
    this.initializeSearchInput();
    this.setupAutocomplete();
    this.setupMapConnection();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.locationUpdateSubscription) {
      this.locationUpdateSubscription.unsubscribe();
    }
    this.searchSubject.complete();
    this.cleanupAutocomplete();
    this.connectionService.disconnectSearchInput(this.searchInputId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['placeholder'] && this.inputElement) {
      this.inputElement.placeholder = this.placeholder;
    }

    if (changes['customSearchTemplate']) {
      this.updateCustomTemplate();
    }

    if (changes['connectedMapId']) {
      this.updateMapConnection();
    }
  }

  private initializeSearchInput(): void {
    // Set initial properties
    this.inputElement.placeholder = this.placeholder;
    this.inputElement.type = 'text';

    // Auto-focus if configured
    if (this.autoFocus) {
      setTimeout(() => this.inputElement.focus(), 100);
    }

    // Setup event listeners
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Handle input events
    this.inputElement.addEventListener('input', this.handleInput.bind(this));

    // Handle keyboard events
    this.inputElement.addEventListener('keydown', this.handleKeydown.bind(this));

    // Handle blur events
    this.inputElement.addEventListener('blur', this.handleBlur.bind(this));

    // Handle focus events
    this.inputElement.addEventListener('focus', this.handleFocus.bind(this));
  }

  private setupAutocomplete(): void {
    if (!this.enableAutocomplete) return;

    // Setup dropdown if enabled
    if (this.showSuggestionsDropdown) {
      this.createAutocompleteDropdown();
    }

    // Setup search subject subscription
    this.subscription = this.searchSubject.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performAutocompleteSearch(query);
    });
  }

  private handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();

    // Emit input change
    this.inputChange.emit(query);

    // Trigger autocomplete if enabled
    if (this.enableAutocomplete && query.length >= this.minQueryLength) {
      this.isLoading = true;
      this.updateCustomTemplate();
      this.searchSubject.next(query);
    } else {
      this.hideSuggestions();
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        const query = this.inputElement.value.trim();
        if (query) {
          this.triggerSearch(query);
        }
        break;
      case 'Escape':
        this.hideSuggestions();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateDropdown('down');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateDropdown('up');
        break;
    }
  }

  private handleBlur(): void {
    // Small delay to allow clicking on suggestions
    setTimeout(() => {
      this.hideSuggestions();
    }, 200);
  }

  private handleFocus(): void {
    // Show suggestions if we have them and input has content
    const query = this.inputElement.value.trim();
    if (query.length >= this.minQueryLength && this.currentSuggestions.length > 0) {
      this.showSuggestions();
    }
  }

  private performAutocompleteSearch(query: string): void {
    this.autocompleteService.getSuggestions(query, this.maxResults).subscribe({
      next: (suggestions) => {
        this.isLoading = false;
        this.currentSuggestions = suggestions;

        if (this.customSearchTemplate) {
          this.updateCustomTemplate();
        } else if (this.showSuggestionsDropdown) {
          this.showDefaultDropdown(suggestions);
        }

        this.ngZone.run(() => {
          this.autocompleteResults.emit(suggestions);
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Autocomplete search error:', error);
        this.updateCustomTemplate();
      }
    });
  }

  private createAutocompleteDropdown(): void {
    if (this.customSearchTemplate) {
      // Custom template will handle its own rendering
      this.createCustomTemplateContainer();
      return;
    }

    // Create default dropdown
    this.autocompleteDropdown = document.createElement('div');
    this.autocompleteDropdown.className = 'ng-osm-autocomplete-dropdown';
    this.styleDropdown(this.autocompleteDropdown);

    // Determine container for dropdown
    const container = this.getDropdownContainer();
    container.appendChild(this.autocompleteDropdown);
  }

  private createCustomTemplateContainer(): void {
    // Custom template rendering will be handled in updateCustomTemplate
    // The template is responsible for its own positioning and styling
  }

  private updateCustomTemplate(): void {
    if (!this.customSearchTemplate) return;

    // Clean up existing view
    if (this.customTemplateView) {
      this.customTemplateView.destroy();
      this.customTemplateView = undefined;
    }

    // Create new view with current context
    const context: AutocompleteSearchContext = {
      $implicit: this.currentSuggestions,
      query: this.inputElement.value.trim(),
      search: this.triggerSearch.bind(this),
      selectSuggestion: this.selectSuggestion.bind(this),
      clearSuggestions: this.hideSuggestions.bind(this),
      loading: this.isLoading
    };

    this.customTemplateView = this.viewContainer.createEmbeddedView(
      this.customSearchTemplate,
      context
    );

    // Trigger change detection
    this.customTemplateView.detectChanges();
  }

  private styleDropdown(dropdown: HTMLElement): void {
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 4px 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
    `;
  }

  private getDropdownContainer(): HTMLElement {
    if (this.dropdownContainer) {
      if (typeof this.dropdownContainer === 'string') {
        const element = document.querySelector(this.dropdownContainer) as HTMLElement;
        if (element) return element;
      } else {
        return this.dropdownContainer;
      }
    }

    // Create wrapper around input if none specified
    const inputParent = this.inputElement.parentElement;
    if (inputParent && getComputedStyle(inputParent).position === 'static') {
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      inputParent.insertBefore(wrapper, this.inputElement);
      wrapper.appendChild(this.inputElement);
      return wrapper;
    }

    return inputParent || document.body;
  }

  private showDefaultDropdown(suggestions: AutocompleteSuggestion[]): void {
    if (!this.autocompleteDropdown || suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    // Clear existing suggestions
    this.autocompleteDropdown.innerHTML = '';

    // Add suggestions
    suggestions.forEach((suggestion, index) => {
      const item = this.createSuggestionItem(suggestion, index);
      this.autocompleteDropdown!.appendChild(item);
    });

    // Show dropdown
    this.showSuggestions();
  }

  private createSuggestionItem(suggestion: AutocompleteSuggestion, index: number): HTMLElement {
    const item = document.createElement('div');
    item.className = 'ng-osm-autocomplete-item';
    item.dataset['index'] = index.toString();
    item.style.cssText = `
      padding: 8px 12px;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s;
    `;

    item.innerHTML = `
      <div style="font-weight: 500; margin-bottom: 2px;">${suggestion.displayText}</div>
      <div style="font-size: 0.85em; color: #666; opacity: 0.8;">${suggestion.fullDisplayName}</div>
    `;

    // Hover effects
    item.addEventListener('mouseenter', () => {
      this.highlightItem(item);
    });

    item.addEventListener('mouseleave', () => {
      this.unhighlightItem(item);
    });

    // Click handler
    item.addEventListener('click', () => {
      this.selectSuggestion(suggestion);
    });

    return item;
  }

  private highlightItem(item: HTMLElement): void {
    item.style.backgroundColor = '#f5f5f5';
  }

  private unhighlightItem(item: HTMLElement): void {
    item.style.backgroundColor = 'white';
  }

  private navigateDropdown(direction: 'up' | 'down'): void {
    if (!this.autocompleteDropdown) return;

    const items = this.autocompleteDropdown.querySelectorAll('.ng-osm-autocomplete-item');
    if (items.length === 0) return;

    const currentActive = this.autocompleteDropdown.querySelector('.active');
    let newIndex = 0;

    if (currentActive) {
      const currentIndex = parseInt((currentActive as HTMLElement).dataset['index'] || '0');
      if (direction === 'down') {
        newIndex = (currentIndex + 1) % items.length;
      } else {
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      }
    }

    // Remove previous active class
    items.forEach(item => item.classList.remove('active'));

    // Add active class to new item
    const newActiveItem = items[newIndex] as HTMLElement;
    newActiveItem.classList.add('active');
    this.highlightItem(newActiveItem);

    // Scroll into view if needed
    newActiveItem.scrollIntoView({ block: 'nearest' });
  }

  private showSuggestions(): void {
    if (this.autocompleteDropdown) {
      this.autocompleteDropdown.style.display = 'block';
    }
  }

  private hideSuggestions(): void {
    this.currentSuggestions = [];
    this.isLoading = false;

    if (this.autocompleteDropdown) {
      this.autocompleteDropdown.style.display = 'none';
    }

    if (this.customTemplateView) {
      this.updateCustomTemplate(); // Update to show empty state
    }
  }

  private selectSuggestion(suggestion: AutocompleteSuggestion): void {
    this.inputElement.value = suggestion.displayText;
    this.hideSuggestions();

    this.ngZone.run(() => {
      this.suggestionSelected.emit(suggestion);
      this.search.emit(suggestion.displayText);

      // Emit to connection service for connected map
      if (this.connectedMapId) {
        this.connectionService.emitSuggestionSelectedEvent(suggestion, this.searchInputId);
      }
    });
  }

  private triggerSearch(query: string): void {
    this.hideSuggestions();
    this.ngZone.run(() => {
      this.search.emit(query);

      // Emit to connection service for connected map
      if (this.connectedMapId) {
        this.connectionService.emitSearchEvent(query, this.searchInputId);
      }
    });
  }

  private cleanupAutocomplete(): void {
    // Remove dropdown from DOM
    if (this.autocompleteDropdown && this.autocompleteDropdown.parentElement) {
      this.autocompleteDropdown.parentElement.removeChild(this.autocompleteDropdown);
    }

    // Clean up custom template view
    if (this.customTemplateView) {
      this.customTemplateView.destroy();
    }
  }

  private setupMapConnection(): void {
    // Connect to map if connectedMapId is provided
    if (this.connectedMapId) {
      this.connectionService.connectSearchInputToMap(this.searchInputId, this.connectedMapId);
    }

    // Listen for location updates from connected map
    this.locationUpdateSubscription = this.connectionService.locationSelectedEvents$.pipe(
      filter(event => this.connectedMapId ? event.mapId === this.connectedMapId : false)
    ).subscribe(event => {
      this.setValue(event.displayValue);
    });
  }

  private updateMapConnection(): void {
    if (this.connectedMapId) {
      this.connectionService.connectSearchInputToMap(this.searchInputId, this.connectedMapId);
    } else {
      this.connectionService.disconnectSearchInput(this.searchInputId);
    }
  }

  // Public methods for external control
  public setValue(value: string): void {
    this.inputElement.value = value;
    this.inputChange.emit(value);
  }

  public getValue(): string {
    return this.inputElement.value;
  }

  public focus(): void {
    this.inputElement.focus();
  }

  public blur(): void {
    this.inputElement.blur();
  }

  public clear(): void {
    this.inputElement.value = '';
    this.hideSuggestions();
    this.inputChange.emit('');
  }

  public getSuggestions(): AutocompleteSuggestion[] {
    return [...this.currentSuggestions];
  }
}
