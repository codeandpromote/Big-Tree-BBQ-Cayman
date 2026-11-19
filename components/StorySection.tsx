import { CRAFT_PILLARS, GUEST_REFLECTIONS } from '@/lib/menu-data';
import { EditorialImage } from './EditorialImage';

export function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-stretch">
        {/* Left column: Documentary vertical photograph */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE7DF] lg:h-full lg:min-h-[540px]">
            <EditorialImage
              assetId="story_tree"
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              fallbackTitle="The Shade Tree · Gun Bay"
            />
          </div>
          <p className="mt-3 text-xs text-[#59544E]">
            The family yard along Austin Connolly Drive · Gun Bay, East End
          </p>
        </div>

        {/* Right column: Editorial narrative and craft pillars */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-[#7A3A18]">
              East End Culinary Heritage
            </p>
            <h2
              id="story-heading"
              className="mt-3 font-serif text-[clamp(2rem,3.4vw,3.1rem)] font-normal leading-[1.12] tracking-[-0.01em] text-[#141312] [text-wrap:balance]"
            >
              A quiet coastal drive, rewarded by real wood smoke and home-cooked island food.
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-[1.72] text-[#423E3A] max-w-[64ch]">
              <p>
                Far from the bustle of George Town and Seven Mile Beach, Big Tree BBQ
                lives in the unhurried rhythm of East End. What began as family cooking
                shared from a front yard beneath a sprawling tropical shade tree has
                become one of Grand Cayman&apos;s most treasured culinary stops.
              </p>
              <p>
                Every plate brings together two traditions side by side: slow-tended
                barbecue ribs, smoked brisket, and flame-kissed jerk chicken alongside
                deeply rooted Caymanian dishes—Cayman-style beef, braised oxtail, seasonal
                spiny lobster, and Sunday pots of stewed conch.
              </p>
            </div>

            {/* Clean editorial numbered pillars separated by hairlines */}
            <ol className="mt-10 divide-y divide-[#E4E1DA] border-t border-b border-[#E4E1DA]">
              {CRAFT_PILLARS.map((pillar) => (
                <li
                  key={pillar.index}
                  className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-4 flex items-baseline gap-2.5">
                    <span className="font-serif text-lg text-[#7A3A18] tabular-nums">
                      {pillar.index}
                    </span>
                    <h3 className="text-sm font-semibold text-[#141312]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-8 text-sm leading-[1.65] text-[#4A4641]">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Adjacent guest impressions — claim-to-proof adjacency without pill spam */}
          <div className="mt-12 grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2">
            {GUEST_REFLECTIONS.map((reflection) => (
              <figure key={reflection.author} className="space-y-3">
                <blockquote className="font-serif text-lg italic leading-[1.55] text-[#141312]">
                  &ldquo;{reflection.quote}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-[#59544E]">
                  <span className="font-medium text-[#141312]">
                    {reflection.author}
                  </span>
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  <span>{reflection.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
