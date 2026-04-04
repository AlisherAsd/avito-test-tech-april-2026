export function BlockRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex">
      <span className="w-37 text-sm text-gray-500 font-semibold">{label}</span>
      <span className="flex-1 text-sm text-gray-900">{value}</span>
    </div>
  );
}
