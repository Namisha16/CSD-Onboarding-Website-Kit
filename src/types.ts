export interface ProjectInfo {
  name: string;
  subtitle: string;
  purpose: string;
  audience: string[];
  designPrinciple: string;
  theme: string;
  sourcePolicy: string;
}

export interface SectionMeta {
  id: string;
  number: string;
  title: string;
  eyebrow?: string;
  description: string;
  visual: string;
  interaction: string;
}

export interface Actor {
  id: string;
  name: string;
  position?: string;
  summary: string;
}

export interface ActorMap {
  centerActorId: string;
  actorIds: string[];
  edges: Array<{ from: string; to: string; label?: string }>;
  note: string;
}

export interface RoleInfo {
  actorId: string;
  responsibilities: string[];
  confirmWithTeam: string;
}

export interface ProcessStage {
  id: number;
  title: string;
  purpose: string;
  handoff: string;
}

export interface StudentJourneyStage {
  id: number;
  stage: string;
  studentAction: string;
  touchpoints: string[];
  possibleEmotion: string[];
  supportNeed: string;
}

export interface InformationTool {
  id: string;
  name: string;
  purpose: string;
  note?: string;
}

export interface CommunicationPrinciple {
  title: string;
  description: string;
}

export interface Scenario {
  id: string;
  title: string;
  situation: string;
  consider: string;
  response: string;
  type: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
}

export interface CsdData {
  project: ProjectInfo;
  design: {
    fonts: { heading: string; body: string };
    colors: Record<string, string>;
    layout: Record<string, any>;
    motion: Record<string, boolean>;
  };
  sections: SectionMeta[];
  actors: Actor[];
  actorMap: ActorMap;
  roles: RoleInfo[];
  csdProcess: ProcessStage[];
  studentJourney: StudentJourneyStage[];
  informationTools: InformationTool[];
  communicationPrinciples: CommunicationPrinciple[];
  scenarios: Scenario[];
  firstWeekChecklist: ChecklistItem[];
  footer: {
    message: string;
    note: string;
  };
}
