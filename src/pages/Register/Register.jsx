import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Api } from "../../classes/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { CircularProgress } from "@mui/material";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [employeeTypeData, setEmployeeTyeData] = useState([]);
  const [employeeType, setEmployeeType] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [employeeTypeError, setEmployeeTypeError] = useState("");

  const navigate = useNavigate();

  const submitForm = () => {
    let numberValid = false;
    if (!number) {
      setNumberError("! Number is required");
    } else if (number.length < 10) {
      setNumberError("! Invalid Number");
    } else {
      setNumberError("");
      numberValid = true;
    }

    let passwordValid = false;
    if (!password) {
      setPasswordError("! Password is required");
    } else if (password.length < 6) {
      setPasswordError("! Length should be 6");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    let fullNameValid = false;
    if (!fullName) {
      setFullNameError("! Field is required");
    } else {
      setFullNameError("");
      fullNameValid = true;
    }

    if (numberValid && passwordValid && fullNameValid) {
      setLoading(true);
      const apiParams = {
        url: `${apiEndPoints.register}`,
        requestMethod: "post",
        response: (res) => {
          console.log("---res-------", res);
          navigate("/");
          toast.success(res.message);
          setLoading(false);
        },
        errorFunction: (error) => {
          console.log("---error--", error);
          setLoading(false);
          toast.warn(error.message);
        },
        endFunction: () => {
          console.log("End Function Called");
          setLoading(false);
        },
        input: {
          fullName: fullName,
          mobileNumber: number,
          password: password,
          orgName: "moonair",
          employeeType: employeeType,
        },
      };
      Api.callApi(apiParams);
    }
  };

  const createAdmin = () => {
    setAdminLoading(true);
    const apiParams = {
      url: `${apiEndPoints.addEmployeeType}`,
      requestMethod: "post",
      response: (res) => {
        console.log("---res-------", res);
        toast.success(res.message);
        setAdminLoading(false);
      },
      errorFunction: (error) => {
        console.log("---error--", error);
        setAdminLoading(false);
        toast.warn(error.message);
      },
      endFunction: () => {
        console.log("End Function Called");
        setAdminLoading(false);
      },
      input: {
        type: "admin",
      },
    };
    Api.callApi(apiParams);
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
        console.log("---error--", error);
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
    <div className="register-container h-screen w-screen">
      <div className="w-full h-[100px] border text-center">Register page</div>
      <div className="w-full mt-10">
        <div className="login-form w-[300px] py-4 px-1 border-2 m-auto flex flex-col justify-center">
          <div>
            <InputField
              onChange={(e) =>
                setFullName(e.target.value) || setFullNameError()
              }
              properties={{
                fieldType: "fullName",
              }}
              style={"style"}
              value={fullName}
            />
            {fullNameError && (
              <p className="text-red-500 text-sm">{fullNameError}</p>
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
            {numberError && (
              <p className="text-red-500 text-sm">{numberError}</p>
            )}
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
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
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
                "Register"
              )}
            </button>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
              onClick={createAdmin}
            >
              {adminLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Create admin type"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
