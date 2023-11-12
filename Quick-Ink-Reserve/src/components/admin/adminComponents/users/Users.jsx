import axios from "axios";
import React, { useEffect, useState } from "react";
import { TableWithData, actions, statusFilters, modal } from "./TableData";
import createColumns from "./TableData";

function Users() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [statusFilter, setStatusFilter] = useState('');
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
    if (status === '') {
      setFilter(data);
    } else {
      const filtered = data.filter((row) => row.status.toLowerCase() === status.toLowerCase());
      setFilter(filtered);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/users")
      .then((response) => {
        setData(response.data.result);
        setFilter(response.data.result);
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
          <div className="flex w-full m-auto h-20">
            {actions(search, setSearch, setFilter, data)}
            {statusFilters(statusFilter, handleStatusFilterChange, startDate, endDate, setStartDate, setEndDate, filterDataByDate)}
          </div>
          <div className="col-md-12">
            <TableWithData
              columns={createColumns(setOpenModal, setDeleteID)}
              data={filter}
              search={search}
              setSearch={setSearch}
              setFilter={setFilter}
            />
          </div>
          {modal(openModal, setOpenModal, deleteID)}
        </div>
      </div>
    </div>
  );
}

export default Users;
