"use client";

import { useRef, useState } from "react";

interface CodeBlockPreProps extends React.HTMLAttributes<HTMLPreElement> {
  "data-language"?: string;
}

export function CodeBlockPre({
  children,
  "data-language": lang,
  ...props
}: CodeBlockPreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-block-wrap">
      <div className="code-head">
        <span className="code-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {lang && <span className="code-lang">{lang}</span>}
        <button
          className="code-copy-btn"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
