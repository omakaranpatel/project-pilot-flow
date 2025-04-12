
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TaskList from '@/components/tasks/TaskList';
import StatusBadge from '@/components/projects/StatusBadge';
import { ProjectStatus } from '@/types';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  CalendarIcon, 
  Edit2, 
  Github, 
  Globe, 
  Plus, 
  Save, 
  Trash2, 
  X 
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject } = useProjects();
  const project = getProject(projectId || '');

  const [isEditing, setIsEditing] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');
  
  const handleStatusChange = (status: ProjectStatus) => {
    if (project) {
      updateProject({ id: project.id, status });
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      e.preventDefault();
      if (project && !project.techStack.includes(newTag)) {
        updateProject({
          id: project.id,
          techStack: [...project.techStack, newTag.trim()]
        });
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (project) {
      updateProject({
        id: project.id,
        techStack: project.techStack.filter(t => t !== tag)
      });
    }
  };

  const handleDateChange = (field: 'startDate' | 'targetCompletionDate', date: Date | undefined) => {
    if (project && date) {
      updateProject({
        id: project.id,
        [field]: date.toISOString()
      });
    } else if (project) {
      updateProject({
        id: project.id,
        [field]: null
      });
    }
  };

  const handleDelete = () => {
    if (project && confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(project.id);
      navigate('/dashboard');
    }
  };

  const handleDataChange = (field: string, value: string) => {
    if (project) {
      updateProject({
        id: project.id,
        [field]: value
      });
    }
  };

  useEffect(() => {
    if (!project) {
      navigate('/not-found');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
            <div>
              {isEditing ? (
                <Input
                  value={project.title}
                  onChange={(e) => handleDataChange('title', e.target.value)}
                  className="text-2xl font-bold px-3 py-1 h-auto"
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h1>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Select 
                value={project.status} 
                onValueChange={handleStatusChange as any}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">
                    <StatusBadge status="not-started" />
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <StatusBadge status="in-progress" />
                  </SelectItem>
                  <SelectItem value="completed">
                    <StatusBadge status="completed" />
                  </SelectItem>
                  <SelectItem value="on-hold">
                    <StatusBadge status="on-hold" />
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-1"
              >
                {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleDelete}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project description */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={project.description || ''}
                    onChange={(e) => handleDataChange('description', e.target.value)}
                    placeholder="Enter project description..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {project.description || "No description provided."}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tasks */}
            <TaskList projectId={project.id} tasks={project.tasks} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub Repository</Label>
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="githubUrl"
                        value={project.githubUrl || ''}
                        onChange={(e) => handleDataChange('githubUrl', e.target.value)}
                        placeholder="GitHub URL..."
                      />
                    ) : (
                      project.githubUrl ? (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {project.githubUrl}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Not specified</span>
                      )
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deploymentUrl">Deployment URL</Label>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="deploymentUrl"
                        value={project.deploymentUrl || ''}
                        onChange={(e) => handleDataChange('deploymentUrl', e.target.value)}
                        placeholder="Deployment URL..."
                      />
                    ) : (
                      project.deploymentUrl ? (
                        <a 
                          href={project.deploymentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {project.deploymentUrl}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Not specified</span>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tech Stack */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="flex gap-1 items-center py-1">
                      {tech}
                      {isEditing && (
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => handleRemoveTag(tech)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div>
                    <Input
                      placeholder="Add tech stack (press Enter)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="mt-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Dates */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  {isEditing ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left",
                            !project.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {project.startDate ? (
                            format(new Date(project.startDate), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={project.startDate ? new Date(project.startDate) : undefined}
                          onSelect={(date) => handleDateChange('startDate', date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {project.startDate ? 
                          format(new Date(project.startDate), "PPP") : 
                          <span className="text-muted-foreground">Not specified</span>
                        }
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Target Completion Date</Label>
                  {isEditing ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left",
                            !project.targetCompletionDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {project.targetCompletionDate ? (
                            format(new Date(project.targetCompletionDate), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={project.targetCompletionDate ? new Date(project.targetCompletionDate) : undefined}
                          onSelect={(date) => handleDateChange('targetCompletionDate', date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {project.targetCompletionDate ? 
                          format(new Date(project.targetCompletionDate), "PPP") : 
                          <span className="text-muted-foreground">Not specified</span>
                        }
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
