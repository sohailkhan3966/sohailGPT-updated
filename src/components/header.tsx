import Link from "next/link";
import { SohailGPTLogo } from "./ui/logo";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <SohailGPTLogo className="w-8 h-8" />
          <span className="text-xl font-medium">SohailGPT</span>
        </Link>
        <Button variant="ghost" size="sm" className="ml-6">
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
            className="mr-2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span>SohailGPT</span>
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Button variant="ghost" size="sm">
            Back to Home
          </Button>
        </Link>
        {/* <Button variant="outline" size="sm">
          Log in
        </Button>
        <Button variant="default" size="sm">
          Sign up
        </Button> */}
        <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
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
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="sr-only">Info</span>
        </Button>
      </div>
    </header>
  );
}
