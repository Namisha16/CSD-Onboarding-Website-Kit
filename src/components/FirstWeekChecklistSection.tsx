import React from 'react';
import { ChecklistItem, SectionMeta } from '../types';
import { CheckCircle2, Circle, RotateCcw, ArrowRight, Heart } from 'lucide-react';

interface FirstWeekChecklistSectionProps {
  section: SectionMeta;
  checklist: ChecklistItem[];
  completedItems: Record<string, boolean>;
  onToggleItem: (id: string) => void;
  onResetChecklist: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const FirstWeekChecklistSection: React.FC<FirstWeekChecklistSectionProps> = ({
  section,
  checklist,
  completedItems,
  onToggleItem,
  onResetChecklist,
  onNavigateToSection,
}) => {
  const completedCount = checklist.filter((item) => completedItems[item.id]).length;
  const totalCount = checklist.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const pendingTasks = checklist.filter((item) => !completedItems[item.id]);
  const completedTasks = checklist.filter((item) => !!completedItems[item.id]);

  const getSectionTarget = (id: string) => {
    switch (id) {
      case 'ecosystem':
        return 'ecosystem';
      case 'roles':
        return 'actors-map';
      case 'workflow':
        return 'csd-process';
      case 'student-journey':
        return 'student-journey';
      case 'tools':
        return 'information-tools';
      case 'communication':
        return 'communication';
      case 'confirm':
        return 'actors-map';
      default:
        return 'welcome';
    }
  };

  return (
    <section id="first-week" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              10 · Orientation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              {section.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Seven essential milestones to orient yourself to CSD ways of working.
            </p>
          </div>

          <div className="text-xs text-[#5F6876] bg-[#F8F9FA] px-3 py-1 rounded-xs border border-[#E2E5EB] self-start md:self-auto">
            <span>Progress: </span>
            <span className="text-[#1E40AF] font-medium">{completedCount} of {totalCount} completed ({percentage}%)</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mb-6 p-4 sm:p-5 bg-[#F8F9FA] border border-[#E2E5EB] rounded-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#16181D] font-medium">
              Orientation completion: {percentage}%
            </span>
            {completedCount > 0 && (
              <button
                onClick={onResetChecklist}
                className="flex items-center gap-1.5 text-xs text-[#5F6876] hover:text-[#16181D] cursor-pointer"
                title="Reset checklist"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset progress</span>
              </button>
            )}
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#E2E5EB] overflow-hidden">
            <div
              className="h-full bg-[#1E40AF] transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Two-Column Separation: Pending vs Completed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-10">
          
          {/* Pending Tasks (Col 7) */}
          <div className="lg:col-span-7 space-y-2.5">
            <span className="text-xs font-medium text-[#5F6876] block pb-2 border-b border-[#E2E5EB]">
              Pending orientation tasks ({pendingTasks.length})
            </span>

            {pendingTasks.length === 0 ? (
              <div className="p-5 text-center bg-[#F8F9FA] border border-[#E2E5EB] rounded-xs text-xs text-[#5F6876]">
                All orientation milestones have been marked completed.
              </div>
            ) : (
              <div className="space-y-1.5">
                {pendingTasks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onToggleItem(item.id)}
                    className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] hover:border-[#1E40AF]/40 transition-colors flex items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleItem(item.id);
                        }}
                        className="shrink-0 text-[#8E95A2] group-hover:text-[#1E40AF] cursor-pointer"
                        aria-label={`Mark ${item.task} completed`}
                      >
                        <Circle className="w-4 h-4 stroke-[1.5]" />
                      </button>
                      <span className="text-xs sm:text-sm text-[#16181D] leading-snug">
                        {item.task}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToSection(getSectionTarget(item.id));
                      }}
                      className="shrink-0 text-xs text-[#1E40AF] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>Jump</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Tasks (Col 5) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-medium text-[#5F6876] block pb-2 border-b border-[#E2E5EB]">
              Completed tasks ({completedTasks.length})
            </span>

            {completedTasks.length === 0 ? (
              <div className="p-5 text-center bg-[#F8F9FA] border border-[#E2E5EB] rounded-xs text-xs text-[#5F6876]">
                Check off items on the left as you review each section.
              </div>
            ) : (
              <div className="space-y-1.5">
                {completedTasks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onToggleItem(item.id)}
                    className="p-3 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] transition-colors flex items-center gap-2.5 cursor-pointer select-none"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1E40AF] shrink-0" />
                    <span className="text-xs text-[#5F6876] line-through truncate">
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Closing Statement */}
        <div className="p-5 sm:p-6 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] text-center space-y-2 max-w-xl mx-auto">
          <div className="w-7 h-7 rounded-full bg-[#1E40AF] text-[#FFFFFF] flex items-center justify-center mx-auto shadow-2xs">
            <Heart className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <h3 className="text-lg sm:text-xl font-serif text-[#16181D]">
            A Clearer Journey, A Better Experience
          </h3>
          <p className="text-xs text-[#5F6876] leading-relaxed max-w-md mx-auto">
            Internal coordination exists solely to make the recruitment journey transparent and empowering for every student.
          </p>
        </div>

      </div>
    </section>
  );
};
