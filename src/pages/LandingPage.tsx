
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

const features = [
  'Track all your personal projects in one place',
  'Manage tasks and deadlines with ease',
  'Tag projects with technologies used',
  'Monitor project status and progress',
  'Store GitHub and deployment links',
  'Calendar view for planning and scheduling',
];

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            Ship your <span className="text-gradient">side projects</span> faster
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl animate-slide-in">
            A minimal project tracker for developers and indie hackers to manage
            projects, track progress, and hit deadlines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/project/new">
              <Button size="lg" variant="outline">
                Create Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Everything you need to manage your projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-card p-8 rounded-xl border max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to track your projects?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start organizing your development projects and boost your productivity.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Go to Dashboard <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
