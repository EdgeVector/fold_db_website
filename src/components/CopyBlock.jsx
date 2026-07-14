import { useState } from 'react';

/**
 * <pre> with a one-click copy button (for install scripts agents/users paste).
 */
export default function CopyBlock({ text, label = 'Copy' }) {
  const [status, setStatus] = useState('idle'); // idle | copied | error

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 2000);
    }
  }

  const buttonLabel =
    status === 'copied' ? 'Copied' : status === 'error' ? 'Failed' : label;

  return (
    <div className="copy-block">
      <button
        type="button"
        className={`copy-block-btn${status === 'copied' ? ' copied' : ''}`}
        onClick={handleCopy}
        aria-label={status === 'copied' ? 'Copied to clipboard' : 'Copy install script'}
      >
        [{buttonLabel}]
      </button>
      <pre>{text}</pre>
    </div>
  );
}
