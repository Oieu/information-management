import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "../NavBar.css";
import "../ServiceAvail.css";
import { useAppContext } from "../../../controllers/auth/AuthContext";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTotalPrice } from "./calculations";
import { BsSearch } from "react-icons/bs";

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
  const [filtered, setFiltered] = useState([]);
  const [matPrice, setMatPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const initialSelectedMaterialID = useRef(-1);
  const initialPdfPageCount = useRef(0);

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
          setFiltered(response.data);
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
      setError("");
    }
  }, [selectedMaterialID]);

  useEffect(() => {
    const results = materials.filter((material) => {
      return (
        material.matName.toLowerCase().includes(search.toLowerCase()) ||
        material.matSize.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFiltered(results);
  }, [search]);

  useEffect(() => {
    if (
      inkTypePrice !== 0 &&
      selectedFile !== "" &&
      selectedMaterialID !== -1
    ) {
      const total = getTotalPrice(inkTypePrice, matPrice, pdfPageCount);
      setTotalAmount(parseFloat(Math.round(total)).toFixed(2));
    } else {
      setTotalAmount(0);
    }
  }, [inkTypePrice, selectedFile, selectedMaterialID, matPrice, pdfPageCount]);

  useEffect(() => {
    if (
      selectedMaterialID !== initialSelectedMaterialID.current &&
      pdfPageCount !== initialPdfPageCount.current
    ) {
      axios
        .get(`http://localhost:5000/material-count/${selectedMaterialID}`)
        .then((response) => {
          if (response.data.count < pdfPageCount) {
            setError("Not enough materials. Please select another.");
          } else {
            setError("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedMaterialID, pdfPageCount]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (loginStatus == false) {
      setShowLoginPopup(true);
    } else if (error !== "") {
      setError("Not enough materials. Please select another.");
    } else {
      const formData = new FormData();
      formData.append("inkType", selectedInkType);
      formData.append("file", selectedFile);
      formData.append("userID", user.userID);
      formData.append("genServiceName", genServiceName);
      formData.append("matID", selectedMaterialID);
      formData.append("totalAmount", totalAmount);
      formData.append("genServicesID", service[0].genServicesID);
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
              <div className="ServDescr">
                <div className="bg-blue-500 w-full p-2 rounded-t-md sticky top-0 left-0">
                  <span className="text-xl font-black">Description: <br/></span>
                </div>
                <p className="px-6 mt-2">{singleService.genServiceDesc}</p>
              </div>
            </div>
          </div>
          <div className="service">
            <form
              className="flex flex-col gap-5 h-full w-full"
              onSubmit={handleFormSubmit}
            >
              <div className="w-full flex gap-5">
                <div className="w-2/3 h-full flex flex-col justify-between p-2 rounded-lg bg-gray-400">
                  <label
                    htmlFor="fileUpload"
                    className="text-left text-gray-800"
                  >
                    Upload File:
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*, application/pdf"
                    onChange={(e) => handleFileChange(e)}
                    className="p-2 text-gray-800 w-4/5"
                  />
                </div>
                <div className="w-1/3 flex flex-col">
                  <h2 className="text-xl text-right">
                    Page Count: <br />
                    {selectedFile
                      ? pdfPageCount + " pages in file"
                      : "No file selected"}
                  </h2>
                </div>
              </div>
              <div className="w-full flex items-center gap-5">
                <div className="w-2/3 flex flex-col">
                  <label className="text-left" htmlFor="inkType">
                    Select Ink Type:
                  </label>
                  <select
                    id="inkType"
                    value={selectedInkType}
                    onChange={(event) => setSelectedInkType(event.target.value)}
                    className="p-2 rounded-md bg-gray-500 text-gray-200 w-1/2"
                  >
                    <option value="">Select...</option>
                    <option value="black and white">Black and White</option>
                    <option value="colored">Colored</option>
                    <option value="no ink">No Ink</option>
                  </select>
                </div>
                <div className="w-1/3 p-3 rounded-lg relative">
                  <h2 className="text-md text-right text-green-200">
                    Total Amount: <br />
                    {totalAmount !== 0 ? (
                      <span className="text-green-600 text-center text-2xl ml-5">
                        ₱ {totalAmount}
                      </span>
                    ) : (
                      <span className="text-red-400 ml-5">Php 0.00</span>
                    )}
                  </h2>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <BsSearch className="text-gray-500 text-2xl" />
                <input
                  type="text"
                  placeholder="Search material or size..."
                  className="w-1/2 p-2 rounded-lg bg-gray-300 placeholder:text-gray-500 text-gray-800"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {filtered.length > 0 ? (
                <div className="max-h-[66%] overflow-y-auto">
                  <table className="w-full relative">
                    <thead>
                      <tr className="bg-gray-500 sticky top-0 left-0">
                        <th className="text-gray-100">Select</th>
                        <th className="text-gray-100">Material Name</th>
                        <th className="text-gray-100">Material Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((material, index) => (
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
                  {error && <p className="text-red-500">{error}</p>}
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
            <button
              className="Closebtn"
              onClick={() => setShowLoginPopup(false)}
            >
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
            <button className="Loginbtn" onClick={() => setconfirmOrder(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceAvail;
