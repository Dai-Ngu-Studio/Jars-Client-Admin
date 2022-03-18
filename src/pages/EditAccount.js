import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import DisplayAlert from "components/DisplayAlert";
import { useAppContext } from "context/appContext";
import Icon from "@material-tailwind/react/Icon";
import React from "react";
import { Link } from "react-router-dom";
import { DetailsAccountRoute } from "routes/PageRoutes";

const EditAccount = () => {
    const {
        isAdminOptions,
        isAdmin,
        displayName,
        handleChange,
        editAccount,
        showAlert,
        displayAlert,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!displayName) {
            displayAlert();
            return;
        }
        editAccount();
    };

    const handleAccountInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        handleChange({ name, value });
    };

    return (
        <div className="mt-24">
            <div className="flex flex-row justify-center">
                <div className="px-3 w-full xl:w-1/3">
                    <Card>
                        <CardHeader color="purple" contentPosition="left">
                            <div className="text-white text-2xl flex flex-row items-center gap-x-1">
                                <Icon name="edit" size="2xl" />
                                <div className="">Edit Account</div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <form className="w-full max-w-lg">
                                {showAlert && <DisplayAlert />}
                                {/* displayName */}
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="displayName"
                                    >
                                        Display Name
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        value={displayName}
                                        name="displayName"
                                        onChange={handleAccountInput}
                                    />
                                </div>
                                {/* isAdmin */}
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="isAdmin"
                                    >
                                        State
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-state"
                                            name="isAdmin"
                                            value={isAdmin}
                                            onChange={handleAccountInput}
                                        >
                                            {isAdminOptions.map(
                                                (itemValue, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={
                                                                itemValue ===
                                                                "Admin"
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            {itemValue}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-end">
                                    <Link
                                        to={DetailsAccountRoute}
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
                                        Save
                                    </button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
