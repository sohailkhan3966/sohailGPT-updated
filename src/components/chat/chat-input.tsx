"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || image) && !isLoading) {
      onSend(message);
      setMessage("");
      setImage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="border-t border-border py-4">
      <div className="container mx-auto max-w-3xl px-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center chatgpt-input">
            <textarea
              className="flex-1 bg-transparent border-0 focus:ring-0 outline-none resize-none max-h-[200px] min-h-[56px] py-2 px-3 text-sm"
              placeholder="Message SohailGPT..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={1}
            />
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md text-muted-foreground mr-1 hover:text-foreground"
                >
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
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="sr-only">Attach</span>
                </Button>
              </label>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${
                  (message.trim() || image) && !isLoading
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                disabled={!(message.trim() || image) || isLoading}
              >
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-2">
            SohailGPT can make mistakes. Consider checking important information.
          </div>
        </form>
      </div>
    </div>
  );
}
