import { useEffect } from "react";
import { useRouter } from "next/router";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "@/utils/Context/AuthContext";

export default function DocumentChat() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !id) return null;

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="h-[68px] px-8 flex items-center border-b border-ocean-500/15 bg-white/50 backdrop-blur">
          <h2 className="text-[15px] font-semibold text-ocean-900">
            Document #{id}
          </h2>
        </header>

        {/* Messages (placeholder) */}
        <div className="flex-1 overflow-y-auto p-8 text-muted text-sm">
          Chat for this document goes here.
        </div>

        {/* Input (placeholder) */}
        <div className="p-6 border-t border-ocean-500/15 bg-white/50 backdrop-blur">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              placeholder="Ask something about this document…"
              className="flex-1 px-4 py-3 rounded-xl border border-ocean-500/25 bg-white outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/15"
            />
            <button className="px-5 rounded-xl text-white font-semibold bg-gradient-to-br from-ocean-500 to-ocean-700">
              Ask
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
