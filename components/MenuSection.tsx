'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Search, X } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuAttribute,
  type MenuCategoryId,
} from '@/lib/menu-data';
import {
  filterMenuItems,
  formatAttributeLabel,
  getCategoryCounts,
} from '@/lib/menu-utils';
import { EditorialImage } from './EditorialImage';

const ATTRIBUTE_FILTERS: Array<{ id: MenuAttribute; label: string }> = [
  { id: 'all', label: 'All Styles' },
  { id: 'signature', label: 'House Signatures' },
  { id: 'sunday-only', label: 'Sunday Specials' },
  { id: 'seasonal', label: 'Seasonal' },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const [activeAttribute, setActiveAttribute] = useState<MenuAttribute>('all');
  const [query, setQuery] = useState('');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const counts = useMemo(() => getCategoryCounts(MENU_ITEMS), []);

  const currentCategory = useMemo(
    () =>
      MENU_CATEGORIES.find((cat) => cat.id === activeCategory) ??
      MENU_CATEGORIES[0],
    [activeCategory]
  );

  const filteredItems = useMemo(
    () =>
      filterMenuItems(MENU_ITEMS, {
        category: activeCategory,
        attribute: activeAttribute,
        query,
      }),
    [activeCategory, activeAttribute, query]
  );

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = MENU_CATEGORIES.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % total;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + total) % total;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = total - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const target = MENU_CATEGORIES[nextIndex];
      setActiveCategory(target.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveAttribute('all');
    setQuery('');
  };

  const hasActiveFilter =
    activeCategory !== 'all' ||
    activeAttribute !== 'all' ||
    query.trim().length > 0;

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="border-t border-[#E4E1DA] bg-[#F2EFE8]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        {/* Section Intro & Featured Category Photography */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end pb-12 border-b border-[#DEDAD0]">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#7A3A18]">
              Kitchen Showcase
            </p>
            <h2
              id="menu-heading"
              className="mt-3 font-serif text-[clamp(2.1rem,3.6vw,3.3rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#141312] [text-wrap:balance]"
            >
              The Menu
            </h2>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.68] text-[#4A4641]">
              Every platter is cooked fresh daily and packed warm for the road or
              served beneath the shade tree. Explore our pit meats, traditional
              Caymanian dishes, and Sunday specials below.
            </p>
          </div>

          {/* Search input for effortless accessible dish lookup */}
          <div className="lg:col-span-5">
            <label
              htmlFor="menu-search"
              className="block text-xs font-medium text-[#4A4641] mb-2"
            >
              Find a dish or ingredient
            </label>
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#59544E]"
                aria-hidden="true"
              />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ribs, lobster, stewed conch, cassava..."
                className="min-h-[44px] w-full border border-[#D4CFC4] bg-[#F7F6F2] pl-10 pr-10 py-2.5 text-sm text-[#141312] placeholder:text-[#6E6860] transition-colors focus:border-[#843E1A] focus:outline-none"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear menu search"
                  className="absolute right-1.5 inline-flex h-9 w-9 items-center justify-center text-[#59544E] hover:text-[#141312]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Accessible Category Tabs — Single clean horizontal row on desktop */}
        <div className="mt-8">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-2.5"
          >
            {MENU_CATEGORIES.map((category, index) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`menu-tab-${category.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="menu-panel-list"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`inline-flex min-h-[42px] items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#141312] text-[#F7F6F2]'
                      : 'bg-transparent text-[#423E3A] border border-[#D4CFC4] hover:border-[#141312] hover:text-[#141312]'
                  }`}
                >
                  <span>{category.label}</span>
                  <span
                    className={`text-xs tabular-nums ${
                      isSelected ? 'text-[#D2CBC0]' : 'text-[#6B655D]'
                    }`}
                  >
                    {counts[category.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Photography & Menu Ledger */}
        <div
          id="menu-panel-list"
          role="tabpanel"
          aria-labelledby={`menu-tab-${activeCategory}`}
          className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12"
        >
          {/* Left Sticky Editorial Frame */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5E1D8]">
                <EditorialImage
                  assetId={currentCategory.featuredAssetId}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500"
                  fallbackTitle={currentCategory.heading}
                />
              </div>

              <div className="space-y-2.5">
                <h3 className="font-serif text-2xl font-normal text-[#141312]">
                  {currentCategory.heading}
                </h3>
                <p className="text-sm leading-[1.68] text-[#4A4641]">
                  {currentCategory.description}
                </p>
              </div>

              <div className="border-t border-[#DEDAD0] pt-4 text-xs leading-[1.65] text-[#59544E]">
                <p>
                  All barbecue and island plates are served in generous to-go
                  containers—ideal for enjoying under our shade tree or along
                  the East End shoreline.
                </p>
                <p className="mt-2 font-medium text-[#141312]">
                  For Sunday specials or seasonal lobster availability, call{' '}
                  <a
                    href="tel:+13459388314"
                    className="underline decoration-[#843E1A] underline-offset-4 hover:text-[#7A3A18]"
                  >
                    +1 (345) 938-8314
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Right Clean Fine-Dining Menu Ledger */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3 pb-4 border-b border-[#DEDAD0] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <p
                  aria-live="polite"
                  className="text-xs font-medium text-[#59544E] tabular-nums whitespace-nowrap"
                >
                  Showing {filteredItems.length}{' '}
                  {filteredItems.length === 1 ? 'offering' : 'offerings'}
                </p>

                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-medium text-[#7A3A18] underline underline-offset-4 hover:text-[#141312] whitespace-nowrap shrink-0"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {/* Secondary attribute filter buttons on one clean line */}
              <div
                role="group"
                aria-label="Filter dishes by highlight"
                className="flex flex-wrap items-center gap-4"
              >
                {ATTRIBUTE_FILTERS.map((attr) => {
                  const isActive = activeAttribute === attr.id;
                  return (
                    <button
                      key={attr.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveAttribute(attr.id)}
                      className={`min-h-[36px] py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                        isActive
                          ? 'text-[#7A3A18] underline decoration-[#7A3A18] decoration-2 underline-offset-8'
                          : 'text-[#59544E] hover:text-[#141312]'
                      }`}
                    >
                      {attr.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-16 text-center border-b border-[#DEDAD0]">
                <p className="font-serif text-2xl text-[#141312]">
                  No dishes match that combination.
                </p>
                <p className="mt-2 text-sm text-[#59544E]">
                  Try clearing your search or viewing all kitchen offerings.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex min-h-[44px] items-center justify-center bg-[#141312] px-6 py-2.5 text-sm font-medium text-[#F7F6F2] hover:bg-[#843E1A] transition-colors"
                >
                  Show All Offerings
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.ul
                  key={`${activeCategory}-${activeAttribute}-${query}`}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="divide-y divide-[#DEDAD0] border-b border-[#DEDAD0]"
                >
                  {filteredItems.map((item) => (
                    <li key={item.id} className="py-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <h4 className="font-serif text-[1.45rem] font-normal leading-snug text-[#141312]">
                          {item.name}
                        </h4>

                        {item.attributes.length > 0 && (
                          <div className="flex items-center gap-2 text-xs font-medium text-[#7A3A18] shrink-0">
                            {item.attributes.map((attr, idx) => (
                              <span key={attr} className="inline-flex items-center gap-2">
                                {idx > 0 && (
                                  <span aria-hidden="true" className="text-[#9E968B]">
                                    ·
                                  </span>
                                )}
                                <span>{formatAttributeLabel(attr)}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="mt-2 max-w-[62ch] text-sm leading-[1.68] text-[#423E3A]">
                        {item.description}
                      </p>

                      <p className="mt-2.5 text-xs text-[#635D56]">
                        {item.servingNote}
                      </p>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
