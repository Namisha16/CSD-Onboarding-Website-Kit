import React from 'react';
import { ProjectInfo, SectionMeta } from '../types';
import { ArrowRight, ArrowDownRight } from 'lucide-react';

interface WelcomeSectionProps {
  project: ProjectInfo;
  section: SectionMeta;
  onExploreSystem: () => void;
  onStartOnboarding: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  project,
  section,
  onExploreSystem,
  onStartOnboarding,
}) => {
  return (
    <section id="welcome" className="relative py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#F8F9FA] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Metadata */}
        <div className="flex items-center justify-between border-b border-[#E2E5EB] pb-3 mb-8 text-xs text-[#5F6876]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF]" />
            <span className="font-medium text-[#16181D]">
              Career Services Department
            </span>
            <span className="text-[#E2E5EB]">·</span>
            <span>Onboarding Guide</span>
          </div>
          <span className="text-xs text-[#5F6876]">
            01
          </span>
        </div>

        {/* Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3">
              <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
                Service Architecture
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#16181D] leading-[1.15] tracking-tight">
                Understanding the system behind a student's{' '}
                <span className="italic text-[#1E40AF]">career journey.</span>
              </h1>
              
              <p className="text-xs sm:text-sm text-[#5F6876] font-normal leading-relaxed max-w-xl">
                A visual guide to CSD's stakeholder ecosystem, operational handoffs, and placement workflows.
              </p>
            </div>

            {/* Core Principle Callout */}
            <div className="pl-4 border-l-2 border-[#1E40AF] py-0.5 space-y-1">
              <p className="text-xs sm:text-sm font-serif italic text-[#16181D]">
                "{project.designPrinciple}"
              </p>
              <p className="text-xs text-[#5F6876]">
                Internal coordination directly shapes student clarity and confidence.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreSystem}
                className="px-4 py-2.5 rounded-xs bg-[#1E40AF] hover:bg-[#1e3a8a] text-[#FFFFFF] font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explore system participants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onStartOnboarding}
                className="px-4 py-2.5 rounded-xs bg-[#FFFFFF] hover:bg-[#F8F9FA] border border-[#E2E5EB] text-[#16181D] font-medium text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Orientation checklist</span>
                <ArrowDownRight className="w-3.5 h-3.5 text-[#2563EB]" />
              </button>
            </div>
          </div>

          {/* SVG Diagram Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFFFF] border border-[#E2E5EB] rounded-xs p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E5EB] text-xs text-[#5F6876]">
                <span>Service convergence</span>
                <span>Diagram 01</span>
              </div>

              {/* Minimal SVG Graphic */}
              <div className="py-2">
                <svg
                  viewBox="0 0 340 230"
                  className="w-full h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="CSD Triad Service Convergence"
                >
                  <circle cx="170" cy="115" r="76" stroke="#E2E5EB" strokeWidth="1" strokeDasharray="3 3" />
                  
                  <path d="M 60 55 L 170 115" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 2" />
                  <path d="M 280 55 L 170 115" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2" />
                  <path d="M 170 190 L 170 115" stroke="#1E40AF" strokeWidth="2" />

                  {/* Students */}
                  <g>
                    <rect x="25" y="38" width="75" height="34" rx="2" fill="#FFFFFF" stroke="#E2E5EB" />
                    <text x="62" y="54" textAnchor="middle" fill="#16181D" fontSize="10" fontFamily="Poppins" fontWeight="500">Students</text>
                    <text x="62" y="65" textAnchor="middle" fill="#5F6876" fontSize="7.5" fontFamily="Poppins">Talent</text>
                  </g>

                  {/* Academics */}
                  <g>
                    <rect x="240" y="38" width="80" height="34" rx="2" fill="#FFFFFF" stroke="#E2E5EB" />
                    <text x="280" y="54" textAnchor="middle" fill="#16181D" fontSize="10" fontFamily="Poppins" fontWeight="500">Academics</text>
                    <text x="280" y="65" textAnchor="middle" fill="#5F6876" fontSize="7.5" fontFamily="Poppins">HODs / SPOCs</text>
                  </g>

                  {/* Companies */}
                  <g>
                    <rect x="130" y="174" width="80" height="34" rx="2" fill="#FFFFFF" stroke="#E2E5EB" />
                    <text x="170" y="190" textAnchor="middle" fill="#16181D" fontSize="10" fontFamily="Poppins" fontWeight="500">Recruiters</text>
                    <text x="170" y="201" textAnchor="middle" fill="#5F6876" fontSize="7.5" fontFamily="Poppins">Opportunities</text>
                  </g>

                  {/* CSD Central Node */}
                  <g>
                    <rect x="125" y="94" width="90" height="42" rx="2" fill="#1E40AF" />
                    <text x="170" y="113" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="DM Serif Display">CSD HUB</text>
                    <text x="170" y="126" textAnchor="middle" fill="#E5EDFF" fontSize="7.5" fontFamily="Poppins">Coordination Core</text>
                  </g>
                </svg>
              </div>

              {/* Clean Summary Stats */}
              <div className="pt-3 mt-2 border-t border-[#E2E5EB] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="font-serif text-base text-[#16181D] block">8</span>
                  <span className="text-[11px] text-[#5F6876]">Process steps</span>
                </div>
                <div>
                  <span className="font-serif text-base text-[#16181D] block">7</span>
                  <span className="text-[11px] text-[#5F6876]">Journey stages</span>
                </div>
                <div>
                  <span className="font-serif text-base text-[#1E40AF] block">7</span>
                  <span className="text-[11px] text-[#5F6876]">Key actors</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
