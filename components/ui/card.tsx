"use client";  // Ensure it's a client component

import { cn } from "@/lib/utils"; // Ensure this utility exists

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-white p-4 rounded-lg shadow", className)}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-2">{children}</div>;
}
