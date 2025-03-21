
import React, { useRef, useEffect, memo } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAssessmentChat } from '@/hooks/useAssessmentChat';
import ChatMessageItem from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Using memo to prevent unnecessary re-renders
const AssessmentChat: React.FC = memo(() => {
  const { messages, isTyping, assessmentStage, handleSendMessage, resetAssessment } = useAssessmentChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [messages]);

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  // Determine the stage name based on current assessment stage
  const getStageName = (stage: number): string => {
    switch (stage) {
      case 1: return "Exploration";
      case 2: return "Skills Evaluation";
      case 3: return "Values Clarification";
      case 4: return "Career Recommendations";
      case 5: return "Roadmap Creation";
      default: return `Stage ${stage}`;
    }
  };

  return (
    <div className="flex flex-col h-[600px] glass-card rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center justify-between p-4 border-b bg-background/80">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <h3 className="ml-2 font-medium">Career Advisor</h3>
          <div className="ml-2 px-2 py-0.5 bg-primary/20 text-xs rounded-full text-primary">
            {getStageName(assessmentStage)}
          </div>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Assessment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to reset the assessment? This will clear all your conversation history and start over.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetAssessment}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" size="sm" onClick={resetAssessment}>Skip Assessment</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.map((msg) => (
          <ChatMessageItem 
            key={msg.id} 
            message={msg} 
            onOptionClick={handleOptionClick} 
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background/80">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
});

AssessmentChat.displayName = 'AssessmentChat';

export default AssessmentChat;
