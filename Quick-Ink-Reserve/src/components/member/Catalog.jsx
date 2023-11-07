import React from "react";
import "./LandingPage.css";
import box from "../../assets/Images/box.jpg";

function Catalog() {
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