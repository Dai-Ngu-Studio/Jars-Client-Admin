import TableCard from "components/TableCard";
import { useAppContext } from "context/appContext";
import { useEffect } from "react";

export default function Dashboard() {
  const { getAccounts, accounts, search, page } = useAppContext();
  useEffect(() => {
    getAccounts();
  }, [search, page]);

  return (
    <>
    <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

      <div className="px-3 md:px-8 h-auto mt-2">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <TableCard accounts={accounts} />
          </div>
        </div>
      </div>
    </>
  );
}
