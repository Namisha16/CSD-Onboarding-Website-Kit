import React, { useState } from 'react';
import { CommunicationPrinciple, SectionMeta } from '../types';
import {
  Check,
  X,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface CommunicationSectionProps {
  section: SectionMeta;
  principles: CommunicationPrinciple[];
}

export const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  section,
  principles,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number>(0);
  const activePrinciple = principles[activePrincipleIndex];

  const getPrincipleExemplars = (index: number) => {
    switch (index) {
      case 0:
        return {
          title: 'Opportunity announcement',
          recommended:
            'Role: Interaction Designer — Studio Nordic\nAction: Submit portfolio link & CV on CSD Portal\nDeadline: Friday, 24 Oct, 17:00 IST\nNext: Shortlist announced by Monday morning',
          avoid:
            'New design role opened! Apply ASAP if interested. Link shared in WhatsApp group.',
        };
      case 1:
        return {
          title: 'Shortlist announcement',
          recommended:
            '[Shortlist] Acme Corp — Round 1 Technicals\n1. Confirmed Candidates (List attached)\n2. Assessment Window: Sat 10:00–18:00 IST\n3. Coordinator: anil@csd.ac.in',
          avoid:
            'A few students got shortlisted for Acme. Check with the coordinator to know your timing.',
        };
      case 2:
        return {
          title: 'In-progress update',
          recommended:
            'Acme Corp is evaluating portfolio submissions. Round 2 shortlists will be notified tomorrow by 11:00 IST.',
          avoid:
            'Two weeks of silence followed by midnight messages announcing next-day 8 AM interviews.',
        };
      case 3:
        return {
          title: 'Partial selection outcomes',
          recommended:
            'Acme Corp has confirmed 3 offers. 2 candidate decisions remain under review. We will notify pending candidates immediately upon confirmation.',
          avoid:
            'All selections are done! If you didn’t get an email, ask the company directly.',
        };
      case 4:
        return {
          title: 'Offer acceptance protocol',
          recommended:
            'Candidate Action: Reply with written acceptance by Wed 15:00 IST.\nCSD Contact: Maya (maya@csd.ac.in) for joining queries.',
          avoid:
            'Accept your offer soon with whoever sent you the letter.',
        };
      default:
        return {
          title: 'Communication protocol',
          recommended: 'Structured and respectful student communication.',
          avoid: 'Vague messaging without designated owners.',
        };
    }
  };

  const exemplar = getPrincipleExemplars(activePrincipleIndex);

  return (
    <section id="communication" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              07 · Coordination Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              Communication That Keeps Things Moving
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Structured communication reduces uncertainty and supports coordination across placement milestones.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start md:self-auto px-3.5 py-1.5 rounded-xs border border-[#1E40AF] bg-[#FFFFFF] hover:bg-[#F0F4FF] text-[#1E40AF] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            aria-expanded={isExpanded}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isExpanded ? 'Collapse principles' : 'Explore communication principles (5)'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Compact Default Teaser */}
        {!isExpanded ? (
          <div 
            onClick={() => setIsExpanded(true)}
            className="p-4 sm:p-5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFBFD] transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xs bg-[#F0F4FF] text-[#1E40AF] flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-medium text-[#16181D] block">
                  5 Core Standards: Clear · Structured · Timely · Transparent · Ownership
                </span>
                <p className="text-xs text-[#5F6876]">
                  Verified coordination templates to eliminate ambiguity and respect student attention.
                </p>
              </div>
            </div>

            <span className="text-xs text-[#1E40AF] font-medium flex items-center gap-1 shrink-0">
              <span>View principles & examples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        ) : (
          /* Expanded View */
          <div className="space-y-5 animate-fadeIn">
            {/* 5 Principles Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {principles.map((pr, idx) => {
                const isActive = activePrincipleIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePrincipleIndex(idx)}
                    className={`p-2.5 rounded-xs border text-left transition-colors cursor-pointer flex flex-col justify-between min-h-[64px] ${
                      isActive
                        ? 'bg-[#1E40AF] text-[#FFFFFF] border-[#1E40AF] shadow-2xs'
                        : 'bg-[#FFFFFF] text-[#16181D] border-[#E2E5EB] hover:bg-[#F8F9FA]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className={`text-[10px] font-medium ${isActive ? 'text-[#DCE6FF]' : 'text-[#5F6876]'}`}>
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-medium leading-snug mt-1">
                      {pr.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Principle Deep Dive Card */}
            <div className="p-5 sm:p-6 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E2E5EB] pb-3 gap-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-[#1E40AF] text-[#FFFFFF]">
                    0{activePrincipleIndex + 1}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#16181D]">
                    {activePrinciple.title}
                  </h3>
                </div>
                <p className="text-xs text-[#5F6876] sm:max-w-md">
                  {activePrinciple.description}
                </p>
              </div>

              {/* Real Exemplars */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5F6876]">
                  <span>Touchpoint: {exemplar.title}</span>
                  <span>Good practice example</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recommended */}
                  <div className="p-3.5 rounded-xs bg-[#F0F4FF] border border-[#E5EDFF] space-y-1.5">
                    <span className="text-xs font-medium text-[#1E40AF] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#1E40AF]" />
                      <span>Recommended pattern</span>
                    </span>
                    <pre className="text-xs font-sans text-[#16181D] whitespace-pre-wrap leading-relaxed bg-[#FFFFFF] p-2.5 rounded-xs border border-[#E5EDFF]">
                      {exemplar.recommended}
                    </pre>
                  </div>

                  {/* Avoid */}
                  <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-1.5">
                    <span className="text-xs font-medium text-[#DC2626] flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Ambiguous anti-pattern to avoid</span>
                    </span>
                    <p className="text-xs text-[#5F6876] leading-relaxed bg-[#FFFFFF] p-2.5 rounded-xs border border-[#E2E5EB]">
                      "{exemplar.avoid}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Note */}
              <div className="p-2.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] flex items-center gap-2 text-[11px] text-[#5F6876]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#1E40AF] shrink-0" />
                <span>
                  <strong>Note:</strong> Patterns reflect documented good practices to reduce anxiety, not official university-mandated response SLAs.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
