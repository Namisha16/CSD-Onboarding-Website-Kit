import React, { useState, useEffect } from 'react';
import { Actor, ActorMap, SectionMeta } from '../types';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  ExternalLink,
  RefreshCw,
  Eye,
} from 'lucide-react';

interface EcosystemSectionProps {
  section: SectionMeta;
  actors: Actor[];
  actorMap: ActorMap;
  onSelectRole?: (actorId: string) => void;
  onOpenMapGuide?: () => void;
}

interface EcosystemTier {
  id: string;
  level: string;
  title: string;
  focus: string;
  participants: string[];
  responsibilities: string;
  coordinationBoundary: string;
}

const verifiedEcosystemTiers: EcosystemTier[] = [
  {
    id: 'tier-1',
    level: 'Core Tier 01',
    title: 'Students & Faculty Mentors',
    focus: 'Student placement readiness, portfolio development, and interview preparation.',
    participants: ['Students', 'Faculty / Mentors'],
    responsibilities: 'Maintaining up-to-date portfolios, submitting preferences, and receiving constructive project feedback before company interaction.',
    coordinationBoundary: 'Mentorship is focused on technical craft and portfolio quality, not formal administrative placement policies.',
  },
  {
    id: 'tier-2',
    level: 'Academic Tier 02',
    title: 'Departmental Leadership & SPOCs',
    focus: 'Cohort academic context, curriculum alignment, and communication bridging.',
    participants: ['SPOCs (Single Points of Contact)', 'Heads of Department (HODs)'],
    responsibilities: 'Aligning recruitment timing with academic schedules, validating candidate suitability, and assisting CSD in cohort communication.',
    coordinationBoundary: 'Confirm specific departmental decision-making protocols and SPOC communication routes with CSD.',
  },
  {
    id: 'tier-3',
    level: 'Operational Core 03',
    title: 'Career Services Department (CSD)',
    focus: 'Central coordination hub connecting internal academia with external employers.',
    participants: ['CSD Director', 'CSD Senior Manager', 'CSD Executive / Team'],
    responsibilities: 'Employer outreach, receiving job descriptions, matching candidate criteria, scheduling selection processes, and documenting outcomes.',
    coordinationBoundary: 'CSD serves as the authoritative communication channel between employers and student candidates.',
  },
  {
    id: 'tier-4',
    level: 'Institutional Tier 04',
    title: 'Placement Leadership & Governance',
    focus: 'Institutional policy, cross-departmental coordination, and placement governance.',
    participants: ['Placement Leadership', 'University Administration'],
    responsibilities: 'Providing overarching institutional policy guidance and reviewing overall department performance.',
    coordinationBoundary: 'Oversight role; specific duties require confirmation; do not infer unverified formal authority.',
  },
  {
    id: 'tier-5',
    level: 'Industry Tier 05',
    title: 'Recruiting Organizations & Companies',
    focus: 'Opportunity provision, technical evaluation, and professional talent acquisition.',
    participants: ['Recruiters', 'Design Studios', 'Corporate Hiring Managers'],
    responsibilities: 'Sharing comprehensive job descriptions, conducting portfolio shortlisting, testing, interviews, and extending verified offers.',
    coordinationBoundary: 'All recruitment engagements route through CSD to ensure equitable student opportunity access.',
  },
];

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  section,
  actors,
  onSelectRole,
  onOpenMapGuide,
}) => {
  const [activeTierId, setActiveTierId] = useState<string>('tier-3');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  const activeTier = verifiedEcosystemTiers.find((t) => t.id === activeTierId) || verifiedEcosystemTiers[2];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <section id="ecosystem" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              03 · CSD Ecosystem Map
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              Inside the CSD Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              See how the wider system connects people, information and opportunities.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#1E40AF] bg-[#FFFFFF] px-3 py-1 rounded-xs border border-[#E2E5EB]">
              <Layers className="w-3.5 h-3.5" />
              <span>Concentric architecture</span>
            </div>

            {onOpenMapGuide && (
              <button
                onClick={onOpenMapGuide}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#5F6876] hover:text-[#1E40AF] px-2.5 py-1 rounded-xs border border-[#E2E5EB] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                title="View Map Assets Protocol"
              >
                <span>Asset protocol</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. Visual Ecosystem Map Card */}
        <div className="mb-8 border border-[#E2E5EB] rounded-xs bg-[#FFFFFF] overflow-hidden">
          {/* Top Label & Actions Bar */}
          <div className="flex items-center justify-between border-b border-[#E2E5EB] bg-[#F8F9FA] px-4 sm:px-6 py-2.5 text-xs text-[#5F6876]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
              <span className="font-medium text-[#16181D]">
                Figure 4.1 · CSD Ecosystem Map
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/assets/ecosystem-map.png"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1 text-[#5F6876] hover:text-[#16181D] text-xs py-0.5 px-2 rounded-xs hover:bg-[#EAEAEA] transition-colors"
                title="Open image directly in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open in tab</span>
              </a>

              <button
                onClick={() => {
                  setZoomLevel(1);
                  setIsLightboxOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-[#1E40AF] hover:text-[#1e3a8a] font-medium transition-colors cursor-pointer py-0.5 px-2 rounded-xs hover:bg-[#F0F4FF]"
                title="Expand full high-resolution diagram"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>
            </div>
          </div>

          {/* Main Visual Display */}
          <div
            onClick={() => {
              if (!hasError) {
                setZoomLevel(1);
                setIsLightboxOpen(true);
              }
            }}
            className="relative w-full bg-[#FFFFFF] p-4 sm:p-6 lg:p-8 flex items-center justify-center cursor-zoom-in group min-h-[300px]"
          >
            {hasError ? (
              <div className="text-center py-10 px-4">
                <p className="text-xs text-[#DC2626] mb-2">Unable to load the ecosystem map visual.</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasError(false);
                    setImgKey((k) => k + 1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F0F4FF] text-[#1E40AF] border border-[#E5EDFF] rounded-xs cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reload</span>
                </button>
              </div>
            ) : (
              <img
                key={imgKey}
                src="/assets/ecosystem-map.png"
                alt="CSD Ecosystem Map — Concentric architecture of students, university level, design education ecosystem, and external influences"
                className="w-full h-auto block object-contain max-h-[80vh]"
                loading="eager"
                onError={() => setHasError(true)}
              />
            )}

            {!hasError && (
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="inline-flex items-center gap-1 text-xs text-[#1E40AF] bg-[#FFFFFF] border border-[#E2E5EB] px-2.5 py-1 rounded-xs shadow-2xs">
                  <ZoomIn className="w-3 h-3" />
                  Click to zoom
                </span>
              </div>
            )}
          </div>

          {/* Editorial Caption Bar */}
          <div className="border-t border-[#E2E5EB] bg-[#F8F9FA] px-4 sm:px-6 py-2.5 text-xs text-[#5F6876]">
            <span>
              Concentric tiers of the design education ecosystem — core students and mentors, university leadership, recruiting companies, and institutional policies.
            </span>
          </div>
        </div>

        {/* 2. Concentric Tiers Explorer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#5F6876]">
            <span>Architecture layers ({verifiedEcosystemTiers.length} verified tiers)</span>
            <span>Select to inspect coordination boundaries</span>
          </div>

          {/* Tier Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {verifiedEcosystemTiers.map((tier) => {
              const isSelected = activeTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`p-2.5 rounded-xs border text-left transition-colors cursor-pointer flex flex-col justify-between min-h-[64px] ${
                    isSelected
                      ? 'bg-[#1E40AF] text-[#FFFFFF] border-[#1E40AF] shadow-2xs'
                      : 'bg-[#FFFFFF] text-[#16181D] border-[#E2E5EB] hover:bg-[#F8F9FA]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`text-[10px] font-medium block ${isSelected ? 'text-[#DCE6FF]' : 'text-[#5F6876]'}`}>
                    {tier.level}
                  </span>
                  <span className="text-xs font-medium leading-snug line-clamp-2 mt-1">
                    {tier.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Contextual Panel */}
          <div className="p-5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E2E5EB] pb-3 gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-[#1E40AF] text-[#FFFFFF]">
                  {activeTier.level}
                </span>
                <h4 className="font-serif text-lg sm:text-xl text-[#16181D]">
                  {activeTier.title}
                </h4>
              </div>
              <span className="text-xs text-[#5F6876]">
                Scope: {activeTier.focus}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-1.5">
                <span className="text-xs font-medium text-[#1E40AF] block">
                  Participating stakeholders
                </span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {activeTier.participants.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] text-[#16181D]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-1.5">
                <span className="text-xs font-medium text-[#16181D] block">
                  Core responsibilities
                </span>
                <p className="text-[#16181D] leading-relaxed">
                  {activeTier.responsibilities}
                </p>
              </div>

              <div className="p-3.5 rounded-xs bg-[#F0F4FF] border border-[#E5EDFF] space-y-1.5">
                <span className="text-xs font-medium text-[#1E40AF] block">
                  Coordination boundary
                </span>
                <p className="text-[#16181D] leading-relaxed">
                  {activeTier.coordinationBoundary}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-[#16181D]/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="CSD Ecosystem Map Full View"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#FFFFFF] border-b border-[#E2E5EB] shrink-0">
            <div className="font-serif text-base text-[#16181D]">
              CSD Ecosystem Map — Full Diagram
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/assets/ecosystem-map.png"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#5F6876] hover:text-[#16181D] px-2.5 py-1 rounded-xs border border-[#E2E5EB]"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open in tab</span>
              </a>

              <div className="flex items-center border border-[#E2E5EB] rounded-xs bg-[#FFFFFF] text-xs">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.75}
                  className="p-1.5 hover:bg-[#F8F9FA] text-[#16181D] disabled:opacity-40"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 py-1 text-[11px] text-[#5F6876] border-x border-[#E2E5EB]">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3.5}
                  className="p-1.5 hover:bg-[#F8F9FA] text-[#16181D] disabled:opacity-40"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 hover:bg-[#F8F9FA] text-[#1E40AF] border-l border-[#E2E5EB]"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xs bg-[#F8F9FA] hover:bg-[#E2E5EB] text-[#16181D]"
                title="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center">
            <div style={{ transform: `scale(${zoomLevel})` }} className="transition-transform duration-150 origin-center">
              <img
                src="/assets/ecosystem-map.png"
                alt="CSD Ecosystem Map Full View"
                className="max-w-[95vw] h-auto object-contain bg-[#FFFFFF] rounded-xs shadow-xl p-4"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
