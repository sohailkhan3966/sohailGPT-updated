"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set dark mode by default
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased dark";
    // Add the dark class to html element as well for Tailwind dark mode
    document.documentElement.classList.add("dark");
  }, []);

  return <div className="antialiased">{children}</div>;
}
