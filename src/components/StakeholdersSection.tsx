import React, { useState } from 'react';
import { SectionMeta } from '../types';
import { ChevronDown, ChevronUp, ShieldCheck, ArrowRightLeft } from 'lucide-react';

interface StakeholdersSectionProps {
  section: SectionMeta;
}

interface StakeholderProfile {
  id: string;
  name: string;
  roleInEcosystem: string;
  mainContribution: string;
  coordinationNeeds: string[];
  providedToCSD: string[];
  ruleBoundary: string;
}

const verifiedStakeholders: StakeholderProfile[] = [
  {
    id: 'students',
    name: 'Students',
    roleInEcosystem: 'Central beneficiaries navigating placement pathways.',
    mainContribution: 'Accurate profiles, current CVs, design portfolios, and interview attendance.',
    coordinationNeeds: [
      'Clear role eligibility and expectations before applying',
      'Transparent submission deadlines and format requirements',
      'Timely status updates to reduce uncertainty and anxiety',
    ],
    providedToCSD: [
      'Updated CV, portfolio links, and preferences',
      'Timely interview and selection attendance',
    ],
    ruleBoundary: 'Keep student experience at the center of all CSD communication.',
  },
  {
    id: 'spocs',
    name: 'SPOCs (Single Points of Contact)',
    roleInEcosystem: 'Academic cohort bridges connecting CSD with students.',
    mainContribution: 'Information collection support and cohort readiness insights.',
    coordinationNeeds: [
      'Advance notice of upcoming recruitment cycles',
      'Standardized communication protocols',
    ],
    providedToCSD: [
      'Cohort-specific academic readiness insights',
      'Assistance tracking pending submissions',
    ],
    ruleBoundary: 'Confirm current SPOC remit with the department.',
  },
  {
    id: 'hods',
    name: 'HODs (Heads of Department)',
    roleInEcosystem: 'Discipline leaders ensuring curriculum alignment and student suitability.',
    mainContribution: 'Programme context and academic fit assessment.',
    coordinationNeeds: [
      'Recruitment activity summaries across disciplines',
      'Employer feedback to inform academic growth',
    ],
    providedToCSD: [
      'Discipline-specific recommendations',
      'Coordination on formal academic schedules',
    ],
    ruleBoundary: 'Confirm specific decision-making boundaries with the department.',
  },
  {
    id: 'faculty',
    name: 'Faculty / Mentors',
    roleInEcosystem: 'Craft mentors supporting student readiness and portfolio depth.',
    mainContribution: 'Project guidance and technical skill readiness reflection.',
    coordinationNeeds: [
      'Clarity on current industry competency standards',
      'Notice of upcoming technical testing cycles',
    ],
    providedToCSD: [
      'Feedback on portfolio depth and project maturity',
      'Mentorship during assignment phases',
    ],
    ruleBoundary: 'General mentorship role, not formal selection policy.',
  },
  {
    id: 'companies',
    name: 'Companies / Recruiters',
    roleInEcosystem: 'External hiring partners seeking skilled talent.',
    mainContribution: 'Job descriptions, role criteria, shortlisting, and final selection.',
    coordinationNeeds: [
      'Consolidated candidate packages and organized submissions',
      'Reliable single channel for interview scheduling',
    ],
    providedToCSD: [
      'Role requirements and terms',
      'Shortlists and selection outcomes',
    ],
    ruleBoundary: 'Do not promise unconfirmed response times.',
  },
  {
    id: 'leadership',
    name: 'Placement Leadership',
    roleInEcosystem: 'Institutional governance and strategic partnership oversight.',
    mainContribution: 'Policy alignment and inter-departmental coordination.',
    coordinationNeeds: [
      'Placement pipeline status and employer engagement overview',
      'Timely escalation of systemic bottlenecks',
    ],
    providedToCSD: [
      'Governance guidance and institutional policies',
    ],
    ruleBoundary: 'Confirm specific leadership responsibilities with the team.',
  },
];

export const StakeholdersSection: React.FC<StakeholdersSectionProps> = ({ section }) => {
  const [expandedId, setExpandedId] = useState<string | null>('students');

  return (
    <section id="stakeholders" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              05 · Stakeholder Perspectives
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              {section.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Understand the diverse needs, contributions, and communication flows across the network.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#1E40AF] bg-[#FFFFFF] px-3 py-1 rounded-xs border border-[#E2E5EB] self-start md:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Alumni excluded</span>
          </div>
        </div>

        {/* Structured Row Directory */}
        <div className="border-t border-[#E2E5EB]">
          {verifiedStakeholders.map((stk, idx) => {
            const isExpanded = expandedId === stk.id;
            return (
              <div
                key={stk.id}
                className="border-b border-[#E2E5EB] transition-colors bg-[#FFFFFF]"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : stk.id)}
                  className="p-4 sm:p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6 hover:bg-[#FAFBFD]"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedId(isExpanded ? null : stk.id);
                    }
                  }}
                >
                  <div className="flex items-baseline gap-3 min-w-[220px]">
                    <span className="text-xs text-[#5F6876] font-medium">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-[#16181D]">
                        {stk.name}
                      </h3>
                      <p className="text-xs text-[#5F6876]">
                        {stk.roleInEcosystem}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 max-w-lg text-xs text-[#16181D] leading-relaxed">
                    <strong className="text-[#5F6876] font-normal mr-1.5 block sm:inline">Main contribution:</strong>
                    {stk.mainContribution}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#1E40AF] font-medium shrink-0 self-end md:self-auto">
                    <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-[#E2E5EB] bg-[#F8F9FA] grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-[#1E40AF] flex items-center gap-1.5">
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        <span>Coordination needs from CSD</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#16181D]">
                        {stk.coordinationNeeds.map((need, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] mt-1.5 shrink-0" />
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-medium text-[#5F6876] block">
                        Information provided to CSD
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#16181D]">
                        {stk.providedToCSD.map((prov, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5F6876] mt-1.5 shrink-0" />
                            <span>{prov}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-[#5F6876] pt-1">
                        <strong className="text-[#16181D] font-medium mr-1">Rule:</strong>
                        {stk.ruleBoundary}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
