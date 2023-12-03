import React, { useState, useEffect } from "react";
import axios from "axios";
import "../LandingPage.css";
import { Link } from "react-router-dom";

function Catalog() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/service-avail");

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
    <div className="Catalog h-screen md:h-auto" id="catalog">
      <h2 className="flex items-center h-1/3 md:block md:h-auto w-full">Here is what we can do for you!</h2>
      <div className="Carousel w-full h-2/3 rounded-lg overflow-x-hidden overflow-y-scroll md:h-auto md:overflow-hidden">
        {services.map((service) => (
          <Link key={service.genServicesID} className="w-[90%] m-auto md:bg-gradient-to-r md:from-cyan-600 md:to-blue-700 text-gray-300 transition-all rounded-lg hover:bg-gradient-to-r hover:from-gray-800 hover:to-blue-950 hover:text-gray-100" to={`/service-avail/${service.genServiceName}`}>
            <div className="serv1" key={service.genServicesID}>
              <img
                src={`http://localhost:5000/${service.genServiceImageUrl}`}
                alt={service.genServiceName}
              />
              <div className="Des">{service.genServiceName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
