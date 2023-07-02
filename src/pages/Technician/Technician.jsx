import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";
import moment from "moment";
import { useLocation } from "react-router-dom";

const Technician = () => {
  const [activeTab, setActiveTab] = useState("getAllComplain");
  const [loading, setLoading] = useState(false);
  const [complainData, setComplainData] = useState([]);
  const [singleComplainData, setSingleComplainData] = useState([]);
  const [complainModal, setComplainModal] = useState(false);
  const notify = () => toast("Logout not working right now");
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
                      </th>{" "}
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
    </div>
  );
};

export default Technician;
