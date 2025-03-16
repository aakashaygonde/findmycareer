
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { ChatMessage, CareerRoadmap } from '@/types';
import { supabase } from '@/integrations/supabase/client';

// Initial welcome message
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'm here to help you discover career paths that match your skills, interests, and values. Tell me about yourself - what subjects, activities, or types of work do you enjoy the most?",
    timestamp: new Date(),
    options: ['I enjoy working with technology', 'I like creative activities', 'I prefer helping people'],
    stageWhenSent: 1
  }
];

export const useAssessmentChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(1);
  const [careerRoadmap, setCareerRoadmap] = useState<CareerRoadmap | null>(null);
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Memoize conversation history for the AI to prevent unnecessary recalculations
  const conversationHistory = useMemo(() => {
    return messages.map(msg => ({
      sender: msg.sender,
      message: msg.message,
      stageWhenSent: msg.stageWhenSent || 1 // Default to stage 1 if not specified
    }));
  }, [messages]);

  // Cleanup function for aborted requests
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim()) return;

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      message: messageContent,
      timestamp: new Date(),
      stageWhenSent: assessmentStage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call the Supabase edge function for AI response
      const { data, error } = await supabase.functions.invoke('career-advisor', {
        body: { 
          message: messageContent,
          conversationHistory,
          stage: assessmentStage
        },
        signal: abortControllerRef.current.signal
      });
      
      if (error) throw error;
      
      // Add bot response
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: data.message,
        timestamp: new Date(),
        options: data.options,
        stageWhenSent: assessmentStage
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update assessment stage if the function suggests advancing
      if (data.nextStage && data.nextStage !== assessmentStage) {
        setAssessmentStage(data.nextStage);
        
        // Show toast for stage advancement
        toast({
          title: `Stage ${data.nextStage} of 5`,
          description: getStageDescription(data.nextStage),
          duration: 4000,
        });
      }
      
      // Update career roadmap if provided
      if (data.careerRoadmap) {
        setCareerRoadmap(data.careerRoadmap);
      }
      
    } catch (error) {
      // Only show error if it's not an abort error
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
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
          timestamp: new Date(),
          options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"],
          stageWhenSent: assessmentStage
        };
        
        setMessages(prev => [...prev, fallbackResponse]);
      }
    } finally {
      setIsTyping(false);
      // Clear the abort controller reference
      abortControllerRef.current = null;
    }
  }, [messages, conversationHistory, assessmentStage, toast]);

  // Helper function to get description for each assessment stage
  const getStageDescription = (stage: number): string => {
    switch (stage) {
      case 1:
        return "Exploration - Understanding your interests and passions";
      case 2:
        return "Skills Evaluation - Identifying your strengths and abilities";
      case 3:
        return "Values Clarification - Understanding what matters to you";
      case 4:
        return "Career Recommendations - Suggesting specific career paths";
      case 5:
        return "Roadmap Creation - Building your personalized career plan";
      default:
        return "Moving to the next stage of your career assessment";
    }
  };

  return {
    messages,
    isTyping,
    assessmentStage,
    careerRoadmap,
    handleSendMessage
  };
};
