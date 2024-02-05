import { useOutletContext } from "react-router-dom";
import LatestVenuesTable from "../components/tables/LatestVenuesTable";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  search: string;
};

function LandingPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => alert(data.search);

  const className = useOutletContext();

  return (
    <div className={`${className} flex items-center `}>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Find your next venue
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[90vw] lg:w-[400px]">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-prring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-prring-primary"
            placeholder="Search venues..."
            required
            {...register("search")}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary border border-primary transition-all hover:bg-white hover:text-primary"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default LandingPage;
