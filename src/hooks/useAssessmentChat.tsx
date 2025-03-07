
import { useState, useCallback, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { ChatMessage } from '@/types';
import { useSupabase } from '@/integrations/supabase/client';

// Initial welcome message
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'm here to help you discover career paths that match your skills, interests, and values. Tell me about yourself - what subjects, activities, or types of work do you enjoy the most?",
    timestamp: new Date(),
    options: ['I enjoy working with technology', 'I like creative activities', 'I prefer helping people']
  }
];

export const useAssessmentChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(1);
  const { toast } = useToast();
  const supabase = useSupabase();
  
  // Memoize conversation history for the AI
  const conversationHistory = useMemo(() => {
    return messages.map(msg => ({
      sender: msg.sender,
      message: msg.message
    }));
  }, [messages]);

  const handleSendMessage = useCallback(async (messageContent: string) => {
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
      // Call the Supabase edge function for AI response
      const { data, error } = await supabase.functions.invoke('career-advisor', {
        body: { 
          message: messageContent,
          conversationHistory
        }
      });
      
      if (error) throw error;
      
      // Add bot response
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: data.message,
        timestamp: new Date(),
        options: data.options
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update assessment stage based on conversation progress
      if (assessmentStage < 5 && messages.length > assessmentStage * 3) {
        setAssessmentStage(prev => Math.min(prev + 1, 5));
        
        // Show toast for stage advancement
        toast({
          title: "Assessment Progress",
          description: `Moving to the next stage of your career assessment.`,
          duration: 3000,
        });
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
        timestamp: new Date(),
        options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"]
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, conversationHistory, assessmentStage, supabase.functions, toast]);

  return {
    messages,
    isTyping,
    assessmentStage,
    handleSendMessage
  };
};
