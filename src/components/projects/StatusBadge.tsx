
import React from 'react';
import { ProjectStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Circle, Clock, CheckCircle, PauseCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: ProjectStatus) => {
    switch (status) {
      case 'not-started':
        return {
          label: 'Not Started',
          icon: Circle,
          className: 'status-badge-not-started',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: Clock,
          className: 'status-badge-in-progress',
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle,
          className: 'status-badge-completed',
        };
      case 'on-hold':
        return {
          label: 'On Hold',
          icon: PauseCircle,
          className: 'status-badge-on-hold',
        };
      default:
        return {
          label: 'Unknown',
          icon: Circle,
          className: '',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={cn("status-badge", config.className, className)}>
      <config.icon className="w-3 h-3 mr-1" />
      {config.label}
    </div>
  );
};

export default StatusBadge;
