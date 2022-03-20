import ChartLine from "components/ChartLine";
import StatusCard from "components/StatusCard";
import { useAppContext } from "context/appContext";
import { useEffect } from "react";

export default function Dashboard() {
  const {
    getGoogleAnalytics,
    active28DayReport,
    newReport,
    totalReport,
    todayTransactions,
  } = useAppContext();

  useEffect(async () => {
    await getGoogleAnalytics();
  }, []);

  return (
    <>
      <div className="bg-light-blue-500 pt-14 pb-10 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <StatusCard
              color="purple"
              icon="paid"
              title="Transactions"
              amount={todayTransactions}
              date="Since today"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 mt-2">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <ChartLine
                report={active28DayReport}
                chartName="Active Users"
                headerColor="orange"
                lineColor="#d35400"
              />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <ChartLine
                report={newReport}
                chartName="New Users"
                headerColor="green"
                lineColor="#138d75"
              />
            </div>
            <div className="xl:col-start-1 xl:col-end-6 px-4 mb-14">
              <ChartLine
                report={totalReport}
                chartName="Total Users"
                headerColor="blue"
                lineColor="#3498db"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
