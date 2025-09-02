import Icon from "../atoms/Icon";

interface UserMenuProps {
  items: { label?: string; iconSrc?: string; href?: string }[];
}

export default function UserMenu({ items }: UserMenuProps) {
  return (
    <div className="flex items-center gap-6 text-sm">
      {items.map((item, idx) =>
        item.iconSrc ? (
          <Icon key={idx} src={item.iconSrc} alt={item.label ?? "icon"} />
        ) : (
          <a key={idx} href={item.href ?? "#"} className="cursor-pointer">
            {item.label}
          </a>
        )
      )}
    </div>
  );
}
