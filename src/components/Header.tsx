import React from 'react';
import { Info, RefreshCw, Sparkles, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onResetSession: () => void;
  onOpenInfo: () => void;
  sessionId: string;
}

export const Header: React.FC<HeaderProps> = ({ onResetSession, onOpenInfo, sessionId }) => {
  return (
    <header className="bg-[#0E1C35] border-b border-[#C49A2A]/25 px-4 py-3 sm:px-6 relative z-10 shadow-lg select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left branding section */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo badge with white background padding */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-1 shadow-md border-2 border-[#C49A2A]/40 flex items-center justify-center overflow-hidden">
              <img
                src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png"
                alt="Bright Mind Institute Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {/* Green online dot */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0D7A6B] border-2 border-[#0E1C35] rounded-full shadow-sm">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D7A6B] opacity-75"></span>
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#FAF7F2] leading-tight truncate">
                AI Summer Camp 2026 Assistant
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono tracking-wider bg-[#C49A2A]/15 text-[#C49A2A] px-2 py-0.5 rounded border border-[#C49A2A]/30 uppercase">
                <Sparkles className="w-2.5 h-2.5" /> Elite Group
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#7A7A72] mt-0.5 truncate">
              <span className="font-medium text-[#FAF7F2]/90 truncate">Bright Mind Institute of Education</span>
              <span className="hidden sm:inline text-[#C49A2A]">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[#0D7A6B] font-mono text-[11px] font-semibold">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="https://wa.me/923102310119"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#0D7A6B]/20 hover:bg-[#0D7A6B]/30 text-[#0D7A6B] border border-[#0D7A6B]/40 text-xs font-medium transition-all"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="font-mono">WhatsApp</span>
          </a>

          <button
            onClick={onOpenInfo}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 text-[#FAF7F2] border border-[#FAF7F2]/15 text-xs font-medium transition-all flex items-center gap-1.5"
            title="Program & Institute Info"
          >
            <Info className="w-4 h-4 text-[#C49A2A]" />
            <span className="hidden md:inline">Info</span>
          </button>

          <button
            onClick={onResetSession}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded bg-[#FAF7F2]/5 hover:bg-[#FAF7F2]/10 text-[#7A7A72] hover:text-[#FAF7F2] border border-[#FAF7F2]/15 text-xs transition-all flex items-center gap-1.5"
            title="New Conversation Session"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] font-mono text-[#7A7A72]">New Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
