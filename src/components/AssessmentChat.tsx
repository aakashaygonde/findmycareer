import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

    try {
      // Get all messages except the initial bot message to keep context manageable
      const conversationHistory = messages.length > 1 
        ? messages.slice(1) 
        : [];
      
      // Add the new user message to the history
      const fullHistory = [...conversationHistory, userMessage];
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('career-advisor', {
        body: { 
          message: messageContent,
          conversationHistory: fullHistory 
        },
      });

      if (error) {
        console.error('Error calling career-advisor function:', error);
        throw new Error(error.message);
      }

      // Add bot response
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: data.message,
        timestamp: new Date(),
        options: data.options
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from the career advisor. Please try again.",
        variant: "destructive"
      });
      
      // Fallback response if API fails
      const fallbackResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: "I'm sorry, I'm having trouble connecting to my knowledge base. Could you please try again in a moment?",
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
