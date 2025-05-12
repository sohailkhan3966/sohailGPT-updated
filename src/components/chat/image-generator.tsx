"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// This is a mock function since we're not connecting to a real AI image generation API
// In a real implementation, this would call an API endpoint
const generateMockImage = (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    // Adding some random delay to simulate API call
    setTimeout(() => {
      // Generate a placeholder image URL based on the prompt
      const encodedPrompt = encodeURIComponent(prompt);

      // Using a placeholder image service - in a real app, use a real AI image generation API
      const imageUrl = `https://source.unsplash.com/480x320/?${encodedPrompt}`;

      resolve(imageUrl);
    }, 1500);
  });
};

interface ImageGeneratorProps {
  onImageGenerated: (prompt: string, imageUrl: string) => void;
}

export function ImageGenerator({ onImageGenerated }: ImageGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description first.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const imageUrl = await generateMockImage(prompt);
      onImageGenerated(prompt, imageUrl);
      setIsOpen(false);
      setPrompt("");
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(true)}
        title="Generate image"
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
        <span className="sr-only">Generate image</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate an image</DialogTitle>
            <DialogDescription>
              Describe the image you want to generate in detail.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              placeholder="A futuristic city with flying cars and neon lights..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
