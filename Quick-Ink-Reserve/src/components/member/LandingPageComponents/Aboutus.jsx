import React from "react";
import "../LandingPage.css"
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaMapMarker } from "react-icons/fa";

function Aboutus() {
    return(
        <div className="About" id="about-us">
         <h1>About us</h1>
          <div className="contact-info"> 
              <div>
                  @Quick-Ink-Reserve Online Printing Services
              </div>
              <div>
                <span><FaMapMarker /></span>
                Location: M. Cuenco Ave, Cebu City, Philippines
              </div>
              <div>
                <span><FaPhone /></span>
                Contact us: +63 999 989 8276
              </div>
              <div>
                <span><FaEnvelope /></span>
                Email: quickInkreserve@gmail.com
              </div>
            </div>
      </div>
    );

}

export default Aboutus