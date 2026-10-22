import React, { useState } from 'react';
import { Scenario, SectionMeta } from '../types';
import { ChevronRight, ChevronLeft, RotateCcw, HelpCircle, UserCheck, ShieldAlert } from 'lucide-react';

interface ScenarioSimulatorSectionProps {
  section: SectionMeta;
  scenarios: Scenario[];
}

export const ScenarioSimulatorSection: React.FC<ScenarioSimulatorSectionProps> = ({
  section,
  scenarios,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0].id);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStep(1);
  };

  const getStakeholdersForScenario = (id: string) => {
    switch (id) {
      case 'incomplete-profile':
        return ['Student', 'SPOC', 'CSD Coordinator'];
      case 'company-delay':
        return ['Company Recruiter', 'CSD Lead', 'Affected Students'];
      case 'opportunity-mismatch':
        return ['Student', 'Faculty Mentor / HOD', 'CSD Lead'];
      case 'deadline-confusion':
        return ['Student', 'SPOC', 'CSD Comms Lead'];
      default:
        return ['CSD Team', 'Student'];
    }
  };

  const steps = [
    { number: 1, title: 'Situation' },
    { number: 2, title: 'Verify Facts' },
    { number: 3, title: 'Coordinate' },
    { number: 4, title: 'Next Step' },
    { number: 5, title: 'Rule Check' },
  ];

  return (
    <section id="scenario-simulator" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              09 · Field Scenarios
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              {section.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Step-by-step simulations of real placement coordination situations.
            </p>
          </div>

          <div className="text-xs text-[#5F6876] bg-[#FFFFFF] px-3 py-1 rounded-xs border border-[#E2E5EB] self-start md:self-auto">
            <span>Simulations: </span>
            <span className="text-[#1E40AF] font-medium">4 cases</span>
          </div>
        </div>

        {/* Two-Column Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (5 cols): Case Selector */}
          <div className="lg:col-span-5 space-y-1.5">
            <span className="text-xs font-medium text-[#5F6876] block pb-2 border-b border-[#E2E5EB]">
              Select scenario ({scenarios.length})
            </span>

            <div className="space-y-1" role="tablist">
              {scenarios.map((sc, idx) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc.id)}
                    className={`w-full p-3 rounded-xs text-left transition-colors cursor-pointer border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#1E40AF] shadow-2xs'
                        : 'bg-[#FFFFFF]/60 border-[#E2E5EB] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-[#5F6876] block mb-0.5">
                        Case 0{idx + 1}
                      </span>
                      <h3 className={`text-xs sm:text-sm ${isSelected ? 'text-[#1E40AF] font-medium' : 'text-[#16181D]'}`}>
                        {sc.title}
                      </h3>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-[#1E40AF] translate-x-0.5' : 'text-[#5F6876]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Step Panel */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E5EB] rounded-xs p-5 sm:p-6 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-[#E2E5EB] gap-2">
              <div>
                <span className="text-[11px] text-[#1E40AF] font-medium block">
                  Step 0{currentStep} of 5 · {steps[currentStep - 1].title}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-[#16181D]">
                  {selectedScenario.title}
                </h3>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 text-xs text-[#5F6876] hover:text-[#16181D] cursor-pointer"
                title="Reset steps"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Stepper Dots */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-5 gap-1.5">
                {steps.map((st) => (
                  <button
                    key={st.number}
                    onClick={() => setCurrentStep(st.number)}
                    className={`h-1 rounded-full transition-colors cursor-pointer ${
                      st.number <= currentStep ? 'bg-[#1E40AF]' : 'bg-[#E2E5EB]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#5F6876]">
                <span className="text-[#1E40AF] font-medium">{steps[currentStep - 1].title}</span>
                <span>Click step to jump</span>
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[110px] py-1">
              {currentStep === 1 && (
                <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-1 animate-fadeIn">
                  <span className="text-[11px] font-medium text-[#5F6876] block">
                    Observed situation
                  </span>
                  <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
                    "{selectedScenario.situation}"
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-1 animate-fadeIn">
                  <span className="text-[11px] font-medium text-[#1E40AF] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Information to check</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
                    {selectedScenario.consider}
                  </p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-2 animate-fadeIn">
                  <span className="text-[11px] font-medium text-[#16181D] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#1E40AF]" />
                    <span>Stakeholders to coordinate</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {getStakeholdersForScenario(selectedScenario.id).map((stk, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-[#FFFFFF] border border-[#E2E5EB] text-xs text-[#16181D]">
                        • {stk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="p-3.5 rounded-xs bg-[#F0F4FF] border border-[#E5EDFF] space-y-1 animate-fadeIn">
                  <span className="text-[11px] font-medium text-[#1E40AF] block">
                    Sensible next step
                  </span>
                  <p className="text-xs sm:text-sm text-[#16181D] font-medium leading-relaxed">
                    {selectedScenario.response}
                  </p>
                </div>
              )}

              {currentStep === 5 && (
                <div className="p-3.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-1 animate-fadeIn">
                  <span className="text-[11px] font-medium text-[#1E40AF] flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Internal policy verification</span>
                  </span>
                  <p className="text-xs text-[#16181D] leading-relaxed">
                    Always confirm internal procedures with CSD before external commitment. Suggested responses are illustrative.
                  </p>
                </div>
              )}
            </div>

            {/* Stepper Navigation */}
            <div className="pt-3 border-t border-[#E2E5EB] flex items-center justify-between">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-xs border border-[#E2E5EB] text-xs text-[#16181D] hover:bg-[#F8F9FA] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                disabled={currentStep === 5}
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-3.5 py-1.5 rounded-xs bg-[#1E40AF] hover:bg-[#1e3a8a] text-[#FFFFFF] text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <span>{currentStep === 4 ? 'Review check' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
