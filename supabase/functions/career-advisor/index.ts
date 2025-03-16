
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Using Google's Gemini AI API
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    console.log('Received message:', message);
    console.log('Conversation history:', conversationHistory);

    // Format the conversation for the Gemini model
    let promptParts = [{
      text: `You are a helpful career advisor assistant that provides personalized guidance on career paths, skills, and educational requirements. 

Your goal is to help users discover career opportunities that match their interests, skills, and aspirations. Use the information they share about their interests, skills, values, and preferences to recommend specific careers.

Key guidelines:
1. Focus on understanding the user's interests from their text descriptions
2. Analyze their messages to identify potential career matches
3. Provide specific, actionable advice and career recommendations
4. Be conversational and ask thoughtful follow-up questions
5. Include detailed information about recommended careers including skills required and education paths
6. At the end of your response, suggest a few relevant questions the user might ask next

Be friendly, supportive, and engaging. Provide detailed and specific career suggestions based on the user's input.

Previous conversation:\n`
    }];

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      promptParts.push({ text: `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.message}\n` });
    });

    // Add current message
    promptParts.push({ text: `User: ${message}\nAssistant:` });

    console.log('Sending prompt to Gemini AI model');

    // Make the request to the Gemini AI API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: promptParts.map(part => ({ text: part.text }))
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API error:', errorData);
      
      // Fallback response when API fails
      return new Response(JSON.stringify({ 
        message: "I'm experiencing some technical difficulties right now. Please try again in a few moments or ask me a different question about your career interests.",
        options: ["Tell me about tech careers", "What careers match creative interests?", "What healthcare careers are growing?"]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('API response:', data);

    // Extract the generated text from the Gemini response
    let assistantMessage = "";
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      assistantMessage = data.candidates[0].content.parts[0].text.trim();
    } else {
      // Fallback if we can't parse the response
      assistantMessage = "I'm sorry, I couldn't generate a proper response. Please try asking something else about your career interests.";
    }
    
    // Look for questions in the message to use as options
    let options: string[] = [];
    
    // Extract questions from the response
    const sentences = assistantMessage.split(/[.!?]/).filter(s => s.includes('?'));
    if (sentences.length > 0) {
      // Take up to 3 shortest questions as options
      options = sentences
        .map(s => s.trim())
        .filter(s => s.length > 10 && s.length < 80)
        .sort((a, b) => a.length - b.length)
        .slice(0, 3);
    }
    
    // If no questions found, provide default options based on conversation context
    if (options.length === 0) {
      if (assistantMessage.toLowerCase().includes('technology') || message.toLowerCase().includes('tech')) {
        options = [
          "Tell me about software developer careers",
          "What skills do I need for IT jobs?",
          "Are there tech careers that involve helping people?"
        ];
      } else if (assistantMessage.toLowerCase().includes('creative') || message.toLowerCase().includes('art')) {
        options = [
          "What creative careers are in demand?",
          "Do creative careers pay well?",
          "What education do I need for design jobs?"
        ];
      } else if (assistantMessage.toLowerCase().includes('healthcare') || message.toLowerCase().includes('medical')) {
        options = [
          "What healthcare careers don't require medical school?",
          "Tell me about nursing specializations",
          "What are the best-paying medical careers?"
        ];
      } else {
        options = [
          "Tell me more about these career options",
          "What skills would I need to develop?",
          "How can I get started in this field?"
        ];
      }
    }

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      options: options.length > 0 ? options : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in career-advisor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "I'm having technical difficulties. Please try again with a different question.",
      options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"]
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
