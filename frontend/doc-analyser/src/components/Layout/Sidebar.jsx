import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import DocumentList from "./DocumentList";
import UserMenu from "./UserMenu";
import { useAuth } from "@/utils/Context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="w-[280px] flex flex-col bg-white/70 backdrop-blur-xl border-r border-ocean-500/15">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 h-[68px] border-b border-ocean-500/15">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-ocean-500 to-ocean-700 shadow-[0_6px_16px_-4px_rgba(30,111,217,0.6)]" />
          <span className="font-bold text-[15px] text-ocean-900 tracking-tight">
            DocAnalyse
          </span>
        </Link>
      </div>

      {/* Upload button */}
      <div className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-br from-ocean-500 to-ocean-700 shadow-[0_10px_24px_-10px_rgba(30,111,217,0.7)] transition hover:-translate-y-px"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New document
        </Link>
      </div>

      {/* Documents label */}
      <div className="px-5 pt-2 pb-1.5">
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
          Your documents
        </span>
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <DocumentList />
      </div>

      {/* User menu */}
      <div className="border-t border-ocean-500/15 p-3">
        <UserMenu user={user} />
      </div>
    </aside>
  );
}
