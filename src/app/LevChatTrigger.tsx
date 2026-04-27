"use client";

export function LevChatTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-lev-chat"))}
      className={className}
    >
      {children}
    </button>
  );
}
