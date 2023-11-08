import React from "react";
import "../LandingPage.css"
import { MdAdminPanelSettings } from "react-icons/md";

function MainW({ user, nav }) {
    return(
        <div className={`Main`}>
            <div className="Welcome">
                 <h1>Welcome to Quick-Ink-Reserve</h1>
            </div>
            {user.userRole === "ADMIN" && <div className="fixed z-10 bottom-5 right-5">
              <button className="flex items-center justify-between bg-blue-300 text-black border-2 border-black shadow-sm shadow-white hover:text-white hover:shadow-md hover:shadow-white hover:translate-y-[-3px] hover:bg-blue-500 transition-all" onClick={() => nav('/admin')}>
                <MdAdminPanelSettings className="text-xl"/>
                Go to admin page
              </button>
            </div>}
        </div>
    );
}

export default MainW