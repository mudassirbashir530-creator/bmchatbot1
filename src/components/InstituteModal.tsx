import React from 'react';
import { X, MapPin, Phone, Calendar, Award, Sparkles, CheckCircle2, MessageCircle, Globe } from 'lucide-react';

interface InstituteModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export const InstituteModal: React.FC<InstituteModalProps> = ({ isOpen, onClose, sessionId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0E1C35] text-[#FAF7F2] border-2 border-[#C49A2A]/40 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A7A72] hover:text-[#FAF7F2] p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#C49A2A]/20">
          <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#C49A2A] shadow-md shrink-0 flex items-center justify-center">
            <img
              src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png"
              alt="Bright Mind Institute"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#FAF7F2] leading-tight">
              Bright Mind Institute of Education
            </h2>
            <p className="text-xs font-mono text-[#C49A2A] mt-0.5">
              AI Summer Camp 2026 — Pioneer Cohort
            </p>
          </div>
        </div>

        {/* Program Overview */}
        <div className="space-y-4 text-sm font-sans">
          <div className="bg-[#162B4E] p-4 rounded-xl border border-[#FAF7F2]/10 space-y-2">
            <div className="flex items-center gap-2 text-[#E05C1A] font-semibold text-base">
              <Sparkles className="w-4 h-4" />
              <span>Agentic AI Pioneer Cohort (Elite Group)</span>
            </div>
            <p className="text-[#FAF7F2]/90 text-xs leading-relaxed">
              An intensive hands-on summer training program designed to master Generative AI, Autonomous AI Agents, Prompt Engineering, and real-world AI applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-[#C49A2A] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-[#FAF7F2]">Duration & Classes</span>
                <span className="text-xs text-[#7A7A72]">Summer 2026 • Flexible Shifts</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10">
              <Award className="w-4 h-4 text-[#0D7A6B] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-[#FAF7F2]">Certification</span>
                <span className="text-xs text-[#7A7A72]">Official Institute Certificate</span>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-2 pt-1">
            <h3 className="font-serif text-base font-semibold text-[#C49A2A]">Program Highlights</h3>
            <ul className="space-y-1.5 text-xs text-[#FAF7F2]/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A6B] shrink-0" />
                <span>Custom AI Agent Development & Automations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A6B] shrink-0" />
                <span>Hands-on Projects with n8n, OpenAI, & Gemini</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A6B] shrink-0" />
                <span>No coding prerequisite needed for basic tracks</span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="border-t border-[#C49A2A]/20 pt-4 space-y-2">
            <h3 className="font-serif text-base font-semibold text-[#FAF7F2]">Contact & Campus</h3>
            <div className="space-y-1.5 text-xs text-[#7A7A72]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E05C1A] shrink-0" />
                <span className="text-[#FAF7F2]">Manzoor Colony, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0D7A6B] shrink-0" />
                <a href="tel:+923102310119" className="text-[#0D7A6B] hover:underline font-mono">
                  +92 310 2310119
                </a>
              </div>
            </div>
          </div>

          {/* Active Session Info */}
          <div className="bg-[#162B4E]/60 p-2.5 rounded-lg border border-[#7A7A72]/20 text-[11px] font-mono text-[#7A7A72] flex items-center justify-between">
            <span>Session ID (In-Memory):</span>
            <span className="text-[#C49A2A] font-semibold truncate max-w-[180px]">{sessionId}</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://wa.me/923102310119?text=Hello!%20I%20want%20information%20about%20AI%20Summer%20Camp%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D7A6B] hover:bg-[#0B6357] text-white font-medium text-xs transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#FAF7F2] font-medium text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
