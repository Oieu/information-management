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




  return (
    <div>
      <Nav handleLogout={handleLogout} user={user} loginStatus={loginStatus} />
      <div className="Servicecont">
        <h1>Service Details</h1>
       
        {service.map((singleService) => (
            <div className="service" key={singleService.genServicesID}>
              <div className = "ServiceName">{singleService.genServiceName}</div>
              <img src={`http://localhost:5000/${singleService.genServiceImageUrl}`} alt={singleService.genServiceName} />
              <div className="ServDesc">{singleService.genServiceDesc}</div>
            </div>
          
        ))}
        <div>
            
        </div>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default ServiceAvail;
