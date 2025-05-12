import { ChatMessageProps } from "@/components/chat/chat-message";

const STORAGE_KEY = "sohailgpt-messages";

// Function to save messages to localStorage
export const saveMessages = (messages: ChatMessageProps[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving messages to localStorage:", error);
  }
};

// Function to load messages from localStorage
export const loadMessages = (): ChatMessageProps[] => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading messages from localStorage:", error);
    return [];
  }
};

// Function to clear all messages
export const clearMessages = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing messages from localStorage:", error);
  }
};
