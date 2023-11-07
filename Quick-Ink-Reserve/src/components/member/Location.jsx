import React from "react";
import "./LandingPage.css";
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaMapMarker } from "react-icons/fa";

function Location() {
    return(
        <div className="Loc" id="location">
        <h2>Location</h2>

        <div className="LocCont">
          <div className="MapLoc">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d926.1473599254754!2d123.91438337979277!3d10.351819792218485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9996ca79d6ed1%3A0xd780b462102ea8c5!2sOptima%20Typographics!5e0!3m2!1sfil!2sph!4v1699343085069!5m2!1sfil!2sph" 
                  width="600px" 
                  height="450px" 
                  style= {{border: '0'}}
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
          </iframe>
          </div>

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