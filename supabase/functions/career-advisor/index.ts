
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');

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

    // Format the conversation for Deepseek API
    const messages = [
      {
        role: "system",
        content: `You are a helpful career advisor assistant that provides personalized guidance on career paths, skills, and educational requirements. 

Your goal is to help users discover career opportunities that match their interests, skills, and aspirations based on the text they provide. Use the information they share about their interests, skills, values, and preferences to recommend specific careers.

Key guidelines:
1. Focus on understanding the user's interests from their natural language descriptions rather than just button selections
2. Analyze their messages to identify potential career matches
3. Provide specific, actionable advice and career recommendations
4. Be conversational and ask thoughtful follow-up questions
5. Offer 2-3 relevant suggested response options in your replies, but don't make these the focus
6. Include detailed information about recommended careers including skills required and education paths

Be friendly, supportive, and engaging. Avoid being overly rigid or formulaic in your responses.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      {
        role: "user",
        content: message
      }
    ];

    console.log('Sending to Deepseek API:', messages);

    // Make the request to Deepseek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Deepseek API error:', errorData);
      throw new Error(`Deepseek API returned error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    console.log('Deepseek API response:', data);

    // Extract the assistant's message from the response
    const assistantMessage = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    
    // Parse options from the response if present
    let options = [];
    // Look for options or suggestions in various formats
    const optionsRegex = /(?:Options|Suggestions|You could|You might):(.*?)(?:\n\n|$)/s;
    const optionsMatch = assistantMessage.match(optionsRegex);
    
    if (optionsMatch) {
      const optionText = optionsMatch[1];
      options = optionText.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-') || line.startsWith('*'))
        .map(line => line.substring(1).trim());
    }
    
    // If no options were found, try to extract some from the message
    if (options.length === 0) {
      // Look for questions that might be good follow-up options
      const questions = assistantMessage.match(/\?/g);
      if (questions && questions.length > 0) {
        // Extract sentences with question marks
        const sentences = assistantMessage.split(/[.!?]/).filter(s => s.includes('?'));
        // Take up to 3 shortest questions as options
        options = sentences
          .map(s => s.trim())
          .filter(s => s.length > 10 && s.length < 80)
          .sort((a, b) => a.length - b.length)
          .slice(0, 3);
      }
    }
    
    // If still no options, generate generic ones based on the conversation stage
    if (options.length === 0) {
      if (conversationHistory.length < 2) {
        options = [
          "Tell me more about your interests",
          "What skills do you enjoy using?",
          "What subjects did you excel at in school?"
        ];
      } else if (conversationHistory.length < 4) {
        options = [
          "Tell me about your ideal work environment",
          "What values are important to you in a career?",
          "Would you like specific career recommendations now?"
        ];
      } else {
        options = [
          "Tell me more about what interests you",
          "Would you like details about a specific career?",
          "What other factors are important in your career choice?"
        ];
      }
    }

    // Limit to 3 options to avoid cluttering the UI
    options = options.slice(0, 3);

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      options: options.length > 0 ? options : undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in career-advisor function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
