import React, { useState } from 'react';
import { SectionMeta, StudentJourneyStage } from '../types';
import { ChevronLeft, ChevronRight, User, Briefcase, ArrowRight } from 'lucide-react';

interface StudentJourneySectionProps {
  section?: SectionMeta;
  stages: StudentJourneyStage[];
}

interface CsdStageData {
  coordination: string;
  responsibilities: string[];
  dependencies: string;
}

const verifiedCsdCoordination: Record<number, CsdStageData> = {
  1: {
    coordination: 'Reviews company job description, verifies student eligibility criteria with academic departments, and prepares structured opportunity announcements.',
    responsibilities: [
      'Publish verified role criteria, stipend or package details, and application deadlines',
      'Distribute opportunity across designated cohort channels without ambiguity',
      'Coordinate with SPOCs to ensure relevant candidates receive the briefing',
    ],
    dependencies: 'Complete JD from employer; verified cohort list from SPOCs.',
  },
  2: {
    coordination: 'Collects and tracks incoming student applications, verifies portfolio and CV accessibility, and logs candidate preferences.',
    responsibilities: [
      'Verify submission links and assist students encountering technical issues',
      'Consolidate applicant packages into standardized review rosters',
      'Follow up on incomplete profiles before the announced cutoff',
    ],
    dependencies: 'Student submission diligence; SPOC assistance with cohort reminders.',
  },
  3: {
    coordination: 'Forwards verified applicant packages to employer evaluation panels, monitors review status, and manages periodic follow-ups.',
    responsibilities: [
      'Provide periodic in-progress updates to reduce candidate anxiety',
      'Distinguish confirmed evaluations from pending company decisions',
      'Avoid promising unconfirmed response dates to students',
    ],
    dependencies: 'Employer recruiter evaluation turnaround time.',
  },
  4: {
    coordination: 'Receives and disseminates technical design assignment briefs from companies, coordinates timelines, and manages candidate submissions.',
    responsibilities: [
      'Confirm all shortlisted candidates receive brief materials and deadlines',
      'Clarify scope boundaries and submission format instructions',
      'Deliver completed assignment packages back to the employer evaluation panel',
    ],
    dependencies: 'Clear evaluation brief and criteria from company hiring team.',
  },
  5: {
    coordination: 'Schedules interview slots between candidate cohorts and company panels, accommodating academic calendars and resolve conflicts.',
    responsibilities: [
      'Share precise interview time slots, video links, and panel instructions',
      'Coordinate reschedule requests through designated coordinator contacts',
      'Confirm candidate attendance and readiness prior to interview rounds',
    ],
    dependencies: 'Employer panel availability; academic calendar alignment via HODs.',
  },
  6: {
    coordination: 'Receives verified selection outcomes and formal offer terms from employers, records results, and notifies candidates directly.',
    responsibilities: [
      'Issue formal selection communications and offer letters promptly',
      'Clarify acceptance procedures and confirmed decision deadlines',
      'Share outcome summaries with department HODs and placement leadership',
    ],
    dependencies: 'Official written outcome confirmation and offer letters from company.',
  },
  7: {
    coordination: 'Tracks signed offer acceptances, coordinates joining dates with company HR, archives placement records, and completes loop closure.',
    responsibilities: [
      'Facilitate company onboarding instructions and contact points',
      'Log official placement records in institutional database',
      'Complete final loop-closure with student and academic stakeholders',
    ],
    dependencies: 'Student written acceptance; company onboarding schedule confirmation.',
  },
};

const shortStageLabels = [
  'Announcement',
  'Application',
  'Waiting',
  'Assignment',
  'Interview',
  'Confirmation',
  'Joining',
];

export const StudentJourneySection: React.FC<StudentJourneySectionProps> = ({
  section,
  stages,
}) => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [perspective, setPerspective] = useState<'student' | 'csd'>('student');

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];
  const activeCsd = verifiedCsdCoordination[activeStage.id] || verifiedCsdCoordination[1];

  const handlePrev = () => {
    setActiveStageId((prev) => (prev > 1 ? prev - 1 : stages.length));
  };

  const handleNext = () => {
    setActiveStageId((prev) => (prev < stages.length ? prev + 1 : 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent, stageId: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveStageId(stageId < stages.length ? stageId + 1 : 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveStageId(stageId > 1 ? stageId - 1 : stages.length);
    }
  };

  const progressPercent = ((activeStage.id - 1) / (stages.length - 1)) * 100;

  return (
    <section id="student-journey" className="py-12 sm:py-16 border-b border-[#E2E5EB] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E2E5EB] gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-[#1E40AF] font-medium tracking-wide">
              08 · Student Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#16181D]">
              Two Perspectives. One Placement Journey.
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6876] max-w-xl font-normal leading-relaxed">
              Explore how the student's experience and CSD's coordination evolve across the placement process.
            </p>
          </div>

          {/* Simple Accessible Perspective Toggle (2 Options) */}
          <div 
            className="inline-flex items-center p-1 bg-[#F8F9FA] rounded-xs border border-[#E2E5EB] self-start md:self-auto"
            role="tablist"
            aria-label="Perspective selector"
          >
            <button
              role="tab"
              aria-selected={perspective === 'student'}
              onClick={() => setPerspective('student')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                perspective === 'student'
                  ? 'bg-[#1E40AF] text-[#FFFFFF] shadow-2xs'
                  : 'text-[#5F6876] hover:text-[#16181D]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student perspective</span>
            </button>
            <button
              role="tab"
              aria-selected={perspective === 'csd'}
              onClick={() => setPerspective('csd')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                perspective === 'csd'
                  ? 'bg-[#1E40AF] text-[#FFFFFF] shadow-2xs'
                  : 'text-[#5F6876] hover:text-[#16181D]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>CSD perspective</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE TIMELINE (DESKTOP HORIZONTAL TRACK)               */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block mb-8 pt-4 pb-2">
          <div className="relative">
            {/* Background continuous track */}
            <div className="absolute top-4 left-6 right-6 h-[2px] bg-[#E2E5EB]" />

            {/* Active connecting progress line */}
            <div
              className="absolute top-4 left-6 h-[2px] bg-[#1E40AF] transition-all duration-300 ease-out"
              style={{ width: `calc(${progressPercent}% * (100% - 48px) / 100)` }}
            />

            {/* 7 Stage markers positioned along the line */}
            <div className="relative flex items-start justify-between">
              {stages.map((st, idx) => {
                const isSelected = activeStageId === st.id;
                const isCompleted = st.id < activeStageId;
                const shortLabel = shortStageLabels[idx];

                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStageId(st.id)}
                    onKeyDown={(e) => handleKeyDown(e, st.id)}
                    className="group flex flex-col items-center text-center cursor-pointer focus:outline-hidden"
                    style={{ width: `${100 / stages.length}%` }}
                    aria-label={`Stage ${st.id}: ${st.stage}`}
                    aria-current={isSelected ? 'step' : undefined}
                  >
                    {/* Circle marker */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 z-10 ${
                        isSelected
                          ? 'bg-[#1E40AF] text-[#FFFFFF] ring-4 ring-[#E5EDFF] shadow-2xs'
                          : isCompleted
                          ? 'bg-[#FFFFFF] text-[#1E40AF] border-2 border-[#1E40AF]'
                          : 'bg-[#FFFFFF] text-[#5F6876] border border-[#E2E5EB] group-hover:border-[#1E40AF]'
                      }`}
                    >
                      {st.id}
                    </div>

                    {/* Stage label directly below marker */}
                    <span
                      className={`mt-2.5 text-xs leading-snug px-1 transition-colors ${
                        isSelected
                          ? 'text-[#1E40AF] font-medium'
                          : 'text-[#5F6876] group-hover:text-[#16181D]'
                      }`}
                    >
                      {shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE TIMELINE (MOBILE VERTICAL STEPPER)                 */}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden mb-6 flex overflow-x-auto pb-2 gap-2 scrollbar-none">
          {stages.map((st, idx) => {
            const isSelected = activeStageId === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStageId(st.id)}
                className={`px-3 py-1.5 rounded-xs text-xs whitespace-nowrap border shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#1E40AF] text-[#FFFFFF] border-[#1E40AF] font-medium'
                    : 'bg-[#F8F9FA] text-[#5F6876] border-[#E2E5EB]'
                }`}
              >
                {st.id}. {shortStageLabels[idx]}
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ALIGNED DETAIL PANEL (UPDATES PER SELECTED STAGE & PERSPECTIVE) */}
        {/* ------------------------------------------------------------- */}
        <div className="p-5 sm:p-6 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] space-y-4">
          
          {/* Header of Detail Panel: Stage Title & Prev/Next Navigation */}
          <div className="flex items-center justify-between border-b border-[#E2E5EB] pb-3.5">
            <div className="flex items-baseline gap-2.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-[#1E40AF] text-[#FFFFFF]">
                0{activeStage.id}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-[#16181D]">
                {activeStage.stage}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-xs border border-[#E2E5EB] bg-[#FFFFFF] hover:bg-[#F0F4FF] text-[#16181D] hover:text-[#1E40AF] text-xs transition-colors cursor-pointer"
                aria-label="Previous stage"
                title="Previous stage"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-[#5F6876] px-1.5">
                {activeStage.id} / {stages.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-xs border border-[#E2E5EB] bg-[#FFFFFF] hover:bg-[#F0F4FF] text-[#16181D] hover:text-[#1E40AF] text-xs transition-colors cursor-pointer"
                aria-label="Next stage"
                title="Next stage"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Perspective Dynamic Content */}
          {perspective === 'student' ? (
            /* STUDENT PERSPECTIVE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* What the student does */}
              <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-1">
                <span className="text-[11px] font-medium text-[#1E40AF] block">
                  What the student does
                </span>
                <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
                  {activeStage.studentAction}
                </p>
              </div>

              {/* Information & clarity needed */}
              <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-1">
                <span className="text-[11px] font-medium text-[#1E40AF] block">
                  Information & clarity needed
                </span>
                <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
                  {activeStage.supportNeed}
                </p>
              </div>

              {/* Touchpoints & Experience */}
              <div className="md:col-span-2 p-3.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[#5F6876] font-medium mr-1">Touchpoints:</span>
                  {activeStage.touchpoints.map((tp, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-xs bg-[#F8F9FA] border border-[#E2E5EB] text-[#16181D]">
                      {tp}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[#5F6876]">
                  <span>Observed emotion:</span>
                  <span className="text-[#1E40AF] font-medium">
                    {activeStage.possibleEmotion.join(' · ')}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* CSD PERSPECTIVE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Coordination Activities */}
              <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-1">
                <span className="text-[11px] font-medium text-[#1E40AF] block">
                  CSD coordination activity
                </span>
                <p className="text-xs sm:text-sm text-[#16181D] leading-relaxed">
                  {activeCsd.coordination}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="p-4 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] space-y-1.5">
                <span className="text-[11px] font-medium text-[#1E40AF] block">
                  Key responsibilities & communication
                </span>
                <ul className="space-y-1">
                  {activeCsd.responsibilities.map((r, i) => (
                    <li key={i} className="text-xs text-[#16181D] flex items-start gap-1.5 leading-snug">
                      <span className="text-[#1E40AF] font-bold">·</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dependencies */}
              <div className="md:col-span-2 p-3.5 rounded-xs bg-[#FFFFFF] border border-[#E2E5EB] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#5F6876] font-medium">Operational dependency:</span>
                  <span className="text-[#16181D]">{activeCsd.dependencies}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
