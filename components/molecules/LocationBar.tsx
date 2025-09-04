import Icon from "../atoms/Icon";

interface LocationBarProps {
  iconSrc: string;
  text: string;
  rightLinks?: { label: string; href?: string }[];
}

export default function LocationBar({ iconSrc, text, rightLinks }: LocationBarProps) {
  return (
    <div className="flex justify-between items-center px-6 py-2 text-sm text-gray-600 border-t">
      <div className="flex items-center gap-2 cursor-pointer">
        <Icon src={iconSrc} alt="location" />
        <span>{text}</span>
      </div>
      <div className="flex gap-4">
        {rightLinks?.map((link, idx) => (
          <a key={idx} href={link.href ?? "#"} className="hover:underline">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}