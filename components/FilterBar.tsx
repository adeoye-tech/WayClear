type FilterBarProps = {
  selected: string;
  onSelect: (category: string) => void;
};

const categories = [
  "All",
  "Flood",
  "Road",
  "Waste",
  "Electricity",
  "Traffic",
  "Water",
];

export default function FilterBar({
  selected,
  onSelect,
}: FilterBarProps) {
  return (
    <div className=" flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-xl px-5 py-2.5 font-medium transition-all duration-300 ${
  selected === category
    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
    : "border border-cyan-500/20 bg-[#0b2147] text-slate-300 hover:border-cyan-400 hover:text-white"
}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}