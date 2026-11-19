import { BUSINESS_INFO } from '@/lib/menu-data';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E4E1DA] bg-[#F2EFE8] text-[#4A4641]">
      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <a
              href="#top"
              className="font-serif text-2xl font-medium text-[#141312]"
            >
              Big Tree BBQ
            </a>
            <p className="max-w-sm text-sm leading-[1.65] text-[#59544E]">
              Open-pit barbecue and traditional Caymanian cooking shared beneath
              the shade tree in Gun Bay, East End, Grand Cayman.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="text-xs font-semibold tracking-[0.04em] text-[#141312]">
              Explore
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#story" className="hover:text-[#141312] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#141312] transition-colors">
                  The Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#141312] transition-colors">
                  Photography Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#141312] transition-colors">
                  Hours &amp; Directions
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <h2 className="text-xs font-semibold tracking-[0.04em] text-[#141312]">
              Gun Bay Kitchen
            </h2>
            <p className="leading-[1.65]">
              {BUSINESS_INFO.addressLine1}
              <br />
              {BUSINESS_INFO.addressLine2}
            </p>
            <p className="tabular-nums">
              <a
                href={BUSINESS_INFO.primaryPhoneHref}
                className="font-medium text-[#141312] hover:text-[#7A3A18]"
              >
                {BUSINESS_INFO.primaryPhoneDisplay}
              </a>
              <span aria-hidden="true" className="mx-2 text-[#9E968B]">
                ·
              </span>
              <span>{BUSINESS_INFO.serviceDaysSummary}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#DEDAD0] pt-6 text-xs text-[#59544E] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Big Tree BBQ · East End, Grand Cayman.
          </p>
          <p>
            Crafted with full keyboard navigation and WCAG 2.1 AA accessibility standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
