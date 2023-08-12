import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Modal } from "@mui/material";
import { Helper } from "../../classes/Helper";

const Technician = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [activeTab, setActiveTab] = useState("getAllComplain");
  const [loading, setLoading] = useState(false);
  const [complainData, setComplainData] = useState([]);
  const [singleComplainData, setSingleComplainData] = useState([]);
  const [pendingModal, setPendingModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);
  const [firstRequestPart, setFirstRequestPart] = useState("");
  const [secondRequestPart, setSecondRequestPart] = useState("");
  const [thirdRequestPart, setThirdRequestPart] = useState("");
  const [firstRequestPartError, setFirstRequestPartError] = useState("");
  const [secondRequestPartError, setSecondRequestPartError] = useState("");
  const [thirdRequestPartError, setThirdRequestPartError] = useState("");
  const [requiredPart, setRequiredPart] = useState("");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const location = useLocation();
  console.log("---------------------location--------------------", location);

  const getComplainData = () => {
    setLoading(true);
    const apiParams = {
      url: `${apiEndPoints.getComplainByAssignedTo}/${location.state.id}`,
      requestMethod: "get",
      response: (res) => {
        console.log("---res-------", res);
        setComplainData(res.result.complaints);
        setLoading(false);
      },
      errorFunction: (error) => {
        if (error == undefined) {
          setLoading(false);
        }
        console.log("---error--", error);
        toast.error(error.message);
      },
      endFunction: () => {
        console.log("End Function Called");
      },
    };
    Api.callApi(apiParams);
  };

  const getSingleComplaint = (Id) => {
    const apiParams = {
      url: `${apiEndPoints.getAllComplain}/${Id}`,
      requestMethod: "get",
      response: (res) => {
        console.log("---singleRes-------", res.result.complaint);
        setSingleComplainData(res.result.complaint);
      },
      errorFunction: (error) => {
        if (error == undefined) {
        }
        console.log("---error--", error);
        // if (error.status === 403) {
        //   toast.warn(error);
        //   setLoading(false);
        // }
        toast.error(error.message);
      },
      endFunction: () => {
        console.log("End Function Called");
      },
    };
    Api.callApi(apiParams);
  };

  useEffect(() => {
    getComplainData();
    // getTechnicianEmployee();
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) {
      setOTP((prevOTP) => {
        const newOTP = [...prevOTP];
        newOTP[index] = value;
        return newOTP;
      });
      if (index < inputRefs.current.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleInputKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const requestPart = () => {
    let firstRequestPartValid = false;
    if (!firstRequestPart) {
      setFirstRequestPartError("! Field is required");
    } else {
      setFirstRequestPartError("");
      firstRequestPartValid = true;
    }
    if (firstRequestPartValid) {
      alert("Submit Form");
    }
  };

  const handleLogout = () => {
    // setLoading(true);
    const apiParams = {
      url: apiEndPoints.logOut,
      requestMethod: "post",
      response: (res) => {
        console.log(res);
        toast.success(res.message);
        // setLoading(false);
        Helper.logOut()
        navigate("/");
      },
      errorFunction: (error) => {
        setLoading(false);
        toast.error(error.error);
        console.error(error);
      },
    };
    Api.callApi(apiParams);
  };


  
  return (
    <div className="w-screen h-screen">
      <div className="flex h-[100px] border justify-between items-center px-4">
        <div>Hello, {location.state.data.fullName}</div>
        <div className="flex gap-3">
          <div
            className={`border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer ${
              activeTab === "getAllComplain" && "border-blue-500"
            }`}
            onClick={() => handleTabClick("getAllComplain")}
          >
            Get all complaints
          </div>
          {/* <div
            className={`border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer ${
              activeTab === "createEmployee" && "border-blue-500"
            }`}
            onClick={() => handleTabClick("createEmployee")}
          >
            Create Employee
          </div> */}
        </div>
        <div
          className="border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      <div>
        {activeTab === "getAllComplain" && (
          <div>
            <div>
              {loading ? (
                "loading----"
              ) : (
                <table className="allComplain-table w-full">
                  <thead>
                    <tr>
                      <th>
                        <span>Complain ID</span>
                      </th>
                      <th>
                        <span>Cost. Name</span>
                      </th>
                      <th>
                        <span>Date</span>
                      </th>
                      <th>
                        <span>Address</span>
                      </th>
                      <th>
                        <span>City</span>
                      </th>
                      <th>
                        <span>State</span>
                      </th>
                      <th>
                        <span>Problems</span>
                      </th>{" "}
                      <th>
                        <span>Status</span>
                      </th>
                      <th className="text-center">
                        <span>Part Pending</span>
                      </th>
                      <th className="text-center">
                        <span>Close Compliant</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(complainData) &&
                      complainData?.map((items, i) => {
                        return (
                          <tr key={i}>
                            <td>{items.complainId}</td>
                            <td>{items.customerName}</td>
                            <td>
                              {moment(items.dopDate).format("DD-MM-YYYY")}
                            </td>
                            <td>{items.address}</td>
                            <td>{items.city}</td>
                            <td>{items?.state}</td>
                            <td>{items.problem}</td>
                            <td>{items.complainStatus}</td>
                            <td className="text-center">
                              <button
                                className="border px-2 py-1 text-white bg-black rounded"
                                onClick={
                                  () => (
                                    setPendingModal(true),
                                    console.log("Click on pending modal")
                                  )
                                  // getSingleComplaint(items.complainId)
                                }
                              >
                                Request part
                              </button>
                            </td>
                            <td className="text-center">
                              <button
                                className="border px-2 py-1 text-white bg-black rounded w-[5rem]"
                                onClick={
                                  () => (
                                    setCloseModal(true),
                                    console.log("Click on close modal")
                                  )
                                  // getSingleComplaint(items.complainId)
                                }
                              >
                                Close
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        open={pendingModal}
        onClose={() => setPendingModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="modal w-[500px] bg-white rounded">
          <p className="text-xl text-center font-bold">Request part</p>
          <div className="border my-2 rounded flex gap-3 px-2">
            <label>Request Part1 :</label>
            <input
              type="file"
              className="cursor-pointer"
              value={firstRequestPart}
              onChange={(e) => setFirstRequestPart(e.target.value)}
            />
          </div>
          {firstRequestPartError && (
            <p className="text-red-500">{firstRequestPartError}</p>
          )}
          <div className="border my-2 rounded flex gap-3 px-2">
            <label htmlFor="">Request Part2 :</label>
            <input
              type="file"
              value={secondRequestPart}
              onChange={(e) => setSecondRequestPart(e.target.value)}
            />
          </div>
          <div className="border my-2 rounded flex gap-3 px-2">
            <label htmlFor="">Request Part3 :</label>
            <input
              type="file"
              value={thirdRequestPart}
              onChange={(e) => setThirdRequestPart(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Required Part</label>
            <select
              name=""
              id=""
              className="w-full border border-[#b9bcbf] h-[37px] mt-[3px] cursor-pointer outline-none text-sm rounded"
              value={requiredPart}
              onChange={(e) => setRequiredPart(e.target.value)}
            >
              <option value="">Select Required Part</option>
              <option value="motor">Motor</option>
              <option value="pump">Pump</option>
            </select>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
              onClick={requestPart}
            >
              {pendingLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={closeModal}
        onClose={() => setCloseModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="modal w-[500px] bg-white rounded">
          <p className="text-xl text-center font-bold">Close Complaint</p>
          <div className="my-2 rounded flex gap-3 px-2">
            <label>Consume Part1 :</label>
            <input type="file" className="cursor-pointer" />
          </div>
          <div className="my-2 rounded flex gap-3 px-2">
            <label htmlFor="">Consume Part2 :</label>
            <input type="file" />
          </div>
          <div className="my-2 rounded flex gap-3 px-2">
            <label htmlFor="">Consume Part3 :</label>
            <input type="file" />
          </div>
          <div className="flex gap-5 items-center px-2">
            <div className="font-bold">Enter OTP:</div>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  className="border-2 border-transparent border-b-blue-500 outline-none text-center w-[2rem]"
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleInputKeyDown(e, index)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
              // onClick={submitForm}
              onClick={() => console.log(otp.join(""))}
            >
              {closeLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Technician;
