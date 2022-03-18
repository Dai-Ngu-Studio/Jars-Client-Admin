import { Alert } from "@material-tailwind/react";
import { useAppContext } from "context/appContext";
import React from "react";

function DisplayAlert() {
  const { alertType, alertText } = useAppContext();
  return (
    <Alert color={`${alertType === "success" ? "green" : "red"}`}>
      {alertText}
    </Alert>
  );
}

export default DisplayAlert;
