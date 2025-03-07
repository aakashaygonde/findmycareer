
import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAssessmentChat } from '@/hooks/useAssessmentChat';
import ChatMessageItem from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

const AssessmentChat: React.FC = () => {
  const { messages, isTyping, assessmentStage, handleSendMessage } = useAssessmentChat();
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

  return (
    <div className="flex flex-col h-[600px] glass-card rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center justify-between p-4 border-b bg-background/80">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <h3 className="ml-2 font-medium">Career Advisor</h3>
          <div className="ml-2 px-2 py-0.5 bg-primary/20 text-xs rounded-full text-primary">
            Stage {assessmentStage}/5
          </div>
        </div>
        <Button variant="outline" size="sm">Skip Assessment</Button>
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
};

export default AssessmentChat;
