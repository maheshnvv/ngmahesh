import{$ as s,B as i,J as n,K as t,L as c,V as e,Y as o,aa as a,ba as l,ca as p,la as g,r as m,ra as x,ua as u}from"./chunk-SDZ2WFM3.js";var S=class r{static \u0275fac=function(d){return new(d||r)};static \u0275cmp=m({type:r,selectors:[["app-ng-osm-map-docs"]],standalone:!0,features:[p],decls:678,vars:72,consts:[[1,"docs-container"],[1,"docs-nav"],["routerLink","/",1,"back-link"],[1,"docs-content"],[1,"docs-section"],[1,"code-block"],[1,"features-list"],[1,"api-section"],[1,"api-table-container"],[1,"api-table"],["routerLink","/demo/ng-osm-map",1,"demo-link"],["href","https://github.com/ngmahesh/ng-libraries/issues","target","_blank"]],template:function(d,h){d&1&&(n(0,"div",0)(1,"nav",1)(2,"a",2),e(3,"\u2190 Back to Home"),t(),n(4,"h1"),e(5,"NgOsmMap Documentation"),t()(),n(6,"main",3)(7,"section",4)(8,"h2"),e(9,"Overview"),t(),n(10,"p"),e(11,"NgOsmMap is a comprehensive Angular library for OpenStreetMap integration using Leaflet. It provides a complete solution for interactive maps with advanced features."),t()(),n(12,"section",4)(13,"h2"),e(14,"Installation"),t(),n(15,"div",5)(16,"code"),e(17,"npm install @ngmahesh/ng-osm-map leaflet"),t(),c(18,"br"),n(19,"code"),e(20,"npm install --save-dev @types/leaflet"),t()()(),n(21,"section",4)(22,"h2"),e(23,"Quick Start"),t(),n(24,"div",5)(25,"pre")(26,"code"),e(27),t()()()(),n(28,"section",4)(29,"h3"),e(30,"Basic Usage"),t(),n(31,"div",5)(32,"pre")(33,"code"),e(34,`<ng-osm-map
  [pins]="pins"
  [height]="400"
  [width]="'100%'"
  (mapClick)="onMapClick($event)"
  (locationSelected)="onLocationSelected($event)">
</ng-osm-map>`),t()()()(),n(35,"section",4)(36,"h2"),e(37,"Features"),t(),n(38,"ul",6)(39,"li"),e(40,"Interactive map with Leaflet integration"),t(),n(41,"li"),e(42,"Draggable pins with custom templates"),t(),n(43,"li"),e(44,"Geocoding and reverse geocoding"),t(),n(45,"li"),e(46,"Smart search with autocomplete"),t(),n(47,"li"),e(48,"Area highlighting capabilities"),t(),n(49,"li"),e(50,"Multiple tile layer support"),t(),n(51,"li"),e(52,"Advanced selection system"),t(),n(53,"li"),e(54,"Template-based popups"),t(),n(55,"li"),e(56,"Event-driven architecture"),t(),n(57,"li"),e(58,"TypeScript support"),t(),n(59,"li"),e(60,"Angular 18+ compatible"),t(),n(61,"li"),e(62,"Tree-shakable"),t()()(),n(63,"section",4)(64,"h2"),e(65,"API Reference"),t(),n(66,"div",7)(67,"h3"),e(68,"NgOsmMapComponent"),t(),n(69,"p"),e(70,"The main component for embedding interactive maps. This is a wrapper component that provides a clean Angular component interface."),t(),n(71,"h4"),e(72,"Selector"),t(),n(73,"code"),e(74,"<ng-osm-map></ng-osm-map>"),t(),n(75,"h4"),e(76,"Input Properties"),t(),n(77,"div",8)(78,"table",9)(79,"thead")(80,"tr")(81,"th"),e(82,"Property"),t(),n(83,"th"),e(84,"Type"),t(),n(85,"th"),e(86,"Default"),t(),n(87,"th"),e(88,"Description"),t()()(),n(89,"tbody")(90,"tr")(91,"td")(92,"code"),e(93,"pins"),t()(),n(94,"td")(95,"code"),e(96,"PinObject[]"),t()(),n(97,"td")(98,"code"),e(99,"[]"),t()(),n(100,"td"),e(101,"Array of pins to display on the map"),t()(),n(102,"tr")(103,"td")(104,"code"),e(105,"zoomInto"),t()(),n(106,"td")(107,"code"),e(108,"LocationObject"),t()(),n(109,"td")(110,"code"),e(111,"undefined"),t()(),n(112,"td"),e(113,"Location to center and zoom the map to"),t()(),n(114,"tr")(115,"td")(116,"code"),e(117,"highlightAreas"),t()(),n(118,"td")(119,"code"),e(120,"HighlightArea[]"),t()(),n(121,"td")(122,"code"),e(123,"[]"),t()(),n(124,"td"),e(125,"Areas to highlight with custom styling"),t()(),n(126,"tr")(127,"td")(128,"code"),e(129,"mapOptions"),t()(),n(130,"td")(131,"code"),e(132,"MapOptions"),t()(),n(133,"td")(134,"code"),e(135),t()(),n(136,"td"),e(137,"Map configuration and behavior options"),t()(),n(138,"tr")(139,"td")(140,"code"),e(141,"mapId"),t()(),n(142,"td")(143,"code"),e(144,"string"),t()(),n(145,"td")(146,"code"),e(147,"undefined"),t()(),n(148,"td"),e(149,"Unique identifier for connecting search inputs"),t()(),n(150,"tr")(151,"td")(152,"code"),e(153,"preSelectedLocations"),t()(),n(154,"td")(155,"code"),e(156,"LocationObject[]"),t()(),n(157,"td")(158,"code"),e(159,"[]"),t()(),n(160,"td"),e(161,"Locations to pre-select without triggering events"),t()(),n(162,"tr")(163,"td")(164,"code"),e(165,"height"),t()(),n(166,"td")(167,"code"),e(168,"number | string"),t()(),n(169,"td")(170,"code"),e(171,"400"),t()(),n(172,"td"),e(173,"Map height in pixels or CSS value"),t()(),n(174,"tr")(175,"td")(176,"code"),e(177,"width"),t()(),n(178,"td")(179,"code"),e(180,"number | string"),t()(),n(181,"td")(182,"code"),e(183,"'100%'"),t()(),n(184,"td"),e(185,"Map width in pixels or CSS value"),t()(),n(186,"tr")(187,"td")(188,"code"),e(189,"selectedLocation"),t()(),n(190,"td")(191,"code"),e(192,"LocationObject"),t()(),n(193,"td")(194,"code"),e(195,"undefined"),t()(),n(196,"td")(197,"em"),e(198,"(Deprecated)"),t(),e(199," Use preSelectedLocations instead"),t()()()()(),n(200,"h4"),e(201,"Output Events"),t(),n(202,"div",8)(203,"table",9)(204,"thead")(205,"tr")(206,"th"),e(207,"Event"),t(),n(208,"th"),e(209,"Type"),t(),n(210,"th"),e(211,"Description"),t()()(),n(212,"tbody")(213,"tr")(214,"td")(215,"code"),e(216,"mapClick"),t()(),n(217,"td")(218,"code"),e(219,"EventEmitter<MapClickEvent>"),t()(),n(220,"td"),e(221,"Fired when the map is clicked"),t()(),n(222,"tr")(223,"td")(224,"code"),e(225,"locationSelected"),t()(),n(226,"td")(227,"code"),e(228,"EventEmitter<MapClickEvent>"),t()(),n(229,"td"),e(230,"Fired when a location is selected"),t()(),n(231,"tr")(232,"td")(233,"code"),e(234,"searchResult"),t()(),n(235,"td")(236,"code"),e(237,"EventEmitter<SearchResult>"),t()(),n(238,"td"),e(239,"Fired when a search produces results"),t()(),n(240,"tr")(241,"td")(242,"code"),e(243,"pinDragged"),t()(),n(244,"td")(245,"code"),e(246,"EventEmitter<PinDragEvent>"),t()(),n(247,"td"),e(248,"Fired when a pin is dragged to a new location"),t()(),n(249,"tr")(250,"td")(251,"code"),e(252,"autocompleteResults"),t()(),n(253,"td")(254,"code"),e(255,"EventEmitter<AutocompleteSuggestion[]>"),t()(),n(256,"td"),e(257,"Fired when autocomplete suggestions are available"),t()(),n(258,"tr")(259,"td")(260,"code"),e(261,"pinDeleted"),t()(),n(262,"td")(263,"code"),e(264,"EventEmitter<PinDeleteEvent>"),t()(),n(265,"td"),e(266,"Fired when a pin is deleted"),t()(),n(267,"tr")(268,"td")(269,"code"),e(270,"selectionChanged"),t()(),n(271,"td")(272,"code"),e(273,"EventEmitter<SelectedLocation[]>"),t()(),n(274,"td"),e(275,"Fired when the selection state changes"),t()()()()()(),n(276,"div",7)(277,"h3"),e(278,"NgOsmMapDirective"),t(),n(279,"p"),e(280,"The core directive that provides map functionality. Use this directive when you need more control or want to apply map functionality to existing elements."),t(),n(281,"h4"),e(282,"Selector"),t(),n(283,"code"),e(284,"[ngOsmMap]"),t(),n(285,"h4"),e(286,"Input Properties"),t(),n(287,"div",8)(288,"table",9)(289,"thead")(290,"tr")(291,"th"),e(292,"Property"),t(),n(293,"th"),e(294,"Type"),t(),n(295,"th"),e(296,"Default"),t(),n(297,"th"),e(298,"Description"),t()()(),n(299,"tbody")(300,"tr")(301,"td")(302,"code"),e(303,"pins"),t()(),n(304,"td")(305,"code"),e(306,"PinObject[]"),t()(),n(307,"td")(308,"code"),e(309,"[]"),t()(),n(310,"td"),e(311,"Array of pins to display on the map"),t()(),n(312,"tr")(313,"td")(314,"code"),e(315,"zoomInto"),t()(),n(316,"td")(317,"code"),e(318,"LocationObject"),t()(),n(319,"td")(320,"code"),e(321,"undefined"),t()(),n(322,"td"),e(323,"Location to center and zoom the map to"),t()(),n(324,"tr")(325,"td")(326,"code"),e(327,"highlightAreas"),t()(),n(328,"td")(329,"code"),e(330,"HighlightArea[]"),t()(),n(331,"td")(332,"code"),e(333,"[]"),t()(),n(334,"td"),e(335,"Areas to highlight with custom styling"),t()(),n(336,"tr")(337,"td")(338,"code"),e(339,"mapOptions"),t()(),n(340,"td")(341,"code"),e(342,"MapOptions"),t()(),n(343,"td")(344,"code"),e(345),t()(),n(346,"td"),e(347,"Map configuration and behavior options"),t()(),n(348,"tr")(349,"td")(350,"code"),e(351,"mapId"),t()(),n(352,"td")(353,"code"),e(354,"string"),t()(),n(355,"td")(356,"code"),e(357,"undefined"),t()(),n(358,"td"),e(359,"Unique identifier for connecting search inputs"),t()(),n(360,"tr")(361,"td")(362,"code"),e(363,"preSelectedLocations"),t()(),n(364,"td")(365,"code"),e(366,"LocationObject[]"),t()(),n(367,"td")(368,"code"),e(369,"[]"),t()(),n(370,"td"),e(371,"Locations to pre-select without triggering events"),t()()()()(),n(372,"h4"),e(373,"Output Events"),t(),n(374,"p")(375,"em"),e(376,"Same events as NgOsmMapComponent - see above"),t()()(),n(377,"div",7)(378,"h3"),e(379,"NgOsmSearchInputDirective"),t(),n(380,"p"),e(381,"A directive that transforms any input element into a smart search input with autocomplete functionality, connected to a map instance."),t(),n(382,"h4"),e(383,"Selector"),t(),n(384,"code"),e(385,"[ngOsmSearchInput]"),t(),n(386,"h4"),e(387,"Input Properties"),t(),n(388,"div",8)(389,"table",9)(390,"thead")(391,"tr")(392,"th"),e(393,"Property"),t(),n(394,"th"),e(395,"Type"),t(),n(396,"th"),e(397,"Default"),t(),n(398,"th"),e(399,"Description"),t()()(),n(400,"tbody")(401,"tr")(402,"td")(403,"code"),e(404,"connectedMapId"),t()(),n(405,"td")(406,"code"),e(407,"string"),t()(),n(408,"td")(409,"code"),e(410,"undefined"),t()(),n(411,"td"),e(412,"ID of the map component to connect to"),t()(),n(413,"tr")(414,"td")(415,"code"),e(416,"enableAutocomplete"),t()(),n(417,"td")(418,"code"),e(419,"boolean"),t()(),n(420,"td")(421,"code"),e(422,"true"),t()(),n(423,"td"),e(424,"Enable/disable autocomplete suggestions"),t()(),n(425,"tr")(426,"td")(427,"code"),e(428,"showSuggestionsDropdown"),t()(),n(429,"td")(430,"code"),e(431,"boolean"),t()(),n(432,"td")(433,"code"),e(434,"true"),t()(),n(435,"td"),e(436,"Show built-in dropdown with suggestions"),t()(),n(437,"tr")(438,"td")(439,"code"),e(440,"debounceMs"),t()(),n(441,"td")(442,"code"),e(443,"number"),t()(),n(444,"td")(445,"code"),e(446,"300"),t()(),n(447,"td"),e(448,"Delay in ms before triggering autocomplete search"),t()(),n(449,"tr")(450,"td")(451,"code"),e(452,"maxResults"),t()(),n(453,"td")(454,"code"),e(455,"number"),t()(),n(456,"td")(457,"code"),e(458,"5"),t()(),n(459,"td"),e(460,"Maximum number of autocomplete suggestions"),t()(),n(461,"tr")(462,"td")(463,"code"),e(464,"minQueryLength"),t()(),n(465,"td")(466,"code"),e(467,"number"),t()(),n(468,"td")(469,"code"),e(470,"2"),t()(),n(471,"td"),e(472,"Minimum characters before showing suggestions"),t()(),n(473,"tr")(474,"td")(475,"code"),e(476,"placeholder"),t()(),n(477,"td")(478,"code"),e(479,"string"),t()(),n(480,"td")(481,"code"),e(482,"'Search location...'"),t()(),n(483,"td"),e(484,"Placeholder text for the input field"),t()(),n(485,"tr")(486,"td")(487,"code"),e(488,"autoFocus"),t()(),n(489,"td")(490,"code"),e(491,"boolean"),t()(),n(492,"td")(493,"code"),e(494,"false"),t()(),n(495,"td"),e(496,"Auto-focus input when component loads"),t()(),n(497,"tr")(498,"td")(499,"code"),e(500,"dropdownContainer"),t()(),n(501,"td")(502,"code"),e(503,"string | HTMLElement"),t()(),n(504,"td")(505,"code"),e(506,"undefined"),t()(),n(507,"td"),e(508,"Container for autocomplete dropdown positioning"),t()(),n(509,"tr")(510,"td")(511,"code"),e(512,"customSearchTemplate"),t()(),n(513,"td")(514,"code"),e(515,"TemplateRef<AutocompleteSearchContext>"),t()(),n(516,"td")(517,"code"),e(518,"undefined"),t()(),n(519,"td"),e(520,"Custom template for rendering suggestions"),t()()()()(),n(521,"h4"),e(522,"Output Events"),t(),n(523,"div",8)(524,"table",9)(525,"thead")(526,"tr")(527,"th"),e(528,"Event"),t(),n(529,"th"),e(530,"Type"),t(),n(531,"th"),e(532,"Description"),t()()(),n(533,"tbody")(534,"tr")(535,"td")(536,"code"),e(537,"search"),t()(),n(538,"td")(539,"code"),e(540,"EventEmitter<string>"),t()(),n(541,"td"),e(542,"Fired when user performs a direct search"),t()(),n(543,"tr")(544,"td")(545,"code"),e(546,"suggestionSelected"),t()(),n(547,"td")(548,"code"),e(549,"EventEmitter<AutocompleteSuggestion>"),t()(),n(550,"td"),e(551,"Fired when user selects a suggestion"),t()(),n(552,"tr")(553,"td")(554,"code"),e(555,"autocompleteResults"),t()(),n(556,"td")(557,"code"),e(558,"EventEmitter<AutocompleteSuggestion[]>"),t()(),n(559,"td"),e(560,"Fired when new suggestions are available"),t()(),n(561,"tr")(562,"td")(563,"code"),e(564,"inputChange"),t()(),n(565,"td")(566,"code"),e(567,"EventEmitter<string>"),t()(),n(568,"td"),e(569,"Fired on every input value change"),t()()()()()()(),n(570,"section",4)(571,"h2"),e(572,"Advanced Features"),t(),n(573,"h3"),e(574,"Geocoding"),t(),n(575,"p"),e(576,"The library includes built-in geocoding services using OpenStreetMap Nominatim API."),t(),n(577,"h3"),e(578,"Search and Autocomplete"),t(),n(579,"p"),e(580,"Integrated search functionality with autocomplete suggestions."),t(),n(581,"h3"),e(582,"Selection System"),t(),n(583,"p"),e(584,"Advanced selection system supporting both single and multi-select modes with pre-selected locations."),t(),n(585,"div",5)(586,"pre")(587,"code"),e(588,`// Configure selection options
mapOptions: MapOptions = {
  enableClickSelect: true,
  selection: {
    multiSelect: true,        // Enable multi-selection
    maxSelections: 5,         // Limit to 5 selections
    createPinsForSelections: true,
    selectionPin: {         // Custom pin for selections
      color: '#4CAF50',
      title: 'Selected Location'
    }
  },
  preSelectedLocations: [     // Pre-selected locations (no events)
    { latitude: 50.0755, longitude: 14.4378 }, // Prague
    { latitude: 47.4979, longitude: 19.0402 }  // Budapest
  ]
};

// Handle selection changes
onSelectionChanged(selections: SelectedLocation[]) {
  selections.forEach(selection => {
    console.log('Selected:', selection.id);

    // Access address information
    const city = selection.addressInfo?.address?.city;
    const country = selection.addressInfo?.address?.country;
    console.log(\`Location: \${city}, \${country}\`);
  });
}`),t()()(),n(589,"h3"),e(590,"Multiple Tile Layers"),t(),n(591,"p"),e(592,"Support for various map tile providers including OpenStreetMap, satellite imagery, and custom themes."),t()(),n(593,"section",4)(594,"h2"),e(595,"Key Interfaces"),t(),n(596,"h3"),e(597,"PinObject"),t(),n(598,"div",5)(599,"pre")(600,"code"),e(601),t()()(),n(602,"h3"),e(603,"LocationObject"),t(),n(604,"div",5)(605,"pre")(606,"code"),e(607),t()()(),n(608,"h3"),e(609,"SelectedLocation"),t(),n(610,"div",5)(611,"pre")(612,"code"),e(613),t()()(),n(614,"h3"),e(615,"AutocompleteSuggestion"),t(),n(616,"div",5)(617,"pre")(618,"code"),e(619),t()()(),n(620,"h3"),e(621,"MapClickEvent"),t(),n(622,"div",5)(623,"pre")(624,"code"),e(625),t()()(),n(626,"p")(627,"strong"),e(628,"Note:"),t(),e(629," Address information (city, state, country, zipcode) is accessed through the "),n(630,"code"),e(631,"addressInfo.address"),t(),e(632," object rather than direct properties. For example:"),t(),n(633,"div",5)(634,"pre")(635,"code"),e(636,`// Accessing address information
const city = selection.addressInfo?.address?.city;
const state = selection.addressInfo?.address?.state;
const country = selection.addressInfo?.address?.country;
const zipcode = selection.addressInfo?.address?.postcode;`),t()()()(),n(637,"section",4)(638,"h2"),e(639,"Examples"),t(),n(640,"h3"),e(641,"Basic Map with Pins"),t(),n(642,"div",5)(643,"pre")(644,"code"),e(645),t()()(),n(646,"h3"),e(647,"Template-based Popups"),t(),n(648,"div",5)(649,"pre")(650,"code"),e(651,`<ng-template #customPopup let-location let-pin="pin" let-deletePin="deletePin">
  <div>
    <h3>&#123;&#123; pin.title &#125;&#125;</h3>
    <p>Lat: &#123;&#123; location.latitude &#125;&#125;, Lng: &#123;&#123; location.longitude &#125;&#125;</p>
    <button (click)="deletePin()">Delete Pin</button>
  </div>
</ng-template>`),t()()(),n(652,"h3"),e(653,"Advanced Configuration Example"),t(),n(654,"div",5)(655,"pre")(656,"code"),e(657),t()()()(),n(658,"section",4)(659,"h2"),e(660,"Demo"),t(),n(661,"p"),e(662,"Check out the interactive demo to see all features in action:"),t(),n(663,"a",10),e(664,"View Live Demo \u2192"),t()(),n(665,"section",4)(666,"h2"),e(667,"License"),t(),n(668,"p"),e(669,"MIT License"),t()(),n(670,"section",4)(671,"h2"),e(672,"Support"),t(),n(673,"p"),e(674,"For issues and questions, please visit our "),n(675,"a",11),e(676,"GitHub Issues page"),t(),e(677,"."),t()()()()),d&2&&(i(27),s("import ","{"," NgOsmMapModule ","}",` from '@ngmahesh/ng-osm-map';

@NgModule(`,"{",`
  imports: [NgOsmMapModule],
  ...
`,"}",`)
export class AppModule `,"{"," ","}",""),i(108),o("","{","","}",""),i(210),o("","{","","}",""),i(256),o("interface PinObject ","{",`
  location: LocationObject;           // Pin location
  color?: string;                     // Pin color (hex, rgb, named)
  content?: string;                   // HTML popup content
  popupTemplate?: TemplateRef<PinPopupContext>;  // Custom popup template
  title?: string;                     // Pin title
  icon?: string | PinIcon;            // Custom icon
  draggable?: boolean;                // Whether pin is draggable
  data?: any;                         // Custom data
`,"}",""),i(6),o("interface LocationObject ","{",`
  latitude?: number;      // Latitude coordinate
  longitude?: number;     // Longitude coordinate
  address?: string;       // Address for geocoding
  state?: string;         // State/province
  country?: string;       // Country
  zipCode?: string;       // ZIP/postal code
  city?: string;          // City
`,"}",""),i(6),a("interface SelectedLocation ","{",`
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
`,"}",""),i(6),a("interface AutocompleteSuggestion ","{",`
  displayText: string;           // Main display name
  fullDisplayName: string;       // Full formatted address
  coordinates: `,"{",`
    latitude: number;
    longitude: number;
  `,"}",`;
  boundingBox?: `,"{",`               // Optional bounding area
    north: number;
    south: number;
    east: number;
    west: number;
  `,"}",`;
  importance?: number;           // Relevance score (0-1)
  category?: string;             // Location type (city, restaurant, etc.)
  address?: `,"{",`                   // Structured address components
    house_number?: string;
    road?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  `,"}",`;
`,"}",""),i(6),a("interface MapClickEvent ","{",`
  coordinates: `,"{",`              // Clicked location
    latitude: number;
    longitude: number;
  `,"}",`;
  addressInfo?: `,"{",`             // Address information (if available)
    display_name?: string;
    address?: `,"{",`
      house_number?: string;
      road?: string;
      city?: string;
      state?: string;
      postcode?: string;
      country?: string;
    `,"}",`;
  `,"}",`;
  originalEvent?: any;        // Original Leaflet event
`,"}",""),i(20),l(["export class MyComponent ","{",`
  pins: PinObject[] = [
    `,"{",`
      location: `,"{"," latitude: 40.7128, longitude: -74.0060 ","}",`,
      title: 'New York',
      color: 'red',
      draggable: true
    `,"}",`,
    `,"{",`
      location: `,"{"," address: 'London, UK' ","}",`,
      title: 'London',
      color: 'blue'
    `,"}",`
  ];

  onMapClick(event: MapClickEvent) `,"{",`
    console.log('Map clicked:', event.coordinates);
  `,"}",`
`,"}",""]),i(12),l(["export class AdvancedMapComponent ","{",`
  mapOptions: MapOptions = `,"{",`
    zoom: 12,
    enableClickSelect: true,
    readonly: false,
    selection: `,"{",`
      multiSelect: true,
      maxSelections: 5,
      createPinsForSelections: true,
      autoZoomToSelection: true,
      selectionZoomLevel: 15,
      animatedZoom: true,
      selectionPin: `,"{",`
        color: '#4CAF50',
        title: 'Selected Location'
      `,"}",`
    `,"}",`,
    tileLayerType: 'satellite',
    enableLayerControl: true,
    mapBounds: `,"{",`
      southWest: [50.0, -10.0],
      northEast: [60.0, 5.0]
    `,"}",`,
    noWrap: true
  `,"}",`;

  preSelectedLocations: LocationObject[] = [
    `,"{"," latitude: 50.0755, longitude: 14.4378 ","}",`, // Prague
    `,"{"," latitude: 47.4979, longitude: 19.0402 ","}",`  // Budapest
  ];

  // Handle selection changes
  onSelectionChanged(selections: SelectedLocation[]) `,"{",`
    selections.forEach(selection => `,"{",`
      console.log('Selected:', selection.id);

      // Access address information
      const city = selection.addressInfo?.address?.city;
      const country = selection.addressInfo?.address?.country;
      console.log(\`Location: $`,"{","city","}",", $","{","country","}","`);\n    ","}",`);
  `,"}",`
`,"}",""]))},dependencies:[g,u,x],styles:['@charset "UTF-8";.docs-container[_ngcontent-%COMP%]{min-height:100vh;background:#f8f9fa}.docs-nav[_ngcontent-%COMP%]{background:#fff;padding:1rem 2rem;border-bottom:1px solid #e0e0e0;position:sticky;top:0;z-index:100}.back-link[_ngcontent-%COMP%]{color:#007bff;text-decoration:none;font-weight:500;margin-bottom:1rem;display:inline-block}.back-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.docs-nav[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;color:#333;font-size:2rem}.docs-content[_ngcontent-%COMP%]{max-width:1000px;margin:0 auto;padding:2rem}.docs-section[_ngcontent-%COMP%]{background:#fff;margin-bottom:2rem;padding:2rem;border-radius:8px;box-shadow:0 2px 10px #0000001a}.docs-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#333;margin-top:0;margin-bottom:1rem;font-size:1.8rem;border-bottom:2px solid #007bff;padding-bottom:.5rem}.docs-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#555;margin-top:2rem;margin-bottom:1rem;font-size:1.4rem}.docs-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#666;margin-top:1.5rem;margin-bottom:.75rem;font-size:1.2rem}.docs-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:1.6;color:#666;margin-bottom:1rem}.code-block[_ngcontent-%COMP%]{background:#f4f4f4;border:1px solid #ddd;border-radius:4px;padding:1rem;margin:1rem 0;overflow-x:auto}.code-block[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Courier New,monospace;font-size:.9rem;color:#333}.code-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0;white-space:pre-wrap}.features-list[_ngcontent-%COMP%], .api-list[_ngcontent-%COMP%]{list-style:none;padding:0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .api-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.5rem 0;border-bottom:1px solid #f0f0f0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\2713";color:#28a745;font-weight:700;margin-right:.5rem}.api-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f8f9fa;padding:.2rem .4rem;border-radius:3px;font-family:Courier New,monospace;font-size:.85rem;color:#e83e8c}.demo-link[_ngcontent-%COMP%]{display:inline-block;background:#007bff;color:#fff;padding:.75rem 1.5rem;text-decoration:none;border-radius:4px;font-weight:500;transition:background .2s}.demo-link[_ngcontent-%COMP%]:hover{background:#0056b3;color:#fff}.api-section[_ngcontent-%COMP%]{margin:2rem 0;padding:1.5rem 0;border-top:1px solid #e0e0e0}.api-section[_ngcontent-%COMP%]:first-child{border-top:none;padding-top:0}.api-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#2c3e50;margin-bottom:1rem;font-size:1.5rem;font-weight:600}.api-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#34495e;margin:1.5rem 0 .75rem;font-size:1.2rem;font-weight:600}.api-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#666;margin-bottom:1rem;line-height:1.6}.api-section[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f8f9fa;padding:2px 6px;border-radius:4px;font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:.9em;color:#e83e8c;font-weight:600}.api-table-container[_ngcontent-%COMP%]{overflow-x:auto;margin:1rem 0;border:1px solid #e0e0e0;border-radius:8px}.api-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem;background:#fff}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 16px;text-align:left;border-bottom:1px solid #f0f0f0;vertical-align:top}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#f8f9fa;font-weight:600;color:#495057;position:sticky;top:0;z-index:10}.api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f1f3f4;padding:2px 6px;border-radius:4px;font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:.85em;color:#d73a49;font-weight:600}.api-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#f8f9fa}.api-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}@media (max-width: 768px){.docs-content[_ngcontent-%COMP%], .docs-section[_ngcontent-%COMP%]{padding:1rem}.api-table[_ngcontent-%COMP%]{font-size:.8rem}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px 12px}.api-table-container[_ngcontent-%COMP%]{font-size:.85rem}}']})};export{S as NgOsmMapDocsComponent};
