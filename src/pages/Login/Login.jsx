import React, { useState } from "react";
import "./login.css";
import InputField from "../../components/InputField/InputField";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const submitForm = () => {
    const apiParams = {
      url: `${apiEndPoints.login}`,
      requestMethod: "post",
      response: (res) => {
        console.log("---res-------", res);
        if (res.status === 200) {
          toast.success(res.message)
          if (res.result.employeeType[0].type === "service") {
            navigate("/service");
          } else {
            navigate("/admin");
          }
        }
        // if(res.status === 201) {
        //   
        // }
      },
      errorFunction: (error) => {
        console.log("---error--", error);
        // if(error.status === 409 ) {
        //   toast.warn(error.message);
        // }
      },
      endFunction: () => {
        console.log("End Function Called");
      },
      input: {
        mobileNumber: number,
        password: password,
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <div className="login-container h-screen w-screen">
      <div className="w-full h-[100px] border text-center">Login page</div>
      <div className="w-full mt-10">
        <div className="login-form w-[300px] h-[300px] border-2 m-auto flex flex-col justify-center">
          <div>
            <InputField
              onChange={(e) => setNumber(e.target.value) || setNumberError()}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              properties={{
                fieldType: "number",
              }}
              maxLength={10}
              style={"style"}
              value={number}
            />
          </div>
          <div>
            <InputField
              onChange={(e) =>
                setPassword(e.target.value) || setPasswordError()
              }
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              properties={{
                fieldType: "password",
              }}
              maxLength={10}
              style={"style"}
              value={password}
            />
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
