
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, AlignJustify } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isMultiLine, setIsMultiLine] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus textarea when switching to multiline
  useEffect(() => {
    if (isMultiLine && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isMultiLine]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue('');
    
    // Don't reset to single line after sending to encourage detailed responses
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Send message on Enter key (unless shift is pressed for new line in textarea)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleInputMode = () => {
    setIsMultiLine(!isMultiLine);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      className="flex flex-col space-y-2"
    >
      <div className="text-xs text-muted-foreground px-1">
        Share details about your interests, skills and preferences for better career recommendations
      </div>
      <div className="flex space-x-2">
        {isMultiLine ? (
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe your interests, skills, and what you're looking for in a career..."
            className="flex-1 min-h-[100px] max-h-[200px]"
          />
        ) : (
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Describe your interests and skills..."
            className="flex-1"
          />
        )}
        
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={toggleInputMode}
          title={isMultiLine ? "Switch to single line" : "Switch to multi-line"}
          className="flex-shrink-0"
        >
          {isMultiLine ? <Sparkles className="h-4 w-4" /> : <AlignJustify className="h-4 w-4" />}
        </Button>
        
        <Button type="submit" size="icon" className="flex-shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
