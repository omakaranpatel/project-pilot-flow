
import React, { useState } from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskDialog from './TaskDialog';

interface TaskListProps {
  projectId: string;
  tasks: Task[];
}

const TaskList = ({ projectId, tasks }: TaskListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenDialog = (task: Task | null = null) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const completedTasks = tasks.filter(task => task.status === 'complete');
  const pendingTasks = tasks.filter(task => task.status === 'pending');

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <Button size="sm" onClick={() => handleOpenDialog(null)} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {tasks.length === 0 ? (
            <p className="text-center py-6 text-muted-foreground">No tasks yet. Add some tasks to get started.</p>
          ) : (
            <div>
              {pendingTasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Pending ({pendingTasks.length})
                  </h3>
                  <div className="rounded-md border">
                    {pendingTasks.map(task => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        projectId={projectId}
                        onEdit={(task) => handleOpenDialog(task)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {completedTasks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Completed ({completedTasks.length})
                  </h3>
                  <div className="rounded-md border">
                    {completedTasks.map(task => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        projectId={projectId} 
                        onEdit={(task) => handleOpenDialog(task)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <TaskDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        projectId={projectId}
        task={selectedTask}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default TaskList;
