import React, { useEffect, useState } from "react";
import ComplianForm from "../../components/ComplainForm/ComplianForm";
import { toast } from "react-toastify";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateEmployee from "../../components/CreateEmployee/CreateEmployee";
import "./admin.css";
import moment from "moment";
import { CircularProgress, Modal } from "@mui/material";
const Admin = () => {
  const [activeTab, setActiveTab] = useState("getAllComplain");
  const [loading, setLoading] = useState(false);
  const [complainLoading, setComplainLoading] = useState(false);
  const [complainData, setComplainData] = useState([]);
  const [singleComplainData, setSingleComplainData] = useState([]);
  const [complainModal, setComplainModal] = useState(false);
  // const [complainId, setComplianId] = useState("");
  const [data, setData] = useState([]);
  const [technicianData, setTechnicianData] = useState([]);
  const [assignTechnician, setAssignTechnician] = useState("");
  const location = useLocation();
  const notify = () => toast("Logout not working right now");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getComplainData = () => {
    setLoading(true);
    const apiParams = {
      url: `${apiEndPoints.getAllComplain}`,
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

  useEffect(() => {
    getComplainData();
    // getTechnicianEmployee();
  }, []);

  const getSingleComplaint = (Id) => {
    const apiParams = {
      url: `${apiEndPoints.getAllComplain}/${Id}`,
      requestMethod: "get",
      response: (res) => {
        console.log("---singleRes-------", res.result.complaint);
        setData(res.result.complaint);
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

  const getTechnicianEmployee = () => {
    const apiParams = {
      url: `${apiEndPoints.getEmployeeByType}/6495fcf34d9776ae93a247ec`,
      requestMethod: "get",
      response: (res) => {
        console.log("---technician-------", res);
        setTechnicianData(res);
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

  const closeComplaint = (id) => {
    setComplainLoading(true);
    const apiParams = {
      url: `${apiEndPoints.updateComplainStatus}`,
      requestMethod: "put",
      input: {
        complianId: id,
        complainStatus: "CLOSE",
      },
      response: (res) => {
        console.log("---closeComplainRes-------", res);
        if (res.status === 200) {
          toast.success(res.message);
        }
        setComplainLoading(false);
      },
      errorFunction: (error) => {
        if (error == undefined) {
        }
        console.log("---error--", error);
        toast.error(error.message);
        setComplainLoading(false);
      },
      endFunction: () => {
        console.log("End Function Called");
      },
    };
    Api.callApi(apiParams);
  };

  const AssignedCompliant = (id) => {
    console.log("-----------=-======-=-=-==-=-=-=", assignTechnician, id);
    const apiParams = {
      url: `${apiEndPoints.updateComplainStatus}`,
      requestMethod: "put",
      input: {
        complainStatus: "ALLOTED",
        complainId: id,
        assignedTo: assignTechnician,
      },
      response: (res) => {
        console.log("---closeComplainRes-------", res);
        if (res.status === 200) {
          toast.success(res.message);
          getSingleComplaint(id);
          setComplainLoading(false);
          setAssignTechnician("");
        }
      },
      errorFunction: (error) => {
        if (error == undefined) {
        }
        console.log("---error--", error);
        toast.error(error.message);
        setComplainLoading(false);
      },
      endFunction: () => {
        console.log("End Function Called");
      },
    };
    Api.callApi(apiParams);
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex h-[100px] border justify-between items-center px-4">
        <div>Moon Air Crm</div>
        <div className="flex gap-3">
          <div
            className={`border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer ${
              activeTab === "getAllComplain" && "border-blue-500"
            }`}
            onClick={() => handleTabClick("getAllComplain")}
          >
            Get all complaints
          </div>
          <div
            className={`border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer ${
              activeTab === "createEmployee" && "border-blue-500"
            }`}
            onClick={() => handleTabClick("createEmployee")}
          >
            Create Employee
          </div>
        </div>
        <div
          className="border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer"
          onClick={notify}
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
                      </th>
                      <th>
                        <span>Register By</span>
                      </th>
                      <th>
                        <span>Status</span>
                      </th>
                      <th className="text-center">
                        <span>View</span>
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
                            <td>{items.registerBy.fullName}</td>
                            <td>{items.complainStatus}</td>
                            <td className="text-center">
                              <button
                                className="border px-2 py-1 text-white bg-black rounded w-[5rem]"
                                onClick={() => (
                                  setComplainModal(true),
                                  getSingleComplaint(items.complainId)
                                )}
                              >
                                View
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
      <div>
        {activeTab === "createEmployee" && (
          <div>
            <CreateEmployee />
          </div>
        )}
      </div>
      <Modal
        open={complainModal}
        onClose={() => setComplainModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="modal w-[500px] bg-white">
          <p className="font-bold text-lg text-center">Complain Status</p>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((items, i) => (
              <div className="w-full" key={i}>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Compliant Id :</div>
                  <div>{items.complainId}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Register By :</div>
                  <div>{items.registerBy.fullName}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Costumer Name :</div>
                  <div>{items.customerName}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Date :</div>
                  <div>{moment(items.dopDate).format("DD-MM-YYYY")}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Address :</div>
                  <div>{items.address}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">City :</div>
                  <div>{items.city}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">state :</div>
                  <div>{items.state}</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Product :</div>
                  <div>Cooler</div>
                </div>
                <div className="complain-details w-full flex gap-4 items-center">
                  <div className="font-bold">Complain Status :</div>
                  <div>{items.complainStatus}</div>
                </div>
                {items.complainStatus === "ALLOTED" && (
                  <div className="complain-details w-full flex gap-4 items-center">
                    <div className="font-bold">Assigned To :</div>
                    <div>
                      {items.assignedTo.fullName +
                        " " +
                        items.assignedTo.mobileNumber}
                    </div>
                  </div>
                )}
                <div>
                  <div className="font-bold">Problems:</div>
                  <div className="border rounded w-full h-[100px]">
                    {items.problem}
                  </div>
                </div>
                <div>
                  <label htmlFor="">Assign To:</label> <br />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <select
                        onChange={(e) => setAssignTechnician(e.target.value)}
                        onClick={getTechnicianEmployee}
                        className="w-full border mt-[3px] h-[41px] rounded outline-none cursor-pointer border-[#b9bcbf]"
                      >
                        <option value="">Assign to technician</option>
                        {Array.isArray(technicianData) &&
                        technicianData.length > 0 ? (
                          technicianData.map((items, i) => (
                            <option value={items._id} key={i}>
                              {items.fullName}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No technicians available
                          </option>
                        )}
                      </select>
                    </div>
                    {!!assignTechnician && (
                      <div>
                        <button
                          className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
                          onClick={() => AssignedCompliant(items.complainId)}
                        >
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            "Assign"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {items.complainStatus === "ALLOTED" ? (
                  <div className="w-full flex justify-center items-center mt-5">
                    <button
                      className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
                      onClick={() => closeComplaint(items.complainId)}
                    >
                      {complainLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        "Close Complaint"
                      )}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
