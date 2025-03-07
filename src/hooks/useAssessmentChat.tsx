
import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { ChatMessage } from '@/types';
import { getAdvisorResponse } from '@/lib/career-advisor-data';

// Initial welcome message
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'll help you discover career paths that match your skills and interests. Let's start with a simple question: What subjects or activities do you enjoy the most?",
    timestamp: new Date(),
    options: ['Technology', 'Creative Arts', 'Business', 'Science', 'Healthcare', 'Education', 'Social Services']
  }
];

export const useAssessmentChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(1);
  const { toast } = useToast();
  
  // Memoize frequently accessed data
  const latestMessages = useMemo(() => {
    return messages.slice(-5);
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      message: messageContent,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

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

  return {
    messages,
    isTyping,
    assessmentStage,
    handleSendMessage
  };
};
