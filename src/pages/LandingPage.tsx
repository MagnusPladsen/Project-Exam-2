import { useEffect, useState } from "react";
import formatToEuro from "../formatters/formatToEuro";
import { useGetLatestVenuesQuery } from "../services/api/holidazeApi";
import { useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import LoadingSkeleton from "../components/skeletons/TableRowSkeleton";
import LatestVenuesTable from "../components/tables/LatestVenuesTable";

function LandingPage() {
  const className = useOutletContext();

  return (
    <div className={`${className} flex items-center `}>
      <h1 className="text-5xl font-logo underline underline-offset-4 text-red-500 text-center mb-10">
        Just do it!
      </h1>
      <LatestVenuesTable />
    </div>
  );
}

export default LandingPage;
