import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { CircularProgress } from "@mui/material";
import { Api } from "../../classes/Api";
import { toast } from "react-toastify";
import { apiEndPoints } from "../../constants/apiEndPoints";

const CreateEmployee = () => {
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeData, setEmployeeTyeData] = useState([]);
  const [employeeTypeError, setEmployeeTypeError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = () => {
    let numberValid = false;
    let fullNameValid = false;
    let passwordValid = false;
    let employeeTypeValid = false;

    if (!number) {
      setNumberError("! Number is required");
    } else if (number.length < 10) {
      setNumberError("! Invalid Number");
    } else {
      setNumberError("");
      numberValid = true;
    }

    if (!fullName) {
      setFullNameError("! Full Name is required");
    } else {
      setFullNameError("");
      fullNameValid = true;
    }

    if (!password) {
      setPasswordError("! Password is required");
    } else if (password.length < 6) {
      setPasswordError("! Lenth Should be 6.");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    if (!employeeType) {
      setEmployeeTypeError("! Employee Type is required");
    } else {
      setEmployeeTypeError("");
      employeeTypeValid = true;
    }

    if (numberValid && fullNameValid && passwordValid && employeeTypeValid) {
      setLoading(true);
      const apiParams = {
        url: `${apiEndPoints.createEmployee}`,
        requestMethod: "post",
        input: {
          fullName: fullName,
          mobileNumber: number,
          password: password,
          employeeType: employeeType,
        },
        response: (res) => {
          console.log("---res-------", res);
          if (res.status === 200) {
            setNumber("");
            setFullName("");
            setEmployeeType("");
            setPassword("");
            setLoading(false);
            toast.success(res.message);
          }
        },
        errorFunction: (error) => {
          setLoading(false);
          if (error == undefined) {
            setLoading(false);
          }
          console.log("---error--", error);
          if (error.status === 403) {
            toast.warn(error);
            setLoading(false);
          }
          toast.error(error.message);
        },
        endFunction: () => {
          console.log("End Function Called");
        },
      };
      Api.callApi(apiParams);
    }
  };

  const getemployeeType = () => {
    const apiParams = {
      url: `${apiEndPoints.getEmployeeType}`,
      requestMethod: "get",
      response: (res) => {
        console.log("---res-------", res);
        if (res.status === 200) {
          //   toast.success(res.message);
          setEmployeeTyeData(res.result);
        }
      },
      errorFunction: (error) => {
        if (error == undefined) {
        }
        console.log("---error--", error);
        if (error.status === 403) {
          toast.warn(error);
        }
        toast.error(error.message);
      },
      endFunction: () => {
        console.log("End Function Called");
      },
    };
    Api.callApi(apiParams);
  };

  useEffect(() => {
    getemployeeType();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="create-emp-form border w-[450px] m-auto rounded mt-5 py-5 px-2 pb-5">
        <h3 className="text-center font-bold">Register Employee</h3>
        <div>
          <InputField
            onChange={(e) => setFullName(e.target.value) || setFullNameError()}
            properties={{
              fieldType: "fullName",
            }}
            style={fullNameError ? "ErrorStyle" : "style"}
            value={fullName}
          />
          {fullNameError && (
            <p className="text-red-500 text-sm">{fullNameError}</p>
          )}
        </div>
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
            style={numberError ? "ErrorStyle" : "style"}
            value={number}
          />
          {numberError && <p className="text-red-500 text-sm">{numberError}</p>}
        </div>
        <div>
          <InputField
            onChange={(e) => setPassword(e.target.value) || setPasswordError()}
            properties={{
              fieldType: "password",
            }}
            style={passwordError ? "ErrorStyle" : "style"}
            value={password}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="" className="mr-2">
            Employee Type
          </label>{" "}
          <br />
          <select
            name=""
            id=""
            className="w-full border border-[#b9bcbf] h-[37px] mt-[3px] cursor-pointer outline-none text-sm rounded"
            onChange={(e) =>
              setEmployeeType(e.target.value) || setEmployeeTypeError()
            }
            value={employeeType}
          >
            <option value="">Select Employee Type</option>
            {employeeTypeData.map((items, i) => {
              return (
                <option value={items._id} key={i}>
                  {items.type}
                </option>
              );
            })}
          </select>
          {employeeTypeError && (
            <p className="text-red-500 text-sm">{employeeTypeError}</p>
          )}
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <button
            className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
            onClick={submitForm}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
