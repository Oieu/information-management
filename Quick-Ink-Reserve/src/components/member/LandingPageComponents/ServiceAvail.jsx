import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Nav from "./Nav";
import "../NavBar.css";
import "../ServiceAvail.css";
import { useAppContext } from "../../../controllers/auth/AuthContext";
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'


function ServiceAvail({ handleLogout }) {
  const { loginStatus, user } = useAppContext();
  const { genServiceID } = useParams();
  const [service, setService] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [confirmOrder, setconfirmOrder] = useState(false);
  const [selectedInkType, setSelectedInkType] = useState('black and white');
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedMaterialID, setSelectedMaterialID] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/service-avail/${genServiceID}`);

        if (Array.isArray(response.data)) {
            setService(response.data);
            console.log(response.data);
          } else {
            console.error("API response is not an array:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [genServiceID]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/service-avail/materials/${genServiceID}`);
  
          if (Array.isArray(response.data)) {
              setMaterials(response.data);
              console.log("Matherial result: ",response.data);
            } else {
              console.error("API response is not an array:", response.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [genServiceID]);
   
      const handleInkTypeChange = (event) => {
        setSelectedInkType(event.target.value);
        console.log(event.target.value);
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
          formData.append("genServicesID", genServiceID);
          formData.append("matID", selectedMaterialID);
          try {
            const response = await axios.post(`http://localhost:5000/submit_order`,formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
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
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <div>
      <Nav handleLogout={handleLogout} user={user} loginStatus={loginStatus} />

      {service.map((singleService) => (
        <div className="Servicecont" key={singleService.genServicesID}>
          <div className="ServName">
            <h1>{singleService.genServiceName}</h1>
          </div>
          <div className="service">
            <div className="ServiceDetails">
              <img src={`http://localhost:5000/${singleService.genServiceImageUrl}`} alt={singleService.genServiceName} />
            </div>
            <div className="ServDescr">{singleService.genServiceDesc}</div>
            
            {/* Post Orders to be rendered in the admin side */}
            <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="inkType">Select Ink Type:</label>
                <select id="inkType" value={selectedInkType} onChange={handleInkTypeChange}>
                  <option value="">Select...</option>
                  <option value="black and white">Black and White</option>
                  <option value="colored">Colored</option>
                  <option value="no ink">No Ink</option>
                </select>
             </div>

              {/* Add a proper uploading process procedure */}
              <div>
                <label htmlFor="fileUpload">Upload File:</label>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*"   
                  onChange={handleFileChange}
                />
             </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Material Name</th>
                        <th>Material Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materials.map((material) => (
                        <tr key={material.service_materialsID}>
                          <td><input 
                               type="radio" 
                               name="material" 
                               checked={selectedMaterialID === material.matID}
                               onChange={() => {
                                setSelectedMaterialID(material.matID);
                                console.log("Selected Material ID:", material.matID);
                              }}
                              />
                          </td>
                          <td>{material.matName}</td>
                          <td>{material.matSize}</td>
                      
                        </tr>
                      ))}
                    </tbody>
                  </table>

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
            <p>Hello Customer! Please log in to place an order.</p>
            <button className="Closebtn" onClick={handleCloseLoginPopup}><FaTimes /></button>
            <Link to = "/login">
            <button className="Loginbtn">Log in</button>
            </Link>
          </div>
        </div>
      )}

    {confirmOrder && (
        <div className="popup-overlay">
          <div className="login-popup">
            <p>Your Order Has been Submitted.</p>
            <button className="Loginbtn" onClick={handleCloseOrderSubmit}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
    
  

}



export default ServiceAvail;