
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { ChatMessage, CareerRoadmap } from '@/types';
import { supabase } from '@/integrations/supabase/client';

// Initial welcome message with proper Date object
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

// Helper function to parse dates from storage
const parseStoredMessages = (messages: any[]): ChatMessage[] => {
  return messages.map(msg => ({
    ...msg,
    timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp
  }));
};

export const useAssessmentChat = () => {
  // Load persisted data from localStorage if available
  const loadPersistedData = () => {
    try {
      const savedMessages = localStorage.getItem('assessmentMessages');
      const savedStage = localStorage.getItem('assessmentStage');
      const savedRoadmap = localStorage.getItem('careerRoadmap');

      return {
        messages: savedMessages 
          ? parseStoredMessages(JSON.parse(savedMessages)) 
          : initialMessages,
        stage: savedStage ? parseInt(savedStage, 10) : 1,
        roadmap: savedRoadmap ? JSON.parse(savedRoadmap) : null
      };
    } catch (error) {
      console.error('Error loading persisted assessment data:', error);
      return { messages: initialMessages, stage: 1, roadmap: null };
    }
  };

  const persistedData = loadPersistedData();
  const [messages, setMessages] = useState<ChatMessage[]>(persistedData.messages);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(persistedData.stage);
  const [careerRoadmap, setCareerRoadmap] = useState<CareerRoadmap | null>(persistedData.roadmap);
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Persist state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('assessmentMessages', JSON.stringify(messages));
      localStorage.setItem('assessmentStage', assessmentStage.toString());
      if (careerRoadmap) {
        localStorage.setItem('careerRoadmap', JSON.stringify(careerRoadmap));
      }
    } catch (error) {
      console.error('Error persisting assessment data:', error);
    }
  }, [messages, assessmentStage, careerRoadmap]);

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
    console.log("useAssessmentChat hook initialized");
    
    return () => {
      console.log("useAssessmentChat hook cleanup");
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim()) return;

    console.log("Sending message:", messageContent);

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();

    // Add user message with proper Date object
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
      // Delay to simulate processing (makes the interface feel more natural)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the Supabase edge function for response
      console.log("Calling career-advisor edge function with stage:", assessmentStage);
      const response = await supabase.functions.invoke('career-advisor', {
        body: { 
          message: messageContent,
          conversationHistory,
          stage: assessmentStage
        }
      });
      
      console.log("Edge function response:", response);
      
      if (response.error) {
        throw new Error(`Edge function error: ${response.error.message || 'Unknown error'}`);
      }
      
      const data = response.data;
      
      if (!data || !data.message) {
        throw new Error('Invalid response from edge function');
      }
      
      // Add bot response with proper Date object
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: data.message,
        timestamp: new Date(),
        options: data.options || [],
        stageWhenSent: assessmentStage
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update assessment stage if the function suggests advancing
      if (data.nextStage && data.nextStage !== assessmentStage) {
        console.log(`Advancing to stage ${data.nextStage}`);
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
        console.log("Setting career roadmap:", data.careerRoadmap);
        setCareerRoadmap(data.careerRoadmap);
      }
      
    } catch (error) {
      // Only show error if it's not an abort error
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error('Error getting response:', error);
        toast({
          title: "Error",
          description: "Failed to get a response. Please try again.",
          variant: "destructive"
        });
        
        // Add a fallback bot message so the user doesn't see the typing animation disappear without a response
        const fallbackResponse: ChatMessage = {
          id: uuidv4(),
          sender: 'bot',
          message: "I'm sorry, I'm having trouble processing that. Could you try again or ask something else?",
          timestamp: new Date(),
          options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"],
          stageWhenSent: assessmentStage
        };
        
        setMessages(prev => [...prev, fallbackResponse]);
      } else {
        console.log("Request was aborted");
      }
    } finally {
      setIsTyping(false);
      // Clear the abort controller reference
      abortControllerRef.current = null;
    }
  }, [assessmentStage, conversationHistory, toast]);

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
  
  // Add a method to clear chat history
  const resetAssessment = useCallback(() => {
    localStorage.removeItem('assessmentMessages');
    localStorage.removeItem('assessmentStage');
    localStorage.removeItem('careerRoadmap');
    setMessages(initialMessages);
    setAssessmentStage(1);
    setCareerRoadmap(null);
  }, []);

  return {
    messages,
    isTyping,
    assessmentStage,
    careerRoadmap,
    handleSendMessage,
    resetAssessment
  };
};
