"use client";

import { useState, useEffect } from "react";
import { ChatInput } from "./chat-input";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { SuggestionGrid } from "./suggestion-grid";
import { getChatCompletion } from "@/lib/api";
import { WebSearch } from './web-search';
import { webSearch } from '@/lib/webSearchService';

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Store chat history for API calls
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant" | "system", content: string }>>([
    {
      role: "system",
      content: "You are SohailGPT, a helpful AI assistant. You provide concise, accurate and friendly responses."
    }
  ]);

  const [sessionMemory, setSessionMemory] = useState<ChatMessageProps[]>([]);

  const handleSendMessage = async (content: string) => {
    // Add user message to session memory
    const userMessage: ChatMessageProps = {
      role: "user",
      content,
    };
    setSessionMemory((prev) => [...prev, userMessage]);

    // Update UI messages
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Detect if the message should trigger a web search
    if (content.toLowerCase().includes('search:')) {
      try {
        const query = content.replace('search:', '').trim();
        const searchResults = await webSearch(query);
        const formattedResults = searchResults.map(result => `${result.name}: ${result.url}`).join('\n');
        const assistantMessage: ChatMessageProps = {
          role: "assistant",
          content: `Here are the search results:\n${formattedResults}`,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setSessionMemory((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Error performing web search:", error);
        const errorMessage: ChatMessageProps = {
          role: "assistant",
          content: "I'm sorry, I couldn't perform the web search. Please try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
        setSessionMemory((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Update API chat history
    const updatedHistory = [...chatHistory, { role: "user", content }];
    setChatHistory(updatedHistory);

    try {
      // Simulate thinking delay
      await simulateThinkingDelay(2000); // 2 seconds delay

      // Get response from the API
      const response = await getChatCompletion(sessionMemory);

      // Create assistant message
      const assistantMessage: ChatMessageProps = {
        role: "assistant",
        content: response,
      };

      // Update messages and chat history
      setMessages((prev) => [...prev, assistantMessage]);
      setSessionMemory((prev) => [...prev, assistantMessage]);
      setChatHistory((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error getting chat completion:", error);
      // Fallback message in case of error
      const errorMessage: ChatMessageProps = {
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setSessionMemory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Add a delay to simulate thinking
  const simulateThinkingDelay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <WebSearch />
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <SuggestionGrid onSelectSuggestion={handleSelectSuggestion} />
        ) : (
          <div className="pb-32">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && (
              <ChatMessage role="assistant" content="" isLoading={true} />
            )}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
