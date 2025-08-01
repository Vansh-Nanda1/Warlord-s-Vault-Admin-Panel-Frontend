// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; 
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// import { GetAllProduct } from "../Apis/apiHandlers";

// export default function Products() {
//   const [data, setData] = useState([]);

//   const fetchAllProduct = async () => {
//     try{
//       const response = await GetAllProduct()
//       console.log(response)
//       if(response.success){
//         setData(response.products)
//       }
//     }catch(error){
//       toast.error(error.response)
//     }
//   }

//   useEffect(()=>{
//     fetchAllProduct()
//   },[])

//   const [search, setSearch] = useState("");

//   const handleSearch = (event) => {
//     setSearch(event.target.value);
//   };

//   const filteredData = data.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase()) ||
//     product.category.toLowerCase().includes(search.toLowerCase()) ||
//     product.sku.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = (id, name) => {
//     setData(data.filter((product) => product.id !== id));
//     toast.error(`${name} has been deleted.`, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       icon: "❌",
//     });
//   };

//   const columns = [
//     {
//       name: "Image",
//       cell: (row) => (
//         row.images && row.images.length > 0 ? (
//           <img src={row.images[0].location} alt={row.name} style={{ width: "70px", borderRadius: "5px" }} />
//         ) : (
//           "No Image"
//         )
//       ),
//       width: "80px",
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Category",
//       selector: (row) => row.category?.name || "No Category",
//       sortable: true,
//     },
//     {
//       name: "SubCategory",
//       selector: (row) => row.SubCategory || "No SubCategory",
//       sortable: true,
//     },
//     {
//       name: "Price",
//       selector: (row) => `$ ${row.price}`,
//       sortable: true,
//     },
//     {
//       name: "Stocks",
//       selector: (row) => row.stock,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.sold ? "Sold" : "Available",
//       sortable: true,
//       cell: (row) => (
//         <span style={{ color: row.sold ? "#dc3545" : "#28a745", fontWeight: "bold" }}>
//           {row.sold ? "Sold" : "Available"}
//         </span>
//       ),
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div style={{ display: "flex", justifyContent: "center", gap: "15px", alignItems: "center" }}>
//           <FaEye
//             style={{
//               color: "#007bff",
//               fontSize: "20px",
//               cursor: "pointer",
//             }}
//             onClick={() => alert(`Viewing product: ${row.name}`)}
//           />
//           <FaEdit
//             style={{
//               color: "#ffc107",
//               fontSize: "20px",
//               cursor: "pointer",
//             }}
//             onClick={() => alert(`Editing product: ${row.name}`)}
//           />
//           <FaTrashAlt
//             style={{
//               color: "#dc3545",
//               fontSize: "20px",
//               cursor: "pointer",
//             }}
//             onClick={() => handleDelete(row._id, row.name)}
//           />
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     }
//   ];


//   const customStyles = {
//     headCells: {
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold",
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
//     <div className="container mt-4">
//       <div className="page-tittle">
//       <h4 className="mb-4">Products Data Table</h4>
//       </div>


//       {/* Search Bar */}
//       <div className="mb-4 d-flex justify-content-between align-items-center">
//         <input
//           type="text"
//           className="form-control search-bar"
//           placeholder="Search Products..."
//           value={search}
//           onChange={handleSearch}
//           style={{ width: "300px" }}
//         />
//         {/* Add New Product Button */}
//         <Link to="add-new-product" className="add-product-btn">
//           Add New Product
//         </Link>
//       </div>

//       {/* DataTable with filtered data */}
//       <DataTable
//         columns={columns}
//         data={filteredData}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//         customStyles={customStyles}
//       />

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// }










import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllProduct } from "../Apis/apiHandlers";
import { ClipLoader } from "react-spinners";

export default function Products() {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const fetchAllProduct = async (page = 1) => {
    try {
      const response = await GetAllProduct(page, perPage);
      console.log(response)
      if (response.success) {
        setData(response.products);
        setTotalRows(response.total);
      }
    } catch (error) {
      toast.error(error.response);
    }
  }

  useEffect(() => {
    fetchAllProduct(currentPage);
  }, [currentPage, perPage]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category?.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id, name) => {
    setData(data.filter((product) => product._id !== id));
    toast.error(`${name} has been deleted.`, {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      icon: "❌",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllProduct(page);
  };

  const handlePerRowsChange = (newPerPage) => {
    setPerPage(newPerPage);
    fetchAllProduct(currentPage);
  };

  const columns = [
    {
      name: "Image",
      cell: (row) => (
        row.images && row.images.length > 0 ? (
          <img src={row.images[0].location} alt={row.name} style={{ width: "70px", borderRadius: "5px" }} />
        ) : (
          "No Image"
        )
      ),
      width: "80px",
    },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Category", selector: (row) => row.category?.name || "No Category", sortable: true },
    { name: "SubCategory", selector: (row) => row.SubCategory || "No SubCategory", sortable: true },
    { name: "Price", selector: (row) => row.price, sortable: true },
    { name: "Stocks", selector: (row) => row.stock, sortable: true },
    {
      name: "Status",
      selector: (row) => row.sold ? "Sold" : "Available",
      sortable: true,
      cell: (row) => (
        <span style={{ color: row.sold ? "#dc3545" : "#28a745", fontWeight: "bold" }}>
          {row.sold ? "Sold" : "Available"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", alignItems: "center" }}>
          <FaEye style={{ color: "#007bff", fontSize: "20px", cursor: "pointer" }} />
          <FaEdit style={{ color: "#ffc107", fontSize: "20px", cursor: "pointer" }} />
          <FaTrashAlt
            style={{ color: "#dc3545", fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleDelete(row._id, row.name)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const customStyles = {
    headCells: { style: { fontSize: "16px", fontWeight: "bold", backgroundColor: "#f8f9fa" } },
    cells: { style: { fontSize: "14px" } },
  };

  return (
    <div className="container mt-4">
      <div className="page-tittle">
        <h4 className="mb-4">Products Data Table</h4>
      </div>

      <div className="mb-4 d-md-flex justify-content-between align-items-center ">
        <input
          type="text"
          className="form-control search-bar mt-2"
          placeholder="Search Products..."
          value={search}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
        <Link to="add-new-product" className="add-product-btn mt-2">Add New Product</Link>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      <ToastContainer />
    </div>
  );
}
