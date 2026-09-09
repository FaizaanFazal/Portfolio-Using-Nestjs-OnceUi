"use client";

import { useState } from "react";
import { Button } from "@once-ui-system/core";

export function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — silently no-op, button remains usable
    }
  };

  return (
    <Button size="s" variant="secondary" weight="default" onClick={handleCopy} aria-live="polite">
      {copied ? copiedLabel : label}
    </Button>
  );
}
