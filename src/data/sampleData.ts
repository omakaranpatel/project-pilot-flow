
import { Project, ProjectStatus, Task } from "@/types";

export const sampleProjects: Project[] = [
  {
    id: "project-1",
    title: "Personal Portfolio Site",
    description: "My personal portfolio website showcasing my projects and skills.",
    status: "in-progress",
    githubUrl: "https://github.com/user/portfolio",
    deploymentUrl: "https://portfolio.example.com",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tasks: [
      {
        id: "task-1",
        projectId: "project-1",
        title: "Design homepage layout",
        status: "complete",
        createdAt: "2025-03-01T00:00:00Z",
        updatedAt: "2025-03-03T00:00:00Z",
      },
      {
        id: "task-2",
        projectId: "project-1",
        title: "Implement projects section",
        status: "complete",
        createdAt: "2025-03-03T00:00:00Z",
        updatedAt: "2025-03-05T00:00:00Z",
      },
      {
        id: "task-3",
        projectId: "project-1",
        title: "Add contact form",
        description: "Create a contact form with email validation and submission",
        status: "pending",
        dueDate: "2025-04-25T00:00:00Z",
        createdAt: "2025-03-05T00:00:00Z",
        updatedAt: "2025-03-05T00:00:00Z",
      },
      {
        id: "task-4",
        projectId: "project-1",
        title: "Optimize for mobile",
        status: "pending",
        dueDate: "2025-04-30T00:00:00Z",
        createdAt: "2025-03-10T00:00:00Z",
        updatedAt: "2025-03-10T00:00:00Z",
      },
    ],
    startDate: "2025-03-01T00:00:00Z",
    targetCompletionDate: "2025-04-30T00:00:00Z",
    createdAt: "2025-03-01T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
  },
  {
    id: "project-2",
    title: "E-commerce Dashboard",
    description: "Admin dashboard for managing an e-commerce store.",
    status: "not-started",
    githubUrl: null,
    deploymentUrl: null,
    techStack: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    tasks: [
      {
        id: "task-5",
        projectId: "project-2",
        title: "Create project plan",
        status: "pending",
        dueDate: "2025-04-20T00:00:00Z",
        createdAt: "2025-04-10T00:00:00Z",
        updatedAt: "2025-04-10T00:00:00Z",
      },
      {
        id: "task-6",
        projectId: "project-2",
        title: "Set up project repository",
        status: "pending",
        createdAt: "2025-04-10T00:00:00Z",
        updatedAt: "2025-04-10T00:00:00Z",
      },
    ],
    startDate: "2025-04-15T00:00:00Z",
    targetCompletionDate: "2025-06-30T00:00:00Z",
    createdAt: "2025-04-10T00:00:00Z",
    updatedAt: "2025-04-10T00:00:00Z",
  },
  {
    id: "project-3",
    title: "Task Management App",
    description: "A simple task management application with drag-and-drop functionality.",
    status: "completed",
    githubUrl: "https://github.com/user/task-app",
    deploymentUrl: "https://tasks.example.com",
    techStack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    tasks: [
      {
        id: "task-7",
        projectId: "project-3",
        title: "Create project structure",
        status: "complete",
        createdAt: "2025-02-01T00:00:00Z",
        updatedAt: "2025-02-03T00:00:00Z",
      },
      {
        id: "task-8",
        projectId: "project-3",
        title: "Implement authentication",
        status: "complete",
        createdAt: "2025-02-03T00:00:00Z",
        updatedAt: "2025-02-10T00:00:00Z",
      },
      {
        id: "task-9",
        projectId: "project-3",
        title: "Add drag and drop feature",
        status: "complete",
        createdAt: "2025-02-10T00:00:00Z",
        updatedAt: "2025-02-20T00:00:00Z",
      },
      {
        id: "task-10",
        projectId: "project-3",
        title: "Deploy to production",
        status: "complete",
        createdAt: "2025-02-25T00:00:00Z",
        updatedAt: "2025-03-01T00:00:00Z",
      },
    ],
    startDate: "2025-02-01T00:00:00Z",
    targetCompletionDate: "2025-03-15T00:00:00Z",
    createdAt: "2025-02-01T00:00:00Z",
    updatedAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "project-4",
    title: "Mobile Fitness App",
    description: "A mobile application for tracking workouts and nutrition.",
    status: "on-hold",
    githubUrl: "https://github.com/user/fitness-app",
    deploymentUrl: null,
    techStack: ["React Native", "TypeScript", "Redux", "Firebase"],
    tasks: [
      {
        id: "task-11",
        projectId: "project-4",
        title: "Create wireframes",
        status: "complete",
        createdAt: "2025-01-15T00:00:00Z",
        updatedAt: "2025-01-20T00:00:00Z",
      },
      {
        id: "task-12",
        projectId: "project-4",
        title: "Set up React Native environment",
        status: "complete",
        createdAt: "2025-01-20T00:00:00Z",
        updatedAt: "2025-01-25T00:00:00Z",
      },
      {
        id: "task-13",
        projectId: "project-4",
        title: "Implement user authentication",
        status: "pending",
        createdAt: "2025-01-25T00:00:00Z",
        updatedAt: "2025-01-30T00:00:00Z",
      },
    ],
    startDate: "2025-01-15T00:00:00Z",
    targetCompletionDate: null,
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-02-01T00:00:00Z",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return sampleProjects.find(project => project.id === id);
};

export const getTasksForProject = (projectId: string): Task[] => {
  const project = sampleProjects.find(p => p.id === projectId);
  return project ? project.tasks : [];
};

export const getCalendarEvents = () => {
  const events = [];
  
  for (const project of sampleProjects) {
    // Add project start dates
    if (project.startDate) {
      events.push({
        id: `start-${project.id}`,
        title: `Start: ${project.title}`,
        projectId: project.id,
        projectTitle: project.title,
        date: project.startDate,
      });
    }
    
    // Add project target completion dates
    if (project.targetCompletionDate) {
      events.push({
        id: `complete-${project.id}`,
        title: `Due: ${project.title}`,
        projectId: project.id,
        projectTitle: project.title,
        date: project.targetCompletionDate,
      });
    }
    
    // Add task due dates
    for (const task of project.tasks) {
      if (task.dueDate) {
        events.push({
          id: `task-${task.id}`,
          title: task.title,
          projectId: project.id,
          projectTitle: project.title,
          date: task.dueDate,
          taskId: task.id,
        });
      }
    }
  }
  
  return events;
};
