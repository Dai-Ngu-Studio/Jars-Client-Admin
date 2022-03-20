import React from "react";
import { useAppContext } from "context/appContext";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import moment from "moment";
import Icon from "@material-tailwind/react/Icon";
import { Link } from "react-router-dom";
import { AccountsRoute } from "routes/PageRoutes";

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
        <>
            <div className="px-3 md:px-8 h-auto mt-16">
                <div className="px-4 mb-16">
                    <Link
                        to={AccountsRoute}
                        onClick={() => true}
                        className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 lg:py-2 px-1 lg:px-3 rounded"
                    >
                        Back
                    </Link>
                </div>
            </div>
            <div className="px-3 md:px-8 h-auto mt-16">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <Card>
                            <CardHeader color="purple" contentPosition="left">
                                <div className="text-white text-2xl flex flex-row items-center gap-x-1">
                                    <Icon name="info" size="2xl" />
                                    <div className="">Account Details</div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="overflow-x-auto">
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
                                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-4 sm:w-16 2xl:w-24">
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
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
                                                    {transactionCount}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left truncate">
                                                    {isAdmin ? "Admin" : "User"}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountDetail;
