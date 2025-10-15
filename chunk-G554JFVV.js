import{Ia as S,K as i,Oa as x,Ra as u,V as t,W as n,X as o,fa as e,ia as a,ka as s,la as p,ma as l,na as d,sa as g,y as c}from"./chunk-NVGO53OQ.js";var h=class m{static \u0275fac=function(r){return new(r||m)};static \u0275cmp=c({type:m,selectors:[["app-ng-osm-map-docs"]],standalone:!0,features:[g],decls:778,vars:80,consts:[[1,"docs-container"],[1,"docs-nav"],["routerLink","/",1,"back-link"],[1,"docs-content"],[1,"docs-section"],[1,"code-block"],[1,"features-list"],[1,"api-section"],[1,"api-table-container"],[1,"api-table"],["routerLink","/demo/ng-osm-map",1,"demo-link"],["href","https://github.com/maheshnvv/ngmahesh/issues","target","_blank"]],template:function(r,f){r&1&&(t(0,"div",0)(1,"nav",1)(2,"a",2),e(3,"\u2190 Back to Home"),n(),t(4,"h1"),e(5,"NgOsmMap Documentation"),n()(),t(6,"main",3)(7,"section",4)(8,"h2"),e(9,"Overview"),n(),t(10,"p"),e(11,"NgOsmMap is a comprehensive Angular library for OpenStreetMap integration using Leaflet. It provides a complete solution for interactive maps with advanced features."),n()(),t(12,"section",4)(13,"h2"),e(14,"Installation"),n(),t(15,"div",5)(16,"code"),e(17,"npm install @ngmahesh/ng-osm-map leaflet"),n(),o(18,"br"),t(19,"code"),e(20,"npm install --save-dev @types/leaflet"),n()()(),t(21,"section",4)(22,"h2"),e(23,"Quick Start"),n(),t(24,"div",5)(25,"pre")(26,"code"),e(27),n()()()(),t(28,"section",4)(29,"h3"),e(30,"Basic Usage"),n(),t(31,"div",5)(32,"pre")(33,"code"),e(34,`<ng-osm-map
  [pins]="pins"
  [height]="400"
  [width]="'100%'"
  (mapClick)="onMapClick($event)"
  (locationSelected)="onLocationSelected($event)">
</ng-osm-map>`),n()()()(),t(35,"section",4)(36,"h2"),e(37,"Features"),n(),t(38,"ul",6)(39,"li"),e(40,"Interactive map with Leaflet integration"),n(),t(41,"li"),e(42,"Draggable pins with custom templates"),n(),t(43,"li"),e(44,"Geocoding and reverse geocoding"),n(),t(45,"li"),e(46,"Smart search with autocomplete"),n(),t(47,"li"),e(48,"Area highlighting capabilities"),n(),t(49,"li"),e(50,"Multiple tile layer support"),n(),t(51,"li"),e(52,"Advanced selection system"),n(),t(53,"li"),e(54,"Template-based popups"),n(),t(55,"li"),e(56,"Event-driven architecture"),n(),t(57,"li"),e(58,"TypeScript support"),n(),t(59,"li"),e(60,"Angular 18+ compatible"),n(),t(61,"li"),e(62,"Tree-shakable"),n()()(),t(63,"section",4)(64,"h2"),e(65,"API Reference"),n(),t(66,"div",7)(67,"h3"),e(68,"NgOsmMapComponent"),n(),t(69,"p"),e(70,"The main component for embedding interactive maps. This is a wrapper component that provides a clean Angular component interface."),n(),t(71,"h4"),e(72,"Selector"),n(),t(73,"code"),e(74,"<ng-osm-map></ng-osm-map>"),n(),t(75,"h4"),e(76,"Input Properties"),n(),t(77,"div",8)(78,"table",9)(79,"thead")(80,"tr")(81,"th"),e(82,"Property"),n(),t(83,"th"),e(84,"Type"),n(),t(85,"th"),e(86,"Default"),n(),t(87,"th"),e(88,"Description"),n()()(),t(89,"tbody")(90,"tr")(91,"td")(92,"code"),e(93,"pins"),n()(),t(94,"td")(95,"code"),e(96,"PinObject[]"),n()(),t(97,"td")(98,"code"),e(99,"[]"),n()(),t(100,"td"),e(101,"Array of pins to display on the map"),n()(),t(102,"tr")(103,"td")(104,"code"),e(105,"zoomInto"),n()(),t(106,"td")(107,"code"),e(108,"LocationObject"),n()(),t(109,"td")(110,"code"),e(111,"undefined"),n()(),t(112,"td"),e(113,"Location to center and zoom the map to"),n()(),t(114,"tr")(115,"td")(116,"code"),e(117,"highlightAreas"),n()(),t(118,"td")(119,"code"),e(120,"HighlightArea[]"),n()(),t(121,"td")(122,"code"),e(123,"[]"),n()(),t(124,"td"),e(125,"Areas to highlight with custom styling"),n()(),t(126,"tr")(127,"td")(128,"code"),e(129,"mapOptions"),n()(),t(130,"td")(131,"code"),e(132,"MapOptions"),n()(),t(133,"td")(134,"code"),e(135),n()(),t(136,"td"),e(137,"Map configuration and behavior options"),n()(),t(138,"tr")(139,"td")(140,"code"),e(141,"mapId"),n()(),t(142,"td")(143,"code"),e(144,"string"),n()(),t(145,"td")(146,"code"),e(147,"undefined"),n()(),t(148,"td"),e(149,"Unique identifier for connecting search inputs"),n()(),t(150,"tr")(151,"td")(152,"code"),e(153,"preSelectedLocations"),n()(),t(154,"td")(155,"code"),e(156,"LocationObject[]"),n()(),t(157,"td")(158,"code"),e(159,"[]"),n()(),t(160,"td"),e(161," Locations to pre-select without triggering selectionChanged events. Use for initial map state or silent programmatic selection. "),o(162,"br"),t(163,"em"),e(164,"For programmatic selection that should trigger events, use searchLocation property or searchForLocation() method instead."),n()()(),t(165,"tr")(166,"td")(167,"code"),e(168,"searchLocation"),n()(),t(169,"td")(170,"code"),e(171,"LocationObject"),n()(),t(172,"td")(173,"code"),e(174,"undefined"),n()(),t(175,"td"),e(176," Location to search for and select programmatically. Setting this property triggers the full selection workflow including geocoding, pin creation, and selectionChanged events. "),t(177,"strong"),e(178,"Recommended for programmatic selection."),n()()(),t(179,"tr")(180,"td")(181,"code"),e(182,"height"),n()(),t(183,"td")(184,"code"),e(185,"number | string"),n()(),t(186,"td")(187,"code"),e(188,"400"),n()(),t(189,"td"),e(190,"Map height in pixels or CSS value"),n()(),t(191,"tr")(192,"td")(193,"code"),e(194,"width"),n()(),t(195,"td")(196,"code"),e(197,"number | string"),n()(),t(198,"td")(199,"code"),e(200,"'100%'"),n()(),t(201,"td"),e(202,"Map width in pixels or CSS value"),n()(),t(203,"tr")(204,"td")(205,"code"),e(206,"selectedLocation"),n()(),t(207,"td")(208,"code"),e(209,"LocationObject"),n()(),t(210,"td")(211,"code"),e(212,"undefined"),n()(),t(213,"td")(214,"em"),e(215,"(Deprecated)"),n(),e(216," Use preSelectedLocations instead"),n()()()()(),t(217,"h4"),e(218,"Output Events"),n(),t(219,"div",8)(220,"table",9)(221,"thead")(222,"tr")(223,"th"),e(224,"Event"),n(),t(225,"th"),e(226,"Type"),n(),t(227,"th"),e(228,"Description"),n()()(),t(229,"tbody")(230,"tr")(231,"td")(232,"code"),e(233,"mapClick"),n()(),t(234,"td")(235,"code"),e(236,"EventEmitter<MapClickEvent>"),n()(),t(237,"td"),e(238,"Fired when the map is clicked"),n()(),t(239,"tr")(240,"td")(241,"code"),e(242,"locationSelected"),n()(),t(243,"td")(244,"code"),e(245,"EventEmitter<MapClickEvent>"),n()(),t(246,"td"),e(247,"Fired when a location is selected"),n()(),t(248,"tr")(249,"td")(250,"code"),e(251,"searchResult"),n()(),t(252,"td")(253,"code"),e(254,"EventEmitter<SearchResult>"),n()(),t(255,"td"),e(256,"Fired when a search produces results"),n()(),t(257,"tr")(258,"td")(259,"code"),e(260,"pinDragged"),n()(),t(261,"td")(262,"code"),e(263,"EventEmitter<PinDragEvent>"),n()(),t(264,"td"),e(265,"Fired when a pin is dragged to a new location"),n()(),t(266,"tr")(267,"td")(268,"code"),e(269,"autocompleteResults"),n()(),t(270,"td")(271,"code"),e(272,"EventEmitter<AutocompleteSuggestion[]>"),n()(),t(273,"td"),e(274,"Fired when autocomplete suggestions are available"),n()(),t(275,"tr")(276,"td")(277,"code"),e(278,"pinDeleted"),n()(),t(279,"td")(280,"code"),e(281,"EventEmitter<PinDeleteEvent>"),n()(),t(282,"td"),e(283,"Fired when a pin is deleted"),n()(),t(284,"tr")(285,"td")(286,"code"),e(287,"selectionChanged"),n()(),t(288,"td")(289,"code"),e(290,"EventEmitter<SelectedLocation[]>"),n()(),t(291,"td"),e(292," Fired when locations are selected or deselected. Triggered by: map clicks, search results, external search inputs, and programmatic selection via searchForLocation() or searchLocation property. "),o(293,"br"),t(294,"strong"),e(295,"Note:"),n(),e(296," Not triggered by preSelectedLocations changes. "),n()()()()()(),t(297,"div",7)(298,"h3"),e(299,"NgOsmMapDirective"),n(),t(300,"p"),e(301,"The core directive that provides map functionality. Use this directive when you need more control or want to apply map functionality to existing elements."),n(),t(302,"h4"),e(303,"Selector"),n(),t(304,"code"),e(305,"[ngOsmMap]"),n(),t(306,"h4"),e(307,"Input Properties"),n(),t(308,"div",8)(309,"table",9)(310,"thead")(311,"tr")(312,"th"),e(313,"Property"),n(),t(314,"th"),e(315,"Type"),n(),t(316,"th"),e(317,"Default"),n(),t(318,"th"),e(319,"Description"),n()()(),t(320,"tbody")(321,"tr")(322,"td")(323,"code"),e(324,"pins"),n()(),t(325,"td")(326,"code"),e(327,"PinObject[]"),n()(),t(328,"td")(329,"code"),e(330,"[]"),n()(),t(331,"td"),e(332,"Array of pins to display on the map"),n()(),t(333,"tr")(334,"td")(335,"code"),e(336,"zoomInto"),n()(),t(337,"td")(338,"code"),e(339,"LocationObject"),n()(),t(340,"td")(341,"code"),e(342,"undefined"),n()(),t(343,"td"),e(344,"Location to center and zoom the map to"),n()(),t(345,"tr")(346,"td")(347,"code"),e(348,"highlightAreas"),n()(),t(349,"td")(350,"code"),e(351,"HighlightArea[]"),n()(),t(352,"td")(353,"code"),e(354,"[]"),n()(),t(355,"td"),e(356,"Areas to highlight with custom styling"),n()(),t(357,"tr")(358,"td")(359,"code"),e(360,"mapOptions"),n()(),t(361,"td")(362,"code"),e(363,"MapOptions"),n()(),t(364,"td")(365,"code"),e(366),n()(),t(367,"td"),e(368,"Map configuration and behavior options"),n()(),t(369,"tr")(370,"td")(371,"code"),e(372,"mapId"),n()(),t(373,"td")(374,"code"),e(375,"string"),n()(),t(376,"td")(377,"code"),e(378,"undefined"),n()(),t(379,"td"),e(380,"Unique identifier for connecting search inputs"),n()(),t(381,"tr")(382,"td")(383,"code"),e(384,"preSelectedLocations"),n()(),t(385,"td")(386,"code"),e(387,"LocationObject[]"),n()(),t(388,"td")(389,"code"),e(390,"[]"),n()(),t(391,"td"),e(392," Locations to pre-select without triggering selectionChanged events. Use for initial map state or silent programmatic selection. "),o(393,"br"),t(394,"em"),e(395,"For programmatic selection that should trigger events, use searchLocation property or searchForLocation() method instead."),n()()(),t(396,"tr")(397,"td")(398,"code"),e(399,"searchLocation"),n()(),t(400,"td")(401,"code"),e(402,"LocationObject"),n()(),t(403,"td")(404,"code"),e(405,"undefined"),n()(),t(406,"td"),e(407," Location to search for and select programmatically. Setting this property triggers the full selection workflow including geocoding, pin creation, and selectionChanged events. "),t(408,"strong"),e(409,"Recommended for programmatic selection."),n()()()()()(),t(410,"h4"),e(411,"Output Events"),n(),t(412,"p")(413,"em"),e(414,"Same events as NgOsmMapComponent - see above"),n()()(),t(415,"div",7)(416,"h3"),e(417,"NgOsmSearchInputDirective"),n(),t(418,"p"),e(419,"A directive that transforms any input element into a smart search input with autocomplete functionality, connected to a map instance."),n(),t(420,"h4"),e(421,"Selector"),n(),t(422,"code"),e(423,"[ngOsmSearchInput]"),n(),t(424,"h4"),e(425,"Input Properties"),n(),t(426,"div",8)(427,"table",9)(428,"thead")(429,"tr")(430,"th"),e(431,"Property"),n(),t(432,"th"),e(433,"Type"),n(),t(434,"th"),e(435,"Default"),n(),t(436,"th"),e(437,"Description"),n()()(),t(438,"tbody")(439,"tr")(440,"td")(441,"code"),e(442,"connectedMapId"),n()(),t(443,"td")(444,"code"),e(445,"string"),n()(),t(446,"td")(447,"code"),e(448,"undefined"),n()(),t(449,"td"),e(450,"ID of the map component to connect to"),n()(),t(451,"tr")(452,"td")(453,"code"),e(454,"enableAutocomplete"),n()(),t(455,"td")(456,"code"),e(457,"boolean"),n()(),t(458,"td")(459,"code"),e(460,"true"),n()(),t(461,"td"),e(462,"Enable/disable autocomplete suggestions"),n()(),t(463,"tr")(464,"td")(465,"code"),e(466,"showSuggestionsDropdown"),n()(),t(467,"td")(468,"code"),e(469,"boolean"),n()(),t(470,"td")(471,"code"),e(472,"true"),n()(),t(473,"td"),e(474,"Show built-in dropdown with suggestions"),n()(),t(475,"tr")(476,"td")(477,"code"),e(478,"debounceMs"),n()(),t(479,"td")(480,"code"),e(481,"number"),n()(),t(482,"td")(483,"code"),e(484,"300"),n()(),t(485,"td"),e(486,"Delay in ms before triggering autocomplete search"),n()(),t(487,"tr")(488,"td")(489,"code"),e(490,"maxResults"),n()(),t(491,"td")(492,"code"),e(493,"number"),n()(),t(494,"td")(495,"code"),e(496,"5"),n()(),t(497,"td"),e(498,"Maximum number of autocomplete suggestions"),n()(),t(499,"tr")(500,"td")(501,"code"),e(502,"minQueryLength"),n()(),t(503,"td")(504,"code"),e(505,"number"),n()(),t(506,"td")(507,"code"),e(508,"2"),n()(),t(509,"td"),e(510,"Minimum characters before showing suggestions"),n()(),t(511,"tr")(512,"td")(513,"code"),e(514,"placeholder"),n()(),t(515,"td")(516,"code"),e(517,"string"),n()(),t(518,"td")(519,"code"),e(520,"'Search location...'"),n()(),t(521,"td"),e(522,"Placeholder text for the input field"),n()(),t(523,"tr")(524,"td")(525,"code"),e(526,"autoFocus"),n()(),t(527,"td")(528,"code"),e(529,"boolean"),n()(),t(530,"td")(531,"code"),e(532,"false"),n()(),t(533,"td"),e(534,"Auto-focus input when component loads"),n()(),t(535,"tr")(536,"td")(537,"code"),e(538,"dropdownContainer"),n()(),t(539,"td")(540,"code"),e(541,"string | HTMLElement"),n()(),t(542,"td")(543,"code"),e(544,"undefined"),n()(),t(545,"td"),e(546,"Container for autocomplete dropdown positioning"),n()(),t(547,"tr")(548,"td")(549,"code"),e(550,"customSearchTemplate"),n()(),t(551,"td")(552,"code"),e(553,"TemplateRef<AutocompleteSearchContext>"),n()(),t(554,"td")(555,"code"),e(556,"undefined"),n()(),t(557,"td"),e(558,"Custom template for rendering suggestions"),n()()()()(),t(559,"h4"),e(560,"Output Events"),n(),t(561,"div",8)(562,"table",9)(563,"thead")(564,"tr")(565,"th"),e(566,"Event"),n(),t(567,"th"),e(568,"Type"),n(),t(569,"th"),e(570,"Description"),n()()(),t(571,"tbody")(572,"tr")(573,"td")(574,"code"),e(575,"search"),n()(),t(576,"td")(577,"code"),e(578,"EventEmitter<string>"),n()(),t(579,"td"),e(580,"Fired when user performs a direct search"),n()(),t(581,"tr")(582,"td")(583,"code"),e(584,"suggestionSelected"),n()(),t(585,"td")(586,"code"),e(587,"EventEmitter<AutocompleteSuggestion>"),n()(),t(588,"td"),e(589,"Fired when user selects a suggestion"),n()(),t(590,"tr")(591,"td")(592,"code"),e(593,"autocompleteResults"),n()(),t(594,"td")(595,"code"),e(596,"EventEmitter<AutocompleteSuggestion[]>"),n()(),t(597,"td"),e(598,"Fired when new suggestions are available"),n()(),t(599,"tr")(600,"td")(601,"code"),e(602,"inputChange"),n()(),t(603,"td")(604,"code"),e(605,"EventEmitter<string>"),n()(),t(606,"td"),e(607,"Fired on every input value change"),n()()()()()(),t(608,"div",7)(609,"h3"),e(610,"Public Methods"),n(),t(611,"p"),e(612,"Methods available on both NgOsmMapComponent and NgOsmMapDirective instances."),n(),t(613,"h4"),e(614,"searchForLocation(locationObject: LocationObject): void"),n(),t(615,"p"),e(616," Programmatically search for and select a location. This method provides the same behavior as user interaction: "),n(),t(617,"ul")(618,"li"),e(619,"Performs geocoding if needed to resolve the location"),n(),t(620,"li"),e(621,"Creates pins for the selection (if configured)"),n(),t(622,"li"),e(623,"Emits selectionChanged events"),n(),t(624,"li"),e(625,"Handles single/multi-select logic based on map options"),n(),t(626,"li"),e(627,"Provides visual feedback"),n()(),t(628,"p")(629,"strong"),e(630,"Recommended approach"),n(),e(631," for programmatic selection when you want to trigger events."),n(),t(632,"div",5)(633,"pre")(634,"code"),e(635),n()()(),t(636,"h4"),e(637,"getSelectedLocations(): SelectedLocation[]"),n(),t(638,"p"),e(639,"Returns the current array of selected locations."),n(),t(640,"h4"),e(641,"clearSelections(): void"),n(),t(642,"p"),e(643,"Clears all selected locations and removes their pins."),n(),t(644,"h4"),e(645,"getMap(): L.Map | undefined"),n(),t(646,"p"),e(647,"Returns the underlying Leaflet map instance for advanced customization."),n()()(),t(648,"section",4)(649,"h2"),e(650,"Advanced Features"),n(),t(651,"h3"),e(652,"Geocoding"),n(),t(653,"p"),e(654,"The library includes built-in geocoding services using OpenStreetMap Nominatim API."),n(),t(655,"h3"),e(656,"Search and Autocomplete"),n(),t(657,"p"),e(658,"Integrated search functionality with autocomplete suggestions."),n(),t(659,"h3"),e(660,"Selection System"),n(),t(661,"p"),e(662,"Advanced selection system supporting both single and multi-select modes with pre-selected locations."),n(),t(663,"h4"),e(664,"Programmatic Selection Approaches"),n(),t(665,"p"),e(666,"There are two ways to programmatically select locations, each with different behavior:"),n(),t(667,"h5"),e(668,"1. preSelectedLocations (Silent Selection)"),n(),t(669,"p"),e(670,"Use for initial map state or when you don't want to trigger selection events:"),n(),t(671,"div",5)(672,"pre")(673,"code"),e(674,`// Silent selection - no selectionChanged events fired
<ng-osm-map
  [preSelectedLocations]="initialLocations"
  (selectionChanged)="onSelectionChanged($event)">
</ng-osm-map>

initialLocations: LocationObject[] = [
  { latitude: 50.0755, longitude: 14.4378 }, // Prague (silent)
  { latitude: 47.4979, longitude: 19.0402 }  // Budapest (silent)
];`),n()()(),t(675,"h5"),e(676,"2. searchLocation Property or searchForLocation() Method (Interactive Selection)"),n(),t(677,"p"),e(678,"Use when you want to trigger the full selection workflow including events:"),n(),t(679,"div",5)(680,"pre")(681,"code"),e(682,`// Interactive selection - triggers selectionChanged events
<ng-osm-map
  [searchLocation]="targetLocation"
  (selectionChanged)="onSelectionChanged($event)">
</ng-osm-map>

// Or using the method approach
@ViewChild(NgOsmMapComponent) mapComponent!: NgOsmMapComponent;

selectLocationProgrammatically() {
  // This WILL trigger selectionChanged event
  this.mapComponent.searchForLocation({
    address: '1600 Pennsylvania Ave, Washington, DC'
  });
}`),n()()(),t(683,"h4"),e(684,"Selection Configuration"),n(),t(685,"div",5)(686,"pre")(687,"code"),e(688,`// Configure selection options
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
  }
};

// Handle selection changes (NOT triggered by preSelectedLocations)
onSelectionChanged(selections: SelectedLocation[]) {
  // This will only fire for user interactions, search results,
  // and programmatic selection via searchForLocation()
  selections.forEach(selection => {
    console.log('Selected:', selection.id);

    // Access address information
    const city = selection.addressInfo?.address?.city;
    const country = selection.addressInfo?.address?.country;
    console.log(\`Location: \${city}, \${country}\`);
  });
}`),n()()(),t(689,"h3"),e(690,"Multiple Tile Layers"),n(),t(691,"p"),e(692,"Support for various map tile providers including OpenStreetMap, satellite imagery, and custom themes."),n()(),t(693,"section",4)(694,"h2"),e(695,"Key Interfaces"),n(),t(696,"h3"),e(697,"PinObject"),n(),t(698,"div",5)(699,"pre")(700,"code"),e(701),n()()(),t(702,"h3"),e(703,"LocationObject"),n(),t(704,"div",5)(705,"pre")(706,"code"),e(707),n()()(),t(708,"h3"),e(709,"SelectedLocation"),n(),t(710,"div",5)(711,"pre")(712,"code"),e(713),n()()(),t(714,"h3"),e(715,"AutocompleteSuggestion"),n(),t(716,"div",5)(717,"pre")(718,"code"),e(719),n()()(),t(720,"h3"),e(721,"MapClickEvent"),n(),t(722,"div",5)(723,"pre")(724,"code"),e(725),n()()(),t(726,"p")(727,"strong"),e(728,"Note:"),n(),e(729," Address information (city, state, country, zipcode) is accessed through the "),t(730,"code"),e(731,"addressInfo.address"),n(),e(732," object rather than direct properties. For example:"),n(),t(733,"div",5)(734,"pre")(735,"code"),e(736,`// Accessing address information
const city = selection.addressInfo?.address?.city;
const state = selection.addressInfo?.address?.state;
const country = selection.addressInfo?.address?.country;
const zipcode = selection.addressInfo?.address?.postcode;`),n()()()(),t(737,"section",4)(738,"h2"),e(739,"Examples"),n(),t(740,"h3"),e(741,"Basic Map with Pins"),n(),t(742,"div",5)(743,"pre")(744,"code"),e(745),n()()(),t(746,"h3"),e(747,"Template-based Popups"),n(),t(748,"div",5)(749,"pre")(750,"code"),e(751,`<ng-template #customPopup let-location let-pin="pin" let-deletePin="deletePin">
  <div>
    <h3>&#123;&#123; pin.title &#125;&#125;</h3>
    <p>Lat: &#123;&#123; location.latitude &#125;&#125;, Lng: &#123;&#123; location.longitude &#125;&#125;</p>
    <button (click)="deletePin()">Delete Pin</button>
  </div>
</ng-template>`),n()()(),t(752,"h3"),e(753,"Advanced Configuration Example"),n(),t(754,"div",5)(755,"pre")(756,"code"),e(757),n()()()(),t(758,"section",4)(759,"h2"),e(760,"Demo"),n(),t(761,"p"),e(762,"Check out the interactive demo to see all features in action:"),n(),t(763,"a",10),e(764,"View Live Demo \u2192"),n()(),t(765,"section",4)(766,"h2"),e(767,"License"),n(),t(768,"p"),e(769,"MIT License"),n()(),t(770,"section",4)(771,"h2"),e(772,"Support"),n(),t(773,"p"),e(774,"For issues and questions, please visit our "),t(775,"a",11),e(776,"GitHub Issues page"),n(),e(777,"."),n()()()()),r&2&&(i(27),p("import ","{"," NgOsmMapModule ","}",` from '@ngmahesh/ng-osm-map';

@NgModule(`,"{",`
  imports: [NgOsmMapModule],
  ...
`,"}",`)
export class AppModule `,"{"," ","}",""),i(108),a("","{","","}",""),i(231),a("","{","","}",""),i(269),s(`// Example usage
this.mapComponent.searchForLocation(`,"{",`
  address: '1600 Pennsylvania Ave, Washington, DC'
`,"}",`);

// With coordinates
this.mapComponent.searchForLocation(`,"{",`
  latitude: 38.8977,
  longitude: -77.0365
`,"}",");"),i(66),a("interface PinObject ","{",`
  location: LocationObject;           // Pin location
  color?: string;                     // Pin color (hex, rgb, named)
  content?: string;                   // HTML popup content
  popupTemplate?: TemplateRef<PinPopupContext>;  // Custom popup template
  title?: string;                     // Pin title
  icon?: string | PinIcon;            // Custom icon
  draggable?: boolean;                // Whether pin is draggable
  data?: any;                         // Custom data
`,"}",""),i(6),a("interface LocationObject ","{",`
  latitude?: number;      // Latitude coordinate
  longitude?: number;     // Longitude coordinate
  address?: string;       // Address for geocoding
  state?: string;         // State/province
  country?: string;       // Country
  zipCode?: string;       // ZIP/postal code
  city?: string;          // City
`,"}",""),i(6),l("interface SelectedLocation ","{",`
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
`,"}",""),i(6),l("interface AutocompleteSuggestion ","{",`
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
`,"}",""),i(6),l("interface MapClickEvent ","{",`
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
`,"}",""),i(20),d(["export class MyComponent ","{",`
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
`,"}",""]),i(12),d(["export class AdvancedMapComponent ","{",`
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
    `,"{"," latitude: 50.0755, longitude: 14.4378 ","}",`, // Prague (silent initial state)
    `,"{"," latitude: 47.4979, longitude: 19.0402 ","}",`  // Budapest (silent initial state)
  ];

  // Handle selection changes (NOT triggered by preSelectedLocations above)
  onSelectionChanged(selections: SelectedLocation[]) `,"{",`
    // This event is only triggered by user interactions and programmatic
    // selections via searchForLocation() or searchLocation property
    selections.forEach(selection => `,"{",`
      console.log('Selected:', selection.id);

      // Access address information
      const city = selection.addressInfo?.address?.city;
      const country = selection.addressInfo?.address?.country;
      console.log(\`Location: $`,"{","city","}",", $","{","country","}","`);\n    ","}",`);
  `,"}",`

  // Example of programmatic selection that DOES trigger selectionChanged
  selectWashingtonDC() `,"{",`
    // This approach will trigger the selectionChanged event
    this.mapComponent.searchForLocation(`,"{",`
      address: '1600 Pennsylvania Ave, Washington, DC'
    `,"}",`);
  `,"}",`
`,"}",""]))},dependencies:[S,u,x],styles:['@charset "UTF-8";.docs-container[_ngcontent-%COMP%]{min-height:100vh;background:#f8f9fa}.docs-nav[_ngcontent-%COMP%]{background:#fff;padding:1rem 2rem;border-bottom:1px solid #e0e0e0;position:sticky;top:0;z-index:100}.back-link[_ngcontent-%COMP%]{color:#007bff;text-decoration:none;font-weight:500;margin-bottom:1rem;display:inline-block}.back-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.docs-nav[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;color:#333;font-size:2rem}.docs-content[_ngcontent-%COMP%]{max-width:1000px;margin:0 auto;padding:2rem}.docs-section[_ngcontent-%COMP%]{background:#fff;margin-bottom:2rem;padding:2rem;border-radius:8px;box-shadow:0 2px 10px #0000001a}.docs-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#333;margin-top:0;margin-bottom:1rem;font-size:1.8rem;border-bottom:2px solid #007bff;padding-bottom:.5rem}.docs-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#555;margin-top:2rem;margin-bottom:1rem;font-size:1.4rem}.docs-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#666;margin-top:1.5rem;margin-bottom:.75rem;font-size:1.2rem}.docs-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:1.6;color:#666;margin-bottom:1rem}.code-block[_ngcontent-%COMP%]{background:#f4f4f4;border:1px solid #ddd;border-radius:4px;padding:1rem;margin:1rem 0;overflow-x:auto}.code-block[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Courier New,monospace;font-size:.9rem;color:#333}.code-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0;white-space:pre-wrap}.features-list[_ngcontent-%COMP%], .api-list[_ngcontent-%COMP%]{list-style:none;padding:0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .api-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:.5rem 0;border-bottom:1px solid #f0f0f0}.features-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"\\2713";color:#28a745;font-weight:700;margin-right:.5rem}.api-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f8f9fa;padding:.2rem .4rem;border-radius:3px;font-family:Courier New,monospace;font-size:.85rem;color:#e83e8c}.demo-link[_ngcontent-%COMP%]{display:inline-block;background:#007bff;color:#fff;padding:.75rem 1.5rem;text-decoration:none;border-radius:4px;font-weight:500;transition:background .2s}.demo-link[_ngcontent-%COMP%]:hover{background:#0056b3;color:#fff}.api-section[_ngcontent-%COMP%]{margin:2rem 0;padding:1.5rem 0;border-top:1px solid #e0e0e0}.api-section[_ngcontent-%COMP%]:first-child{border-top:none;padding-top:0}.api-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#2c3e50;margin-bottom:1rem;font-size:1.5rem;font-weight:600}.api-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#34495e;margin:1.5rem 0 .75rem;font-size:1.2rem;font-weight:600}.api-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#666;margin-bottom:1rem;line-height:1.6}.api-section[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f8f9fa;padding:2px 6px;border-radius:4px;font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:.9em;color:#e83e8c;font-weight:600}.api-table-container[_ngcontent-%COMP%]{overflow-x:auto;margin:1rem 0;border:1px solid #e0e0e0;border-radius:8px}.api-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem;background:#fff}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px 16px;text-align:left;border-bottom:1px solid #f0f0f0;vertical-align:top}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#f8f9fa;font-weight:600;color:#495057;position:sticky;top:0;z-index:10}.api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:#f1f3f4;padding:2px 6px;border-radius:4px;font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:.85em;color:#d73a49;font-weight:600}.api-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#f8f9fa}.api-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}@media (max-width: 768px){.docs-content[_ngcontent-%COMP%], .docs-section[_ngcontent-%COMP%]{padding:1rem}.api-table[_ngcontent-%COMP%]{font-size:.8rem}.api-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .api-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px 12px}.api-table-container[_ngcontent-%COMP%]{font-size:.85rem}}']})};export{h as NgOsmMapDocsComponent};
