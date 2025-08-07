import{$ as l,B as i,J as n,K as t,L as c,V as e,Y as a,aa as m,ba as r,ca as p,la as g,r as s,ra as u,ua as x}from"./chunk-SDZ2WFM3.js";var h=class d{static \u0275fac=function(o){return new(o||d)};static \u0275cmp=s({type:d,selectors:[["app-ng-osm-map-docs"]],standalone:!0,features:[p],decls:216,vars:52,consts:[[1,"docs-container"],[1,"docs-nav"],["routerLink","/",1,"back-link"],[1,"docs-content"],[1,"docs-section"],[1,"code-block"],[1,"features-list"],[1,"api-list"],["routerLink","/demo/ng-osm-map",1,"demo-link"],["href","https://github.com/ngmahesh/ng-libraries/issues","target","_blank"]],template:function(o,E){o&1&&(n(0,"div",0)(1,"nav",1)(2,"a",2),e(3,"\u2190 Back to Home"),t(),n(4,"h1"),e(5,"NgOsmMap Documentation"),t()(),n(6,"main",3)(7,"section",4)(8,"h2"),e(9,"Overview"),t(),n(10,"p"),e(11,"NgOsmMap is a comprehensive Angular library for OpenStreetMap integration using Leaflet. It provides a complete solution for interactive maps with advanced features."),t()(),n(12,"section",4)(13,"h2"),e(14,"Installation"),t(),n(15,"div",5)(16,"code"),e(17,"npm install @ngmahesh/ng-osm-map leaflet"),t(),c(18,"br"),n(19,"code"),e(20,"npm install --save-dev @types/leaflet"),t()()(),n(21,"section",4)(22,"h2"),e(23,"Quick Start"),t(),n(24,"div",5)(25,"pre")(26,"code"),e(27),t()()()(),n(28,"section",4)(29,"h3"),e(30,"Basic Usage"),t(),n(31,"div",5)(32,"pre")(33,"code"),e(34,`<ng-osm-map
  [pins]="pins"
  [height]="400"
  [width]="'100%'"
  (mapClick)="onMapClick($event)"
  (locationSelected)="onLocationSelected($event)">
</ng-osm-map>`),t()()()(),n(35,"section",4)(36,"h2"),e(37,"Features"),t(),n(38,"ul",6)(39,"li"),e(40,"Interactive map with Leaflet integration"),t(),n(41,"li"),e(42,"Draggable pins with custom templates"),t(),n(43,"li"),e(44,"Geocoding and reverse geocoding"),t(),n(45,"li"),e(46,"Smart search with autocomplete"),t(),n(47,"li"),e(48,"Area highlighting capabilities"),t(),n(49,"li"),e(50,"Multiple tile layer support"),t(),n(51,"li"),e(52,"Advanced selection system"),t(),n(53,"li"),e(54,"Template-based popups"),t(),n(55,"li"),e(56,"Event-driven architecture"),t(),n(57,"li"),e(58,"TypeScript support"),t(),n(59,"li"),e(60,"Angular 18+ compatible"),t(),n(61,"li"),e(62,"Tree-shakable"),t()()(),n(63,"section",4)(64,"h2"),e(65,"API Reference"),t(),n(66,"h3"),e(67,"NgOsmMapComponent"),t(),n(68,"h4"),e(69,"Inputs"),t(),n(70,"ul",7)(71,"li")(72,"code"),e(73,"pins: PinObject[]"),t(),e(74," - Array of pins to display"),t(),n(75,"li")(76,"code"),e(77,"zoomInto: LocationObject"),t(),e(78," - Location to center and zoom to"),t(),n(79,"li")(80,"code"),e(81,"highlightAreas: HighlightArea[]"),t(),e(82," - Areas to highlight"),t(),n(83,"li")(84,"code"),e(85,"mapOptions: MapOptions"),t(),e(86," - Map configuration options"),t(),n(87,"li")(88,"code"),e(89,"height: number"),t(),e(90," - Map height in pixels"),t(),n(91,"li")(92,"code"),e(93,"width: string | number"),t(),e(94," - Map width"),t()(),n(95,"h4"),e(96,"Outputs"),t(),n(97,"ul",7)(98,"li")(99,"code"),e(100,"mapClick: EventEmitter<MapClickEvent>"),t(),e(101," - Map click events"),t(),n(102,"li")(103,"code"),e(104,"locationSelected: EventEmitter<LocationObject>"),t(),e(105," - Location selection events"),t(),n(106,"li")(107,"code"),e(108,"searchResult: EventEmitter<SearchResult>"),t(),e(109," - Search result events"),t(),n(110,"li")(111,"code"),e(112,"pinDragged: EventEmitter<PinDragEvent>"),t(),e(113," - Pin drag events"),t(),n(114,"li")(115,"code"),e(116,"autocompleteResults: EventEmitter<AutocompleteSuggestion[]>"),t(),e(117," - Autocomplete events"),t(),n(118,"li")(119,"code"),e(120,"pinDeleted: EventEmitter<PinDeleteEvent>"),t(),e(121," - Pin deletion events"),t(),n(122,"li")(123,"code"),e(124,"selectionChanged: EventEmitter<SelectedLocation[]>"),t(),e(125," - Selection change events"),t()()(),n(126,"section",4)(127,"h2"),e(128,"Interfaces"),t(),n(129,"h3"),e(130,"PinObject"),t(),n(131,"div",5)(132,"pre")(133,"code"),e(134),t()()(),n(135,"h3"),e(136,"LocationObject"),t(),n(137,"div",5)(138,"pre")(139,"code"),e(140),t()()(),n(141,"h3"),e(142,"SelectedLocation"),t(),n(143,"div",5)(144,"pre")(145,"code"),e(146),t()()(),n(147,"p")(148,"strong"),e(149,"Note:"),t(),e(150," Address information (city, state, country, zipcode) is accessed through the "),n(151,"code"),e(152,"addressInfo.address"),t(),e(153," object rather than direct properties. For example:"),t(),n(154,"div",5)(155,"pre")(156,"code"),e(157,`// Accessing address information
const city = selection.addressInfo?.address?.city;
const state = selection.addressInfo?.address?.state;
const country = selection.addressInfo?.address?.country;
const zipcode = selection.addressInfo?.address?.postcode;`),t()()()(),n(158,"section",4)(159,"h2"),e(160,"Examples"),t(),n(161,"h3"),e(162,"Basic Map with Pins"),t(),n(163,"div",5)(164,"pre")(165,"code"),e(166),t()()(),n(167,"h3"),e(168,"Template-based Popups"),t(),n(169,"div",5)(170,"pre")(171,"code"),e(172),t()()()(),n(173,"section",4)(174,"h2"),e(175,"Advanced Features"),t(),n(176,"h3"),e(177,"Geocoding"),t(),n(178,"p"),e(179,"The library includes built-in geocoding services using OpenStreetMap Nominatim API."),t(),n(180,"h3"),e(181,"Search and Autocomplete"),t(),n(182,"p"),e(183,"Integrated search functionality with autocomplete suggestions."),t(),n(184,"h3"),e(185,"Selection System"),t(),n(186,"p"),e(187,"Advanced selection system supporting both single and multi-select modes with pre-selected locations."),t(),n(188,"div",5)(189,"pre")(190,"code"),e(191),t()()(),n(192,"h3"),e(193,"Multiple Tile Layers"),t(),n(194,"p"),e(195,"Support for various map tile providers including OpenStreetMap, satellite imagery, and custom themes."),t()(),n(196,"section",4)(197,"h2"),e(198,"Demo"),t(),n(199,"p"),e(200,"Check out the interactive demo to see all features in action:"),t(),n(201,"a",8),e(202,"View Live Demo \u2192"),t()(),n(203,"section",4)(204,"h2"),e(205,"License"),t(),n(206,"p"),e(207,"MIT License"),t()(),n(208,"section",4)(209,"h2"),e(210,"Support"),t(),n(211,"p"),e(212,"For issues and questions, please visit our "),n(213,"a",9),e(214,"GitHub Issues page"),t(),e(215,"."),t()()()()),o&2&&(i(27),l("import ","{"," NgOsmMapModule ","}",` from '@ngmahesh/ng-osm-map';

@NgModule(`,"{",`
  imports: [NgOsmMapModule],
  ...
`,"}",`)
export class AppModule `,"{"," ","}",""),i(107),a("interface PinObject ","{",`
  title?: string;
  coordinates?: Coordinates;
  address?: string;
  color?: string;
  htmlContent?: string;
  icon?: string;
  draggable?: boolean;
  template?: TemplateRef<PinPopupContext>;
  data?: any;
`,"}",""),i(6),a("interface LocationObject ","{",`
  latitude: number;
  longitude: number;
  addressInfo?: AddressInfo;
`,"}",""),i(6),m("interface SelectedLocation ","{",`
  id: string;                    // Unique identifier for the selection
  coordinates: `,"{",`
    latitude: number;
    longitude: number;
  `,"}",`;
  addressInfo?: `,"{",`              // Address information (if available)
    display_name?: string;
    address?: `,"{",`
      house_number?: string;
      road?: string;
      city?: string;           // Access city via addressInfo.address.city
      state?: string;          // Access state via addressInfo.address.state
      postcode?: string;       // Access zipcode via addressInfo.address.postcode
      country?: string;        // Access country via addressInfo.address.country
    `,"}",`;
  `,"}",`;
  pinIndex?: number;           // Associated pin index (if a pin was created)
  selectedAt: Date;            // Timestamp when selected
`,"}",""),i(20),r(["export class MyComponent ","{",`
  pins: PinObject[] = [
    `,"{",`
      title: 'New York',
      coordinates: `,"{"," latitude: 40.7128, longitude: -74.0060 ","}",`,
      color: 'red',
      draggable: true
    `,"}",`,
    `,"{",`
      title: 'London',
      address: 'London, UK',
      color: 'blue'
    `,"}",`
  ];

  onMapClick(event: MapClickEvent) `,"{",`
    console.log('Map clicked:', event.location);
  `,"}",`
`,"}",""]),i(6),l(`<ng-template #customPopup let-location let-pin="pin" let-deletePin="deletePin">
  <div>
    <h3>`,"{{"," pin.title ","}}",`</h3>
    <p>Lat: `,"{{"," location.latitude ","}}",", Lng: ","{{"," location.longitude ","}}",`</p>
    <button (click)="deletePin()">Delete Pin</button>
  </div>
</ng-template>`),i(19),r([`// Configure selection options
mapOptions: MapOptions = `,"{",`
  enableClickSelect: true,
  selection: `,"{",`
    multiSelect: true,        // Enable multi-selection
    maxSelections: 5,         // Limit to 5 selections
    createPinsForSelections: true,
    selectionPin: `,"{",`         // Custom pin for selections
      color: '#4CAF50',
      title: 'Selected Location'
    `,"}",`
  `,"}",`,
  preSelectedLocations: [     // Pre-selected locations (no events)
    `,"{"," latitude: 50.0755, longitude: 14.4378 ","}",`, // Prague
    `,"{"," latitude: 47.4979, longitude: 19.0402 ","}",`  // Budapest
  ]
`,"}",`;

// Handle selection changes
onSelectionChanged(selections: SelectedLocation[]) `,"{",`
  selections.forEach(selection => `,"{",`
    console.log('Selected:', selection.id);

    // Access address information
    const city = selection.addressInfo?.address?.city;
    const country = selection.addressInfo?.address?.country;
    console.log(\`Location: $`,"{","city","}",", $","{","country","}","`);\n  ","}",`);
`,"}",""]))},dependencies:[g,x,u],styles:['@charset "UTF-8";.docs-container[_ngcontent-%COMP%]{min-height:100vh;background:#f8f9fa}.docs-nav[_ngcontent-%COMP%]{background:#fff;padding:1rem 2rem;border-bottom:1px solid #e0e0e0;position:sticky;top:0;z-index:100}.back-link[_ngcontent-%COMP%]{color:#007bff;text-decoration:none;font-weight:500;margin-bottom:1rem;display:inline-block}.back-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.docs-nav[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;color:#333;font-size:2rem}.docs-content[_ngcontent-%COMP%]{max-width:1000px;margin:0 auto;padding:2rem}.docs-section[_ngcontent-%COMP%]{background:#fff;margin-bottom:2rem;padding:2rem;border-radius:8px;box-shadow:0 2px 10px #0000001a}.docs-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#333;margin-top:0;margin-bottom:1rem;font-size:1.8rem;border-bottom:2px solid #007bff;padding-bottom:.5rem}.docs-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#555;margin-top:2rem;margin-bottom:1rem;font-size:1.4rem}.docs-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#666;margin-top:1.5rem;margin-bottom:.75rem;font-size:1.2rem}.docs-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:1.6;color:#666;margin-bottom:1rem}.code-block[_ngcontent-%COMP%]{background:#f4f4f4;border:1px solid #ddd;border-radius:4px;padding:1rem;margin:1rem 0;overflow-x:auto}.code-block[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Courier New,monospace;font-size:.9rem;color:#333}.code-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0;white-space:pre-wrap}.features-list[_ngcontent-%COMP%], .api-list[_ngcontent-%COMP%]{list-style:none;padding:0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .api-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.5rem 0;border-bottom:1px solid #f0f0f0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\2713";color:#28a745;font-weight:700;margin-right:.5rem}.api-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f8f9fa;padding:.2rem .4rem;border-radius:3px;font-family:Courier New,monospace;font-size:.85rem;color:#e83e8c}.demo-link[_ngcontent-%COMP%]{display:inline-block;background:#007bff;color:#fff;padding:.75rem 1.5rem;text-decoration:none;border-radius:4px;font-weight:500;transition:background .2s}.demo-link[_ngcontent-%COMP%]:hover{background:#0056b3;color:#fff}@media (max-width: 768px){.docs-content[_ngcontent-%COMP%]{padding:1rem}.docs-section[_ngcontent-%COMP%]{padding:1.5rem}.docs-nav[_ngcontent-%COMP%]{padding:1rem}.docs-nav[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem}}']})};export{h as NgOsmMapDocsComponent};
