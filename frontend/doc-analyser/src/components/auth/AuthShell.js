import Link from "next/link";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-105 p-10 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-20px_rgba(10,61,122,0.35),0_8px_24px_-12px_rgba(10,61,122,0.2)]">
        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-8.5 h-8.5 rounded-[10px] bg-linear-to-br from-ocean-500 to-ocean-700 shadow-[0_6px_16px_-4px_rgba(30,111,217,0.6)]" />
          <span className="font-bold text-lg text-ocean-900 tracking-tight">
            DocAnalyse
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-ocean-900 tracking-tight m-0 mb-1.5">
          {title}
        </h1>
        <p className="text-sm text-muted m-0 mb-6">{subtitle}</p>

        {children}

        {footer && (
          <div className="mt-5 text-center text-[13px] text-muted">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
