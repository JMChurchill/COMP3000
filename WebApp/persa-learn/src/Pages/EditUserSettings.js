import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "../Components/CustomButton";
import CustomInput from "../Components/CustomInput";
import { updateUserDetails } from "../http_Requests/studentRequests";

const EditUserSettings = () => {
  //get variables passed from user settings
  const { state } = useLocation();
  //TODO: allow to change profile picture
  const [email, setEmail] = useState(state.email);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [isSuccess, setIsSuccess] = useState(false);
  //   const [password, setPassword] = useState();//TODO: make change password

  const updateUser = async (e) => {
    // e.preventDefault();
    const credentials = {
      email: email,
      firstname: firstName,
      lastname: lastName,
    };
    // send update request
    let data = await updateUserDetails(credentials);
    if (data.status === "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    console.log("the data: ", data);
  };
  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>User settings</h1>
        <div className="container ">
          {isSuccess ? (
            <h2 className="success-message">Successfully changed</h2>
          ) : (
            ""
          )}
          {/* <form action="" onSubmit={updateUser} id="update-user-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="firstName">First name</label>
            <input
              type="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last name</label>
            <input
              type="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input type="submit" className="btn" />
          </form> */}
          {/* <div id="update-user-form"> */}
          <label htmlFor="email">Email</label>
          <CustomInput value={email} name={"email"} setValue={setEmail} />
          <label htmlFor="firstname">First name</label>
          <CustomInput
            value={firstName}
            name={"firstname"}
            setValue={setFirstName}
          />
          <label htmlFor="lastname">Last name</label>
          <CustomInput
            value={lastName}
            name={"lastname"}
            setValue={setLastName}
          />
          <CustomButton text={"Update user"} onClick={updateUser} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default EditUserSettings;
