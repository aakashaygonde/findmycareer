
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
        content: "You are a helpful career advisor assistant that provides guidance on career paths, skills, and educational requirements. Your goal is to help users discover career opportunities that match their interests, skills, and aspirations. Be friendly, supportive, and provide specific, actionable advice."
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
        max_tokens: 500
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
    
    // Check if there are suggested options to show (parsing from the response)
    let options = [];
    const optionsMatch = assistantMessage.match(/Options:(.*?)(?:\n\n|$)/s);
    if (optionsMatch) {
      const optionText = optionsMatch[1];
      options = optionText.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim());
    }

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
