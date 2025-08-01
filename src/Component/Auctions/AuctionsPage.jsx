import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GetAllAuction } from "../../Apis/apiHandlers";
import { toast } from "react-toastify";

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState([]);

  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [loading ,setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchAllAuction = async () => {
    (true);
    const token = localStorage.getItem("token");

    try {
      const response = await GetAllAuction(token);

      if (response.success) {
        setAuctions(response.auctions);
        // setTotalPages(response.totalPages);
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
    fetchAllAuction();
  }, []);

  // const handleView = () => {
  //   alert(`Viewing details for Auction ID: ${id}`);
  // };


  const filteredAuctions = auctions.filter((auction) => {
    const matchesDate = filterDate
      ? new Date(auction.AuctionsDate) >= new Date(filterDate)
      : true;
    const matchesName = filterName
      ? auction.AuctionsName.toLowerCase().includes(filterName.toLowerCase())
      : true;
    return matchesDate && matchesName;
  });

  const handleUpdateAuction = (auction) => {
    navigate("/add-new-auction", { state: { auction } });
  }

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      // width: "70px",
    },
    {
      name: "Auction Number",
      selector: (row) => row.auctionNumber,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: false,
    },
    {
      name: "Date",
      selector: (row) => `${new Date(row.date).toLocaleDateString()} ${row.time}`,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            // onClick={() => handleView(row.id)}
            className="view-button"
            title="View"
          >
            <FaEye size={18} />
          </button>
          <button
            onClick={() => handleUpdateAuction(row)}
            className="edit-button"
            title="Edit"
          >
            <FaEdit size={18} />
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
    <div className="auction-section">
      <div className="container mt-4">
        <div className="page-tittle">
          <h4 className="mb-4">Auctions</h4>
        </div>

        <div className="d-md-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-3 mt-2">
            <div>
              <input
                type="date"
                id="filterDate"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                id="filterName"
                className="form-control"
                placeholder="Filter by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
          </div>

          <div className="add-auction-btn mt-2">
            <Link to="/add-new-auction" className="btn btn-primary">
              <FaPlus /> Add New Auction
            </Link>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredAuctions}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
