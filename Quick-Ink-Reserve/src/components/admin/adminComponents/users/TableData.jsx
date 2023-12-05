import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { BsSearch } from "react-icons/bs";

export const modal = (openModal, setOpenModal, deleteID) => {
  return (
    <>
      {openModal && (
        <div className="h-[90%] w-full flex flex-col gap-5">
          <div
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-500 bg-opacity-80 z-10"
            id="overlay"
          >
            <div className="absolute z-30 h-1/4 w-1/2 flex justify-center items-center">
              <div className="h-full w-full bg-white rounded-lg absolute m-5 flex flex-col justify-evenly items-stretch">
                <h1 className="text-4xl text-red-600">Confirm Delete</h1>
                <div className="flex justify-evenly items-center">
                  <h2 className="text-black text-left text-xl">
                    Are you sure you want to delete this?
                  </h2>
                  <div className="flex gap-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(false);
                      }}
                      className="bg-gray-500 border-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        axios
                          .post(
                            `http://localhost:5000/admin/users/delete/${deleteID}`
                          )
                          .then((response) => {
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const createColumns = (setOpenModal, setDeleteID) => {
  const columns = [
    {
      name: <span className="text-lg">Profile Picture</span>,
      cell: (row) => (
        <img
          className="h-3/5 w-1/5 rounded-xl"
          src={
            row.profilePicture === null
              ? `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${row.userName}`
              : `http://localhost:5000/${row.profilePicture}`
          }
          alt="Profile Picture"
        />
      ),
    },
    {
      name: <span className="text-lg">Username</span>,
      selector: (row) => (
        <span className="overflow-ellipsis">{row.userName}</span>
      ),
      sortable: true,
    },
    {
      name: <span className="text-lg">Email Address</span>,
      selector: (row) => row.userEmail,
      sortable: true,
    },
    {
      name: <span className="text-lg">Contact No.</span>,
      selector: (row) => row.userNumber,
      sortable: true,
    },
    {
      name: <span className="text-lg">Status</span>,
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return row.status === "active" ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        );
      },
    },
    {
      name: <span className="text-lg">Role</span>,
      selector: (row) => row.userRole,
      sortable: true,
    },
    {
      name: <span className="text-lg">Created At</span>,
      selector: (row) => {
        const date = new Date(row.createdAt);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      },
      sortable: true,
    },
    {
      name: <span className="text-lg">Actions</span>,
      selector: (row) => row.userID,
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status !== "active" && (
            <button
              onClick={() => {
                setOpenModal(true);
                setDeleteID(row.userID);
              }}
              className="bg-red-500 border-none text-white rounded-md p-3 hover:bg-red-600 transition-all duration-200 hover:translate-y-[-2px]"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return columns;
};

const DatePickerComponent = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterDataByDate,
  generatePDF,
}) => {
  return (
    <div className="flex items-center justify-end w-4/5 h-full gap-5">
      <div className="w-2/3 flex justify-end items-end">
        <div className="h-full w-1/3 flex flex-col gap-2">
          <label className="w-full text-left">Filter by Date:</label>
          <button
            className="w-4/5 border-none bg-blue-300 text-black transition-all hover:bg-blue-500 hover:text-white"
            onClick={filterDataByDate}
          >
            Filter
          </button>
        </div>
        <div className="h-full w-1/3 flex flex-col gap-3 text-left">
          <label htmlFor="startDate">Start:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border-none bg-gray-300 p-2 rounded-lg w-4/5 text-black"
          />
        </div>
        <div className="h-full w-1/3 flex flex-col gap-3 text-left">
          <label htmlFor="endDate">End:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border-none bg-gray-300 p-2 rounded-lg w-4/5 text-black"
          />
        </div>
      </div>
      <div className="w-1/5 flex h-full items-end justify-center">
        <button
          onClick={generatePDF}
          className="w-2/3 bg-blue-500 border-none text-white rounded-md p-3 hover:bg-blue-600 transition-all duration-200 hover:translate-y-[-2px]"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export const styles = {
  rows: {
    style: {
      backgroundColor: "#F3F4F6",
      transition: "background-color 0.5s ease",
      height: "10%",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#111827",
      fontWeight: "bold",
      color: "white",
      position: "sticky",
      top: "0",
    },
  },
  headCells: {
    style: {
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      color: "#111827",
    },
  },
  heading: {
    style: {
      fontWeight: "bold",
      color: "white",
    },
  },
};

export const rowStyles = [
  {
    when: row => row.index % 2 === 0,
    style: {
      backgroundColor: '#F3F4F6',
      transition: 'background-color 0.5s ease'
    }
  },
  {
    when: row => row.index % 2 !== 0,
    style: {
      backgroundColor: '#E5E7EB',
      transition: 'background-color 0.5s ease'
    }
  }
]

export function statusFilters(
  statusFilter,
  handleStatusFilterChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  filterDataByDate,
  generatePDF
) {
  return (
    <div className="w-2/3 m-auto h-full flex items-center gap-5">
      <div className="flex gap-5 items-center h-full">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <DatePickerComponent
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filterDataByDate={filterDataByDate}
        generatePDF={generatePDF}
      />
    </div>
  );
};

export function actions(search, setSearch, setFilter, data, generatePDF) {
  return (
    <div className="w-1/3 h-full flex justify-end items-center gap-5 bg-transparent m-0 p-0">
      <div className="w-[95%] h-full flex items-center gap-5">
        <div className="w-4/5 flex items-center justify-center gap-2">
          <label className="text-left text-xl " htmlFor="Search">
            <BsSearch />
          </label>
          <input
            type="text"
            className="p-2 rounded-lg w-full bg-gray-300 "
            placeholder="Username or Email here..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setFilter(
                data?.filter((item) =>
                  item.userName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

function emptyTable() {
  return (
    <div className="h-[700px] flex justify-center items-center">
      <h1 className="m-auto">No data available</h1>
    </div>
  );
};

export function TableWithData({ columns, data }) {
  return (
    <div
      id="report"
      className="relative w-full max-h-[650px] overflow-y-auto m-auto p-2"
    >
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationRowsPerPageOptions={[10, 20, 30]}
        className="w-full bg-white border border-gray-300 shadow-md"
        noDataComponent={emptyTable()}
        defaultSortField="userName"
        defaultSortAsc={true}
        highlightOnHover
        customStyles={styles}
        paginationComponentOptions={{
          rowsPerPageText: "No. of rows per page:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: false,
        }}
      />
    </div>
  );
};

export default createColumns;
