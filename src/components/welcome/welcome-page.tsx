"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { SohailGPTLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WelcomePage() {
  const router = useRouter();

  const goToChat = () => {
    router.push('/chat');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <SohailGPTLogo className="w-8 h-8" />
          <span className="text-xl font-medium">SohailGPT</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/chat">
            <Button variant="outline" size="sm">
              Info / Help
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-8 text-center">
          <div className="flex justify-center">
            <SohailGPTLogo className="w-12 h-12" spin={true} />
          </div>
          <h1 className="text-3xl font-bold">Get smarter with SohailGPT</h1>
          <p className="text-lg text-muted-foreground">
            SohailGPT helps you get answers, find inspiration and be more
            productive
          </p>

          <Button 
            variant="default" 
            size="lg" 
            className="w-full py-6 rounded-xl mt-8 text-lg"
            onClick={goToChat}
          >
            Start Chatting as Guest
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
          </Button>

          {/* Suggestions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="chatgpt-prompt-card text-left">
              <h3 className="font-medium mb-1">Get advice</h3>
              <p className="text-sm text-muted-foreground">
                How do I build a website?
              </p>
            </div>
            <div className="chatgpt-prompt-card text-left">
              <h3 className="font-medium mb-1">Brainstorm ideas</h3>
              <p className="text-sm text-muted-foreground">
                Suggest fun activities for a family with young kids
              </p>
            </div>
            <div className="chatgpt-prompt-card text-left">
              <h3 className="font-medium mb-1">Learn something new</h3>
              <p className="text-sm text-muted-foreground">
                Explain quantum computing in simple terms
              </p>
            </div>
            <div className="chatgpt-prompt-card text-left">
              <h3 className="font-medium mb-1">Get help with code</h3>
              <p className="text-sm text-muted-foreground">
                Help me debug this JavaScript function
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          By messaging SohailGPT, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          and have read our{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
