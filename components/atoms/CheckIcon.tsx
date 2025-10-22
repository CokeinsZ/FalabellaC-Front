export default function CheckIcon({ className = "w-5 h-5 text-[#7ed321]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" stroke="#7ed321" strokeWidth="1.5" fill="#fff" />
      <path
        d="M7 12.5l2.5 2.5L17 8"
        stroke="#7ed321"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
