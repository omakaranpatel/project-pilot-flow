
import React, { createContext, useContext, useState } from 'react';
import { Project, Task, ProjectStatus, TaskStatus } from '@/types';
import { sampleProjects } from '@/data/sampleData';
import { toast } from 'sonner';

interface ProjectContextType {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => Project;
  updateProject: (project: Partial<Project> & { id: string }) => Project;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>) => Task;
  updateTask: (projectId: string, task: Partial<Task> & { id: string }) => Task;
  deleteTask: (projectId: string, taskId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      id: `project-${Date.now()}`,
      tasks: [],
      createdAt: now,
      updatedAt: now,
      ...project,
    };

    setProjects(prev => [...prev, newProject]);
    toast.success('Project created successfully');
    return newProject;
  };

  const updateProject = (updatedFields: Partial<Project> & { id: string }) => {
    const { id } = updatedFields;
    
    setProjects(prev => prev.map(project => {
      if (project.id === id) {
        return {
          ...project,
          ...updatedFields,
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));

    toast.success('Project updated successfully');
    return projects.find(project => project.id === id)!;
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success('Project deleted successfully');
  };

  const addTask = (projectId: string, task: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId,
      createdAt: now,
      updatedAt: now,
      ...task,
    };

    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: [...project.tasks, newTask],
          updatedAt: now,
        };
      }
      return project;
    }));

    toast.success('Task added successfully');
    return newTask;
  };

  const updateTask = (projectId: string, updatedFields: Partial<Task> & { id: string }) => {
    const { id } = updatedFields;
    const now = new Date().toISOString();

    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === id) {
            return {
              ...task,
              ...updatedFields,
              updatedAt: now,
            };
          }
          return task;
        });

        return {
          ...project,
          tasks: updatedTasks,
          updatedAt: now,
        };
      }
      return project;
    }));

    toast.success('Task updated successfully');
    const project = projects.find(p => p.id === projectId);
    return project?.tasks.find(t => t.id === id)!;
  };

  const deleteTask = (projectId: string, taskId: string) => {
    const now = new Date().toISOString();

    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId),
          updatedAt: now,
        };
      }
      return project;
    }));

    toast.success('Task deleted successfully');
  };

  const value = {
    projects,
    getProject,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
