import React, { useRef, useState, useEffect } from 'react';
import styles from './MessageInput.module.css';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = 'Type a message...',
  disabled = false,
  maxLength = 1000,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Auto-adjust height
  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  // Handle input changes
  const handleInput = () => {
    if (inputRef.current) {
      const text = inputRef.current.textContent || '';
      
      // Enforce character limit
      if (text.length > maxLength) {
        const truncated = text.substring(0, maxLength);
        inputRef.current.textContent = truncated;
        
        // Move cursor to end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(inputRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      
      setContent(inputRef.current.textContent || '');
      adjustHeight();
    }
  };

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Send message
  const handleSend = () => {
    const text = content.trim();
    if (text && !disabled) {
      onSendMessage(text);
      
      // Clear input
      if (inputRef.current) {
        inputRef.current.textContent = '';
        setContent('');
        adjustHeight();
      }
    }
  };

  // Adjust height on mount
  useEffect(() => {
    adjustHeight();
  }, []);

  const isEmpty = content.trim().length === 0;
  const isNearLimit = content.length > maxLength * 0.8;
  const containerClasses = [
    styles['input-container'],
    isFocused ? styles['input-container--focused'] : '',
    disabled ? styles['input-container--disabled'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div
        ref={inputRef}
        contentEditable={!disabled}
        className={styles['message-input']}
        data-placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        suppressContentEditableWarning={true}
      />
      
      {(isNearLimit || content.length > maxLength * 0.9) && (
        <div className={styles['character-counter']}>
          {content.length}/{maxLength}
        </div>
      )}
      
      <button
        className={`${styles['send-button']} ${isEmpty ? styles['send-button--disabled'] : ''}`}
        onClick={handleSend}
        disabled={isEmpty || disabled}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
};
