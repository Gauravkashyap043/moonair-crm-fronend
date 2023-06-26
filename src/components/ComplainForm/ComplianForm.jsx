import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { CircularProgress } from "@mui/material";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { toast } from "react-toastify";
import { Api } from "../../classes/Api";
import { useNavigate } from "react-router-dom";

const ComplianForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [costumerName, setCostumerName] = useState("");
  const [number, setNumber] = useState("");
  const [altNumber, setAltNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [problem, setProblem] = useState("");

  const [costumerNameError, setCostumerNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [postalError, setPostalError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [problemError, setProblemError] = useState("");

  const submitForm = () => {
    let costumerNameValid = false;
    if (!costumerName) {
      setCostumerNameError("! Name is required");
    } else {
      setCostumerNameError("");
      costumerNameValid = true;
    }

    let numberValid = false;
    if (!number) {
      setNumberError("! Number is required");
    } else if (number.length < 10) {
      setNumberError("! Invalid Number");
    } else {
      setNumberError("");
      numberValid = true;
    }

    let addressValid = false;
    if (!address) {
      setAddressError("! Address is required");
    } else {
      setAddressError("");
      addressValid = true;
    }

    let postalValid = false;
    if (!postal) {
      setPostalError("! Postal code is required");
    } else if (postal.length < 6) {
      setPostalError("! Length should be 6");
    } else {
      setPostalError("");
      postalValid = true;
    }

    let cityValid = false;
    if (!city) {
      setCityError("! City name is required");
    } else {
      setCityError("");
      cityValid = true;
    }

    let stateValid = false;
    if (!state) {
      setStateError("! State is required");
    } else {
      setStateError("");
      stateValid = true;
    }

    let problemValid = false;
    if (!problem) {
      setProblemError("! Problem is required");
    } else {
      setProblemError("");
      problemValid = true;
    }

    if (
      costumerNameValid &&
      numberValid &&
      addressValid &&
      postalValid &&
      cityValid &&
      stateValid &&
      problemValid
    ) {
      setLoading(true);
      const apiParams = {
        url: `${apiEndPoints.registerComplain}`,
        requestMethod: "post",
        response: (res) => {
          console.log("---res-------", res);
          if (res.status === 200) {
            setCostumerName("");
            setAddress("");
            setAltNumber("");
            setCity("");
            setNumber("");
            setState("");
            setPostal("");
            setProblem("");
            setLoading(false);
            toast.success(res.message);
          }
        },
        errorFunction: (error) => {
          if (error == undefined) {
            setLoading(false);
          }
          console.log("---error--", error);
          if (error.status === 403) {
            toast.warn(error);
            setLoading(false);
            navigate("/");
          }
          toast.error(error.message);
        },
        endFunction: () => {
          console.log("End Function Called");
        },
        input: {
          customerName: costumerName,
          phoneNumber: number,
          altPhoneNumber: altNumber,
          address: address,
          city: city,
          state: state,
          country: "INDIA",
          postalCode: postal,
          problem: problem,
        },
      };
      Api.callApi(apiParams);
    }
  };

  return (
    <div className="w-screen">
      <div className="complain-form">
        <div className="m-auto w-[500px] border mt-5">
          <div>
            <InputField
              onChange={(e) =>
                setCostumerName(e.target.value) || setCostumerNameError()
              }
              properties={{
                fieldType: "costumerName",
              }}
              style={"style"}
              value={costumerName}
            />
            {costumerNameError && (
              <p className="text-red-500 text-sm">{costumerNameError}</p>
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
              onChange={(e) => setAltNumber(e.target.value)}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              properties={{
                fieldType: "alt-number",
              }}
              style={"style"}
              maxLength={10}
              value={altNumber}
            />
          </div>
          <div>
            <InputField
              onChange={(e) => setAddress(e.target.value) || setAddressError()}
              properties={{
                fieldType: "address",
              }}
              style={"style"}
              value={address}
            />
            {addressError && (
              <p className="text-red-500 text-sm">{addressError}</p>
            )}
          </div>
          <div>
            <InputField
              onChange={(e) => setPostal(e.target.value) || setPostalError()}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              properties={{
                fieldType: "postal",
              }}
              style={"style"}
              maxLength={6}
              value={postal}
            />
            {postalError && (
              <p className="text-red-500 text-sm">{postalError}</p>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-1/2">
              <InputField
                onChange={(e) => setCity(e.target.value) || setCityError()}
                properties={{
                  fieldType: "city",
                }}
                style={"style"}
                value={city}
              />
              {cityError && <p className="text-red-500 text-sm">{cityError}</p>}
            </div>
            <div className="w-1/2">
              <label>State</label> <br />
              <select
                className="w-full border mt-[3px] h-[39px] rounded outline-none cursor-pointer border-[#b9bcbf]"
                onChange={(e) => setState(e.target.value) || setStateError()}
                value={state}
              >
                <option value="">Select state</option>
                <option value="Utter Pradesh">Utter Pradesh</option>
              </select>
              {stateError && (
                <p className="text-red-500 text-sm">{stateError}</p>
              )}
            </div>
          </div>
          <div>
            <InputField
              onChange={(e) => setProblem(e.target.value) || setProblemError()}
              properties={{
                fieldType: "problem",
              }}
              style={"style"}
              value={problem}
            />
            {problemError && (
              <p className="text-red-500 text-sm">{problemError}</p>
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
    </div>
  );
};

export default ComplianForm;
