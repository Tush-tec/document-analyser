import { useAuth } from "@/utils/Context/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function UserMenu({ user }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) return null;

  const initial = user.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-ocean-500/8 transition text-left"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-ocean-500 to-ocean-700 text-white grid place-items-center text-sm font-semibold shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-ocean-900 truncate">
            {user.name}
          </div>
          <div className="text-[11px] text-muted truncate">{user.email}</div>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted shrink-0"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-1.5 rounded-xl bg-white border border-ocean-500/15 shadow-[0_20px_50px_-20px_rgba(10,61,122,0.35)]">
          <button
            onClick={() => {
              setOpen(false); /* open settings later */
            }}
            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-ocean-500/8 text-ink"
          >
            Settings
          </button>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-danger/10 text-danger"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
