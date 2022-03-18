import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "context/appContext";
import DisplayAlert from "./DisplayAlert";
import PageBtnContainer from "./PageBtnContainer";
import { Heading3 } from "@material-tailwind/react";

export default function CardTable({ accounts }) {
  let date = moment(accounts.lastLoginDate);
  date = date.format("MMM Do, YYYY");

  const {
    setEditAccount,
    deleteAccount,
    showAlert,
    setAccountDetail,
    numOfPages,
  } = useAppContext();

  if (accounts.length === 0) {
    return <Heading3>No account to display</Heading3>;
  }

  return (
    <Card>
      <CardHeader color="purple" contentPosition="left">
        <h2 className="text-white text-2xl">Accounts</h2>
      </CardHeader>
      {showAlert && <DisplayAlert />}

      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  User UID
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Name
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Last Active Date
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Transactions Made
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => {
                return (
                  <tr key={account.id}>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {account.id}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {account.displayName}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {date}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      {account.transactionCount}
                    </td>
                    <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                          <Link
                            to="/tables/edit-account"
                            onClick={() => setEditAccount(account.id)}
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          >
                            Edit
                          </Link>
                          <Link
                            to="/tables/account-detail"
                            onClick={() => setAccountDetail(account.id)}
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          >
                            Detail
                          </Link>
                          <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => deleteAccount(account.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {numOfPages > 1 && <PageBtnContainer />}
        </div>
      </CardBody>
    </Card>
  );
}
