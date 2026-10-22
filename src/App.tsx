import React, { useState, useEffect } from 'react';
import csdDataRaw from './data/csd-website-data.json';
import { CsdData } from './types';
import { HeaderNav } from './components/HeaderNav';
import { WelcomeSection } from './components/WelcomeSection';
import { ActorsMapSection } from './components/ActorsMapSection';
import { EcosystemSection } from './components/EcosystemSection';
import { CsdProcessSection } from './components/CsdProcessSection';
import { StakeholdersSection } from './components/StakeholdersSection';
import { InformationToolsSection } from './components/InformationToolsSection';
import { CommunicationSection } from './components/CommunicationSection';
import { StudentJourneySection } from './components/StudentJourneySection';
import { ScenarioSimulatorSection } from './components/ScenarioSimulatorSection';
import { FirstWeekChecklistSection } from './components/FirstWeekChecklistSection';
import { Footer } from './components/Footer';
import { MapAssetModal } from './components/MapAssetModal';

const csdData = csdDataRaw as unknown as CsdData;

export function App() {
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('csd_onboarding_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('csd_onboarding_checklist', JSON.stringify(completedChecklist));
    } catch (e) {
      console.error('Failed to save checklist state', e);
    }
  }, [completedChecklist]);

  const handleToggleChecklistItem = (id: string) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetChecklist = () => {
    if (window.confirm('Reset your First-Week Checklist orientation progress?')) {
      setCompletedChecklist({});
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -68 : -20;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const completedCount = csdData.firstWeekChecklist.filter(
    (item) => completedChecklist[item.id]
  ).length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#16181D] flex flex-col font-sans selection:bg-[#1E40AF]/15 selection:text-[#1E40AF]">
      {/* Sticky Left Navigation Rail (Desktop) & Top Bar / Drawer (Mobile & Tablet) */}
      <HeaderNav
        sections={csdData.sections}
        completedCount={completedCount}
        totalChecklist={csdData.firstWeekChecklist.length}
        onOpenMapGuide={() => setIsMapModalOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content Area: Offset by 256px on desktop (lg:pl-64) so sidebar never overlaps */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <main className="flex-1">
          {/* Section 01: Welcome / Opening */}
          <WelcomeSection
            project={csdData.project}
            section={csdData.sections[0]}
            onExploreSystem={() => scrollToSection('actors-map')}
            onStartOnboarding={() => scrollToSection('first-week')}
          />

          {/* Section 02: The People Behind the Placement Journey (System Participants & Actors Map) */}
          <ActorsMapSection
            section={csdData.sections[1]}
            onOpenMapGuide={() => setIsMapModalOpen(true)}
          />

          {/* Section 03: The CSD Ecosystem Map */}
          <EcosystemSection
            section={csdData.sections[2]}
            actors={csdData.actors}
            actorMap={csdData.actorMap}
            onOpenMapGuide={() => setIsMapModalOpen(true)}
          />

          {/* Section 04: How CSD Operates (From Opportunity to Outcome) */}
          <CsdProcessSection
            section={csdData.sections[3]}
            stages={csdData.csdProcess}
            onOpenMapGuide={() => setIsMapModalOpen(true)}
          />

          {/* Section 05: Working with Stakeholders */}
          <StakeholdersSection
            section={csdData.sections[4]}
          />

          {/* Section 06: Information & Tools */}
          <InformationToolsSection
            section={csdData.sections[5]}
            tools={csdData.informationTools}
          />

          {/* Section 07: Communication Protocols */}
          <CommunicationSection
            section={csdData.sections[6]}
            principles={csdData.communicationPrinciples}
          />

          {/* Section 08: The Student Placement Journey */}
          <StudentJourneySection
            section={csdData.sections[7]}
            stages={csdData.studentJourney}
          />

          {/* Section 09: What Would You Do? (Scenario Simulator) */}
          <ScenarioSimulatorSection
            section={csdData.sections[8]}
            scenarios={csdData.scenarios}
          />

          {/* Section 10: Your First Week (First-Week Checklist) */}
          <FirstWeekChecklistSection
            section={csdData.sections[9]}
            checklist={csdData.firstWeekChecklist}
            completedItems={completedChecklist}
            onToggleItem={handleToggleChecklistItem}
            onResetChecklist={handleResetChecklist}
            onNavigateToSection={scrollToSection}
          />
        </main>

        {/* Compact Professional Footer */}
        <Footer
          message={csdData.footer.message}
          note={csdData.footer.note}
          sections={csdData.sections}
          onOpenMapGuide={() => setIsMapModalOpen(true)}
        />
      </div>

      {/* Map Assets Integration Status Modal */}
      <MapAssetModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />
    </div>
  );
}

export default App;
