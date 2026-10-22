import React, { useState, useEffect } from 'react';
import { ProcessStage, SectionMeta } from '../types';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  GitMerge,
} from 'lucide-react';

interface CsdProcessSectionProps {
  section: SectionMeta;
  stages: ProcessStage[];
  onOpenMapGuide?: () => void;
}

export const CsdProcessSection: React.FC<CsdProcessSectionProps> = ({
  section,
  stages,
  onOpenMapGuide,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[0];

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

  const handlePrevStage = () => {
    setSelectedStageId((prev) => (prev > 1 ? prev - 1 : stages.length));
  };

  const handleNextStage = () => {
    setSelectedStageId((prev) => (prev < stages.length ? prev + 1 : 1));
  };

  return (
    <section id="csd-process" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* 1. Concise Section Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              04 · Operational Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              From Opportunity to Outcome
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Follow the operational stages that support placement coordination.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-xs text-[#5F6876] bg-[#F8F9FA] px-3 py-1 rounded-xs border border-[#E2E5EB]">
              <span>Workflow: </span>
              <span className="text-[#1E40AF] font-medium">8 stages</span>
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

        {/* 2. Interactive Operational Stages (BEFORE THE MAP!) */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#5F6876]">
            <span>Workflow progression (Stage {activeStage.id} of {stages.length})</span>
            <span>Select a stage or use arrow controls</span>
          </div>

          {/* Stepper Stage Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {stages.map((st) => {
              const isSelected = selectedStageId === st.id;
              const isPast = st.id < selectedStageId;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageId(st.id)}
                  className={`p-2.5 rounded-xs border text-left transition-colors cursor-pointer flex flex-col justify-between min-h-[72px] ${
                    isSelected
                      ? 'bg-[#1E40AF] text-[#FFFFFF] border-[#1E40AF] shadow-2xs'
                      : isPast
                      ? 'bg-[#F0F4FF] text-[#16181D] border-[#E5EDFF] hover:bg-[#FFFFFF]'
                      : 'bg-[#F8F9FA] text-[#16181D] border-[#E2E5EB] hover:bg-[#FFFFFF]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`text-[10px] font-medium ${isSelected ? 'text-[#DCE6FF]' : 'text-[#5F6876]'}`}>
                    0{st.id}
                  </span>
                  <span className="text-xs font-medium leading-snug line-clamp-2 mt-1">
                    {st.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Connected Stage Detail Card */}
          <div className="p-5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E5EB] pb-3 gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-[#1E40AF] text-[#FFFFFF]">
                  Stage 0{activeStage.id}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#16181D]">
                  {activeStage.title}
                </h3>
              </div>

              {/* Prev / Next Stepper Controls */}
              <div className="flex items-center gap-1 self-start sm:self-auto">
                <button
                  onClick={handlePrevStage}
                  className="px-2 py-1 rounded-xs border border-[#E2E5EB] bg-[#FFFFFF] hover:bg-[#F0F4FF] text-xs text-[#16181D] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Previous stage"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNextStage}
                  className="px-2 py-1 rounded-xs border border-[#E2E5EB] bg-[#FFFFFF] hover:bg-[#F0F4FF] text-xs text-[#16181D] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Next stage"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Purpose */}
              <div className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-1">
                <span className="text-[11px] font-medium text-[#5F6876] block">
                  Stage purpose
                </span>
                <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
                  {activeStage.purpose}
                </p>
              </div>

              {/* Documented Handoff */}
              <div className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-1">
                <span className="text-[11px] font-medium text-[#1E40AF] flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  <span>Documented operational handoff</span>
                </span>
                <p className="text-xs text-[#1E40AF] bg-[#F0F4FF] p-2 rounded-xs border border-[#E5EDFF] font-medium">
                  {activeStage.handoff}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Full-Width Operational Process Map Visual Card */}
        <div className="border border-[#E2E5EB] rounded-xs bg-[#FFFFFF] overflow-hidden">
          
          {/* Top Label & Actions Bar */}
          <div className="flex items-center justify-between border-b border-[#E2E5EB] bg-[#F8F9FA] px-4 sm:px-6 py-2.5 text-xs text-[#5F6876]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
              <span className="font-medium text-[#16181D]">
                Figure 5.1 · CSD Operational Process Map
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/assets/process-map.png"
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
                <p className="text-xs text-[#DC2626] mb-2">Unable to load the process map visual.</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHasError(false);
                    setImgKey((k) => k + 1);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F0F4FF] text-[#1E40AF] border border-[#E5EDFF] rounded-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload</span>
                </button>
              </div>
            ) : (
              <img
                key={imgKey}
                src="/assets/process-map.png"
                alt="CSD Operational Process Map — Workflow from company relationship to student joining"
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

          {/* 4. Short Editorial Caption Bar */}
          <div className="border-t border-[#E2E5EB] bg-[#F8F9FA] px-4 sm:px-6 py-2.5 text-xs text-[#5F6876]">
            <span>
              Identifies the operational sequence and communication touchpoints across CSD Director, Senior Manager, Executive, Academic Departments, Companies, and Students.
            </span>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-[#16181D]/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="CSD Operational Process Map Full View"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#FFFFFF] border-b border-[#E2E5EB] shrink-0">
            <div className="font-serif text-base text-[#16181D]">
              CSD Operational Process Map — Full Diagram
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/assets/process-map.png"
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
                src="/assets/process-map.png"
                alt="CSD Operational Process Map Full View"
                className="max-w-[95vw] h-auto object-contain bg-[#FFFFFF] rounded-xs shadow-xl p-4"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
