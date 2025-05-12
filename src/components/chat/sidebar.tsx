"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SohailGPTLogo } from "@/components/ui/logo";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "How to build a responsive website" },
    { id: 2, title: "JavaScript async/await tutorial" },
    { id: 3, title: "React state management options" },
    { id: 4, title: "NextJS vs. traditional React apps" },
  ]);
  const [activeChat, setActiveChat] = useState(null);

  const handleNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat" };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChat(newChat.id);
  };

  const handleChatSelect = (id) => {
    setActiveChat(id);
  };

  return (
    <div className={`chatgpt-sidebar ${isCollapsed ? "w-16" : "w-64"} transition-all duration-200 flex flex-col`}>
      {/* Top Section */}
      <div className="p-3 flex">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex items-center">
            <SohailGPTLogo className="w-5 h-5 mr-2" />
            {!isCollapsed && <span>New chat</span>}
          </div>
          {!isCollapsed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
        </Button>
      </div>

      {/* Chat History Section */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 py-2">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">Chat History</h3>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className={`w-full justify-start text-left ${activeChat === chat.id ? "bg-secondary" : ""}`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  {chat.title}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border">
        {!isCollapsed ? (
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={handleNewChat}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              Add Team Workspace
            </Button>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                  <span className="text-xs">S</span>
                </div>
                <span>Sohail</span>
              </div>
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center">
              <span className="text-xs">S</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
