export default function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-2.5 text-sm font-medium text-ink rounded-xl border border-ocean-500/25 bg-white/95 transition hover:bg-white flex items-center justify-center gap-2.5"
    >
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5C29.5 34.9 26.9 36 24 36c-5.4 0-9.9-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.7 1.9-1.9 3.5-3.5 4.7l6.5 5.5C41.9 35.4 44 30.1 44 24c0-1.2-.1-2.3-.4-3.5z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
