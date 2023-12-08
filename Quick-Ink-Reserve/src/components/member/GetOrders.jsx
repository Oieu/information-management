import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../controllers/auth/AuthContext";
import Navbar from "../admin/UI/Navbar";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { emptyTable, styles } from "../admin/adminComponents/users/TableData";
import { LoadingComponentDots } from "../../utils/LoadingComponent";
import { format } from "date-fns";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsBoxArrowLeft } from "react-icons/bs";

function GetOrders() {
  const { loginStatus, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    if (loginStatus === false) {
      nav("/login");
    }
    axios
      .get("http://localhost:5000/get-orders/" + user.userID)
      .then((response) => {
        setOrders(response.data);
        setFilter(response.data)
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    const results = orders.filter((order) => {
      const orderMatches = order.uniqueNum
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        order.matName.toLowerCase().includes(search.toLowerCase()) ||
        order.genServiceName.toLowerCase().includes(search.toLowerCase());

      return orderMatches;
    });

    setFilter(results);
  }, [search]);

  return (
    <div className="w-full h-full bg-gray-700 flex">
      <Navbar nav={nav} name={"orders"} />
      <div className="relative w-5/6 h-full bg-gray-800 m-auto p-5 flex flex-col justify-center">
        {loading ? (
          <LoadingComponentDots loading={loading} />
        ) : (
          <>
            <div className="flex w-full justify-center items-center">
              <h1 className="text-gray-300 text-left p-5 w-2/5">
                {(user.userName).split(" ")[0]}'s Orders
              </h1>
              <div className="w-3/5 flex items-end p-5 gap-2">
                <label htmlFor="search">
                  <BiSearchAlt2 className="text-3xl" />
                </label>
                <input
                  type="text"
                  className="w-1/2 h-10 bg-gray-900 rounded-md p-5 text-white"
                  placeholder="Search by order number"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-1/5 flex flex-col justify-end p-5">
                <label className="text-left" htmlFor="status">Status Filter</label>
                <select
                  name="status"
                  id="status"
                  className="w-4/5 p-2 rounded-lg bg-gray-300 text-black cursor-pointer"
                  onChange={(e) => {
                    if(e.target.value === "all") return setFilter(orders);
                    const results = orders.filter((order) => {
                      const orderMatches = order.status
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());

                      return orderMatches;
                    });

                    setFilter(results);
                  }}
                >
                  <option className="text-gray-500" value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="on-going">On-going</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <StyleSheetManager
              shouldForwardProp={(prop) => prop !== "sortActive"}
            >
              <DataTable
                columns={createColumns()}
                data={filter}
                pagination
                paginationRowsPerPageOptions={[10, 20, 30]}
                className="w-full bg-white border border-gray-300 shadow-md"
                noDataComponent={emptyTable()}
                defaultSortField="userName"
                defaultSortAsc={true}
                highlightOnHover
                paginationComponentOptions={{
                  rowsPerPageText: "No. of rows per page:",
                  rangeSeparatorText: "of",
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
                }}
                customStyles={styles}
                scrollX
                overflowY
              />
            </StyleSheetManager>
          </>
        )}
        <button onClick={() => nav('/')} 
          className='flex gap-2 items-center transition ease-in-out delay-150 bg-green-400 hover:-translate-y-1 hover:scale-100 hover:bg-green-600 hover:text-white duration-300 p-5 rounded-lg absolute top-5 left-8 text-gray-900'>
            <BsBoxArrowLeft />
            Back to Home
        </button>
      </div>
    </div>
  );
}

const createColumns = () => {
  const columns = [
    {
      name: <span className="text-lg">Order No.</span>,
      selector: (row) => (
        <span className="overflow-ellipsis">{row.uniqueNum}</span>
      ),
      sortable: true,
      width: "12%",
    },
    {
      name: <span className="text-lg">Submission URL</span>,
      selector: (row) => (
        <span>
          <a
            href={`http://localhost:5000/${row.submissionUrl}`}
            target="_blank"
          >
            {row.submissionUrl}
          </a>
        </span>
      ),
      width: "15%",
    },
    {
      name: <span className="text-lg">Amount</span>,
      selector: (row) => (
        <span className="text-green-700">₱ {row.totalAmount.toFixed(2)}</span>
      ),
      sortable: true,
      width: "10%",
    },
    {
      name: <span className="text-lg">Ink Type</span>,
      selector: (row) => row.inkType,
      sortable: true,
      width: "10%",
    },
    {
      name: <span className="text-lg">Status</span>,
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return (
          (row.status === "pending" && (
            <span className="text-orange-500">Pending</span>
          )) ||
          (row.status === "on-going" && (
            <span className="text-yellow-500">On-going</span>
          )) ||
          (row.status === "completed" && (
            <span className="text-green-500">Completed</span>
          ))
        );
      },
      width: "8%",
    },
    {
      name: <span className="text-lg">Material</span>,
      selector: (row) => row.matName,
      sortable: true,
      width: "10%",
    },
    {
      name: <span className="text-lg">Service</span>,
      selector: (row) => row.genServiceName,
      sortable: true,
      width: "10%",
    },
    {
      name: <span className="text-lg">Date Ordered</span>,
      selector: (row) => {
        const formattedDate = format(
          new Date(row.createdAt),
          "MMMM d, yyyy, h:mm:ss a"
        );
        return formattedDate;
      },
      width: "17%",
      sortable: true,
    },
    {
      name: <span className="text-lg">Due Date</span>,
      selector: (row) => {
        const today = new Date();
        const dateOrdered = new Date(row.createdAt);

        const diffTime = Math.abs(today - dateOrdered);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 3 && row.status === "pending") {
          return (
            <span className="text-red-500">
              <span className="text-red-500">Overdue</span>
            </span>
          );
        } else {
          return (
            <span className="text-green-500">
              <span className="text-green-500">On-time</span>
            </span>
          );
        }
      },
      width: "8%",
    },
  ];

  return columns;
};

export default GetOrders;
