import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

interface QuickSuggestionsProps {
  onSelectSuggestion: (prompt: string) => void;
  disabled?: boolean;
}

export const QUICK_PROMPTS = [
  'فیس کتنی ہے؟',
  'کلاسز کب ہوتی ہیں؟',
  'رجسٹریشن کیسے کریں؟',
  'کورس میں کیا سکھایا جائے گا؟',
];

export const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({
  onSelectSuggestion,
  disabled = false,
}) => {
  return (
    <div className="my-3 pl-10 pr-2">
      <div className="flex items-center gap-1.5 mb-2 text-[11px] font-mono font-medium text-[#C49A2A] uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-[#C49A2A]" />
        <span>تجویز کردہ سوالات / Quick Questions:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => onSelectSuggestion(prompt)}
            dir="rtl"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF7F2]/10 hover:bg-[#E05C1A] text-[#FAF7F2] hover:text-white border border-[#FAF7F2]/20 hover:border-[#E05C1A] text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98 text-right"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C49A2A] group-hover:text-white shrink-0" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
