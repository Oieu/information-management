import React from "react";
import "./LandingPage.css";
import Map from "./Maps";
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaMapMarker } from "react-icons/fa";

function Location() {
    return(
        <div className="Loc" id="location">
        <h2>Location</h2>

        <div className="LocCont">
          <div className="MapLoc"></div>

          <div className="StoreLoc">
            <div>@Quick-Ink-Reserve Online Printing Services</div>
            <div><span><FaMapMarker /></span> Location: M. Cuenco Ave, Cebu City, Philippines</div>
            <div><span><FaPhone /></span> Contact us: +63 999 989 8276</div>
            <div><span><FaEnvelope /></span> Email: quickInkreserve@gmail.com</div>
          </div>
        </div>
      </div>
    );
}


export default Location