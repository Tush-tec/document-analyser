export default function PrimaryButton({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full px-4 py-3 mt-2 text-[15px] font-semibold text-white rounded-xl bg-linear-to-br from-ocean-500 to-ocean-700 shadow-[0_10px_24px_-10px_rgba(30,111,217,0.7)] transition hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    >
      {children}
    </button>
  );
}
