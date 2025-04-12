
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatusBadge from './StatusBadge';
import { Calendar, Github, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const completedTasks = project.tasks.filter(task => task.status === 'complete').length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="h-full hover:shadow-md transition-all duration-300 hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium line-clamp-1">{project.title}</h3>
            <StatusBadge status={project.status} />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
            {project.description || "No description provided."}
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-secondary rounded-full h-1.5 mb-4">
            <div 
              className="bg-primary h-1.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Task count */}
          <div className="text-xs text-muted-foreground mb-4">
            {completedTasks}/{totalTasks} tasks completed
          </div>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mb-2">
            {project.techStack.slice(0, 3).map(tech => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {project.targetCompletionDate ? (
              <span>Due {format(new Date(project.targetCompletionDate), 'MMM d')}</span>
            ) : (
              <span>No due date</span>
            )}
          </div>
          <div className="flex gap-2">
            {project.githubUrl && <Github size={14} />}
            {project.deploymentUrl && <Globe size={14} />}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
