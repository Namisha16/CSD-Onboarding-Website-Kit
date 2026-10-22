import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { SectionMeta } from '../types';

interface FooterProps {
  message?: string;
  note?: string;
  sections?: SectionMeta[];
  onOpenMapGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMapGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -64 : -24;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E2E5EB] py-6 sm:py-8 text-[#697386]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Small CSD identifier & closing student-centred statement */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-5 h-5 rounded-xs bg-[#1E40AF] text-[#FFFFFF] font-serif text-[10px] font-bold flex items-center justify-center">
              CSD
            </span>
            <span className="font-serif text-xs font-semibold text-[#16181D]">
              Career Services Department
            </span>
          </div>
          <span className="hidden sm:inline text-[#E2E5EB]">·</span>
          <p className="text-xs text-[#697386] font-normal">
            Supporting the student placement experience through clearer coordination and transparent information.
          </p>
        </div>

        {/* Right: Compact Quick Links & Back to Top */}
        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <button
            onClick={() => scrollTo('actors-map')}
            className="hover:text-[#1E40AF] transition-colors cursor-pointer"
          >
            Actors
          </button>
          <button
            onClick={() => scrollTo('ecosystem')}
            className="hover:text-[#1E40AF] transition-colors cursor-pointer"
          >
            Ecosystem
          </button>
          <button
            onClick={() => scrollTo('csd-process')}
            className="hover:text-[#1E40AF] transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollTo('student-journey')}
            className="hover:text-[#1E40AF] transition-colors cursor-pointer"
          >
            Journey
          </button>
          <button
            onClick={() => scrollTo('first-week')}
            className="hover:text-[#1E40AF] transition-colors cursor-pointer"
          >
            Orientation
          </button>

          <span className="text-[#E2E5EB]">|</span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#F7F7F5] hover:bg-[#EAF0FF] text-[#16181D] hover:text-[#1E40AF] border border-[#E2E5EB] hover:border-[#DCE6FF] transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3 text-[#1E40AF]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
