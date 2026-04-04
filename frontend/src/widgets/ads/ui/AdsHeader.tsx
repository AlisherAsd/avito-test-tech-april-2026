interface Props {
  total: number;
}

export default function AdsHeader({ total }: Props) {
  return (
    <div className="px-2 py-3">
      <h2 className="text-2xl font-medium leading-tight tracking-tight">Мои объявления</h2>
      <p className="font-sans text-lg leading-none text-[#848388]">{total || 0} объявления</p>
    </div>
  );
}
