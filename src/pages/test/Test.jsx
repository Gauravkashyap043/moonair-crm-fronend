import React, { useState } from "react";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { Api } from "../../classes/Api";
import axios from "axios";
const Test = () => {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileSelect = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  // const handleUpload = () => {
  //   const apiParams = {
  //     url: `${apiEndPoints.upload}`,
  //     requestMethod: "post",
  //     response: (res) => {
  //       console.log("---res-------", res);
  //     },
  //     errorFunction: (error) => {
  //       console.log("---error--", error);
  //     },
  //     endFunction: () => {
  //       console.log("End Function Called");
  //     },
  //     input: {
  //       fileName: "",
  //     },
  //   };
  //   Api.callApi(apiParams);
  // };
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      axios.post('http//localhost:5000/upload', formData)
        .then((response) => {
          alert('Image uploaded successfully');
        })
        .catch((error) => {
          alert(error);
        });
    };
  return (
    <div>
      <h1>Test File upload</h1>
      <label>Uplaod image</label>
      <div>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Test;
