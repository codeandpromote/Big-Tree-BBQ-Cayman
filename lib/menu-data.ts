export type MenuCategoryId =
  | 'all'
  | 'pit'
  | 'caymanian'
  | 'sunday'
  | 'sides';

export type MenuAttribute = 'all' | 'signature' | 'sunday-only' | 'seasonal';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  heading: string;
  description: string;
  featuredAssetId: MediaAssetId;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategoryId, 'all'>;
  description: string;
  servingNote: string;
  attributes: Array<Exclude<MenuAttribute, 'all'>>;
}

export type MediaAssetId =
  | 'hero_pit'
  | 'story_tree'
  | 'dish_ribs'
  | 'dish_lobster'
  | 'dish_sunday';

export interface GalleryPhoto {
  id: string;
  assetId: MediaAssetId;
  title: string;
  categoryLabel: string;
  caption: string;
  locationNote: string;
  aspect: 'wide' | 'portrait' | 'landscape';
}

export interface BusinessInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  fullAddress: string;
  mapsQueryUrl: string;
  primaryPhoneDisplay: string;
  primaryPhoneHref: string;
  secondaryPhoneDisplay: string;
  secondaryPhoneHref: string;
  serviceDaysSummary: string;
  serviceHoursSummary: string;
  holidayNote: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Big Tree BBQ',
  addressLine1: '#503 Austin Connolly Drive',
  addressLine2: 'Gun Bay, East End, Grand Cayman',
  fullAddress: '#503 Austin Connolly Drive, Gun Bay, East End, Grand Cayman, Cayman Islands',
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Big+Tree+BBQ+503+Austin+Connolly+Drive+East+End+Grand+Cayman',
  primaryPhoneDisplay: '+1 (345) 938-8314',
  primaryPhoneHref: 'tel:+13459388314',
  secondaryPhoneDisplay: '+1 (345) 929-0888',
  secondaryPhoneHref: 'tel:+13459290888',
  serviceDaysSummary: 'Tuesday – Sunday',
  serviceHoursSummary: '11:00 AM – 6:30 PM',
  holidayNote:
    'Closed Mondays. Public holiday and seasonal hours may vary — calling ahead is always welcome.',
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'all',
    label: 'All Offerings',
    heading: 'Complete Kitchen Offerings',
    description:
      'Prepared fresh each morning in Gun Bay. Main plates are generously bundled with your choice of homestyle accompaniments.',
    featuredAssetId: 'dish_ribs',
  },
  {
    id: 'pit',
    label: 'From the Pit',
    heading: 'From the Open Pit',
    description:
      'Patiently tended over seasoned wood smoke until deeply caramelized on the outside and effortlessly tender within.',
    featuredAssetId: 'dish_ribs',
  },
  {
    id: 'caymanian',
    label: 'Caymanian Kitchen',
    heading: 'Traditional Caymanian Kitchen',
    description:
      'Family recipes rooted in East End heritage—slow-braised meats and seasonal coastal catch finished with island herbs and scotch bonnet warmth.',
    featuredAssetId: 'dish_lobster',
  },
  {
    id: 'sunday',
    label: 'Sunday Specials',
    heading: 'Sunday Heritage Table',
    description:
      'Every Sunday our kitchen expands to honor labor-intensive Caymanian classics simmered from early morning until sold out.',
    featuredAssetId: 'dish_sunday',
  },
  {
    id: 'sides',
    label: 'Sides & Sweets',
    heading: 'Accompaniments & Island Sweets',
    description:
      'Scratch-made sides folded into every platter, alongside traditional heavy cake baked warm for the finish.',
    featuredAssetId: 'dish_sunday',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // From the Pit
  {
    id: 'baby-back-ribs',
    name: 'Slow-Smoked Baby Back Ribs',
    category: 'pit',
    description:
      'Dry-rubbed overnight and smoked low until fork-tender, brushed lightly over the coals with our house island barbecue glaze.',
    servingNote: 'Half or full rack platter · Choice of two sides',
    attributes: ['signature'],
  },
  {
    id: 'beef-ribs',
    name: 'Pit-Smoked Beef Ribs',
    category: 'pit',
    description:
      'Thick-cut, bone-in beef ribs crusted with cracked black pepper and island aromatics, finished for a deep mahogany bark.',
    servingNote: 'Generous cut platter · Choice of two sides',
    attributes: ['signature'],
  },
  {
    id: 'bbq-chicken-quarters',
    name: 'BBQ Chicken Leg Quarters',
    category: 'pit',
    description:
      'Our roadside cornerstone—char-kissed skin glazed in tangy-sweet barbecue reduction with juicy, smoke-infused dark meat.',
    servingNote: 'Quarter or half platter · Choice of two sides',
    attributes: ['signature'],
  },
  {
    id: 'jerk-chicken',
    name: 'Island Jerk Chicken',
    category: 'pit',
    description:
      'Marinated in scallions, pimento, fresh thyme, and scotch bonnet pepper, then flame-roasted for bright, balanced Caribbean heat.',
    servingNote: 'Served warm with house pepper relish · Two sides',
    attributes: ['signature'],
  },
  {
    id: 'smoked-brisket',
    name: 'Sliced Smoked Brisket',
    category: 'pit',
    description:
      'Hand-trimmed beef brisket rested in butcher paper after hours of gentle smoke, sliced thick to order.',
    servingNote: 'Platter portion · Limited daily availability',
    attributes: ['seasonal'],
  },
  {
    id: 'flame-grilled-steaks',
    name: 'Char-Grilled Steaks',
    category: 'pit',
    description:
      'Seasoned simply with coarse sea salt, garlic, and herbs, seared directly over glowing embers for a crisp crust.',
    servingNote: 'Cooked to order · Choice of two sides',
    attributes: [],
  },

  // Caymanian Kitchen
  {
    id: 'cayman-style-beef',
    name: 'Cayman-Style Beef',
    category: 'caymanian',
    description:
      'Tender pulled and diced beef slow-simmered in rich pan gravy with sweet peppers, onions, island thyme, and gentle scotch bonnet.',
    servingNote: 'Local classic · Paired best with rice & beans',
    attributes: ['signature'],
  },
  {
    id: 'cayman-lobster',
    name: 'Cayman-Style Lobster & Tails',
    category: 'caymanian',
    description:
      'Sweet Caribbean spiny lobster prepared either flame-kissed with herb butter or simmered in savory Caymanian island sauce.',
    servingNote: 'Seasonal local catch · Subject to East End waters',
    attributes: ['signature', 'seasonal'],
  },
  {
    id: 'braised-oxtail',
    name: 'Slow-Braised Oxtail',
    category: 'caymanian',
    description:
      'Simmered patiently for hours with broad beans, allspice, and browning until silky, rich, and falling effortlessly from the bone.',
    servingNote: 'Hearty platter · Served with rice & two sides',
    attributes: ['signature'],
  },

  // Sunday Heritage Specials
  {
    id: 'stewed-conch',
    name: 'Sunday Stewed Conch',
    category: 'sunday',
    description:
      'Tenderized local conch slowly stewed in fragrant coconut milk, fresh thyme, scallion, and traditional Caymanian seasonings.',
    servingNote: 'Sundays from 11:00 AM · Until sold out',
    attributes: ['signature', 'sunday-only'],
  },
  {
    id: 'stewed-turtle',
    name: 'Traditional Stewed Turtle',
    category: 'sunday',
    description:
      'A revered Caymanian Sunday centerpiece prepared with deep island aromatics, root vegetables, and seasoned gravy.',
    servingNote: 'Sundays only · Call ahead to confirm availability',
    attributes: ['sunday-only', 'seasonal'],
  },

  // Sides & Sweets
  {
    id: 'rice-and-beans',
    name: 'Coconut Rice & Beans',
    category: 'sides',
    description:
      'Long-grain rice simmered gently in fresh coconut milk with red kidney beans, thyme sprig, and whole scotch bonnet perfume.',
    servingNote: 'Included with platters or available individually · Steamed white rice also available',
    attributes: ['signature'],
  },
  {
    id: 'baked-mac-cheese',
    name: 'Baked Macaroni & Cheese',
    category: 'sides',
    description:
      'Rich, custard-baked Cayman-style macaroni layered with sharp cheddar and baked until golden at the edges.',
    servingNote: 'Homestyle pan slice · Platter accompaniment',
    attributes: ['signature'],
  },
  {
    id: 'fried-plantains',
    name: 'Caramelized Fried Plantains',
    category: 'sides',
    description:
      'Sweet ripe plantains sliced thick and pan-fried until amber, crisp at the rim, and soft at the center.',
    servingNote: 'Prepared warm throughout service',
    attributes: [],
  },
  {
    id: 'potato-salad-coleslaw',
    name: 'Potato Salad & Crisp Coleslaw',
    category: 'sides',
    description:
      'Chilled homestyle potato salad and finely shredded island cabbage slaw to brighten rich pit-smoked meats.',
    servingNote: 'Served chilled · Platter accompaniment',
    attributes: [],
  },
  {
    id: 'cornbread-corn',
    name: 'Sweet Cornbread & Roasted Corn',
    category: 'sides',
    description:
      'Golden crumb cornbread baked each morning alongside tender sweet corn on the cob brushed with salted butter.',
    servingNote: 'Warm kitchen accompaniment',
    attributes: [],
  },
  {
    id: 'cassava-cake',
    name: 'Traditional Cayman Cassava Cake',
    category: 'sides',
    description:
      'Dense, deeply spiced Caymanian heavy cake crafted from grated cassava, coconut milk, brown sugar, and warm nutmeg.',
    servingNote: 'Sliced daily · Island dessert specialty',
    attributes: ['signature'],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-pit-table',
    assetId: 'hero_pit',
    title: 'Fresh Off the Pit',
    categoryLabel: 'Smokehouse Craft',
    caption:
      'Slow-smoked baby back ribs and charred BBQ chicken leg quarters resting on weathered teak as late afternoon smoke drifts through Gun Bay.',
    locationNote: 'Austin Connolly Drive, East End',
    aspect: 'wide',
  },
  {
    id: 'photo-big-tree',
    assetId: 'story_tree',
    title: 'Beneath the Shade Tree',
    categoryLabel: 'The Yard',
    caption:
      'Our open-air table set in dappled tropical canopy shade—an unhurried coastal refuge where East End neighbors and island travelers gather.',
    locationNote: 'Gun Bay Courtyard',
    aspect: 'portrait',
  },
  {
    id: 'photo-brisket-ribs',
    assetId: 'dish_ribs',
    title: 'Oak Smoke & Pepper Bark',
    categoryLabel: 'From the Pit',
    caption:
      'Thick-cut smoked brisket with mahogany bark served alongside glazed baby back ribs over warm coral limestone.',
    locationNote: 'Daily Pit Service',
    aspect: 'landscape',
  },
  {
    id: 'photo-cayman-lobster',
    assetId: 'dish_lobster',
    title: 'East End Catch & Cayman Beef',
    categoryLabel: 'Caymanian Kitchen',
    caption:
      'Flame-kissed Caribbean spiny lobster paired with slow-braised Cayman-style beef, caramelized plantains, and coconut rice and beans.',
    locationNote: 'Seasonal & Daily Plates',
    aspect: 'landscape',
  },
  {
    id: 'photo-sunday-table',
    assetId: 'dish_sunday',
    title: 'The Sunday Heritage Feast',
    categoryLabel: 'Sunday Specials',
    caption:
      'Velvety stewed conch in spiced coconut gravy surrounded by golden baked macaroni and cheese, warm cornbread, and traditional cassava cake.',
    locationNote: 'Sundays from 11:00 AM',
    aspect: 'landscape',
  },
];

export const CRAFT_PILLARS = [
  {
    index: '01.',
    title: 'Patience Over the Pit',
    body: 'Every rack of ribs, leg quarter, and brisket is tended slowly over natural wood smoke—never rushed, glazed only when the bark is ready.',
  },
  {
    index: '02.',
    title: 'True Caymanian Heritage',
    body: 'Alongside classic barbecue, our pots carry generations of East End cooking: Cayman-style beef, braised oxtail, seasonal lobster, and Sunday stewed conch.',
  },
  {
    index: '03.',
    title: 'Hospitality Under the Canopy',
    body: 'Rooted in a family front yard on Austin Connolly Drive, Big Tree BBQ welcomes every guest to linger beneath the shade tree or take warm plates to the coast.',
  },
];

export const GUEST_REFLECTIONS = [
  {
    quote:
      'Worth every mile of the drive out to East End. The ribs fall right off the bone, and eating under the shade tree feels like visiting family.',
    author: 'Marissa & Devon Reid',
    context: 'East End Sunday Visit · Grand Cayman',
  },
  {
    quote:
      'Unpretentious, deeply authentic island cooking. Come early on Sunday for the stewed conch and do not leave without a slice of cassava cake.',
    author: 'Callum Henderson',
    context: 'Seven Mile Beach Resident · Regular Guest',
  },
];
