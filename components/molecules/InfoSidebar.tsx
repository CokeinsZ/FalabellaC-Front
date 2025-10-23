import CheckIcon from "@/components/atoms/CheckIcon";

interface InfoItem {
  title: string;
  desc: string;
}

interface InfoSidebarProps {
  items?: InfoItem[];
}

const defaultItems: InfoItem[] = [
  {
    title: "Personas",
    desc: "Datos personales del responsable legal, incluyendo nombre, documento, correo y teléfono.",
  },
  {
    title: "Empresa",
    desc: "Información legal de tu empresa: razón social y NIT.",
  },
];

export default function InfoSidebar({ items = defaultItems }: InfoSidebarProps) {
  return (
    <aside className="bg-white rounded-2xl shadow-sm p-8 h-fit">
      <h3 className="text-lg font-semibold text-[#2b3b45] mb-6">
        Ten presente que te pediremos esta información:
      </h3>

      <div className="space-y-6">
        {items.map((item) => (
          <div className="flex gap-3" key={item.title}>
            <CheckIcon />
            <div>
              <h4 className="font-semibold text-[#2b3b45]">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-gray-500">
        Si tienes dudas, puedes revisar{" "}
        <a href="#" className="text-[#0070ba] underline font-medium">
          nuestra guía de registro
        </a>
      </p>
    </aside>
  );
}
