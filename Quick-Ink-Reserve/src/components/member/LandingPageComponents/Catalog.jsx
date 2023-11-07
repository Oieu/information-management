import React, { useState, useEffect } from "react";
import "../LandingPage.css"
import box from "../../../assets/Images/box.jpg";
import axios from 'axios';

function Catalog() {

    const [services, setServices] = useState([]);

    useEffect(() => {
      axios
      .get("http://localhost:5000/member/LandingPageComponents")
      .then((response) => {
        setServices(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

    return(
        <div className="Catalog" id="catalog">
          <h2>Here is what we can do for you!</h2>

          <div className="Carousel">
            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

            <div className="serv1">
              <a target="" href="">
                <img src={box} alt="Box making" width="600" height="400" />
              </a>
              <div className="Des">Box Making</div>
            </div>

             
          </div>
        </div>
    );
}

export default Catalog