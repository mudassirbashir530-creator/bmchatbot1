import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { QuickSuggestions } from './components/QuickSuggestions';
import { InputArea } from './components/InputArea';
import { InstituteModal } from './components/InstituteModal';
import { ChatMessageItem, WebhookPayload, WebhookResponse } from './types';

const N8N_WEBHOOK_URL = 'https://bmaicamp.app.n8n.cloud/webhook/5f465db8-f32b-4788-aa9e-b8b929af0d42/chat';

function getCurrentTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
}

export default function App() {
  // Session ID stored in JS memory (ref + state)
  const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
  
  // Initial welcome message
  const initialBotMessage: ChatMessageItem = {
    id: 'welcome-msg',
    sender: 'bot',
    text: 'السلام علیکم! میں AI Summer Camp 2026 کا اسسٹنٹ ہوں۔ رجسٹریشن، فیس، شیڈول یا کورس کے بارے میں کچھ بھی پوچھیں۔',
    timestamp: getCurrentTimeString(),
  };

  const [messages, setMessages] = useState<ChatMessageItem[]>([initialBotMessage]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = useCallback((smooth = true) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Reset conversation session
  const handleResetSession = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'السلام علیکم! میں AI Summer Camp 2026 کا اسسٹنٹ ہوں۔ رجسٹریشن، فیس، شیڈول یا کورس کے بارے میں کچھ بھی پوچھیں۔',
        timestamp: getCurrentTimeString(),
      },
    ]);
  };

  // Send message to n8n Webhook
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: getCurrentTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const payload: WebhookPayload = {
        action: 'sendMessage',
        sessionId: sessionId,
        chatInput: text,
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: WebhookResponse = await response.json();

      // Extract bot reply from output, text, reply or fallback
      let botReplyText = '';
      if (typeof data === 'string') {
        botReplyText = data;
      } else if (data && typeof data === 'object') {
        botReplyText =
          (data.output as string) ||
          (data.text as string) ||
          (data.reply as string) ||
          (data.message as string) ||
          (Array.isArray(data) && data[0]?.output) ||
          'شکریہ! آپ کے سوال کا جواب موصول ہو گیا۔';
      }

      if (!botReplyText) {
        botReplyText = 'شکریہ! آپ کا پیغام موصول ہو گیا۔ مزید معلوماتی جواب جلد فراہم کیا جائے گا۔';
      }

      const botMessage: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: getCurrentTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.error('Webhook fetch error:', err);

      const errorMessage: ChatMessageItem = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'معذرت، ابھی کنکشن میں مسئلہ ہے۔ دوبارہ کوشش کریں۔',
        timestamp: getCurrentTimeString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] w-full bg-[#0E1C35] text-[#FAF7F2] bg-grid-pattern relative overflow-hidden font-sans select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Header */}
      <Header
        onResetSession={handleResetSession}
        onOpenInfo={() => setIsInfoOpen(true)}
        sessionId={sessionId}
      />

      {/* Messages Scroll Area */}
      <main
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2 relative z-0"
      >
        <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-full">
          {/* Welcome Banner Card (Subtle Editorial Touch) */}
          <div className="mb-4 p-3.5 sm:p-4 rounded-xl bg-[#162B4E]/60 border border-[#C49A2A]/20 text-center shadow-inner">
            <p className="text-xs sm:text-sm text-[#FAF7F2]/90 font-serif tracking-wide">
              Welcome to <span className="text-[#C49A2A] font-bold">Bright Mind Institute of Education</span> • AI Summer Camp 2026 Assistant
            </p>
            <p className="text-[11px] text-[#7A7A72] font-mono mt-0.5">
              Instant Answers • Course Syllabus • Fees • Schedule • Agentic AI Pioneer Cohort
            </p>
          </div>

          {/* Render Messages */}
          {messages.map((msg, index) => (
            <React.Fragment key={msg.id}>
              <ChatMessage message={msg} onRetry={handleSendMessage} />

              {/* Show Quick Suggestion Chips right after the welcome message */}
              {index === 0 && messages.length <= 2 && (
                <QuickSuggestions
                  onSelectSuggestion={handleSendMessage}
                  disabled={isLoading}
                />
              )}
            </React.Fragment>
          ))}

          {/* Typing Indicator while waiting for response */}
          {isLoading && <TypingIndicator />}
        </div>
      </main>

      {/* Fixed Input Bar */}
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />

      {/* Information Modal */}
      <InstituteModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        sessionId={sessionId}
      />
    </div>
  );
}
