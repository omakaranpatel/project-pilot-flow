
export type ProjectStatus = 'not-started' | 'in-progress' | 'completed' | 'on-hold';

export type TaskStatus = 'pending' | 'complete';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  githubUrl?: string | null;
  deploymentUrl?: string | null;
  techStack: string[];
  tasks: Task[];
  startDate?: string | null;
  targetCompletionDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  projectId: string;
  projectTitle: string;
  date: string;
  taskId?: string;
}
