
import React, { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { ProjectStatus } from '@/types';
import PageHeader from '@/components/layout/PageHeader';
import MainLayout from '@/layouts/MainLayout';
import ProjectCard from '@/components/projects/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');

  const filterProjects = (status: ProjectStatus | 'all') => {
    return projects
      .filter(project => 
        status === 'all' || project.status === status
      )
      .filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  };

  const allProjects = filterProjects('all');
  const notStartedProjects = filterProjects('not-started');
  const inProgressProjects = filterProjects('in-progress');
  const completedProjects = filterProjects('completed');
  const onHoldProjects = filterProjects('on-hold');

  const renderProjectGrid = (filteredProjects: typeof projects) => {
    if (filteredProjects.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No projects found. Create your first project to get started!</p>
          <Link to="/project/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <PageHeader
          title="Projects"
          description="Manage and track all your projects."
        >
          <Link to="/project/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </Link>
        </PageHeader>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({allProjects.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressProjects.length})</TabsTrigger>
            <TabsTrigger value="not-started">Not Started ({notStartedProjects.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold ({onHoldProjects.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {renderProjectGrid(allProjects)}
          </TabsContent>

          <TabsContent value="in-progress" className="mt-0">
            {renderProjectGrid(inProgressProjects)}
          </TabsContent>

          <TabsContent value="not-started" className="mt-0">
            {renderProjectGrid(notStartedProjects)}
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            {renderProjectGrid(completedProjects)}
          </TabsContent>

          <TabsContent value="on-hold" className="mt-0">
            {renderProjectGrid(onHoldProjects)}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
