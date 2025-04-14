import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { ChatMessage, CareerRoadmap } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { initialMessages, predefinedResponses, careerRoadmaps } from './assessment/assessmentData';
import { parseStoredMessages, getStageDescription, determineRoadmapType } from './assessment/assessmentUtils';
import { getAdvisorResponse } from '@/lib/career-advisor'; // Updated import

export const useAssessmentChat = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  
  // Load persisted data from localStorage if available (with user-specific key)
  const loadPersistedData = () => {
    try {
      const savedMessages = localStorage.getItem(`assessmentMessages_${userId}`);
      const savedStage = localStorage.getItem(`assessmentStage_${userId}`);
      const savedRoadmap = localStorage.getItem(`careerRoadmap_${userId}`);

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
  
  // Persist state to localStorage whenever it changes (with user-specific key)
  useEffect(() => {
    try {
      localStorage.setItem(`assessmentMessages_${userId}`, JSON.stringify(messages));
      localStorage.setItem(`assessmentStage_${userId}`, assessmentStage.toString());
      if (careerRoadmap) {
        localStorage.setItem(`careerRoadmap_${userId}`, JSON.stringify(careerRoadmap));
      }
    } catch (error) {
      console.error('Error persisting assessment data:', error);
    }
  }, [messages, assessmentStage, careerRoadmap, userId]);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim()) return;

    console.log("Sending message:", messageContent);
    
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
      // Simulate processing time for more natural interaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find a matching predefined response or use default for current stage
      let response = predefinedResponses[messageContent];
      
      // If no direct match, use default for current stage
      if (!response) {
        response = predefinedResponses[`default_stage_${assessmentStage}`];
      }
      
      // Handle special case for skipping to recommendations
      if (messageContent.toLowerCase().includes('skip')) {
        response = {
          message: "Let's jump to career recommendations based on common interests and skills. Here are some popular career paths:\n\n1. **Software Development**\n   - Building applications and websites\n   - Skills: Programming, problem-solving\n   - Growth: High demand field\n\n2. **Data Analysis**\n   - Analyzing data to extract insights\n   - Skills: Statistical analysis, visualization\n   - Growth: Rapidly expanding field\n\n3. **UX/UI Design**\n   - Creating user-friendly digital experiences\n   - Skills: Visual design, user research\n   - Growth: Essential in modern product development\n\nWhich of these sounds most interesting to you?",
          options: ['Tell me more about Software Development', 'Tell me more about Data Analysis', 'Tell me more about UX/UI Design'],
          nextStage: 4
        };
      }
      
      // Add bot response
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: response.message,
        timestamp: new Date(),
        options: response.options || [],
        stageWhenSent: assessmentStage
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update stage if response indicates advancement
      if (response.nextStage && response.nextStage !== assessmentStage) {
        console.log(`Advancing to stage ${response.nextStage}`);
        setAssessmentStage(response.nextStage);
        
        // Show toast for stage advancement
        toast({
          title: `Stage ${response.nextStage} of 5`,
          description: getStageDescription(response.nextStage),
          duration: 4000,
        });
      }
      
      // Update career roadmap in later stages
      if (assessmentStage >= 3) {
        const roadmapType = determineRoadmapType(messageContent);
        setCareerRoadmap(careerRoadmaps[roadmapType]);
      }
      
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      
      // Add a fallback bot message
      const fallbackResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: "I'm sorry, I'm having trouble processing that. Could you try again or choose one of the options below?",
        timestamp: new Date(),
        options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"],
        stageWhenSent: assessmentStage
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [assessmentStage, toast, userId]);
  
  // Add a method to clear chat history
  const resetAssessment = useCallback(() => {
    localStorage.removeItem(`assessmentMessages_${userId}`);
    localStorage.removeItem(`assessmentStage_${userId}`);
    localStorage.removeItem(`careerRoadmap_${userId}`);
    setMessages(initialMessages);
    setAssessmentStage(1);
    setCareerRoadmap(null);
    
    toast({
      title: "Assessment Reset",
      description: "Your career assessment has been reset.",
      duration: 3000,
    });
  }, [toast, userId]);

  return {
    messages,
    isTyping,
    assessmentStage,
    careerRoadmap,
    handleSendMessage,
    resetAssessment
  };
};
