import axios from "axios";
import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";

import {
  HANDLE_CHANGE,
  GET_ACCOUNTS_BEGIN,
  GET_ACCOUNTS_SUCCESS,
  SET_EDIT_ACCOUNT,
  EDIT_ACCOUNT_BEGIN,
  EDIT_ACCOUNT_ERROR,
  EDIT_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_BEGIN,
  CLEAR_ALERT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
  SET_DETAIL_ACCOUNT,
  CHANG_PAGE,
  DISPLAY_ALERT,
} from "./action";

const initialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
  accountId: "",
  email: "",
  displayName: "",
  lastLoginDate: "",
  photoUrl: "",
  transactionCount: 0,
  isAdminOptions: ["Admin", "User"],
  isAdmin: false,
  accounts: [],
  numOfPages: 1,
  page: 1,
  size: 10,
  search: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const token = '...';
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: 'https://localhost:8001/api/v1',
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const getAccounts = async () => {
    const { search, page, size } = state;
    let url = `/accounts?page=${page}&size=${size}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_ACCOUNTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { accounts, numOfPages } = data;
      dispatch({
        type: GET_ACCOUNTS_SUCCESS,
        payload: {
          accounts,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const setEditAccount = (id) => {
    dispatch({ type: SET_EDIT_ACCOUNT, payload: { id } });
  };

  const setAccountDetail = (id) => {
    dispatch({ type: SET_DETAIL_ACCOUNT, payload: { id } });
  };

  const editAccount = async () => {
    dispatch({ type: EDIT_ACCOUNT_BEGIN });
    try {
      const {
        accountId: id,
        isAdmin,
        email,
        displayName,
        photoUrl,
        lastLoginDate,
      } = state;
      const tmp = isAdmin === "true" || isAdmin === "false";
      await authFetch.put(`/accounts/${state.accountId}`, {
        id,
        tmp,
        email,
        displayName,
        photoUrl,
        lastLoginDate,
      });
      dispatch({ type: EDIT_ACCOUNT_SUCCESS });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: EDIT_ACCOUNT_ERROR,
      });
    }
    clearAlert();
  };

  const deleteAccount = async (id) => {
    dispatch({ type: DELETE_ACCOUNT_BEGIN });
    try {
      await authFetch.delete(`/accounts/${id}`);
      getAccounts();
      dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: DELETE_ACCOUNT_ERROR });
    }
    clearAlert();
  };

  const changePage = (page) => {
    dispatch({ type: CHANG_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleChange,
        getAccounts,
        setEditAccount,
        deleteAccount,
        editAccount,
        setAccountDetail,
        changePage,
        displayAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
