export const tableHeaders = [
  "Order ID",
  "Unique Order ID",
  "Custom Print Image URL",
  "Total Amount",
  "Ink Type",
  "Status",
  "Material",
  "Service",
  "Date Ordered",
  "User Name",
  "Action",
];

export const createColumns = (handleUpdatePopup) => {
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
      name: <span className="text-lg">User</span>,
      selector: (row) => (
        <span className="overflow-ellipsis">{row.userName}</span>
      ),
      width: "5%",
    },
    {
      name: <span className="text-lg">Submission URL</span>,
      selector: (row) => (
        <span>
          <a
            href={`http://localhost:5000/${row.submissionURL}`}
            target="_blank"
          >
            {row.submissionURL}
          </a>
        </span>
      ),
      width: "15%",
    },
    {
      name: <span className="text-sm">Amount</span>,
      selector: (row) => row.totalAMount,
      sortable: true,
      width: "6%",
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
      width: "13%",
    },
    {
      name: <span className="text-lg">Service</span>,
      selector: (row) => row.genServiceName,
      sortable: true,
      width: "10%",
    },
    {
      name: <span className="text-lg">Date Ordered</span>,
      selector: (row) => row.createdAt,
      width: "10%",
    },
    {
      name: <span className="text-lg">Action</span>,
      cell: (row) => (
        <button
          className="bg-blue-400 hover:bg-blue-600 transition-colors m-auto text-gray-800 hover:text-white font-bold py-2 px-4 rounded"
          onClick={() => handleUpdatePopup(row)}
        >
          Update status
        </button>
      ),
      width: "10%",
    },
  ];

  return columns;
};
