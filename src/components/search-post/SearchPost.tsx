import { FC } from 'react';

type Props = {
  search: string;
  setSearch: (value: string) => void;
  searching: boolean;
};

const SearchPost: FC<Props> = ({ search, setSearch, searching }) =>
  (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        className="w-full mb-1 sm:mt-4 md:mt-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {searching && <div className="text-center text-gray-400 py-4">Searching...</div>}
    </div>
  );

export default SearchPost;