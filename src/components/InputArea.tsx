import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, MessageSquare, Loader2 } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    onSendMessage(inputText.trim());
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-[#0E1C35]/95 backdrop-blur-md border-t border-[#C49A2A]/20 pt-3 pb-2 px-3 sm:px-6 shrink-0 relative z-10 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        {/* Input Form Box */}
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#162B4E] border border-[#FAF7F2]/20 rounded-2xl p-1.5 focus-within:border-[#E05C1A] focus-within:ring-2 focus-within:ring-[#E05C1A]/20 transition-all shadow-inner">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message in Urdu or English..."
            rows={1}
            dir="auto"
            disabled={isLoading}
            className="w-full bg-transparent text-[#FAF7F2] placeholder-[#7A7A72] text-sm sm:text-base px-3 py-2 focus:outline-none resize-none max-h-32 min-h-[42px] leading-relaxed font-sans"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E05C1A] hover:bg-[#C84E12] active:scale-95 text-white flex items-center justify-center shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md cursor-pointer mb-0.5"
            title="Send Message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
            )}
          </button>
        </form>

        {/* Shortcut hint */}
        <div className="flex items-center justify-between px-2 mt-1.5 text-[10px] sm:text-[11px] text-[#7A7A72] font-mono">
          <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 bg-[#162B4E] border border-[#7A7A72]/40 rounded text-[9px] text-[#FAF7F2]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-[#162B4E] border border-[#7A7A72]/40 rounded text-[9px] text-[#FAF7F2]">Shift+Enter</kbd> for newline</span>
          <span className="text-right w-full sm:w-auto">Instant AI Assistant • 24/7 Support</span>
        </div>

        {/* Footer info line */}
        <footer className="mt-2 pt-2 border-t border-[#FAF7F2]/10 text-center text-[10px] sm:text-[11px] text-[#7A7A72] leading-tight">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="font-semibold text-[#FAF7F2]/90">Bright Mind Institute of Education</span>
            <span className="text-[#C49A2A]">•</span>
            <span>Manzoor Colony, Karachi</span>
            <span className="text-[#C49A2A]">•</span>
            <a
              href="https://wa.me/923102310119"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7A6B] hover:underline font-mono font-medium inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>WhatsApp: +92 310 2310119</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
