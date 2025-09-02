interface TextLinkProps {
  label: string;
  href?: string;
  className?: string;
}

export default function TextLink({ label, href = "#", className }: TextLinkProps) {
  return (
    <a href={href} className={`text-sm text-gray-700 hover:underline ${className}`}>
      {label}
    </a>
  );
}
