import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SortOrder } from "../../types/types";
import DropDownIcon from "../icons/DropDownIcon.component";
import SearchIcon from "../icons/SearchIcon.component";

function VenueSearchInput({
  setSearchString,
  searchString,
  sortOrder,
  searchVenues,
  handleSort,
}: {
  setSearchString: (searchString: string) => void;
  searchString: string;
  sortOrder: SortOrder;
  searchVenues: () => void;
  handleSort: (sortOrder: SortOrder) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex lg:w-full max-w-lg mx-auto w-[90vw]">
      <button
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-primary-light hover:border-primary shadow"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {sortOrder === SortOrder.Ascending ? "Ascending" : "Descending"}
        <DropDownIcon className="w-2.5 h-2.5 ms-2.5" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.1 }}
            className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
          >
            <ul className="py-2 text-sm text-gray-700 ">
              <li>
                <button
                  onClick={() => {
                    handleSort(SortOrder.Descending);
                    setOpen(false);
                  }}
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                >
                  Descending
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleSort(SortOrder.Ascending);
                    setOpen(false);
                  }}
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                >
                  Ascending
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full">
        <input
          type="search"
          className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 shadow-inner focus:ring-primary focus:shadow-lg"
          placeholder="Search venues..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchVenues();
            }
          }}
          required
        />
        <button
          onClick={() => searchVenues()}
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-primary-light focus:ring-2 focus:outline-none focus:ring-primary-light transition-all group shadow"
        >
          <SearchIcon className="transition-all group-hover:text-primary text-primary-light" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}

export default VenueSearchInput;
