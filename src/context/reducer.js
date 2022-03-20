import {
  HANDLE_CHANGE,
  GET_ACCOUNTS_BEGIN,
  GET_ACCOUNTS_SUCCESS,
  SET_EDIT_ACCOUNT,
  EDIT_ACCOUNT_BEGIN,
  EDIT_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_BEGIN,
  EDIT_ACCOUNT_ERROR,
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

const reducer = (state, action) => {
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === GET_ACCOUNTS_BEGIN) {
    return {
      ...state,
    };
  }
  if (action.type === GET_ACCOUNTS_SUCCESS) {
    return {
      ...state,
      accounts: action.payload.accounts,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_GOOGLE_ANALYTICS_BEGIN) {
    return {
      ...state,
    };
  }
  if (action.type === GET_GOOGLE_ANALYTICS_SUCCESS) {
    return {
      ...state,
      reportData: action.payload.reportData,
      transactions: action.payload.transactions,
    };
  }
  if (action.type === SET_EDIT_ACCOUNT) {
    const account = state.accounts.find(
      (account) => account.id === action.payload.id
    );
    const { id, isAdmin, email, displayName, lastLoginDate, photoUrl } =
      account;
    return {
      ...state,
      accountId: id,
      displayName,
      lastLoginDate,
      isAdmin,
      email,
      photoUrl,
    };
  }
  if (action.type === SET_DETAIL_ACCOUNT) {
    const account = state.accounts.find(
      (account) => account.id === action.payload.id
    );
    const {
      id,
      isAdmin,
      email,
      displayName,
      lastLoginDate,
      photoUrl,
      transactionCount,
    } = account;
    return {
      ...state,
      accountId: id,
      displayName,
      lastLoginDate,
      isAdmin,
      email,
      photoUrl,
      transactionCount,
    };
  }
  if (action.type === SET_DELETE_ACCOUNT) {
    const account = state.accounts.find(
      (account) => account.id === action.payload.id
    );
    const {
      id,
      isAdmin,
      email,
      displayName,
      lastLoginDate,
      photoUrl,
      transactionCount,
    } = account;
    return {
      ...state,
      accountId: id,
      displayName,
      lastLoginDate,
      isAdmin,
      email,
      photoUrl,
      transactionCount,
    };
  }
  if (action.type === EDIT_ACCOUNT_BEGIN) {
    return {
      ...state,
    };
  }
  if (action.type === EDIT_ACCOUNT_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "Account Updated!",
    };
  }
  if (action.type === EDIT_ACCOUNT_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Update Failed",
    };
  }
  if (action.type === DELETE_ACCOUNT_BEGIN) {
    return {
      ...state,
    };
  }
  if (action.type === DELETE_ACCOUNT_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "Account Deleted!",
    };
  }
  if (action.type === DELETE_ACCOUNT_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Delete Failed",
    };
  }
  if (action.type === CHANG_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
