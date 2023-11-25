import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Nav from "./Nav";
import "../NavBar.css";
import "../ServiceAvail.css";
import { useAppContext } from "../../../controllers/auth/AuthContext";

function ServiceAvail({ handleLogout }) {
  const { loginStatus, user } = useAppContext();
  const { genServiceID } = useParams();
  const [service, setService] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value, 10));
  };

  const handleOrderButtonClick = () => {
    if (loginStatus == false) {
      // If user is not logged in, show the login popup
      setShowLoginPopup(true);
    } else {
      // Handle the order logic here
      // You can proceed with the order since the user is logged in
      console.log("Order placed:", { selectedSize, selectedQuantity });
    }
  };

  const handleCloseLoginPopup = () => {
    // Close the login popup
    setShowLoginPopup(false);
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

              <div className="ServiceSpecs">
                <h2>{singleService.genServiceName}</h2>
                <span>Pricing: {singleService.rateUnit}</span>
                <div>
                  <label htmlFor="size">Size:</label>
                  <select id="size" value={selectedSize} onChange={handleSizeChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity">Quantity:</label>
                  <select id="quantity" value={selectedQuantity} onChange={handleQuantityChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option> 
                    {/* More options to be added */}
                  </select>
                </div>
              </div>
            </div>
            <div className="ServDescr">{singleService.genServiceDesc}</div>
            <button className="OrdButn" onClick={handleOrderButtonClick}>
              Submit Order
            </button>
          </div>
        </div>
      ))}

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="login-popup">
            <p>Hello Customer! Please log in to place an order.</p>
            <button onClick={handleCloseLoginPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceAvail;
