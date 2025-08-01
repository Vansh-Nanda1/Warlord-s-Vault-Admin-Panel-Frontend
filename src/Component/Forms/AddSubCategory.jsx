// import { useState, useEffect } from "react";
// import $ from "jquery";
// import "jquery-validation";

// export default function AddSubCategory() {
//   const [formData, setFormData] = useState({
//     name: "",
//     parentCategory: "", 
//   });

//   const parentCategories = [
//     { id: "1", name: "Technology" },
//     { id: "2", name: "Fashion" },
//     { id: "3", name: "Sports" },
//     { id: "4", name: "Health" },
//   ];

//   useEffect(() => {
//     $("#addSubCategoryForm").validate({
//       rules: {
//         name: {
//           required: true,
//           minlength: 3,
//         },
//         description: {
//           required: true,
//           minlength: 10,
//         },
//         parentCategory: {
//           required: true,
//         },
//       },
//       messages: {
//         name: {
//           required: "Please enter the subcategory name",
//           minlength: "Name must be at least 3 characters long",
//         },
//         description: {
//           required: "Please enter a description",
//           minlength: "Description must be at least 10 characters long",
//         },
//         parentCategory: {
//           required: "Please select a parent category",
//         },
//       },
//       submitHandler: function (form) {
//         handleSubmit(); 
//         return false; 
//       },
//     });
//   }, []); 

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     console.log("Subcategory Form Data Submitted:", formData);
//   };

//   return (
//     <div className="subcategory-section">
//       <div className="container mt-5">
//       <div className="page-tittle">
//       <h4 className="mb-4">Add New Subcategory</h4>
//       </div>
//         <form id="addSubCategoryForm" onSubmit={(e) => e.preventDefault()}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter subcategory name"
//             />
//           </div>

//           {/* Subcategory Description Field */}
          

//           {/* Parent Category Dropdown */}
//           <div className="mb-3">
//             <label htmlFor="parentCategory" className="form-label">
//               Parent Category
//             </label>
//             <select
//               className="form-control"
//               id="parentCategory"
//               name="parentCategory"
//               value={formData.parentCategory}
//               onChange={handleChange}
//             >
//               <option value="">Select a Parent Category</option>
//               {parentCategories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

          

//           {/* Submit Button */}
//           <button type="submit" className="subcategory-btn btn btn-primary w-100">
//             Add Subcategory
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }









// import { useState, useEffect } from "react";
// import $ from "jquery";
// import "jquery-validation";
// import { CreateSubCategory, GetAllCategory } from "../../Apis/apiHandlers";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AddSubCategory() {
//   const [formData, setFormData] = useState({
//     name: "",
//   });
//   const [parentCategories, setParentCategories] = useState([]);

//   useEffect(() => {
//     fetchParentCategories()
//   }, []); 

//   const fetchParentCategories = async () => {
//     try {
//       const response = await GetAllCategory();
//       if (response.success) {
//         setParentCategories(response.categories);
//       } else {
//         toast.error("Failed to fetch parent categories");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error fetching categories");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const addSubCategory = async () => {
//     const token = localStorage.getItem("token")
//     const payload = {
//       name : formData.name
//     }
//     try{
//       const response = await CreateSubCategory(payload, token, id)
//     }catch(error){
//       console.log(error)
//     }
//   }

//   const handleSubmit = async () => {
//     addSubCategory()
//   };

//   return (
//     <div className="subcategory-section">
//       <div className="container mt-5">
//       <div className="page-tittle">
//       <h4 className="mb-4">Add New Subcategory</h4>
//       </div>
//         <form id="addSubCategoryForm" onSubmit={(e) => e.preventDefault()}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Enter SubCategory Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter subcategory name"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="parentCategory" className="form-label">
//               Parent Category
//             </label>
//             <select
//               className="form-control"
//               id="parentCategory"
//               name="parentCategory"
//               value={formData.parentCategory}
//               onChange={handleChange}
//             >
//               <option value="">Select a Parent Category</option>
//               {parentCategories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button type="submit" className="subcategory-btn btn btn-primary w-100" onClick={handleSubmit}>
//             Add Subcategory
//           </button>
//           <ToastContainer />
//         </form>
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import "jquery-validation";
// import { CreateSubCategory, GetAllCategory } from "../../Apis/apiHandlers";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function AddSubCategory() {
//   const [formData, setFormData] = useState({
//     name: "",
//     parentCategory: ""
//   });
//   const [parentCategories, setParentCategories] = useState([]);
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [id, setId] = useState(null);
//   const location  = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state && location.state.subCategory) {
//       const { subCategory } = location.state;
//       setSubCategoryName(subCategory.name);
      
//       setId(subCategory.id);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     fetchParentCategories();
//   }, []); 

//   const fetchParentCategories = async () => {
//     try {
//       const response = await GetAllCategory();
//       if (response.success) {
//         setParentCategories(response.categories);
//       } else {
//         toast.error("Failed to fetch parent categories");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error fetching categories");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const addSubCategory = async () => {
//     const token = localStorage.getItem("token");
//     const payload = {
//       name: formData.name,
//     };
    
//     try {
//       const response = await CreateSubCategory(payload, token, formData.parentCategory); 
//       if (response.success) {
//         toast.success("Subcategory created successfully!");
//         setFormData({ name: "", parentCategory: "" });
//       } else {
//         toast.error("Failed to create subcategory");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error creating subcategory");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.parentCategory) {
//       toast.error("Please select a parent category");
//       return;
//     }
//     if (!formData.name) {
//       toast.error("Please enter a subcategory name");
//       return;
//     }
//     addSubCategory();
//   };

//   return (
//     <div className="subcategory-section">
//       <div className="container mt-5">
//         <div className="page-tittle">
//           <h4 className="mb-4">Add New Subcategory</h4>
//         </div>
//         <form id="addSubCategoryForm" onSubmit={(e) => e.preventDefault()}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Enter SubCategory Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter subcategory name"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="parentCategory" className="form-label">
//               Parent Category
//             </label>
//             <select
//               className="form-control"
//               id="parentCategory"
//               name="parentCategory"
//               value={formData.parentCategory}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a Parent Category</option>
//               {parentCategories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button type="submit" className="subcategory-btn btn btn-primary w-100" onClick={handleSubmit}>
//             Add Subcategory
//           </button>
//           <ToastContainer />
//         </form>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect } from "react";
import { CreateSubCategory, UpdateSubCategory, GetAllCategory } from "../../Apis/apiHandlers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export default function AddSubCategory() {
  const [formData, setFormData] = useState({
    name: "",
    parentCategory: ""
  });
  const [parentCategories, setParentCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const location  = useLocation();

  useEffect(() => {
    if (location.state && location.state.subCategory) {
      const { subCategory } = location.state;
      setFormData({
        name: subCategory.name,
        parentCategory: subCategory.parentCategoryId || ""
      });
      setSubCategoryId(subCategory.id);
      setIsEditMode(true); 
    }
  }, [location.state]);

  useEffect(() => {
    fetchParentCategories();
  }, []); 

  const fetchParentCategories = async () => {
    try {
      const response = await GetAllCategory();
      if (response.success) {
        setParentCategories(response.categories);
      } else {
        toast.error("Failed to fetch parent categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addOrUpdateSubCategory = async () => {
    const token = localStorage.getItem("token");
    const payload = { name: formData.name };

    try {
      let response;
      if (isEditMode) { 
        response = await UpdateSubCategory(subCategoryId, token, payload);
      } else {
        response = await CreateSubCategory(payload, token, formData.parentCategory);
      }
      
      if (response.success) {
        toast.success(isEditMode ? "Subcategory updated successfully!" : "Subcategory created successfully!");
        setFormData({ name: "", parentCategory: "" });
      } else {
        toast.error(isEditMode ? "Failed to update subcategory" : "Failed to create subcategory");
      }
    } catch (error) {
      console.log(error);
      toast.error(isEditMode ? "Error updating subcategory" : "Error creating subcategory");
    }
  };

  const handleSubmit = () => {
    if (!formData.parentCategory) {
      toast.error("Please select a parent category");
      return;
    }
    if (!formData.name) {
      toast.error("Please enter a subcategory name");
      return;
    }
    addOrUpdateSubCategory();
  };

  return (
    <div className="subcategory-section">
      <div className="container mt-5">
        <div className="page-tittle">
          <h4 className="mb-4">{isEditMode ? "Update Subcategory" : "Add New Subcategory"}</h4>
        </div>
        <form id="addSubCategoryForm" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter SubCategory Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter subcategory name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="parentCategory" className="form-label">Parent Category</label>
            <select
              className="form-control"
              id="parentCategory"
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select a Parent Category</option>
              {parentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="subcategory-btn btn btn-primary w-100" 
            onClick={handleSubmit}
          >
            {isEditMode ? "Update Subcategory" : "Add Subcategory"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
