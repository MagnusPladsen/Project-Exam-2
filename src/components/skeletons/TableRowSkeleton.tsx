import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TableRowWrapper from "../tables/TableRowWrapper";

function TableRowSkeleton({ number }: { number: number }) {
  return (
    <>
      {Array.from({ length: number }, (_, index) => (
        <TableRowWrapper>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white min-w-[250px] max-w-[250px] truncate text-ellipsis"
          >
            <Skeleton width={250} />
          </th>
          <td className="px-6 py-4 min-w-[150px] max-w-[150px] truncate text-ellipsis">
            <Skeleton width={150} />
          </td>
          <td className="px-6 py-4 min-w-[100px] max-w-[100px] truncate text-ellipsis">
            <Skeleton width={100} />
          </td>
          <td className="px-6 py-4 min-w-[150px] max-w-[150px] truncate text-ellipsis">
            <Skeleton width={150} />
          </td>
        </TableRowWrapper>
      ))}
    </>
  );
}

export default TableRowSkeleton;
