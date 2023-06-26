import React, { useEffect, useState } from "react";
import ComplianForm from "../../components/ComplainForm/ComplianForm";
import { toast } from "react-toastify";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";

const Service = () => {
  const [activeTab, setActiveTab] = useState("registerComplain");
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getComplainDataByRegister = () => {
    const apiParams = {
      url: `${apiEndPoints.getComplainByRegister}`,
      requestMethod: "get",
      response: (res) => {
        console.log("---res-------", res);
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

  // useEffect(() => {
  //   getComplainDataByRegister();
  // }, []);

  const notify = () => toast("Logout not working right now");
  return (
    <div className="w-screen h-screen">
      <div className="flex h-[100px] border justify-around items-center">
        <div>Moon Air Crm</div>
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
          onClick={notify}
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="border">
                <tr className="border">
                  <th className="py-2 px-4">Complain ID</th>
                  <th className="py-2 px-4">Customer Name</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">City</th>
                  <th className="py-2 px-4">State</th>
                  <th className="py-2 px-4">Country</th>
                  <th className="py-2 px-4">Postal Code</th>
                  <th className="py-2 px-4">Problem</th>
                  <th className="py-2 px-4">Registered By</th>
                </tr>
              </thead>
              <tbody>
                {/* {data.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2 px-4">{item.complainId}</td>
                    <td className="py-2 px-4">{item.customerName}</td>
                    <td className="py-2 px-4">{item.phoneNumber}</td>
                    <td className="py-2 px-4">{item.address}</td>
                    <td className="py-2 px-4">{item.city}</td>
                    <td className="py-2 px-4">{item.state}</td>
                    <td className="py-2 px-4">{item.country}</td>
                    <td className="py-2 px-4">{item.postalCode}</td>
                    <td className="py-2 px-4">
                      {new Date(item.dopDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">{item.problem}</td>
                    <td className="py-2 px-4">{item.registerBy}</td>
                    <td className="py-2 px-4">{item.complainStatus}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
