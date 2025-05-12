"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { ChatContainer } from "./chat-container";
import { Header } from "@/components/header";

export function ChatLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3o");

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Model Selection Dropdown */}
        <div className="absolute top-4 right-4 z-50">
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="p-2 bg-card border border-border rounded"
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-3o">GPT-3o</option>
          </select>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        {/* Mobile Sidebar - shown conditionally */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-40 flex h-full">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden fixed left-4 bottom-24 z-30 bg-secondary p-2 rounded-full shadow-md"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Main Chat Area */}
        <div className="flex-1 h-full">
          <ChatContainer selectedModel={selectedModel} />
        </div>
      </div>
    </div>
  );
}
