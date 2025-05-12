"use client";

import { Button } from "@/components/ui/button";
import { SohailGPTLogo } from "@/components/ui/logo";

interface SuggestionGridProps {
  onSelectSuggestion: (suggestion: string) => void;
}

export function SuggestionGrid({ onSelectSuggestion }: SuggestionGridProps) {
  const suggestions = [
    {
      title: "Write a poem",
      description: "about a robot becoming sentient",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 20h4L20 10 14 4l-10 10 2 6Z" />
          <path d="m14 4-4 4 6 6 4-4" />
        </svg>
      ),
    },
    {
      title: "Explain quantum computing",
      description: "in simple terms",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 9V3H15" />
          <path d="M3 15v6h6" />
          <path d="M21 3 3 21" />
        </svg>
      ),
    },
    {
      title: "Recommend activities",
      description: "for a rainy weekend",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 2v5h5" />
          <path d="M21 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12Z" />
        </svg>
      ),
    },
    {
      title: "Help me debug",
      description: "this React code sample",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6V2H8" />
          <path d="m17 22-5-10 5-10" />
          <path d="M7 22 12 12 7 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-10">
        <SohailGPTLogo className="w-12 h-12 mx-auto" spin={false} />
      </div>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto flex flex-col items-start p-4 chatgpt-prompt-card"
            onClick={() => onSelectSuggestion(`${suggestion.title} ${suggestion.description}`)}
          >
            <div className="flex items-center text-left mb-2">
              <div className="p-1 rounded-md bg-foreground/5 mr-2">
                {suggestion.icon}
              </div>
              <span className="font-medium">{suggestion.title}</span>
            </div>
            <span className="text-sm text-muted-foreground text-left">
              {suggestion.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
