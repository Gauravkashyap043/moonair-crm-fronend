import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
const Register = () => {
  const [fullName,setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  return (
    <div className="register-container h-screen w-screen">
      <div className="w-full h-[100px] border text-center">Register page</div>
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
              onClick={() => alert("click on button")}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
