import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import MemberHome from "./member/MemberHome";

function Home() {
  const nav = useNavigate();

  return (
    <Routes>
      <Route path="*" element={<MemberHome nav={nav} />} />
      <Route path="/admin/*" element={<AdminHome nav={nav} />} />
    </Routes>
  );
}

export default Home;
