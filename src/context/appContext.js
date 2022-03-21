import axios from "axios";
import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
import { auth } from "../firebase/config";

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
  SET_DELETE_ACCOUNT,
  GET_GOOGLE_ANALYTICS_BEGIN,
  GET_GOOGLE_ANALYTICS_SUCCESS,
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
  isAdminOptions: [true, false],
  isAdmin: true,
  accounts: [],
  numOfPages: 1,
  page: 1,
  size: 10,
  search: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function createAxios() {
    return auth.currentUser.getIdToken().then(async (idToken) => {
      return axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
        headers: {
          Authorization: "Bearer " + idToken,
        },
      });
    });
  }

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
    }, 5000);
  };

  const getAccounts = async () => {
    const { search, page, size } = state;
    let url = `/accounts?page=${page}&size=${size}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_ACCOUNTS_BEGIN });
    try {
      let authFetch = await createAxios();
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

  const setDeleteAccount = (id) => {
    dispatch({ type: SET_DELETE_ACCOUNT, payload: { id } });
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
      let tmp;
      console.log(isAdmin);
      console.log(typeof isAdmin);
      if (typeof isAdmin === "string") {
        if (isAdmin === "true") {
          tmp = JSON.parse(isAdmin);
        } else if (isAdmin === "false") {
          tmp = JSON.parse(isAdmin);
        }
      } else if (typeof isAdmin === "boolean") {
        tmp = isAdmin;
      }
      let authFetch = await createAxios();
      await authFetch.put(`/accounts/${state.accountId}`, {
        id,
        isAdmin: tmp,
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
      let authFetch = await createAxios();
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

  const getGoogleAnalytics = async () => {
    dispatch({ type: GET_GOOGLE_ANALYTICS_BEGIN });
    try {
      let authFetch = await createAxios();
      const { data } = await authFetch(`/cloud/analytics`);
      const { reports, todayTransactions } = data;

      let active28DayReport = reports.active28DayUsers;
      let newReport = reports.newUsers;
      let totalReport = reports.totalUsers;

      dispatch({
        type: GET_GOOGLE_ANALYTICS_SUCCESS,
        payload: {
          active28DayReport,
          newReport,
          totalReport,
          todayTransactions,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
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
        setDeleteAccount,
        getGoogleAnalytics,
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
