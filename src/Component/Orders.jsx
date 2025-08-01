// // {
//     //   name: "Action",
//     //   cell: (row) => (
//     //     <select
//     //       className="form-control"
//     //       value={row.status}
//     //       onChange={(e) => handleStatusChange(row.invoiceNo, e.target.value)}
//     //     >
//     //       <option value="Pending">Pending</option>
//     //       <option value="Delivered">Delivered</option>
//     //       <option value="Cancelled">Cancelled</option>
//     //     </select>
//     //   ),
//     // },
//     // {
//     //   name: "View",
//     //   cell: (row) => (
//     //     <button
//     //       className="btn btn-info"
//     //       onClick={() => alert(`Viewing details for invoice: ${row.invoiceNo}`)}
//     //     >
//     //       <FaEye />
//     //     </button>
//     //   ),
//     //   ignoreRowClick: true,
//     //   allowOverflow: true,
//     //   button: true,
//     // },


//      // {
//     //   name: "Invoice No",
//     //   selector: (row, index) => index + 1, // Just to provide a serial number
//     //   sortable: true,
//     // },









// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { FaEye } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-toastify";
// import { GetAllOrder } from "../Apis/apiHandlers";


// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   const [filterName, setFilterName] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [loading,setLoading] = useState(false)

//   const getAllOrder = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token"); 
  
//     try {
//       const response = await GetAllOrder(token);
//       console.log("GetAllOrder Response: ", response);
  
//       if (response.success) {
//         setOrders(response.orders); 
//         // console.log(response)
//       } else {
//         toast.error("Failed to fetch orders.");
//       }
//     } catch (error) {
//       console.error("Error fetching orders: ", error);
//       toast.error("Something went wrong");
//     }
  
//     setLoading(false);
//   };
  

//   useEffect(()=>{
//     getAllOrder();
//   },[])

//   // Declare isWithinDateRange before it's used
//   const isWithinDateRange = (orderTime) => {
//     const orderDate = new Date(orderTime);
//     const startDateValid = startDate ? orderDate >= startDate : true;
//     const endDateValid = endDate ? orderDate <= endDate : true;
//     return startDateValid && endDateValid;
//   };

//   const handleStatusChange = (invoiceNo, newStatus) => {
//     setOrders(
//       orders.map((order) =>
//         order.invoiceNo === invoiceNo ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   const filteredOrders = orders.filter((order) => {
//     return (
//       (filterName
//         ? order.customerName.toLowerCase().includes(filterName.toLowerCase())
//         : true) &&
//       (filterStatus ? order.status === filterStatus : true) &&
//       isWithinDateRange(order.orderTime) // Use the function here
//     );
//   });

//   const columns = [
   
//     {
//       name: "Order Time",
//       selector: (row) => new Date(row.createdAt).toLocaleString(),
//       sortable: true,
//     },
//     {
//       name: "Customer Name",
//       selector: (row) => row.userDetails.fullName,
//       sortable: true,
//     },
//     {
//       name: "Amount",
//       selector: (row) => `$${row.totalPrice.toFixed(2)}`,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//       cell: (row) => {
//         let statusStyle = { fontWeight: "bold" };
//         if (row.status === "approved") statusStyle.color = "blue";
//         if (row.status === "completed") statusStyle.color = "green";
//         if (row.status === "created") statusStyle.color = "orange";
        
//         return <div style={statusStyle}>{row.status}</div>;
//       },
//     },
    
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         fontWeight: "bold",
//         fontSize: "16px",
//         backgroundColor: "#f8f9fa",
//         borderBottom: "2px solid #dee2e6",
//       },
//     },
//     cells: {
//       style: {
//         fontSize: "14px",
//       },
//     },
//   };

//   return (
//     <div className="order-section mb-5">
//       <div className="container mt-4">
//         <div className="page-tittle">
//           <h4 className="mb-4">Orders</h4>
//         </div>


//         {/* Filter Inputs */}
//         <div className="row mb-4">
//           <div className="col-md-3 mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Filter by Name"
//               value={filterName}
//               onChange={(e) => setFilterName(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3 mb-2">
//             <select
//               className="form-control select-box"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="">Filter by Status</option>
//               <option value="Pending">Pending</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//               <option value="Cancelled">approved</option>
//             </select>
//           </div>
//           <div className="col-12 col-md-3 mb-2">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               placeholderText="Start Date"
//               dateFormat="yyyy-MM-dd"
//               className="form-control"
//             />
//           </div>
//           <div className="col-12 col-md-3 mb-2">
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               placeholderText="End Date"
//               dateFormat="yyyy-MM-dd"
//               className="form-control"
//             />
//           </div>
//         </div>

//         {/* DataTable */}
//         <DataTable
//           columns={columns}
//           data={filteredOrders}
//           pagination
//           highlightOnHover
//           striped
//           responsive
//           customStyles={customStyles}
//         />
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { GetAllOrder } from "../Apis/apiHandlers";
import { ClipLoader } from "react-spinners";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllOrder = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    const token = localStorage.getItem("token"); 

    try {
      const response = await GetAllOrder(page, limit, token);

      if (response.success) {
        setOrders(response.orders);
        setTotalPages(response.totalPages); // Set total pages from response
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders: ", error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    getAllOrder(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const filteredOrders = orders.filter((order) => {
    return (
      (filterName
        ? order.userDetails.fullName.toLowerCase().includes(filterName.toLowerCase())
        : true) &&
      (filterStatus ? order.status.toLowerCase() === filterStatus.toLowerCase() : true)
    );
  });

  const columns = [
    { name: "Order Time", selector: (row) => new Date(row.createdAt).toLocaleString(), sortable: true },
    { name: "Customer Name", selector: (row) => row.userDetails.fullName, sortable: true },
    { name: "Amount", selector: (row) => `$${row.totalPrice.toFixed(2)}`, sortable: true },
    { name: "Total Amount", selector: (row) => `$${row.totalPrice.toFixed(2)}`, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        let statusStyle = { fontWeight: "bold", color: "black" };
        if (row.status === "approved") statusStyle.color = "blue";
        if (row.status === "completed") statusStyle.color = "green";
        if (row.status === "created") statusStyle.color = "orange";
        
        return <div style={statusStyle}>{row.status}</div>;
      },
    },
    
  ];

  return (
    <div className="order-section mb-5">
      <div className="container mt-4">
        <div className="page-tittle">
          <h4 className="mb-4">Orders</h4>
        </div>

        {/* Filter Inputs */}
        <div className="row mb-4">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <select
              className="form-control select-box"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="created">Created</option>
            </select>
          </div>
          <div className="col-12 col-md-3 mb-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-3 mb-2">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div>
        </div>

        {/* DataTable */}
        {loading ? (
            <div className="d-flex justify-content-center mt-4">
              <ClipLoader size={50} color={"var(--primary-color)"} loading={loading} />
            </div>
          ) : (
        <DataTable
          columns={columns}
          data={filteredOrders}
          pagination
          paginationServer
          paginationTotalRows={totalPages * rowsPerPage}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          onChangeRowsPerPage={(newPerPage) => {
            setRowsPerPage(newPerPage);
            setCurrentPage(1); // Reset to first page when changing rows per page
          }}
          onChangePage={(page) => setCurrentPage(page)}
          highlightOnHover
          striped
          responsive
        />
          )}
      </div>
    </div>
  );
}
