
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';

interface ChatMessageItemProps {
  message: ChatMessage;
  onOptionClick?: (option: string) => void;
}

const ChatMessageItem = memo(({ message, onOptionClick }: ChatMessageItemProps) => {
  // Format the timestamp based on whether it's a string or Date object
  const formatTimestamp = () => {
    if (typeof message.timestamp === 'string') {
      return new Date(message.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return message.timestamp.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

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
            {formatTimestamp()}
          </span>
        </div>
        <div className="whitespace-pre-wrap">{message.message}</div>
        
        {message.options && message.sender === 'bot' && (
          <div className="mt-3">
            <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>Suggested responses:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {message.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  className="text-xs py-1 h-auto text-left justify-start transition-all hover:bg-background/80"
                  onClick={() => onOptionClick && onOptionClick(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
});

ChatMessageItem.displayName = 'ChatMessageItem';

export default ChatMessageItem;
