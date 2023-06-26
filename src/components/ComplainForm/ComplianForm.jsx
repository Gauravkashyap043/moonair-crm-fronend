import React, { useState } from "react";
import InputField from "../InputField/InputField";

const ComplianForm = () => {
  const [costumerName, setCostumerName] = useState("");
  const [number, setNumber] = useState("");
  const [altNumber, setAltNumber] = useState("");
  const [dop, setDop] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [problem, setProblem] = useState("");

  const [costumerNameError, setCostumerNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [altNumberError, setAltNumberError] = useState("");
  const [dopError, setDopError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [postalError, setPostalError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [problemError, setProblemError] = useState("");

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


    let addressValid = false;
    // Add validation logic for address here if needed
    // ...

    let postalValid = false;
    // Add validation logic for postal code here if needed
    // ...

    let cityValid = false;
    // Add validation logic for city here if needed
    // ...

    let stateValid = false;
    // Add validation logic for state here if needed
    // ...

    let problemValid = false;
    // Add validation logic for problem here if needed
    // ...

    if (
      numberValid &&
      addressValid &&
      postalValid &&
      cityValid &&
      stateValid &&
      problemValid
    ) {
      alert("form submit");
    }
  };

  return (
    <div className="w-screen">
      <div className="complain-form">
        <div className="m-auto w-[500px] border mt-5">
          <div>
            <InputField
              onChange={(e) => setCostumerName(e.target.value)}
              properties={{
                fieldType: "costumerName",
              }}
              style={"style"}
              value={costumerName}
            />
            {costumerNameError && <p>{costumerNameError}</p>}
          </div>
          <div>
            <InputField
              onChange={(e) => setNumber(e.target.value)}
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
            {numberError && <p>{numberError}</p>}
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
            {altNumberError && <p>{altNumberError}</p>}
          </div>
          <div>
            <InputField
              onChange={(e) => setAddress(e.target.value)}
              properties={{
                fieldType: "address",
              }}
              style={"style"}
              value={address}
            />
            {addressError && <p>{addressError}</p>}
          </div>
          <div>
            <InputField
              onChange={(e) => setPostal(e.target.value)}
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
            {postalError && <p>{postalError}</p>}
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-1/2">
              <InputField
                onChange={(e) => setCity(e.target.value)}
                properties={{
                  fieldType: "city",
                }}
                style={"style"}
                value={city}
              />
              {cityError && <p>{cityError}</p>}
            </div>
            <div className="w-1/2">
              <label>State</label> <br />
              <select
                className="w-full border mt-[3px] h-[39px] rounded outline-none cursor-pointer border-[#b9bcbf]"
                onChange={(e) => setState(e.target.value)}
                value={state}
              >
                <option value="">Select state</option>
                <option value="Utter Pradesh">Utter Pradesh</option>
              </select>
              {stateError && <p>{stateError}</p>}
            </div>
          </div>
          <div>
            <InputField
              onChange={(e) => setProblem(e.target.value)}
              properties={{
                fieldType: "problem",
              }}
              style={"style"}
              value={problem}
            />
            {problemError && <p>{problemError}</p>}
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

export default ComplianForm;
