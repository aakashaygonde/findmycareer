
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles } from 'lucide-react';

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
    setIsMultiLine(false); // Reset to single line input after sending
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
      className="flex space-x-2"
    >
      {isMultiLine ? (
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your detailed response... (Shift+Enter for new line)"
          className="flex-1 min-h-[80px] max-h-[150px]"
        />
      ) : (
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1"
        />
      )}
      
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={toggleInputMode}
        title={isMultiLine ? "Switch to single line" : "Switch to multi-line"}
      >
        <Sparkles className="h-4 w-4" />
      </Button>
      
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
