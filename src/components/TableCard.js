import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "context/appContext";

import PageBtnContainer from "./PageBtnContainer";
import { LeadText } from "@material-tailwind/react";
import Icon from "@material-tailwind/react/Icon";
import { EditAccountRoute, DetailsAccountRoute } from "routes/PageRoutes";
import { SearchContainer } from "components/SearchContainer";

import { DeleteAccountRoute } from "routes/PageRoutes";

export default function CardTable({ accounts }) {
  let date = moment(accounts.lastLoginDate);
  date = date.format("MMM Do, YYYY");

  const { setEditAccount, setDeleteAccount, setAccountDetail, numOfPages } =
    useAppContext();

  let isEmpty = false;

  if (accounts.length === 0) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }

  return (
    <Card>
      <CardHeader color="purple" contentPosition="left">
        <div className="text-white text-2xl flex flex-row items-center gap-x-1">
          <Icon name="group" size="2xl" />
          <div className="">Accounts</div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="overflow-x-auto">
          <SearchContainer />
          <table className="items-center w-full bg-transparent border-collapse table-fixed">
            <thead>
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-4 sm:w-16 2xl:w-72">
                  User UID
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-4 sm:w-16 2xl:w-64">
                  Name
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-4 sm:w-16 2xl:w-64">
                  Email
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-4 sm:w-16 2xl:w-32">
                  Last Active
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-right w-4 sm:w-16 2xl:w-24">
                  Transactions
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-4 sm:w-32 2xl:w-72">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty ? (
                accounts.map((account) => {
                  return (
                    <tr key={account.id} className="hover:bg-neutral-200">
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                        {account.id}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                        {account.displayName}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                        {account.email}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                        {date}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-right truncate">
                        {account.transactionCount}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Link
                            to={EditAccountRoute}
                            onClick={() => setEditAccount(account.id)}
                            className="mr-1 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 lg:py-2 px-1 lg:px-3 rounded"
                          >
                            <Icon name="edit" size="xl" />
                          </Link>
                          <Link
                            to={DetailsAccountRoute}
                            onClick={() => setAccountDetail(account.id)}
                            className="mr-1 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 lg:py-2 px-1 lg:px-3 rounded"
                          >
                            <Icon name="info" size="xl" />
                          </Link>
                          <Link
                            to={DeleteAccountRoute}
                            onClick={() => setDeleteAccount(account.id)}
                            className="mr-1 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 lg:py-2 px-1 lg:px-3 rounded"
                          >
                            <Icon name="delete" size="xl" />
                          </Link>
                          {/* <button
                            className="mr-1 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 lg:py-2 px-1 lg:px-3 rounded"
                            type="button"
                            onClick={() => deleteAccount(account.id)}
                          >
                            <Icon name="delete" size="xl" />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    <LeadText color="gray">No results found.</LeadText>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {numOfPages > 1 && <PageBtnContainer />}
        </div>
      </CardBody>
    </Card>
  );
}
