
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useProjects } from '@/contexts/ProjectContext';
import { getCalendarEvents } from '@/data/sampleData';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const events = getCalendarEvents();
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <PageHeader
          title="Calendar"
          description="View project deadlines and scheduled tasks."
        >
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[150px] text-center font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </PageHeader>

        <Card className="mt-6">
          <CardContent className="p-4">
            {/* Calendar header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-sm font-medium text-center py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Fill in days from previous month to align first day */}
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div key={`prev-${index}`} className="h-24 p-1 bg-secondary/30 rounded-md"></div>
              ))}
              
              {/* Current month days */}
              {daysInMonth.map(day => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div 
                    key={day.toString()}
                    className={cn(
                      "min-h-24 p-1 border rounded-md flex flex-col",
                      isToday ? "border-primary/50 bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="text-right p-1">
                      <span className={cn(
                        "text-sm inline-block rounded-full w-6 h-6 flex items-center justify-center",
                        isToday && "bg-primary text-primary-foreground"
                      )}>
                        {format(day, 'd')}
                      </span>
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      {dayEvents.map(event => (
                        <Link key={event.id} to={`/project/${event.projectId}`}>
                          <Badge 
                            variant="outline" 
                            className="w-full justify-start mb-1 truncate py-1 border-primary/30 bg-primary/5 hover:bg-primary/10"
                          >
                            {event.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CalendarView;
