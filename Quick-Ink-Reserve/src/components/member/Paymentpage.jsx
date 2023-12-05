import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "./LandingPageComponents/Nav";
import { useAppContext } from "../../controllers/auth/AuthContext";



function Paymentspage() {
  const { loginStatus, user, setUser, setLoginStatus } = useAppContext();
  const paypal = useRef();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AQHIxgrzelZZ_Ror73nF0zxvne1Lz7QnQkQXbQ7afN-lKXiwbcori21MHj74JoHiw_YWSFe-3FxnheGG";
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "USD",
                    value: 500.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            // Handle error
          },
        })
        .render(paypal.current);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/logout")
      .then((response) => {
        if (response.status === 200) {
          setUser("");
          setLoginStatus(false);
          // Assuming `nav` is a function to navigate, call it here
        } else {
          console.error("Logout error:", response);
        }
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };
  return (
    <>
     <div className="flex justify-center items-center h-screen">
      <Nav handleLogout={handleLogout} user={user} loginStatus={loginStatus} />
      <div ref={paypal}></div>
    </div>
    </>
  );
}
export default Paymentspage;