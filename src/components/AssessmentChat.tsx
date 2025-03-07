
import React, { useState, useRef, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { careerAdvice, getAdvisorResponse } from '@/lib/career-advisor-data';

// Initial welcome message - memoized to prevent re-creation
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'll help you discover career paths that match your skills and interests. Let's start with a simple question: What subjects or activities do you enjoy the most?",
    timestamp: new Date(),
    options: ['Technology', 'Creative Arts', 'Business', 'Science', 'Healthcare', 'Education', 'Social Services']
  }
];

// Memoize individual message components for better performance
const ChatMessageItem = memo(({ message }: { message: ChatMessage }) => {
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
        
        {message.options && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.options.map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs transition-all hover:scale-105",
                  message.sender === 'bot' ? "bg-background hover:bg-background/80" : ""
                )}
                onClick={() => {}}
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

// Options buttons component - memoized
const OptionButtons = memo(({ options, onOptionClick }: { options: string[], onOptionClick: (option: string) => void }) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          variant="outline"
          size="sm"
          className="text-xs transition-all hover:scale-105 bg-background hover:bg-background/80"
          onClick={() => onOptionClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
});

OptionButtons.displayName = 'OptionButtons';

const AssessmentChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(1);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // Memoize frequently accessed data
  const latestMessages = React.useMemo(() => {
    return messages.slice(-5);
  }, [messages]);

  // Auto-scroll to bottom when messages change - optimized
  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus textarea when switching to multiline
  useEffect(() => {
    if (isMultiLine && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isMultiLine]);

  const handleSendMessage = async (text?: string) => {
    const messageContent = text || inputValue;
    if (!messageContent.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      message: messageContent,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsMultiLine(false); // Reset to single line input after sending

    try {
      // Use more minimal delay simulation
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 300));
      
      // Get response based on improved local algorithm - using memoized messages
      const response = getAdvisorResponse(messageContent, latestMessages, assessmentStage);
      
      // Add bot response
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: response.message,
        timestamp: new Date(),
        options: response.options
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update assessment stage if applicable
      if (response.advanceStage) {
        setAssessmentStage(prev => Math.min(prev + 1, 6));
        
        // Show toast for stage advancement
        if (assessmentStage < 5) {
          toast({
            title: "Assessment Progress",
            description: `Moving to the next stage of your career assessment.`,
            duration: 3000,
          });
        }
      }
      
    } catch (error) {
      console.error('Error getting response:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again with a different question.",
        variant: "destructive"
      });
      
      // Fallback response if something fails
      const fallbackResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: "I'm sorry, I'm having trouble processing that. Could you try rephrasing or asking something else?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Send message on Enter key (unless shift is pressed for new line in textarea)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleInputMode = () => {
    setIsMultiLine(!isMultiLine);
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
          <div
            key={msg.id}
            className={cn(
              "flex w-max max-w-[85%] animate-scale-in",
              msg.sender === 'user' ? "ml-auto" : "mr-auto"
            )}
          >
            <Card
              className={cn(
                "px-4 py-3 shadow-sm transition-all",
                msg.sender === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-card"
              )}
            >
              <div className="flex items-center space-x-2 mb-1">
                {msg.sender === 'bot' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-xs font-medium">
                  {msg.sender === 'bot' ? 'Career Advisor' : 'You'}
                </span>
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="whitespace-pre-wrap">{msg.message}</div>
              
              {msg.options && msg.sender === 'bot' && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      size="sm"
                      className="text-xs transition-all hover:scale-105 bg-background hover:bg-background/80"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
        
        {isTyping && (
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
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          {isMultiLine ? (
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your detailed response... (Shift+Enter for new line)"
              className="flex-1 min-h-[80px] max-h-[150px]"
            />
          ) : (
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
          )}
          
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={toggleInputMode}
            title={isMultiLine ? "Switch to single line" : "Switch to multi-line"}
          >
            <Sparkles className="h-4 w-4" />
          </Button>
          
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentChat;
