import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectStatus } from '@/types';
import { ArrowLeft, Calendar as CalendarIcon, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  status: z.enum(['not-started', 'in-progress', 'completed', 'on-hold']),
  githubUrl: z.string().optional(),
  deploymentUrl: z.string().optional(),
  startDate: z.date().optional().nullable(),
  targetCompletionDate: z.date().optional().nullable(),
});

type FormData = z.infer<typeof formSchema>;

const NewProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [techStack, setTechStack] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState('');
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'not-started',
      githubUrl: '',
      deploymentUrl: '',
      startDate: null,
      targetCompletionDate: null,
    },
  });
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      e.preventDefault();
      if (!techStack.includes(newTag)) {
        setTechStack([...techStack, newTag.trim()]);
      }
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTechStack(techStack.filter(t => t !== tag));
  };
  
  const onSubmit = (data: FormData) => {
    const newProject = addProject({
      title: data.title,
      description: data.description,
      status: data.status,
      githubUrl: data.githubUrl || null,
      deploymentUrl: data.deploymentUrl || null,
      techStack: techStack,
      startDate: data.startDate ? data.startDate.toISOString() : null,
      targetCompletionDate: data.targetCompletionDate ? data.targetCompletionDate.toISOString() : null,
    });
    
    navigate(`/project/${newProject.id}`);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard')}
          className="gap-1 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <PageHeader title="Create New Project" />
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    {...form.register('title')}
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                  )}
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter project description"
                    className="min-h-[100px]"
                    {...form.register('description')}
                  />
                </div>
                
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={form.getValues('status')}
                    onValueChange={(value: ProjectStatus) => form.setValue('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Tech Stack */}
                <div className="space-y-2">
                  <Label>Tech Stack</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {techStack.map(tech => (
                      <Badge key={tech} variant="secondary" className="flex gap-1 items-center py-1">
                        {tech}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => handleRemoveTag(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add tech stack (press Enter)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
                
                {/* URLs */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                    <Input
                      id="githubUrl"
                      placeholder="https://github.com/username/repo"
                      {...form.register('githubUrl')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deploymentUrl">Deployment URL (optional)</Label>
                    <Input
                      id="deploymentUrl"
                      placeholder="https://your-app.vercel.app"
                      {...form.register('deploymentUrl')}
                    />
                  </div>
                </div>
                
                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date (optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left",
                            !form.getValues('startDate') && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.getValues('startDate') ? (
                            format(form.getValues('startDate')!, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.getValues('startDate') || undefined}
                          onSelect={(date) => form.setValue('startDate', date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Target Completion Date (optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left",
                            !form.getValues('targetCompletionDate') && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.getValues('targetCompletionDate') ? (
                            format(form.getValues('targetCompletionDate')!, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.getValues('targetCompletionDate') || undefined}
                          onSelect={(date) => form.setValue('targetCompletionDate', date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {/* Submit */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewProject;
