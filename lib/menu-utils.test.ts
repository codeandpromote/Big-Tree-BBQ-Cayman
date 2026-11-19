import test from 'node:test';
import assert from 'node:assert/strict';
import { MENU_ITEMS } from './menu-data';
import {
  filterMenuItems,
  formatAttributeLabel,
  getCategoryCounts,
} from './menu-utils';

test('getCategoryCounts accurately totals all categories', () => {
  const counts = getCategoryCounts(MENU_ITEMS);
  assert.equal(counts.all, MENU_ITEMS.length);
  assert.equal(
    counts.pit + counts.caymanian + counts.sunday + counts.sides,
    MENU_ITEMS.length
  );
  assert.equal(counts.sunday, 2);
});

test('filterMenuItems filters by category', () => {
  const sundayItems = filterMenuItems(MENU_ITEMS, {
    category: 'sunday',
    attribute: 'all',
    query: '',
  });
  assert.equal(sundayItems.length, 2);
  assert.deepEqual(
    sundayItems.map((i) => i.id),
    ['stewed-conch', 'stewed-turtle']
  );
});

test('filterMenuItems combines attribute and search query case-insensitively', () => {
  const seasonalLobster = filterMenuItems(MENU_ITEMS, {
    category: 'all',
    attribute: 'seasonal',
    query: '  LOBSTER ',
  });
  assert.equal(seasonalLobster.length, 1);
  assert.equal(seasonalLobster[0]?.id, 'cayman-lobster');
});

test('filterMenuItems returns empty array when no dish matches', () => {
  const none = filterMenuItems(MENU_ITEMS, {
    category: 'pit',
    attribute: 'sunday-only',
    query: '',
  });
  assert.equal(none.length, 0);
});

test('formatAttributeLabel returns natural editorial labels', () => {
  assert.equal(formatAttributeLabel('signature'), 'House Signature');
  assert.equal(formatAttributeLabel('sunday-only'), 'Sunday Only');
  assert.equal(formatAttributeLabel('seasonal'), 'Seasonal');
});
