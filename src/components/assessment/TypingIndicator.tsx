
import React from 'react';
import { Card } from '@/components/ui/card';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-max max-w-[60%] animate-scale-in">
      <Card className="px-4 py-3 bg-card shadow-sm">
        <div className="flex items-center space-x-2 mb-1">
          <Bot className="h-4 w-4" />
          <span className="text-xs font-medium">Career Advisor</span>
        </div>
        <div className="flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
      </Card>
    </div>
  );
};

export default TypingIndicator;
