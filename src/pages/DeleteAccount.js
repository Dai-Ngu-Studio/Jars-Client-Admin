import { Card, CardBody, CardHeader, Icon } from "@material-tailwind/react";
import DisplayAlert from "components/DisplayAlert";
import { useAppContext } from "context/appContext";
import moment from "moment";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AccountsRoute } from "routes/PageRoutes";

const DeleteAccount = () => {
  const {
    isAdmin,
    displayName,
    lastLoginDate,
    deleteAccount,
    showAlert,
    email,
    accountId,
  } = useAppContext();
  const navigate = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteAccount(accountId);
  };

  useEffect(() => {
    if (showAlert == true) {
      setTimeout(() => {
        navigate.push(AccountsRoute);
      }, 2000);
    }
  }, [showAlert, navigate]);

  let date = moment(lastLoginDate);
  date = date.format("MMM Do, YYYY");

  return (
    <Card>
      <CardHeader color="purple" contentPosition="left">
        <div className="text-white text-2xl flex flex-row items-center gap-x-1">
          <Icon name="group" size="2xl" />
          <div className="">Accounts</div>
        </div>
      </CardHeader>
      {showAlert && <DisplayAlert />}
      <CardBody>
        <div className="overflow-x-auto">
          <div className="">Do you want to delete this user</div>
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
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-4 sm:w-32 2xl:w-72">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral-200">
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                  {accountId}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                  {displayName}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                  {email}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                  {date}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-right truncate">
                  {isAdmin ? "Admin" : "User"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-row justify-end">
            <Link
              to={AccountsRoute}
              onClick={() => true}
              className="mr-1 shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 lg:py-2 px-1 lg:px-3 rounded"
            >
              Back
            </Link>
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              Delete
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DeleteAccount;
