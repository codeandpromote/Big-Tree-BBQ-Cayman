import {
  MENU_ITEMS,
  type MenuAttribute,
  type MenuCategoryId,
  type MenuItem,
} from './menu-data';

export interface MenuFilterCriteria {
  category: MenuCategoryId;
  attribute: MenuAttribute;
  query: string;
}

export function filterMenuItems(
  items: readonly MenuItem[],
  criteria: MenuFilterCriteria
): MenuItem[] {
  const normalizedQuery = criteria.query.trim().toLowerCase();

  return items.filter((item) => {
    if (criteria.category !== 'all' && item.category !== criteria.category) {
      return false;
    }

    if (
      criteria.attribute !== 'all' &&
      !item.attributes.includes(criteria.attribute)
    ) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const haystack = `${item.name} ${item.description} ${item.servingNote}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export function getCategoryCounts(
  items: readonly MenuItem[] = MENU_ITEMS
): Record<MenuCategoryId, number> {
  const counts: Record<MenuCategoryId, number> = {
    all: items.length,
    pit: 0,
    caymanian: 0,
    sunday: 0,
    sides: 0,
  };

  for (const item of items) {
    counts[item.category] += 1;
  }

  return counts;
}

export function formatAttributeLabel(
  attr: Exclude<MenuAttribute, 'all'>
): string {
  switch (attr) {
    case 'signature':
      return 'House Signature';
    case 'sunday-only':
      return 'Sunday Only';
    case 'seasonal':
      return 'Seasonal';
  }
}
