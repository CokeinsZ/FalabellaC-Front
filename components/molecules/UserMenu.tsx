import Icon from "../atoms/Icon";
import { UserMenuToken } from "../atoms/Token";

interface UserMenuProps {
  items: { label?: string; iconSrc?: string; href?: string }[];
}

export default function UserMenu({ items }: UserMenuProps) {
  return (
    <div className={UserMenuToken.container}>
      {items.map((item, idx) =>
        item.iconSrc ? (
          <Icon key={idx} src={item.iconSrc} alt={item.label ?? "icon"} />
        ) : (
          <a key={idx} href={item.href ?? "#"} className={UserMenuToken.link}>
            {item.label}
          </a>
        )
      )}
    </div>
  );
}
