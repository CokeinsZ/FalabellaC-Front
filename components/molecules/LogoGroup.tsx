import Logo from "../atoms/Logo";

interface LogoGroupProps {
  logos: { src: string; alt: string; width?: number; height?: number }[];
}

export default function LogoGroup({ logos }: LogoGroupProps) {
  return (
    <div className="flex items-center gap-6">
      {logos.map((logo, idx) => (
        <Logo key={idx} {...logo} />
      ))}
    </div>
  );
}
