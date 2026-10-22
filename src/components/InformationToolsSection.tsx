import React, { useState } from 'react';
import { InformationTool, SectionMeta } from '../types';
import { AlertCircle } from 'lucide-react';

interface InformationToolsSectionProps {
  section: SectionMeta;
  tools: InformationTool[];
}

export const InformationToolsSection: React.FC<InformationToolsSectionProps> = ({
  section,
  tools,
}) => {
  const [selectedToolId, setSelectedToolId] = useState<string>('prep-som');
  const selectedTool = tools.find((t) => t.id === selectedToolId) || tools[0];

  const getToolMetadata = (id: string) => {
    switch (id) {
      case 'prep-som':
        return {
          category: 'Structured Information Touchpoint',
          fields: [
            'Student CV and portfolio links',
            'Role & industry domain preferences',
            'Location & work mode preferences',
            'Availability timeline & academic status',
            'Skills & project case studies',
          ],
          boundary:
            'Supports structured data collection; it does not replace direct student advising or guarantee placement.',
        };
      case 'student-profile':
        return {
          category: 'Core Talent Dossier',
          fields: [
            'Technical & design skills',
            'Academic batch & discipline',
            'Internships & project repos',
          ],
          boundary: 'Maintained continuously by students and verified prior to company matching.',
        };
      case 'job-description':
        return {
          category: 'Opportunity Specification',
          fields: [
            'Core responsibilities & criteria',
            'Must-have vs nice-to-have skills',
            'Location, stipend, and terms',
          ],
          boundary: 'Must be verified to prevent misaligned student expectations.',
        };
      case 'portfolio':
        return {
          category: 'Craft Evidence',
          fields: [
            'Case studies & code repositories',
            'Individual contributions',
            'Demonstrated problem-solving craft',
          ],
          boundary: 'Faculty advise; students maintain sole ownership of artifact integrity.',
        };
      case 'updates':
        return {
          category: 'Coordination Communication',
          fields: [
            'Shortlist notifications',
            'Interview logistics',
            'Verified outcomes & offer confirmations',
          ],
          boundary: 'Only communicate confirmed facts; clearly identify pending feedback.',
        };
      default:
        return {
          category: 'Operational Artifact',
          fields: ['Standard placement records'],
          boundary: 'Follow team guidance.',
        };
    }
  };

  const meta = getToolMetadata(selectedTool.id);

  return (
    <section id="information-tools" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              06 · Information & Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              {section.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Touchpoints that capture student readiness and role requirements.
            </p>
          </div>

          <div className="text-xs text-[#5F6876] bg-[#F8F9FA] px-3 py-1 rounded-xs border border-[#E2E5EB] self-start md:self-auto">
            <span>Touchpoints: </span>
            <span className="text-[#1E40AF] font-medium">{tools.length} verified tools</span>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (5 cols): Selector */}
          <div className="lg:col-span-5 space-y-1.5">
            <span className="text-xs font-medium text-[#5F6876] block pb-2 border-b border-[#E2E5EB]">
              Touchpoints directory
            </span>

            <div className="space-y-1" role="tablist">
              {tools.map((t, idx) => {
                const isSelected = selectedToolId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedToolId(t.id)}
                    className={`w-full p-3 rounded-xs text-left transition-colors cursor-pointer border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F8F9FA] border-[#1E40AF] shadow-2xs'
                        : 'bg-[#FFFFFF] border-[#E2E5EB] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-[#5F6876] block mb-0.5">
                        0{idx + 1}
                      </span>
                      <h3 className={`text-xs sm:text-sm ${isSelected ? 'text-[#1E40AF] font-medium' : 'text-[#16181D]'}`}>
                        {t.name}
                      </h3>
                      <p className="text-xs text-[#5F6876] line-clamp-1 mt-0.5">
                        {t.purpose}
                      </p>
                    </div>

                    <span className={`w-1 h-4 rounded-xs shrink-0 ${isSelected ? 'bg-[#1E40AF]' : 'bg-transparent'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Dossier */}
          <div className="lg:col-span-7 bg-[#F8F9FA] border border-[#E2E5EB] rounded-xs p-5 sm:p-6 space-y-5">
            
            <div className="flex items-baseline justify-between pb-3 border-b border-[#E2E5EB]">
              <div>
                <span className="text-[11px] text-[#1E40AF] font-medium block">
                  {meta.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#16181D]">
                  {selectedTool.name}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
              {selectedTool.purpose}
            </p>

            {/* Boundary Warning */}
            <div className="p-3.5 rounded-xs bg-[#FFFFFF] border-l-2 border-[#1E40AF] border border-[#E2E5EB] space-y-1">
              <span className="text-xs font-medium text-[#1E40AF] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Operational boundary</span>
              </span>
              <p className="text-xs text-[#16181D] leading-relaxed">
                {meta.boundary}
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[#5F6876] block">
                Captured data fields
              </span>
              <div className="space-y-1.5">
                {meta.fields.map((f, i) => (
                  <div key={i} className="p-2 bg-[#FFFFFF] rounded-xs border border-[#E2E5EB] text-xs text-[#16181D] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
