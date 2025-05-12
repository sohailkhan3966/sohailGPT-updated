"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "signup" | "stay-logged-out";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleStayLoggedOut = () => {
    // Handle the stay logged out action
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-center">
            {mode === "login"
              ? "Welcome back"
              : mode === "signup"
                ? "Create new account"
                : "Continue without an account"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {mode === "login" || mode === "signup"
              ? "Log in or sign up to get smarter responses, upload files and images, and more."
              : "You can continue without an account, but you'll have limited features."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          {mode === "login" && (
            <>
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Button className="w-full" type="submit">
                Log in
              </Button>
              <div className="flex justify-center">
                <Button
                  variant="link"
                  onClick={() => setMode("signup")}
                >
                  Create new account
                </Button>
              </div>
            </>
          )}

          {mode === "signup" && (
            <>
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Input type="password" placeholder="Confirm password" />
              <Button className="w-full" type="submit">
                Sign up for free
              </Button>
              <div className="flex justify-center">
                <Button
                  variant="link"
                  onClick={() => setMode("login")}
                >
                  Already have an account? Log in
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            className="text-muted-foreground font-semibold underline hover:bg-transparent"
            onClick={handleStayLoggedOut}
          >
            Stay logged out
          </Button>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-4">
          By messaging SohailGPT, you agree to our <a href="#" className="underline">Terms</a> and have read our <a href="#" className="underline">Privacy Policy</a>.
        </div>
      </DialogContent>
    </Dialog>
  );
}
