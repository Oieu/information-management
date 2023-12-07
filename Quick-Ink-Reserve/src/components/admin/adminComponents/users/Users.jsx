import axios from "axios";
import React, { useEffect, useState } from "react";
import { TableWithData, actions, statusFilters, modal } from "./TableData";
import createColumns from "./TableData";
import JsPDF from "jspdf";
import "jspdf-autotable";
import LoadingComponent from "../../../../utils/LoadingComponent";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import { StyleSheetManager } from "styled-components";

function Users() {
  TabTitle("Users", false);
  //DATA STUFF
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //OVERLAY STUFF
  const [openModal, setOpenModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterDataByDate = () => {
    if (startDate && endDate) {
      const filtered = filter.filter((row) => {
        const rowDate = new Date(row.createdAt);
        return rowDate >= startDate && rowDate <= endDate;
      });
      setFilter(filtered);
    }
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    filterData(value);
  };

  const filterData = (status) => {
    if (status === "") {
      setFilter(data);
    } else {
      const filtered = data.filter(
        (row) => row.status.toLowerCase() === status.toLowerCase()
      );
      setFilter(filtered);
    }
  };

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new JsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Users Report";
    const headers = [["Name", "Email", "Status"]];
    const data = filter.map((elt) => [elt.userName, elt.userEmail, elt.status]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/users")
      .then((response) => {
        setData(response.data.result);
        setFilter(response.data.result);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const results = data.filter((user) => {
      return (
        user.userEmail.toLowerCase().includes(search.toLocaleLowerCase()) ||
        user.userName.toLowerCase().includes(search.toLocaleLowerCase())
      );
    });
    setFilter(results);
  }, [search]);

  if(loading) return <LoadingComponent loading={loading} />

  return (
    <div className="w-full relative h-[90%]">
      <header className="flex flex-col gap ml-5 h-[10%] text-white">
        <div className="flex items-center gap-5 w-[90%]">
          <h1 className="text-left">Users</h1>
        </div>
        <p className="text-left">
          This component will allow the admin to see the available materials,
          add new ones to the existing list, and edit the details of existing
          materials.
        </p>
      </header>
      <div className="container">
        <div className="row">
          <div className="flex w-full h-20 bg-gray-700 p-2 rounded-lg mt-2">
            {actions(search, setSearch, setFilter, data)}
            {statusFilters(
              statusFilter,
              handleStatusFilterChange,
              startDate,
              endDate,
              setStartDate,
              setEndDate,
              filterDataByDate, generatePDF
            )}
          </div>
          <div className="col-md-12">
            <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
              <TableWithData
                columns={createColumns(setOpenModal, setDeleteID)}
                data={filter}
              />
            </StyleSheetManager>
          </div>
          {modal(openModal, setOpenModal, deleteID)}
        </div>
      </div>
    </div>
  );
}

export default Users;
