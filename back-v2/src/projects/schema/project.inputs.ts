export interface MemberAndRole {
  email: string;
  role: string;
}

export interface Milestone {
  title: string;
  date: string;
  content: string;
}

export interface CreateProjectDTO {
  name: string;
  shortDescripton: string;
  description: string;
  members: Array<MemberAndRole>;
  github: string;
  xp: number;
  milestones: Array<Milestone>;
  images: Array<string>;
  // TODO materials: Array<MaterialNeeded>;
}

export interface UpdateProjectDTO {
  name?: string;
  shortDescripton?: string;
  description?: string;
  members?: Array<MemberAndRole>;
  github?: string;
  xp?: number;
  milestones?: Array<Milestone>;
  images?: Array<string>;
  // TODO materials?: Array<MaterialNeeded>;
}

export type Status = 'PENDING' | 'REFUSED' | 'VALIDATED' | 'DONE';

export interface UpdateStatusDTO {
  status: Status;
  refusedBecause: string | null;
}
