import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, User, AlertTriangle, RotateCcw } from 'lucide-react';
import { ChatMessageItem } from '../types';

interface ChatMessageProps {
  message: ChatMessageItem;
  onRetry?: (text: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-2.5 my-3.5 transition-all ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full shrink-0 mt-1 flex items-center justify-center shadow-sm ${
          isUser
            ? 'bg-[#E05C1A] text-white border border-[#E05C1A]'
            : 'bg-white p-0.5 border border-[#C49A2A]/40 overflow-hidden'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <img
            src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png"
            alt="Bot Avatar"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Message Container */}
      <div
        className={`group relative max-w-[88%] sm:max-w-[80%] md:max-w-[75%] px-4 py-3 shadow-md transition-all ${
          isUser
            ? 'bg-[#E05C1A] text-white rounded-2xl rounded-tr-xs border border-[#E05C1A]/80'
            : message.isError
            ? 'bg-[#FAF7F2] text-[#0E1C35] rounded-2xl rounded-tl-xs border-2 border-red-400'
            : 'bg-[#FAF7F2] text-[#0E1C35] rounded-2xl rounded-tl-xs border border-[#FAF7F2]'
        }`}
      >
        {/* Sender Header & Actions */}
        <div className="flex items-center justify-between gap-3 mb-1">
          <span
            className={`text-[11px] font-semibold tracking-wide ${
              isUser ? 'text-white/90' : 'text-[#0E1C35]'
            }`}
          >
            {isUser ? 'You' : 'Bright Mind Assistant'}
          </span>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono ${
                isUser ? 'text-white/70' : 'text-[#7A7A72]'
              }`}
            >
              {message.timestamp}
            </span>

            {!isUser && !message.isError && (
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-[#7A7A72] hover:text-[#0E1C35] p-1 rounded hover:bg-black/5"
                title="Copy message"
              >
                {copied ? <Check className="w-3 h-3 text-[#0D7A6B]" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>

        {/* Message Content */}
        {isUser ? (
          <div
            dir="auto"
            className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap font-sans font-normal"
          >
            {message.text}
          </div>
        ) : message.isError ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>پغام بھیجنے میں دشواری</span>
            </div>
            <p dir="auto" className="text-sm text-[#0E1C35]/90 leading-relaxed">
              {message.text}
            </p>
            {onRetry && (
              <button
                onClick={() => onRetry(message.text)}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E05C1A] text-white text-xs font-medium shadow-sm hover:bg-[#C84E12] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>دوبارہ کوشش کریں</span>
              </button>
            )}
          </div>
        ) : (
          <div dir="auto" className="markdown-body text-sm sm:text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
