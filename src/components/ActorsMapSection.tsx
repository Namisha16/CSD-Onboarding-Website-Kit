import React, { useState, useEffect } from 'react';
import { SectionMeta } from '../types';
import {
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Link2,
  HelpCircle,
} from 'lucide-react';

interface ActorsMapSectionProps {
  section: SectionMeta;
  onOpenMapGuide?: () => void;
  onSelectRole?: (actorId: string) => void;
}

export interface InteractiveActorDetail {
  id: string;
  name: string;
  role: string;
  tagline: string;
  keyResponsibilities: string[];
  coordinationNeeds: string[];
  verifiedInteractions: string[];
  operationalBoundary: string;
}

export const verifiedActorsList: InteractiveActorDetail[] = [
  {
    id: 'csd',
    name: 'CSD Team',
    role: 'Central Placement Coordination Hub',
    tagline: 'Coordinates placement activities, opportunity communication, student information and follow-through.',
    keyResponsibilities: [
      'Coordinate placement activities and company communication',
      'Collect and maintain relevant student and opportunity information',
      'Support matching, application coordination, updates and outcome records',
    ],
    coordinationNeeds: [
      'Accurate student profiles, preferences, and portfolio links from students and SPOCs',
      'Timely job descriptions, role criteria, and evaluation outcomes from recruiting companies',
      'Academic context and candidate suitability input from HODs',
    ],
    verifiedInteractions: ['Students', 'SPOCs', 'HODs', 'Companies / Recruiters', 'Placement Leadership'],
    operationalBoundary: 'Confirms current ownership, procedures, and approval points with departmental leadership.',
  },
  {
    id: 'students',
    name: 'Students',
    role: 'Primary Placement Beneficiaries',
    tagline: 'Provide accurate profiles and preferences, review opportunities, apply and participate in selection.',
    keyResponsibilities: [
      'Maintain accurate profile, CV and portfolio information',
      'Share preferences and availability as requested',
      'Review opportunities and complete application or selection steps',
    ],
    coordinationNeeds: [
      'Transparent role requirements, eligibility criteria, and submission deadlines',
      'Timely status updates during evaluation to reduce uncertainty',
      'Clear joining instructions and direct point of contact upon offer confirmation',
    ],
    verifiedInteractions: ['CSD Team', 'Faculty / Mentors', 'SPOCs'],
    operationalBoundary: 'Follow current official instructions for deadlines and submission guidelines.',
  },
  {
    id: 'spocs',
    name: 'SPOCs (Single Points of Contact)',
    role: 'Academic Cohort Liaison',
    tagline: 'Connect CSD with students and academic context, and support information collection and candidate identification.',
    keyResponsibilities: [
      'Connect CSD with students and academic context',
      'Support information collection across student cohorts',
      'Help identify potentially suitable candidates',
    ],
    coordinationNeeds: [
      'Advance notice of upcoming recruitment cycles and employer briefings',
      'Structured communication routes to relay to student cohorts',
    ],
    verifiedInteractions: ['CSD Team', 'Students', 'HODs'],
    operationalBoundary: 'Confirm current SPOC remit and communication protocols directly with CSD.',
  },
  {
    id: 'hods',
    name: 'HODs (Heads of Department)',
    role: 'Academic Discipline Leadership',
    tagline: 'Provide programme context and help assess academic fit and suitability.',
    keyResponsibilities: [
      'Provide programme context and curriculum alignment',
      'Help clarify academic fit and suitability where relevant',
    ],
    coordinationNeeds: [
      'Recruitment activity summaries across departmental disciplines',
      'Employer feedback to inform student preparation and curriculum alignment',
    ],
    verifiedInteractions: ['CSD Team', 'SPOCs'],
    operationalBoundary: 'Confirm specific decision-making and approval responsibilities with the department.',
  },
  {
    id: 'faculty',
    name: 'Faculty / Mentors',
    role: 'Craft & Project Readiness Mentors',
    tagline: 'Support student readiness through portfolio, skills and project guidance.',
    keyResponsibilities: [
      'Support portfolio and skills development',
      'Help students reflect on project experience and readiness',
    ],
    coordinationNeeds: [
      'Clarity on current industry competency standards and employer expectations',
      'Notice of upcoming technical assignment evaluation windows',
    ],
    verifiedInteractions: ['Students'],
    operationalBoundary: 'General academic mentorship role, not a formal selection policy.',
  },
  {
    id: 'companies',
    name: 'Companies / Recruiters',
    role: 'External Hiring Partners',
    tagline: 'Share role requirements and participate in shortlisting, selection and outcome communication.',
    keyResponsibilities: [
      'Share job descriptions and role requirements',
      'Participate in shortlisting and selection',
      'Communicate selection outcomes through the agreed contact',
    ],
    coordinationNeeds: [
      'Consolidated candidate packages with verified student information',
      'Reliable single coordination channel for interview schedules and evaluations',
    ],
    verifiedInteractions: ['CSD Team'],
    operationalBoundary: 'Do not imply a company response time unless documented in writing.',
  },
  {
    id: 'leadership',
    name: 'Placement Leadership',
    role: 'Institutional Governance & Oversight',
    tagline: 'Provides oversight and coordination where applicable across institutional placement policies.',
    keyResponsibilities: [
      'Provide oversight and coordination where applicable across placement policies',
    ],
    coordinationNeeds: [
      'Periodic placement metrics, sector hiring trends, and operational summaries',
    ],
    verifiedInteractions: ['CSD Team'],
    operationalBoundary: 'Specific duties require confirmation; do not infer unverified formal authority.',
  },
];

export const ActorsMapSection: React.FC<ActorsMapSectionProps> = ({
  section,
  onOpenMapGuide,
}) => {
  const [selectedActorId, setSelectedActorId] = useState<string>('csd');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  const activeActor = verifiedActorsList.find((a) => a.id === selectedActorId) || verifiedActorsList[0];

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

  const imageSrc = '/assets/actors-map.png';

  return (
    <section id="actors-map" className="relative py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#FFFFFF]">
      {/* Anchor for backward compatibility */}
      <div id="people" className="absolute -top-16 pointer-events-none" />
      <div id="roles" className="absolute -top-16 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header with "The People Behind the Placement Journey" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              {section.number ? `${section.number} · ` : '02 · '}Actors Map
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              The People Behind the Placement Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Explore who is involved in the CSD system, their key responsibilities, and how they connect.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#1E40AF] bg-[#F0F4FF] px-3 py-1 rounded-xs border border-[#E5EDFF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Alumni excluded from network</span>
            </div>

            {onOpenMapGuide && (
              <button
                onClick={onOpenMapGuide}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#5F6876] hover:text-[#1E40AF] px-2.5 py-1 rounded-xs border border-[#E2E5EB] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                title="View Map Assets Protocol"
              >
                <span>Asset protocol</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. System Participants Interactive Selector */}
        <div className="mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5F6876]">
            <span>System participants ({verifiedActorsList.length})</span>
            <span>Select to inspect key responsibilities & interactions</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {verifiedActorsList.map((actor, idx) => {
              const isSelected = selectedActorId === actor.id;
              return (
                <button
                  key={actor.id}
                  onClick={() => setSelectedActorId(actor.id)}
                  className={`p-2.5 rounded-xs border text-left transition-colors cursor-pointer flex flex-col justify-between min-h-[64px] ${
                    isSelected
                      ? 'bg-[#1E40AF] text-[#FFFFFF] border-[#1E40AF] shadow-2xs'
                      : 'bg-[#F8F9FA] text-[#16181D] border-[#E2E5EB] hover:bg-[#FFFFFF]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`text-[10px] font-medium ${isSelected ? 'text-[#DCE6FF]' : 'text-[#5F6876]'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-medium leading-tight mt-1 truncate">
                    {actor.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Connected Actor Information Panel (Key Responsibilities & Coordination Needs) */}
        <div className="mb-8 p-5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E2E5EB] pb-3 gap-2">
            <div className="flex items-baseline gap-2.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-[#1E40AF] text-[#FFFFFF]">
                {activeActor.id.toUpperCase()}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-[#16181D]">
                {activeActor.name}
              </h3>
              <span className="text-xs text-[#5F6876]">
                · {activeActor.role}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
            {activeActor.tagline}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
            {/* Key Responsibilities */}
            <div className="lg:col-span-7 p-4 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-2.5">
              <span className="text-xs font-medium text-[#1E40AF] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Key responsibilities ({activeActor.keyResponsibilities.length})</span>
              </span>
              <ul className="space-y-2">
                {activeActor.keyResponsibilities.map((resp, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[#16181D] flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#1E40AF] font-bold text-sm leading-none mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Interactions & Coordination Needs */}
            <div className="lg:col-span-5 p-4 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-3">
              <div>
                <span className="text-xs font-medium text-[#1E40AF] flex items-center gap-1.5 mb-1.5">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Verified direct interactions</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeActor.verifiedInteractions.map((stakeholder, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-xs bg-[#F0F4FF] border border-[#E5EDFF] text-xs text-[#1E40AF]"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E5EB] space-y-1">
                <span className="text-xs font-medium text-[#5F6876] flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#1E40AF]" />
                  <span>Coordination needs:</span>
                </span>
                <ul className="space-y-1">
                  {activeActor.coordinationNeeds.map((need, i) => (
                    <li key={i} className="text-xs text-[#5F6876] flex items-start gap-1.5 leading-snug">
                      <span className="text-[#1E40AF]">·</span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11px] text-[#5F6876] pt-2 border-t border-[#E2E5EB] leading-relaxed">
                <strong className="text-[#16181D] font-medium mr-1">Boundary:</strong>
                {activeActor.operationalBoundary}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Actors Map Diagram — Under System Participants, Above Ecosystem Map */}
        <div className="border border-[#E2E5EB] rounded-xs bg-[#FFFFFF] overflow-hidden shadow-xs">
          
          {/* Top Label & Actions Bar */}
          <div className="flex items-center justify-between border-b border-[#E2E5EB] bg-[#F8F9FA] px-4 sm:px-6 py-2.5 text-xs text-[#5F6876]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
              <span className="font-medium text-[#16181D]">
                Figure 2.1 · Verified Actors Map
              </span>
              <span className="hidden sm:inline text-[#5F6876] text-[11px]">
                (2576 × 2025 high-resolution diagram)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1 text-[#5F6876] hover:text-[#16181D] text-xs py-0.5 px-2 rounded-xs hover:bg-[#EAEAEA] transition-colors"
                title="Open original image directly in new tab"
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
                title="Inspect in full-screen zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>
            </div>
          </div>

          {/* Main Visual Display — Preserves original image proportions without cropping or stretching */}
          <div 
            onClick={() => {
              if (!hasError) {
                setZoomLevel(1);
                setIsLightboxOpen(true);
              }
            }}
            className="relative w-full bg-[#FFFFFF] p-3 sm:p-6 lg:p-8 flex items-center justify-center cursor-zoom-in group min-h-[300px]"
          >
            {hasError ? (
              <div className="text-center py-10 px-4">
                <p className="text-xs text-[#DC2626] mb-2">Unable to load the actors map visual.</p>
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
                src={imageSrc}
                alt="CSD Actors Map — System participants and relationship structure"
                className="w-full h-auto max-h-[85vh] object-contain block mx-auto transition-transform duration-200"
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
          <div className="border-t border-[#E2E5EB] bg-[#F8F9FA] px-4 sm:px-6 py-2.5 text-xs text-[#5F6876] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              Identifies individual participants in the Career Services Department system, detailing roles and verified connections.
            </span>
            <span className="text-[11px] text-[#1E40AF] font-medium shrink-0">
              Interactive high-resolution inspection
            </span>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Full Resolution Pan and Zoom */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-[#16181D]/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Actors Map Full View"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#FFFFFF] border-b border-[#E2E5EB] shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base text-[#16181D]">
                Actors Map — Full Diagram Inspection
              </span>
              <span className="hidden sm:inline text-xs text-[#5F6876]">
                (Use zoom controls or scroll to examine node hierarchy)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={imageSrc}
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
                <span className="px-2 py-1 text-[11px] text-[#5F6876] border-x border-[#E2E5EB] min-w-[50px] text-center">
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
                className="p-1.5 rounded-xs bg-[#F8F9FA] hover:bg-[#E2E5EB] text-[#16181D] cursor-pointer"
                title="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center">
            <div 
              style={{ transform: `scale(${zoomLevel})` }} 
              className="transition-transform duration-150 origin-center max-w-full"
            >
              <img
                src={imageSrc}
                alt="CSD Actors Map Full View"
                className="max-w-[95vw] max-h-[85vh] object-contain bg-[#FFFFFF] rounded-xs shadow-xl p-2 sm:p-4"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
export default ActorsMapSection;
