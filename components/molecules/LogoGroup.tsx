import Logo from "../atoms/Logo";
import { LogoGroupToken } from "../../utils/Token";


interface LogoGroupProps {
  logos: { src: string; alt: string; width?: number; height?: number }[];
}

export default function LogoGroup({ logos }: LogoGroupProps) {
  return (
    <div className={LogoGroupToken.container}>
      {logos.map((logo, idx) => (
        <Logo key={idx} {...logo} />
      ))}
    </div>
  );
}
