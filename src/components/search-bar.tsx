import { useState } from "react";

interface SearchSelectProps {
  options: Array<{ text: string; action: string}>;
  search: string;
  setSearch: (value: string) => void;
  setSelected: (value: { text: string; action: string}) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  search,
  setSearch,
  setSelected,
}) => {

	const [hidden, setHidden] = useState(true);
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Select Item</h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
						onFocus={() => setHidden(false)}
						onBlur={() => setHidden(true)}
            placeholder="Search..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {!hidden && options
            .filter((item) => item.text.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 10)
            .map((item) => (
              <div
                key={item.text}
                onClick={() => setSelected(item)}
                className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-800"
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSelect;
