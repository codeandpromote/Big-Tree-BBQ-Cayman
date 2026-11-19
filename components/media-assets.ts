import type { StaticImageData } from 'next/image';
import type { MediaAssetId } from '@/lib/menu-data';

import heroBbqPitTable from '@/src/assets/images/hero_bbq_pit_table_1795106520951.jpg';
import storyEastEndTree from '@/src/assets/images/story_east_end_tree_1795106447953.jpg';
import dishRibsBrisket from '@/src/assets/images/dish_ribs_brisket_1795106392821.jpg';
import dishCaymanLobster from '@/src/assets/images/dish_cayman_lobster_1795106402017.jpg';
import dishSundayConchFeast from '@/src/assets/images/dish_sunday_conch_feast_1795106520368.jpg';

export interface MediaAssetEntry {
  src: StaticImageData;
  alt: string;
}

export const MEDIA_ASSETS: Record<MediaAssetId, MediaAssetEntry> = {
  hero_pit: {
    src: heroBbqPitTable,
    alt: 'Slow-smoked baby back ribs and charred barbecue chicken leg quarters resting on a weathered teak board with wood smoke drifting through warm tropical light',
  },
  story_tree: {
    src: storyEastEndTree,
    alt: 'Shaded outdoor wooden dining table beneath a spreading sea-grape and almond tree on the East End coast of Grand Cayman',
  },
  dish_ribs: {
    src: dishRibsBrisket,
    alt: 'Thick-sliced oak-smoked beef brisket with pepper bark and glazed baby back ribs plated on matte charcoal stoneware over pale limestone',
  },
  dish_lobster: {
    src: dishCaymanLobster,
    alt: 'Flame-grilled Caribbean spiny lobster tail brushed with herb butter served alongside braised Cayman-style beef, fried plantains, and coconut rice and beans',
  },
  dish_sunday: {
    src: dishSundayConchFeast,
    alt: 'Traditional Caymanian Sunday stewed conch in savory coconut gravy served with golden baked macaroni and cheese, warm cornbread, and spiced cassava cake',
  },
};
