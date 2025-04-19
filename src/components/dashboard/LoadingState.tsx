
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LoadingStateProps } from '@/types/dashboard';

const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <Card className="p-6 col-span-full flex justify-center items-center min-h-[300px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">{message}</span>
    </Card>
  );
};

export default LoadingState;
