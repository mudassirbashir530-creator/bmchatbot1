import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 my-3 animate-fade-in">
      {/* Bot Avatar */}
      <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-[#C49A2A]/40 shadow-sm shrink-0 mt-0.5 overflow-hidden flex items-center justify-center">
        <img
          src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png"
          alt="Bot"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bubble */}
      <div className="bg-[#FAF7F2] text-[#0E1C35] border border-[#FAF7F2] px-4 py-3 rounded-2xl rounded-tl-sm shadow-md max-w-[85%] sm:max-w-[75%]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#0E1C35] font-sans">
            Bright Mind Bot
          </span>
          <span className="text-[10px] font-mono text-[#7A7A72]">
            thinking...
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-2 h-4">
          <div className="w-2 h-2 rounded-full bg-[#E05C1A] animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#0D7A6B] animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-[#C49A2A] animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
