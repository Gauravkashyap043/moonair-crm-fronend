import React, { useState } from "react";
import ComplianForm from "../../components/ComplainForm/ComplianForm";
import { toast } from "react-toastify";

const Service = () => {
  const [activeTab, setActiveTab] = useState("registerComplain");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const notify = () => toast("Wow so easy!");
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
          <div>My all register omplain</div>
        </div>
      )}
    </div>
  );
};

export default Service;
