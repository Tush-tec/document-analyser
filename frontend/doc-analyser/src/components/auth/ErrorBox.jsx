export default function ErrorBox({ children }) {
  if (!children) return null;
  return (
    <div className="px-3 py-2.5 mb-3.5 text-[13px] text-[#7a1f1f] bg-[#fdecec] border border-[#f5c2c2] rounded-[10px]">
      {children}
    </div>
  );
}
