import React from "react";
import { useAppContext } from "context/appContext";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import moment from "moment";

const AccountDetail = () => {
  const {
    accountId,
    isAdmin,
    displayName,
    email,
    lastLoginDate,
    photoUrl,
    transactionCount,
  } = useAppContext();

  let date = moment(lastLoginDate);
  date = date.format("MMM Do, YYYY");

  return (
    <Card>
      <CardHeader color="purple" contentPosition="left">
        <h2 className="text-white text-2xl">Account Detail</h2>
      </CardHeader>
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
                  Email
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {accountId}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {displayName}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {date}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {transactionCount}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {email}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {isAdmin ? "Admin" : "User"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default AccountDetail;
