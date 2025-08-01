




import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteCategory, GetAllCategory } from "../Apis/apiHandlers";
import { ClipLoader } from "react-spinners";

export default function SubCategories() {
  const [filter, setFilter] = useState("");
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchSubCategory = async () => {
    setLoading(true)
    const response = await GetAllCategory();
    if (response.success) {
      const allSubCategories = response.categories.flatMap(category =>
        category.subCategory.map(sub => ({
          ...sub,
          parentCategoryName: category.name
        }))
      );
      setSubCategories(allSubCategories);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleUpdate = (subCategory) => {
    navigate("/add-sub-category", { state: { subCategory } });
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const response = await DeleteCategory(id, token);
      if (response.success) {
        toast.success(response.message);
        fetchSubCategory();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      name: "SubCategory Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Parent Category",
      selector: (row) => row.parentCategoryName,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button className="btn btn-success" title="Edit" onClick={() => handleUpdate(row)}>
            <FaEdit />
          </button>
          <button
            className="btn btn-danger"
            title="Delete"
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
      <div className="subcategories-section">
        <div className="container mt-4">
          <div className="page-tittle">
            <h4 className="mb-4">SubCategories</h4>
          </div>

          <div className="d-md-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by SubCategory Name"
                value={filter}
                onChange={handleFilterChange}
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="subcategories-btn mt-2">
              <Link to="/add-sub-category" className="btn btn-primary">
                <FaPlus /> Add New SubCategory
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
              data={filteredSubCategories}
              pagination
              highlightOnHover
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
