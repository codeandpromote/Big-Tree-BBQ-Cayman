'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '@/lib/menu-data';
import { EditorialImage } from './EditorialImage';

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastTriggerIndexRef = useRef<number | null>(null);

  const openPhoto = (index: number) => {
    lastTriggerIndexRef.current = index;
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    const returnIndex = lastTriggerIndexRef.current;
    if (returnIndex !== null) {
      requestAnimationFrame(() => {
        triggerRefs.current[returnIndex]?.focus();
      });
    }
  }, []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, closeLightbox, showNext, showPrev]);

  const activePhoto =
    selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-[#141312] text-[#F7F6F2]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#D69B75]">
              Photographic Monograph
            </p>
            <h2
              id="gallery-heading"
              className="mt-3 font-serif text-[clamp(2.1rem,3.6vw,3.3rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#F7F6F2] [text-wrap:balance]"
            >
              From the pit to the shaded table.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-[1.65] text-[#C8C0B6]">
            Select any photograph to inspect the textures of our East End
            kitchen and open-air dining yard in full detail.
          </p>
        </div>

        {/* Asymmetric editorial photography grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Photo 1: Large focal wide frame */}
          <button
            ref={(el) => {
              triggerRefs.current[0] = el;
            }}
            type="button"
            onClick={() => openPhoto(0)}
            aria-label={`View full photograph: ${GALLERY_PHOTOS[0].title}`}
            className="group relative md:col-span-8 aspect-[16/10] w-full overflow-hidden bg-[#1E1C1A] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F6F2]"
          >
            <EditorialImage
              assetId={GALLERY_PHOTOS[0].assetId}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              fallbackTitle={GALLERY_PHOTOS[0].title}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#141312]/80 via-[#141312]/15 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="text-xs text-[#D8CFC3]">
                  {GALLERY_PHOTOS[0].categoryLabel} · {GALLERY_PHOTOS[0].locationNote}
                </p>
                <p className="mt-1 font-serif text-2xl text-[#F7F6F2]">
                  {GALLERY_PHOTOS[0].title}
                </p>
              </div>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#141312]/70 text-[#F7F6F2] transition-colors group-hover:bg-[#F7F6F2] group-hover:text-[#141312]">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </button>

          {/* Photo 2: Tall portrait frame */}
          <button
            ref={(el) => {
              triggerRefs.current[1] = el;
            }}
            type="button"
            onClick={() => openPhoto(1)}
            aria-label={`View full photograph: ${GALLERY_PHOTOS[1].title}`}
            className="group relative md:col-span-4 aspect-[4/5] md:aspect-auto w-full overflow-hidden bg-[#1E1C1A] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F6F2]"
          >
            <EditorialImage
              assetId={GALLERY_PHOTOS[1].assetId}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              fallbackTitle={GALLERY_PHOTOS[1].title}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#141312]/85 via-[#141312]/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="text-xs text-[#D8CFC3]">
                  {GALLERY_PHOTOS[1].categoryLabel}
                </p>
                <p className="mt-1 font-serif text-xl text-[#F7F6F2]">
                  {GALLERY_PHOTOS[1].title}
                </p>
              </div>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#141312]/70 text-[#F7F6F2] transition-colors group-hover:bg-[#F7F6F2] group-hover:text-[#141312]">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </button>

          {/* Photos 3, 4, 5: Balanced editorial triptych */}
          {GALLERY_PHOTOS.slice(2).map((photo, offset) => {
            const index = offset + 2;
            return (
              <button
                key={photo.id}
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                type="button"
                onClick={() => openPhoto(index)}
                aria-label={`View full photograph: ${photo.title}`}
                className="group relative md:col-span-4 aspect-[4/3] w-full overflow-hidden bg-[#1E1C1A] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F6F2]"
              >
                <EditorialImage
                  assetId={photo.assetId}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  fallbackTitle={photo.title}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#141312]/85 via-[#141312]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="text-xs text-[#D8CFC3]">
                      {photo.categoryLabel}
                    </p>
                    <p className="mt-1 font-serif text-xl text-[#F7F6F2]">
                      {photo.title}
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center bg-[#141312]/70 text-[#F7F6F2] transition-colors group-hover:bg-[#F7F6F2] group-hover:text-[#141312]">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Fullscreen Photography Lightbox */}
      {activePhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-photo-title"
          aria-describedby="lightbox-photo-caption"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0C0B0A] p-4 sm:p-8 text-[#F7F6F2]"
        >
          {/* Top bar */}
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4">
            <p className="text-xs font-medium tracking-[0.04em] text-[#CFC7BC] tabular-nums">
              {String(selectedIndex + 1).padStart(2, '0')} /{' '}
              {String(GALLERY_PHOTOS.length).padStart(2, '0')}
              <span aria-hidden="true" className="mx-2 text-[#6B655D]">
                ·
              </span>
              {activePhoto.categoryLabel}
            </p>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close photograph viewer"
              className="inline-flex h-11 min-w-[44px] items-center gap-2 border border-white/25 px-4 text-sm font-medium text-[#F7F6F2] hover:bg-[#F7F6F2] hover:text-[#141312] transition-colors"
            >
              <span>Close</span>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Center image frame */}
          <div className="mx-auto my-4 relative w-full max-w-[1060px] flex-1 min-h-[260px] max-h-[68vh] overflow-hidden bg-transparent">
            <EditorialImage
              assetId={activePhoto.assetId}
              sizes="100vw"
              className="object-contain"
              fallbackTitle={activePhoto.title}
            />
          </div>

          {/* Caption & Previous / Next controls */}
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h3
                id="lightbox-photo-title"
                className="font-serif text-2xl font-normal text-[#F7F6F2]"
              >
                {activePhoto.title}
              </h3>
              <p
                id="lightbox-photo-caption"
                className="mt-1.5 text-sm leading-[1.6] text-[#CFC7BC]"
              >
                {activePhoto.caption}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photograph"
                className="inline-flex h-11 min-w-[44px] items-center gap-1.5 border border-white/20 px-4 text-sm font-medium text-[#F7F6F2] hover:bg-[#F7F6F2] hover:text-[#141312] transition-colors whitespace-nowrap"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photograph"
                className="inline-flex h-11 min-w-[44px] items-center gap-1.5 border border-white/20 px-4 text-sm font-medium text-[#F7F6F2] hover:bg-[#F7F6F2] hover:text-[#141312] transition-colors whitespace-nowrap"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
