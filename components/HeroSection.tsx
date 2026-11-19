'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/menu-data';
import { EditorialImage } from './EditorialImage';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative bg-[#141312] text-[#F7F6F2]"
    >
      {/* Full-bleed photographic canvas */}
      <div className="relative min-h-[68vh] lg:min-h-[80vh] w-full overflow-hidden flex items-end">
        <EditorialImage
          assetId="hero_pit"
          sizes="100vw"
          priority
          className="object-cover object-center"
          fallbackTitle="Big Tree BBQ · Gun Bay Smokehouse"
        />

        {/* Measured multi-stop scrim guaranteeing high WCAG contrast for hero text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#141312]/90 via-[#141312]/45 to-[#141312]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#141312]/70 via-[#141312]/20 to-transparent"
        />

        {/* Editorial Headline & Primary Action */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-12 pt-20 lg:px-10 lg:pb-20 lg:pt-28">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium tracking-[0.04em] text-[#E6DDD1] mb-4">
              Gun Bay, East End <span aria-hidden="true" className="mx-2 text-[#B89F86]">·</span> Grand Cayman
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-[clamp(2.5rem,5.2vw,4.75rem)] font-normal leading-[1.04] tracking-[-0.015em] text-[#F7F6F2] [text-wrap:balance]"
            >
              Wood smoke, island heritage, and an open table beneath the tree.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-[1.65] text-[#DFD8CE]">
              Slow-smoked ribs, pit-roasted jerk chicken, and generations-old Caymanian
              home cooking served warm from our family yard along Austin Connolly Drive.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#menu"
                className="inline-flex min-h-[48px] items-center gap-3 bg-[#F7F6F2] px-7 py-3 text-sm font-medium text-[#141312] transition-colors duration-150 hover:bg-[#E7E1D6] whitespace-nowrap shrink-0"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#visit"
                className="inline-flex min-h-[48px] items-center gap-2 text-sm font-medium text-[#F7F6F2] underline decoration-[#B89F86] underline-offset-8 transition-colors duration-150 hover:text-[#E6DDD1] whitespace-nowrap shrink-0"
              >
                <span>Hours &amp; Directions</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width architectural fact strip below hero split */}
      <div className="border-t border-white/12 bg-[#141312]">
        <dl className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-white/12 px-6 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:px-10">
          <div className="py-5 lg:pr-6">
            <dt className="text-xs font-medium text-[#B9B0A4]">Location</dt>
            <dd className="mt-1 text-sm text-[#F7F6F2] whitespace-nowrap">
              {BUSINESS_INFO.addressLine1}, East End
            </dd>
          </div>
          <div className="py-5 sm:pl-6 lg:px-6">
            <dt className="text-xs font-medium text-[#B9B0A4]">Kitchen Hours</dt>
            <dd className="mt-1 text-sm text-[#F7F6F2] tabular-nums whitespace-nowrap">
              Tue – Sun · {BUSINESS_INFO.serviceHoursSummary}
            </dd>
          </div>
          <div className="py-5 lg:px-6">
            <dt className="text-xs font-medium text-[#B9B0A4]">Sunday Tradition</dt>
            <dd className="mt-1 text-sm text-[#F7F6F2]">
              Stewed Conch, Oxtail &amp; Heavy Cake
            </dd>
          </div>
          <div className="py-5 sm:pl-6 lg:pl-6">
            <dt className="text-xs font-medium text-[#B9B0A4]">Direct Telephone</dt>
            <dd className="mt-1 text-sm text-[#F7F6F2] tabular-nums">
              <a
                href={BUSINESS_INFO.primaryPhoneHref}
                className="hover:underline underline-offset-4"
              >
                {BUSINESS_INFO.primaryPhoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
