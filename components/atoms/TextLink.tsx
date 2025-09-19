import { TextLinkToken } from "./Token";
interface TextLinkProps {
  label: string;
  href?: string;
  className?: string;
}

export default function TextLink({ label, href = "#", className }: TextLinkProps) {
  return (
    <a href={href} className={`${TextLinkToken.link}  ${className}`}>
      {label}
    </a>
  );
}
