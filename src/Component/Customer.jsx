import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllCustomer } from "../Apis/apiHandlers";
import { ClipLoader } from "react-spinners";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });

  const fetchAllCustomer = async (page = 1, limit = rowsPerPage) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await GetAllCustomer(page, limit, token);

      if (response.success) {
        setCustomers(response.users);
        setTotalPages(response.totalPages);
      } else {
        toast.error("Failed to fetch customers.");
      }
    } catch (error) {
      console.error("Error fetching customers: ", error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.fullName.toLowerCase().includes(filters.name.toLowerCase()) &&
      customer.email.toLowerCase().includes(filters.email.toLowerCase())
    );
  });

  const handleDelete = (id, name) => {
    setCustomers(customers.filter((customer) => customer._id !== id));
    toast.error(`${name} has been deleted.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: "❌",
    });
  };

  const columns = [
    {
      name: "Joining Date",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-info me-2">
            <FaEye />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row._id, row.fullName)}
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: "#f8f9fa",
        borderBottom: "2px solid #dee2e6",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div className="customer-section">
      <div className="container mt-4">
        <div className="page-tittle">
          <h4 className="mb-4">Customer</h4>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              name="name"
              placeholder="Filter by Name"
              className="form-control"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="email"
              name="email"
              placeholder="Filter by Email"
              className="form-control"
              value={filters.email}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {loading ? (
            <div className="d-flex justify-content-center mt-4">
              <ClipLoader size={50} color={"var(--primary-color)"} loading={loading} />
            </div>
          ) : (
        <DataTable
          columns={columns}
          data={filteredCustomers}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />
          )}
        <ToastContainer />
      </div>
    </div>
  );
}
