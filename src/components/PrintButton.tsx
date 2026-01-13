
"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      className="hidden print:hidden inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      onClick={() => window.print()}
    >
      <Printer className="h-4 w-4" />
      Print / PDF
    </button>
  );
}
