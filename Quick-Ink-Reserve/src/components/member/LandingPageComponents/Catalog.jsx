import React, { useState, useEffect } from "react";
import axios from "axios";
import "../LandingPage.css";
import { Link } from 'react-router-dom'

function Catalog() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/member/LandingPageComponents");

        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Catalog" id="catalog">
      <h2>Here is what we can do for you!</h2>

      <div className="Carousel">
        {services.map((service) => (
          <div className="serv1" key={service.genServicesID}>
            <Link to = {`/service-avail/${service.genServicesID}`}>
              <img src={`http://localhost:5000/${service.genServiceImageUrl}`} alt={service.genServiceName} />
            </Link>
            <div className="Des">{service.genServiceName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
