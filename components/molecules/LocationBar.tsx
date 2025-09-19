import Icon from "../atoms/Icon";
import { LocationBarToken } from "../atoms/Token";

interface LocationBarProps {
  iconSrc: string;
  text: string;
  rightLinks?: { label: string; href?: string }[];
}

export default function LocationBar({ iconSrc, text, rightLinks }: LocationBarProps) {
  return (
    <div className={LocationBarToken.container}>
      <div className={LocationBarToken.left}>
        <Icon src={iconSrc} alt="location" />
        <span>{text}</span>
      </div>
      <div className={LocationBarToken.right}>
        {rightLinks?.map((link, idx) => (
          <a key={idx} href={link.href ?? "#"} className={LocationBarToken.link}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}