
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for initial chat
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'll help you discover career paths that match your skills and interests. Let's start with a simple question: What subjects or activities do you enjoy the most?",
    timestamp: new Date(),
    options: ['Technology', 'Creative Arts', 'Business', 'Science', 'Healthcare']
  }
];

const AssessmentChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text?: string) => {
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

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse: ChatMessage;
      
      // Very simple mock logic for bot responses based on user input
      if (messageContent.toLowerCase().includes('technology') || 
          messageContent.toLowerCase().includes('tech') ||
          messageContent.toLowerCase().includes('coding')) {
        botResponse = {
          id: uuidv4(),
          sender: 'bot',
          message: "Great! Technology is a growing field with many opportunities. What specific aspects of technology interest you the most?",
          timestamp: new Date(),
          options: ['Software Development', 'Data Science', 'Cybersecurity', 'UI/UX Design', 'Cloud Computing']
        };
      } else if (messageContent.toLowerCase().includes('creative') || 
                messageContent.toLowerCase().includes('art') ||
                messageContent.toLowerCase().includes('design')) {
        botResponse = {
          id: uuidv4(),
          sender: 'bot',
          message: "Creative fields offer many ways to express yourself professionally. Which creative areas are you most drawn to?",
          timestamp: new Date(),
          options: ['Graphic Design', 'Content Creation', 'Photography', 'Animation', 'Fashion Design']
        };
      } else {
        botResponse = {
          id: uuidv4(),
          sender: 'bot',
          message: "Thanks for sharing! Now, let's talk about your education level. What's your highest level of education completed or in progress?",
          timestamp: new Date(),
          options: ['High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD or Doctorate']
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="flex flex-col h-[600px] glass-card">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <h3 className="ml-2 font-medium">Career Advisor</h3>
        </div>
        <Button variant="outline" size="sm">Skip Assessment</Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-max max-w-[80%] animate-scale-in",
              msg.sender === 'user' ? "ml-auto" : "mr-auto"
            )}
          >
            <Card
              className={cn(
                "px-4 py-3",
                msg.sender === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
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
              </div>
              <div>{msg.message}</div>
              
              {msg.options && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      size="sm"
                      className={msg.sender === 'bot' ? "bg-background hover:bg-background/80" : ""}
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
          <div className="flex w-max max-w-[80%] animate-scale-in">
            <Card className="px-4 py-3 bg-secondary">
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

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentChat;
