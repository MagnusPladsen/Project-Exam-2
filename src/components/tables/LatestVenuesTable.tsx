import { useEffect, useState } from "react";
import formatToEuro from "../../formatters/formatToEuro";
import TableRowSkeleton from "../skeletons/TableRowSkeleton";
import TableRowWrapper from "./TableRowWrapper";
import { useGetLatestVenuesQuery } from "../../services/api/holidazeApi";

function LatestVenuesTable() {
  const [latestVenues, setLatestVenues] = useState<Venue[]>([]);

  const { data: venues, error, isLoading } = useGetLatestVenuesQuery();

  function getLatestVenues() {
    setLatestVenues(venues || []);
  }

  useEffect(() => {
    getLatestVenues();
  }, [isLoading]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-primary text-xl">Latest Venues</h2>
      <div className="flex flex-col border w-[600px] max-w-[90vw] bg-white">
        <div className="relative overflow-x-auto">
          <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || error ? (
                <TableRowSkeleton number={5} />
              ) : (
                latestVenues.map((venue, index) => (
                  <TableRowWrapper>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50px] lg:min-w-[250px] lg:max-w-[250px] truncate text-ellipsis"
                    >
                      {venue.name}
                    </th>
                    <td className="px-6 py-4 min-w-[150px] max-w-[150px] truncate text-ellipsis">
                      {venue.description}
                    </td>
                    <td className="px-6 py-4 min-w-[100px] max-w-[100px] truncate text-ellipsis">
                      {venue.rating}
                    </td>
                    <td className="px-6 py-4 w-[50px] lg:min-w-[150px] lg:max-w-[150px] truncate text-ellipsis">
                      ${venue.price}
                    </td>
                  </TableRowWrapper>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LatestVenuesTable;
