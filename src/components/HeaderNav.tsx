import React, { useState, useEffect } from 'react';
import { SectionMeta } from '../types';
import {
  Menu,
  X,
  Compass,
  Users,
  Layers,
  Briefcase,
  GitMerge,
  Users2,
  Wrench,
  MessageSquare,
  Milestone,
  HelpCircle,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface HeaderNavProps {
  sections: SectionMeta[];
  completedCount: number;
  totalChecklist: number;
  onOpenMapGuide: () => void;
  onNavigate?: (id: string) => void;
}

interface NavItemDef {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  num: string;
}

const navItems: NavItemDef[] = [
  { id: 'welcome', label: 'Overview', shortLabel: 'Overview', icon: Compass, num: '01' },
  { id: 'actors-map', label: 'Actors Map & People', shortLabel: 'Actors Map', icon: Users, num: '02' },
  { id: 'ecosystem', label: 'CSD Ecosystem Map', shortLabel: 'Ecosystem Map', icon: Layers, num: '03' },
  { id: 'csd-process', label: 'From Opportunity to Outcome', shortLabel: 'Operational Stages', icon: GitMerge, num: '04' },
  { id: 'stakeholders', label: 'Working with Stakeholders', shortLabel: 'Stakeholders', icon: Users2, num: '05' },
  { id: 'information-tools', label: 'Information & Tools', shortLabel: 'Information & Tools', icon: Wrench, num: '06' },
  { id: 'communication', label: 'Communication Protocols', shortLabel: 'Communication', icon: MessageSquare, num: '07' },
  { id: 'student-journey', label: 'Student Placement Journey', shortLabel: 'Student Journey', icon: Milestone, num: '08' },
  { id: 'scenario-simulator', label: 'What Would You Do?', shortLabel: 'Scenarios', icon: HelpCircle, num: '09' },
  { id: 'first-week', label: 'First-Week Checklist', shortLabel: 'Orientation Checklist', icon: CheckSquare, num: '10' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  sections,
  completedCount,
  totalChecklist,
  onOpenMapGuide,
  onNavigate,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('welcome');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Keyboard navigation & body scroll lock for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileDrawerOpen(false);
      }
    };
    if (mobileDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [mobileDrawerOpen]);

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }

      // Detect active section
      const scrollPos = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const sec = document.getElementById(navItems[i].id);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileDrawerOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -64 : -24;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const activeItem = navItems.find((n) => n.id === activeSection) || navItems[0];
  const checklistPercentage = Math.round((completedCount / totalChecklist) * 100);

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* MOBILE & TABLET COMPACT TOP BAR (< lg)                         */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E2E5EB] shadow-2xs">
        {/* Understated Top Progress Line */}
        <div 
          className="h-[2px] bg-[#E2E5EB]/40 w-full overflow-hidden" 
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[#1E40AF] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo('welcome')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <span className="w-7 h-7 rounded-xs bg-[#1E40AF] text-[#FFFFFF] font-serif font-bold text-xs flex items-center justify-center">
              CSD
            </span>
            <div>
              <span className="font-serif font-medium text-sm text-[#16181D] tracking-tight block leading-tight">
                CSD Onboarding
              </span>
              <span className="text-[11px] text-[#5F6876] block">
                {activeItem.num} · {activeItem.shortLabel}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('first-week')}
              className="text-xs text-[#1E40AF] bg-[#F0F4FF] px-2.5 py-1 rounded-xs border border-[#E5EDFF] flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>{completedCount}/{totalChecklist}</span>
            </button>

            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 rounded-xs border border-[#E2E5EB] hover:bg-[#F8F9FA] text-[#16181D] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
              aria-expanded={mobileDrawerOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE SLIDE-OUT DRAWER OVERLAY (< lg)                         */}
      {/* ------------------------------------------------------------- */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-[#16181D]/50 transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div 
            className="relative w-full max-w-xs sm:max-w-sm bg-[#FFFFFF] border-r border-[#E2E5EB] flex flex-col h-full shadow-xl z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="p-4 border-b border-[#E2E5EB] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xs bg-[#1E40AF] text-[#FFFFFF] font-serif font-bold text-xs flex items-center justify-center">
                  CSD
                </span>
                <div>
                  <span className="font-serif font-medium text-sm text-[#16181D]">
                    Navigation
                  </span>
                  <span className="text-[11px] text-[#5F6876] block">
                    11 Sections
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-xs hover:bg-[#F8F9FA] text-[#5F6876] hover:text-[#16181D] transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xs text-left text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F0F4FF] text-[#1E40AF] font-medium border-l-2 border-[#1E40AF]'
                        : 'text-[#5F6876] hover:text-[#16181D] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#1E40AF]' : 'text-[#5F6876]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span className="text-[11px] opacity-60 ml-2 shrink-0">{item.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-[#E2E5EB] bg-[#F8F9FA] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#5F6876]">Checklist progress</span>
                <span className="text-[11px] font-medium text-[#1E40AF]">{checklistPercentage}%</span>
              </div>
              <div className="w-full bg-[#E2E5EB] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#1E40AF] h-full transition-all duration-300" 
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>
              <button
                onClick={() => scrollTo('first-week')}
                className="w-full py-2 px-3 rounded-xs bg-[#1E40AF] hover:bg-[#1e3a8a] text-[#FFFFFF] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Checklist ({completedCount}/{totalChecklist})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DESKTOP FIXED LEFT-SIDE NAVIGATION RAIL (lg:flex)              */}
      {/* ------------------------------------------------------------- */}
      <aside 
        className="hidden lg:flex fixed top-0 bottom-0 left-0 w-64 bg-[#FFFFFF] border-r border-[#E2E5EB] flex-col z-30 select-none"
        aria-label="Desktop Navigation Rail"
      >
        {/* Top Rail Header: Identity & System Status */}
        <div className="p-5 border-b border-[#E2E5EB] shrink-0 bg-[#FFFFFF]">
          <button
            onClick={() => scrollTo('welcome')}
            className="w-full flex items-start gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-xs bg-[#1E40AF] text-[#FFFFFF] font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#1e3a8a] transition-colors">
              CSD
            </div>
            <div className="min-w-0">
              <span className="font-serif font-semibold text-base text-[#16181D] tracking-tight block leading-snug group-hover:text-[#1E40AF] transition-colors">
                CSD Onboarding
              </span>
              <span className="text-[11px] text-[#5F6876] block">
                Career Services Department
              </span>
            </div>
          </button>

          {/* Understated Reading Progress Meter */}
          <div className="mt-4 pt-3 border-t border-[#E2E5EB]">
            <div className="flex items-center justify-between text-[11px] text-[#5F6876] mb-1.5">
              <span>Reading progress</span>
              <span className="text-[#1E40AF] font-medium">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full bg-[#E2E5EB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#1E40AF] h-full transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Item Links (Scrollable if height constrained) */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5" aria-label="Section navigation">
          <div className="px-2.5 py-1 text-[11px] text-[#5F6876] font-medium">
            Sections (11)
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full group flex items-center justify-between px-2.5 py-2 rounded-xs text-left text-xs transition-colors cursor-pointer relative ${
                  isActive
                    ? 'bg-[#F0F4FF] text-[#1E40AF] font-medium border-l-2 border-[#1E40AF]'
                    : 'text-[#5F6876] hover:text-[#16181D] hover:bg-[#F8F9FA]'
                }`}
                aria-current={isActive ? 'true' : undefined}
                title={item.label}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? 'text-[#1E40AF]' : 'text-[#5F6876] group-hover:text-[#16181D]'
                    }`}
                  />
                  <span className="truncate">{item.shortLabel}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[11px] transition-colors ${isActive ? 'text-[#1E40AF]' : 'text-[#8E95A2]'}`}>
                    {item.num}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 text-[#1E40AF]" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Rail Actions: Orientation Checklist Progress */}
        <div className="p-3.5 border-t border-[#E2E5EB] bg-[#F8F9FA] shrink-0 space-y-2.5">
          <div className="p-2.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#16181D] font-medium flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-[#1E40AF]" />
                <span>Checklist</span>
              </span>
              <span className="text-[11px] text-[#1E40AF] font-medium">
                {completedCount}/{totalChecklist}
              </span>
            </div>
            <div className="w-full bg-[#E2E5EB] h-1 rounded-full overflow-hidden mb-2">
              <div
                className="bg-[#1E40AF] h-full transition-all duration-300"
                style={{ width: `${checklistPercentage}%` }}
              />
            </div>
            <button
              onClick={() => scrollTo('first-week')}
              className="w-full py-1.5 px-2 rounded-xs bg-[#F0F4FF] hover:bg-[#E5EDFF] text-[#1E40AF] text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>{completedCount === totalChecklist ? 'Checklist Completed' : 'First-Week Checklist'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={onOpenMapGuide}
            className="w-full py-1 px-2 rounded-xs text-[11px] text-[#5F6876] hover:text-[#1E40AF] hover:bg-[#F8F9FA] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect Map Assets Verification Status"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E40AF]" />
            <span>Map assets protocol</span>
          </button>
        </div>
      </aside>
    </>
  );
};
