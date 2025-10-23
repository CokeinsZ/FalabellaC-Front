type IconCircleProps = {
  children: React.ReactNode;
  green?: boolean;
};


export default function IconCircle({ children, green = false }: IconCircleProps) {
  return (
    <div className={`w-28 h-28 rounded-full flex items-center justify-center ${green ? 'bg-[#7ed321]' : 'bg-gray-100'}`}>
      <div className={`w-14 h-14 flex items-center justify-center`}>{children}</div>
    </div>
  );
}