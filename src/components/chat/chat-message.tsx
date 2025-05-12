import { Avatar } from "@/components/ui/avatar";
import { SohailGPTLogo } from "@/components/ui/logo";
import { MarkdownMessage } from "./markdown-message";

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  return (
    <div className={`py-6 ${role === "assistant" ? "bg-secondary/40" : ""}`}>
      <div className="container mx-auto max-w-3xl flex space-x-4 px-4">
        {role === "user" ? (
          <Avatar className="h-8 w-8 rounded-full bg-primary-foreground flex items-center justify-center">
            <span className="text-xs">S</span>
          </Avatar>
        ) : (
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
            <SohailGPTLogo className="h-5 w-5 text-white" />
          </div>
        )}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-secondary-foreground/60 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-secondary-foreground/60 animate-pulse delay-200"></div>
                <div className="h-2 w-2 rounded-full bg-secondary-foreground/60 animate-pulse delay-500"></div>
              </div>
              <p className="text-sm text-muted-foreground">SohailGPT is thinking...</p>
            </div>
          ) : (
            <MarkdownMessage content={content} />
          )}
        </div>
      </div>
    </div>
  );
}
