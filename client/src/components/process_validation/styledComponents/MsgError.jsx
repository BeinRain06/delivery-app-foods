import React, { useEffect, useState } from "react";

function ErrorWarning({ message, componentSectionName, forseen }) {
  const [errorMsg, setErrorMsg] = useState("");

  const newMessage = forseen
    ? "soon, this feature will be implented."
    : message;

  const applyMsgError = () => {
    setErrorMsg(newMessage);
    setTimeout(() => {
      setErrorMsg("");
    }, 7500);
  };

  const styleDivOne = {
    position: "absolute",
    top: "5.5rem",
    width: "90%",
    color: "brown",
    backgroundColor: "#e7e697",
    padding: "0.25rem 1rem",
    fontSize: "clamp(0.65rem, 0.75rem, 0.8rem)",
    border: "2px solid #fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 1s ease-in-out",
  };

  const styleDivTwo = {
    position: "absolute",
    top: "5.5rem",
    width: "90%",
    color: "brown",
    backgroundColor: "#e7e697",
    padding: "0.25rem 1rem",
    fontSize: "clamp(0.65rem, 0.75rem, 0.8rem)",
    border: "2px solid #fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 1s ease-in-out",
  };

  const styleDivThree = {
    position: "absolute",
    top: "5.5rem",
    width: "90%",
    color: "#1c7e4d",
    backgroundColor: "#653b7e",
    padding: "0.25rem 1rem",
    fontSize: "clamp(0.65rem, 0.75rem, 0.8rem)",
    border: "2px solid #fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 1s ease-in-out",
  };

  const chooseYourStyle = () => {
    if (componentSectionName === "sendNewLocOrder") {
      return styleDivOne;
    } else if (
      componentSectionName === "fourthMealButton" &&
      forseen === false
    ) {
      return styleDivTwo;
    } else if (
      componentSectionName === "fourthMealButton" &&
      forseen === true
    ) {
      return styleDivThree;
    }
  };

  useEffect(() => {
    applyMsgError();
  }, []);

  return (
    <>
      {errorMsg !== "" && (
        <div style={chooseYourStyle()}>
          <p>{newMessage}</p>
        </div>
      )}
    </>
  );
}

export default ErrorWarning;
