import { SiteHeader } from '@/components/SiteHeader';
import { HeroSection } from '@/components/HeroSection';
import { StorySection } from '@/components/StorySection';
import { MenuSection } from '@/components/MenuSection';
import { GallerySection } from '@/components/GallerySection';
import { VisitSection } from '@/components/VisitSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#141312]">
      {/* Accessible skip link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#141312] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#F7F6F2]"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <StorySection />
        <MenuSection />
        <GallerySection />
        <VisitSection />
      </main>

      <SiteFooter />
    </div>
  );
}
