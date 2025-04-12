
import React, { useState } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useProjects } from '@/contexts/ProjectContext';

interface TaskItemProps {
  task: Task;
  projectId: string;
  onEdit: (task: Task) => void;
}

const TaskItem = ({ task, projectId, onEdit }: TaskItemProps) => {
  const { updateTask, deleteTask } = useProjects();
  
  const handleStatusChange = () => {
    updateTask(projectId, {
      id: task.id,
      status: task.status === 'complete' ? 'pending' : 'complete'
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(projectId, task.id);
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 border-b border-border last:border-b-0 group">
      <Checkbox 
        checked={task.status === 'complete'}
        onCheckedChange={handleStatusChange}
        className="mt-1"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className={`font-medium ${task.status === 'complete' ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {task.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} className="text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Calendar className="h-3 w-3 mr-1" />
            Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
