export function MinimalFooter() {
  return (
    <footer className="mt-s-8 pt-s-6 border-t border-line flex items-center justify-between font-mono text-mono uppercase tracking-widest text-fg-faint">
      <span>© {new Date().getFullYear()} Usman</span>
      <span className="flex items-center gap-s-3">
        <a
          href="https://www.linkedin.com/in/m-usman-iqbal/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg-dim no-underline transition-colors duration-base hover:text-c1"
        >
          LinkedIn
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://github.com/usmaniqbal998"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg-dim no-underline transition-colors duration-base hover:text-c1"
        >
          GitHub
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="/rss.xml"
          className="text-fg-dim no-underline transition-colors duration-base hover:text-c1"
        >
          RSS
        </a>
      </span>
    </footer>
  );
}
