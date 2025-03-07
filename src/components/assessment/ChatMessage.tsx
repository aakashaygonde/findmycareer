
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';

interface ChatMessageItemProps {
  message: ChatMessage;
  onOptionClick?: (option: string) => void;
}

const ChatMessageItem = memo(({ message, onOptionClick }: ChatMessageItemProps) => {
  return (
    <div
      className={cn(
        "flex w-max max-w-[85%] animate-scale-in",
        message.sender === 'user' ? "ml-auto" : "mr-auto"
      )}
    >
      <Card
        className={cn(
          "px-4 py-3 shadow-sm transition-all",
          message.sender === 'user'
            ? "bg-primary text-primary-foreground"
            : "bg-card"
        )}
      >
        <div className="flex items-center space-x-2 mb-1">
          {message.sender === 'bot' ? (
            <Bot className="h-4 w-4" />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="text-xs font-medium">
            {message.sender === 'bot' ? 'Career Advisor' : 'You'}
          </span>
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="whitespace-pre-wrap">{message.message}</div>
        
        {message.options && message.sender === 'bot' && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.options.map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                className="text-xs transition-all hover:scale-105 bg-background hover:bg-background/80"
                onClick={() => onOptionClick && onOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
});

ChatMessageItem.displayName = 'ChatMessageItem';

export default ChatMessageItem;
