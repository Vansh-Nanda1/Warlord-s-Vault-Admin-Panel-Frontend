import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteCategory, GetAllCategory } from "../Apis/apiHandlers";
import ClipLoader from "react-spinners/ClipLoader";

export default function Categories() {

  const [allCategory, setAllCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCategories = allCategory.filter((category) =>
    category.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getAllCategory = async () => {
    setLoading(true);
    try {
      const response = await GetAllCategory();
      console.log("GetAllCategory: ", response);
      if (response.success) {
        setAllCategories(response.categories);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const response = await DeleteCategory(id, token);
      if (response.success) {
        toast.success(response.message);
        getAllCategory();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateCategory = (category) => {
    navigate("/categories/add-new-category", { state: { category } });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button className="btn btn-info me-2" onClick={() => updateCategory(row)}>
            <FaEdit />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.id)}
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
    <>
      <div className="categories-section">
        <div className="container mt-4">
          <div className="page-title">
            <h4 className="mb-4">Categories</h4>
          </div>

          <div className="d-md-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Name"
                value={filter}
                onChange={handleFilterChange}
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="categories-btn mt-2">
              <Link to="/categories/add-new-category" className="btn btn-primary">
                <FaPlus /> Add New Category
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center mt-4">
              <ClipLoader size={50} color={"var(--primary-color)"} loading={loading} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredCategories}
              pagination
              highlightOnHover
              defaultSortField="id"
              responsive
              customStyles={customStyles}
            />
          )}

          <ToastContainer />
        </div>
      </div>
    </>
  );
}
