export default function Field({ label, ...props }) {
  return (
    <label className="block mb-3.5">
      <span className="block text-xs font-semibold text-ocean-900 mb-1.5 uppercase tracking-wider">
        {label}
      </span>
      <input
        {...props}
        className="w-full px-3.5 py-3 text-[15px] rounded-xl border border-ocean-500/25 bg-white/90 text-ink outline-none transition focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/15"
      />
    </label>
  );
}
