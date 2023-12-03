import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "../NavBar.css";
import "../ServiceAvail.css";
import { useAppContext } from "../../../controllers/auth/AuthContext";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTotalPrice } from "./calculations";

function ServiceAvail() {
  const { loginStatus, user, setUser, setLoginStatus } = useAppContext();
  const { genServiceName } = useParams();
  const [service, setService] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [confirmOrder, setconfirmOrder] = useState(false);
  const [selectedInkType, setSelectedInkType] = useState("black and white");
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedMaterialID, setSelectedMaterialID] = useState(-1);
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [inkTypePrice, setInkTypePrice] = useState(0);
  const [matPrice, setMatPrice] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/service-avail/${genServiceName}`
        );

        if (Array.isArray(response.data)) {
          setService(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchMaterialData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/service-avail/materials/${genServiceName}`
        );

        if (Array.isArray(response.data)) {
          setMaterials(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMaterialData();
    fetchServiceData();
  }, [genServiceName]);

  useEffect(() => {
    if (selectedInkType === "black and white") {
      setInkTypePrice(2);
    } else if (selectedInkType === "colored") {
      setInkTypePrice(5);
    } else {
      setInkTypePrice(0);
    }
  }, [selectedInkType]);

  useEffect(() => {
    if (selectedMaterialID !== -1) {
      const material = materials.find(
        (material) => material.matID === selectedMaterialID
      );
      if (material) {
        setMatPrice(material.price_per_count);
      }
    }
  }, [selectedMaterialID]);

  const handleInkTypeChange = (event) => {
    setSelectedInkType(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (loginStatus == false) {
      setShowLoginPopup(true);
    } else {
      const formData = new FormData();
      formData.append("inkType", selectedInkType);
      formData.append("file", selectedFile);
      formData.append("userID", user.userID);
      formData.append("genServiceName", genServiceName);
      formData.append("matID", selectedMaterialID);
      try {
        const response = await axios.post(
          `http://localhost:5000/submit_order`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Order placed:", response.data);
        setconfirmOrder(true);
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleCloseOrderSubmit = () => {
    setconfirmOrder(false);
    window.location.reload();
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onloadend = function () {
        const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
        setPdfPageCount(count);
      };
    } else {
      setPdfPageCount(1);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/logout")
      .then((response) => {
        if (response.status === 200) {
          setUser("");
          setLoginStatus(false);
          nav("/");
        } else {
          console.error("Logout error:", response);
        }
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className={`absolute z-[-1] h-full w-full bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover blur-[2px] opacity-30`}
      ></div>
      <Nav handleLogout={handleLogout} user={user} loginStatus={loginStatus} />
      {service.map((singleService) => (
        <div className="Servicecont" key={singleService.genServicesID}>
          <div className="ServName">
            <h1 className="text-gray-800 bg-orange-200 p-2 w-full">
              {singleService.genServiceName}
            </h1>
            <div className="ServiceDetails h-5/6">
              <img
                src={`http://localhost:5000/${singleService.genServiceImageUrl}`}
                alt={singleService.genServiceName}
              />
              <div className="ServDescr">{singleService.genServiceDesc}</div>
            </div>
          </div>
          <div className="service">
            <form
              className="flex flex-col gap-5 h-full w-full"
              onSubmit={handleFormSubmit}
            >
              <div className="w-full flex gap-5">
                <div className="w-2/3 h-full flex flex-col justify-between p-2 rounded-lg bg-gray-500">
                  <label htmlFor="fileUpload" className="text-left">
                    Upload File:
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*, application/pdf"
                    onChange={(e) => handleFileChange(e)}
                    className="p-2 text-gray-200 w-4/5"
                  />
                </div>
                <div className="w-1/3 flex flex-col">
                  <h2 className="text-xl text-left">
                    Page Count: <br />
                    {selectedFile
                      ? pdfPageCount + " pages in file"
                      : "No file selected"}
                  </h2>
                </div>
              </div>
              <div className="w-full flex items-center gap-5">
                <div className="w-2/3 flex items-center gap-2">
                  <label htmlFor="inkType">Select Ink Type:</label>
                  <select
                    id="inkType"
                    value={selectedInkType}
                    onChange={handleInkTypeChange}
                    className="p-2 rounded-lg bg-gray-500 text-gray-200"
                  >
                    <option value="">Select...</option>
                    <option value="black and white">Black and White</option>
                    <option value="colored">Colored</option>
                    <option value="no ink">No Ink</option>
                  </select>
                </div>
                <div className="w-1/3">
                  <h2 className="text-xl text-left">
                    Price: <br />
                    {inkTypePrice !== 0 &&
                      selectedFile !== "" &&
                      selectedMaterialID !== -1 ? (
                        <span className="text-green-400 ml-5">
                          Php{" "}
                          {parseFloat(
                            Math.round(getTotalPrice(inkTypePrice, matPrice, pdfPageCount)))
                            .toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-red-400 ml-5">Php 0.00</span>
                      )}
                  </h2>
                </div>
              </div>
              {materials.length > 0 ? (
                <div className="max-h-[66%] overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-500">
                        <th>Select</th>
                        <th>Material Name</th>
                        <th>Material Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map((material, index) => (
                        <tr
                          key={material.service_materialsID}
                          className={`${
                            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        >
                          <td>
                            <input
                              type="radio"
                              name="material"
                              checked={selectedMaterialID === material.matID}
                              onChange={() => {
                                setSelectedMaterialID(material.matID);
                              }}
                              className="form-radio h-4 w-4 cursor-pointer"
                            />
                          </td>
                          <td className="text-gray-600">{material.matName}</td>
                          <td className="text-gray-600">{material.matSize}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1 className="text-center text-gray-400 w-full text-4xl p-5">
                  No materials available for this service.
                </h1>
              )}

              <button type="submit" className="OrdButn">
                Submit Order
              </button>
            </form>
          </div>
        </div>
      ))}

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="login-popup">
            <p className="text-gray-800 leading-10 mt-5">
              <h1>Hello Customer!</h1> Please log in to place an order.
            </p>
            <button className="Closebtn" onClick={handleCloseLoginPopup}>
              <FaTimes />
            </button>
            <Link to="/login">
              <button id="login" className="Loginbtn">
                Log in
              </button>
            </Link>
          </div>
        </div>
      )}

      {confirmOrder && (
        <div className="popup-overlay">
          <div className="login-popup">
            <p>Your Order Has been Submitted.</p>
            <button className="Loginbtn" onClick={handleCloseOrderSubmit}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceAvail;
