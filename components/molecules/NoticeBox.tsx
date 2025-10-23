import WarningIcon from "@/components/atoms/WarningIcon";

interface NoticeBoxProps {
  children?: React.ReactNode;
}

export default function NoticeBox({ children }: NoticeBoxProps) {
  return (
    <div className="bg-[#fff4dc] rounded-xl p-6 border border-[#f8e3b4]">
      <div className="flex gap-4">
        <WarningIcon />
        <div className="text-[#6b4f00] text-sm leading-relaxed">
          {children || (
            <>
              <p>
                ¡Gracias por tu interés en ser parte de{" "}
                <span className="font-semibold">falabella.com</span>! Si estás interesado en vender
                productos en las categorías de vestuario, calzado, decohogar, motos y/o perfumería,
                completa el registro y adicional diligencia{" "}
                <span className="underline font-semibold cursor-pointer text-[#6b4f00]">
                  este formulario
                </span>{" "}
                para que nuestros equipos evalúen tu solicitud.
              </p>
              <p className="mt-2 text-xs">
                Ten en cuenta que estas categorías solo serán habilitadas una vez tu solicitud sea
                aprobada.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
