import React, { useEffect, useState } from "react";
import ComplianForm from "../../components/ComplainForm/ComplianForm";
import { toast } from "react-toastify";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { Helper } from "../../classes/Helper";
import { LocalStorages } from "../../classes/LocalStorages";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Service = () => {
  const [activeTab, setActiveTab] = useState("registerComplain");
  const [loading, setLoading] = useState(false);
  const [complainData, setComplainData] = useState([]);
  const location = useLocation();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const navigate = useNavigate();

  console.log(location);
  const getComplainDataByRegister = () => {
    const apiParams = {
      url: `${apiEndPoints.getComplainByRegister}/${location.state.id}`,
      requestMethod: "get",
      response: (res) => {
        console.log("---res-------", res);
        setComplainData(res.result.complaints);
      },
      errorFunction: (error) => {
        if (error == undefined) {
          setLoading(false);
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

  useEffect(() => {
    getComplainDataByRegister();
  }, []);

  console.log("data-----------------------------------", complainData);

  const notify = () => toast("Logout not working right now");
  return (
    <div className="w-screen h-screen">
      <div className="flex h-[100px] border justify-around items-center">
        <div>Hello, {location.state.data.fullName}</div>
        <div className="flex gap-3">
          <div
            className={`border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer ${
              activeTab === "registerComplain" && "border-blue-500"
            }`}
            onClick={() => handleTabClick("registerComplain")}
          >
            Complain Register
          </div>
          <div
            className={`border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer ${
              activeTab === "myComplain" && "border-blue-500"
            }`}
            onClick={() => handleTabClick("myComplain")}
          >
            My Complains
          </div>
        </div>
        <div
          className="border-b-2 pb-[2px] hover:border-blue-500 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      {activeTab === "registerComplain" && (
        <div>
          <ComplianForm />
        </div>
      )}
      {activeTab === "myComplain" && (
        <div>
          <div className="overflow-x-auto">
            <table className="allComplain-table w-full">
              <thead>
                <tr>
                  <th>
                    <span>Complain ID</span>
                  </th>
                  <th>
                    <span>Costumer Name</span>
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
                  {/* <th>
                    <span>Register By</span>
                  </th> */}
                  {/* <th className="text-center">
                    <span>View</span>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(complainData) &&
                  complainData?.map((items, i) => {
                    return (
                      <tr key={i}>
                        <td>{items.complainId}</td>
                        <td>{items.customerName}</td>
                        <td>{moment(items.dopDate).format("DD-MM-YYYY")}</td>
                        <td>{items.address}</td>
                        <td>{items.city}</td>
                        <td>{items?.state}</td>
                        <td>{items.problem}</td>
                        {/* <td>{items.registerBy.fullName}</td> */}
                        {/* <td className="text-center">
                          <button
                            className="border px-2 py-1 text-white bg-black rounded w-[5rem]"
                            // onClick={() => (
                            //   setComplainModal(true),
                            //   getSingleComplaint(items.complainId)
                            // )}
                          >
                            View
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
