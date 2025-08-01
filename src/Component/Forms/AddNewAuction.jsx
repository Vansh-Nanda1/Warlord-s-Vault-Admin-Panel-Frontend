// import React, { useState } from "react";

// export default function AddNewAuction() {
//   const [auction, setAuction] = useState({
//     name: "",
//     description: "",
//     date: "",
//     type: "Online",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAuction({ ...auction, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Auction Details:", auction);
//   };

//   return (
//     <div className="add-auction-section">
//       <div className="container mt-4">
//         <div className="page-tittle">
//           <h4 className="mb-4">Add New Auction</h4>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Auction Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="auctionName"
//               name="name"
//               value={auction.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">
//               Description
//             </label>
//             <textarea
//               className="form-control"
//               id="description"
//               name="description"
//               value={auction.description}
//               onChange={handleChange}
//               rows="5"
//               required
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="date" className="form-label">
//               Date
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="date"
//               name="date"
//               value={auction.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="type" className="form-label">
//               Type
//             </label>
//             <select
//               className="form-select"
//               id="type"
//               name="type"
//               value={auction.type}
//               onChange={handleChange}
//             >
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//             </select>
//           </div>

//           <button type="submit" className="category-btn btn btn-primary w-100 mb-4 mt-4">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import $ from "jquery";
// import "jquery-validation";

// export default function AddNewAuction() {
//   const [auction, setAuction] = useState({
//     name: "",
//     year: "",
//     time: "",
//     date: "",
//   });
  


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAuction({ ...auction, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if ($("#auctionForm").valid()) {
//       console.log("Auction Details:", auction);
//     }
//   };

//   useEffect(() => {
//     $("#auctionForm").validate({
//       rules: {
//         name: {
//           required: true,
//           minlength: 3,
//         },
//         year: {
//           required: true,
//           year: true,
//         },
//         time: {
//           required: true,
//           time: true,
//         },
//         date: {
//           required: true,
//           date: true,
//         },
//       },
//       messages: {
//         name: {
//           required: "Please enter the auction name.",
//           minlength: "The name must be at least 3 characters long.",
//         },
//         year: {
//           required: "Please provide a year.",
//           year: "Please enter a valid time.",
//         },
//         time: {
//           required: "Please select a date.",
//           time: "Please enter a valid time.",
//         },
//         date: {
//           required: "Please select a date.",
//           date: "Please enter a valid date.",
//         },
//       },
//       errorElement: "div",
//       errorClass: "text-danger",
//     });
//   }, []);

//   return (
//     <div className="add-auction-section">
//       <div className="container mt-4 mb-5">
//         <div className="page-tittle">
//           <h4 className="mb-4">Add New Auction</h4>
//         </div>
//         <form id="auctionForm" onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Auction Title
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="auctionName"
//               name="name"
//               value={auction.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Auction Year
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="year"
//               name="year"
//               value={auction.year}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Auction Time
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="time"
//               name="time"
//               value={auction.time}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Auction Date
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="date"
//               name="date"
//               value={auction.date}
//               onChange={handleChange}
//             />
//           </div>

          

//           <button
//             type="submit"
//             className="category-btn btn btn-primary w-100 mb-4 mt-4"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





// import { useState, useEffect } from "react";
// import $ from "jquery";
// import "jquery-validation";
// import { toast } from "react-toastify";
// import { CreateAuction, UpdateAuction } from "../../Apis/apiHandlers";
// import moment from "moment";
// import { useLocation } from "react-router-dom";

// export default function AddNewAuction() {
//   const [auction, setAuction] = useState({
//     name: "",
//     time: "",
//     date: "",
//     catalogueUrl: ""
//   });
//   const [id, setId] = useState(null);
//   const location = useLocation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAuction({ ...auction, [name]: value });
//   };


//   useEffect(() => {
//     if (location.state && location.state.category) {
//       const { auction } = location.state;
//       setAuction({
//         name : auction.name,
//         time : auction.time,
//         date : auction.date,
//         catalogueUrl : auction.catalogueUrl
//       });
      
//       setId(auction._id);
//     }
//   }, [location.state]);

  

//   useEffect(() => {
//     $.validator.addMethod("time", function(value) {
//       return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
//     }, "Please enter a valid time in HH:MM format.");

//     $("#auctionForm").validate({
//       rules: {
//         name: {
//           required: true,
//           minlength: 3,
//         },
//         catalogueUrl: {
//           required: true,
//         },
//         time: {
//           required: true,
//         },
//         date: {
//           required: true,
//         },
//       },
//       messages: {
//         name: {
//           required: "Please enter the auction name.",
//           minlength: "The name must be at least 3 characters long.",
//         },
//         catalogueUrl: {
//           required: "Please provide catalogue url",
//         },
//         time: {
//           required: "Please select a time.",
//         },
//         date: {
//           required: "Please select a date.",
//         },
//       },
//       errorElement: "div",
//       errorClass: "text-danger",
//     });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
  
//       const payload = {
//         catalogueUrl: auction.catalogueUrl,
//         time: moment(auction.time, "HH:mm").format("hh:mm A"),
//         date: auction.date,
//         title: auction.name,
//       };
//     if ($("#auctionForm").valid()) {
      
//       console.log(payload)

//       try {
//         if(id){
//           const response = await UpdateAuction(payload, token, id);
  
//           if (response.success) {
//             toast.success("Auction added successfully!");
//             console.log("Response:", response);
//           } else {
//             toast.error("Failed to add auction.");
//           }
//         }else{
//           const response = await CreateAuction(payload, token);
  
//           if (response.success) {
//             toast.success("Auction added successfully!");
//             console.log("Response:", response);
//           } else {
//             toast.error("Failed to add auction.");
//           }
//         }
//       } catch (error) {
//         console.error("Error adding auction: ", error);
//         toast.error("Something went wrong");
//       }
//     }
//   };
  

//   return (
//     <div className="add-auction-section">
//       <div className="container mt-4 mb-5">
//         <div className="page-tittle">
//           <h4 className="mb-4">Add New Auction</h4>
//         </div>
//         <form id="auctionForm" onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Auction Title
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="auctionName"
//               name="name"
//               value={auction.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="auctionName" className="form-label">
//               Catalogue URL
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="catalogueUrl"
//               name="catalogueUrl"
//               value={auction.catalogueUrl}
//               onChange={handleChange}
//             />
//           </div>
          
//           <div className="mb-3">
//             <label htmlFor="time" className="form-label">
//               Auction Time
//             </label>
//             <input
//               type="time"
//               className="form-control"
//               id="time"
//               name="time"
//               value={auction.time}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date" className="form-label">
//               Auction Date
//             </label>
//             <input
//               type="date"
//               className="form-control"
//               id="date"
//               name="date"
//               value={auction.date}
//               onChange={handleChange}
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="category-btn btn btn-primary w-100 mb-4 mt-4"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import $ from "jquery";
import "jquery-validation";
import { toast } from "react-toastify";
import { CreateAuction, UpdateAuction } from "../../Apis/apiHandlers";
import moment from "moment";
import { useLocation } from "react-router-dom";

export default function AddNewAuction() {
  const [auction, setAuction] = useState({
    name: "",
    time: "",
    date: "",
    catalogueUrl: ""
  });
  const [id, setId] = useState(null);
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuction({ ...auction, [name]: value });
  };

  useEffect(() => {
    if (location.state && location.state.auction) { 
      const { auction } = location.state;
      setAuction({
        name: auction.title,
        time: moment(auction.time, "hh:mm A").format("HH:mm"),
        // date: auction.date,
        date: moment(auction.date, "DD-MM-YYYY").format("YYYY-MM-DD"),
        catalogueUrl: auction.catalogueUrl
      });
      
      setId(auction._id);
    }
  }, [location.state]);

  useEffect(() => {
    $.validator.addMethod("time", function(value) {
      return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }, "Please enter a valid time in HH:MM format.");

    $("#auctionForm").validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
        },
        catalogueUrl: {
          required: true,
        },
        time: {
          required: true,
        },
        date: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please enter the auction name.",
          minlength: "The name must be at least 3 characters long.",
        },
        catalogueUrl: {
          required: "Please provide catalogue url",
        },
        time: {
          required: "Please select a time.",
        },
        date: {
          required: "Please select a date.",
        },
      },
      errorElement: "div",
      errorClass: "text-danger",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    const payload = {
      catalogueUrl: auction.catalogueUrl,
      time: moment(auction.time, "HH:mm").format("hh:mm A"),
      date: auction.date,
      title: auction.name,
    };
    
    if ($("#auctionForm").valid()) {
      try {
        if (id) { // If ID exists, call the Update API
          const response = await UpdateAuction(payload, token, id);
          if (response.success) {
            toast.success("Auction updated successfully!");
            console.log("Response:", response);
          } else {
            toast.error("Failed to update auction.");
          }
        } else { // Otherwise, create a new auction
          const response = await CreateAuction(payload, token);
          if (response.success) {
            toast.success("Auction created successfully!");
            console.log("Response:", response);
          } else {
            toast.error("Failed to create auction.");
          }
        }
      } catch (error) {
        console.error("Error adding/updating auction: ", error);
        toast.error("Something went wrong");
      }
    }
  };
  
  return (
    <div className="add-auction-section">
      <div className="container mt-4 mb-5">
        <div className="page-tittle">
          <h4 className="mb-4">{id ? "Edit Auction" : "Add New Auction"}</h4>
        </div>
        <form id="auctionForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="auctionName" className="form-label">Auction Title</label>
            <input
              type="text"
              className="form-control"
              id="auctionName"
              name="name"
              value={auction.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="catalogueUrl" className="form-label">Catalogue URL</label>
            <input
              type="text"
              className="form-control"
              id="catalogueUrl"
              name="catalogueUrl"
              value={auction.catalogueUrl}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Auction Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={auction.time}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Auction Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={auction.date}
              onChange={handleChange}
            />
          </div>
          
          <button
            type="submit"
            className="category-btn btn btn-primary w-100 mb-4 mt-4"
          >
            {id ? "Update Auction" : "Create Auction"}
          </button>
        </form>
      </div>
    </div>
  );
}
