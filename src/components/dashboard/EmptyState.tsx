
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyStateProps } from '@/types/dashboard';

const EmptyState = ({ title, description, actionLabel, actionLink }: EmptyStateProps) => {
  return (
    <Card className="p-6 glass-card col-span-full lg:col-span-2 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center py-8">
        <Compass className="h-16 w-16 text-primary/50 mb-4" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        <Link to={actionLink}>
          <Button className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            {actionLabel}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default EmptyState;
