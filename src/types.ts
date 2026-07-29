export interface ChatMessageItem {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export interface WebhookPayload {
  action: 'sendMessage';
  sessionId: string;
  chatInput: string;
}

export interface WebhookResponse {
  output?: string;
  text?: string;
  reply?: string;
  message?: string;
  [key: string]: unknown;
}
