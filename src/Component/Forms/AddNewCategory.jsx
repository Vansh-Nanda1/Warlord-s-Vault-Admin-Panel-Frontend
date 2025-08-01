// import { useState } from "react";
// import "jquery-validation";
// import { CreateCategory } from "../../Apis/apiHandlers";
// import { toast, ToastContainer } from "react-toastify";

// export default function AddNewCategory() {
//   const [categoryName, setCategoryName] = useState("");

//   // Form submission handler to log form data
//   const handleSubmit = async (e) => {
//     const payload = {
//       "name" : categoryName
//     }
//     e.preventDefault()
//     const token = localStorage.getItem("token")
//     try{
//       const response = await CreateCategory(payload,token)
//       console.log(response)

//       if(response.success){
//         toast.success(response.message);
//         setCategoryName("")
//       }
//     }catch(error){
//       console.log(error)
//     }
//   };

//   return (
//     <div className="category-section">
//       <div className="container mt-5">
//       <div className="page-tittle">
//       <h4 className="mb-4">Add New Category</h4>
//       </div>
//         <form id="addCategoryForm" onSubmit={handleSubmit}>
//           {/* Name Field */}
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={categoryName}
//               onChange={(e)=>{setCategoryName(e.target.value)}}
//               placeholder="Enter category name"
//             />
//           </div>

          

//           {/* Submit Button */}
//           <button type="submit" className="category-btn btn btn-primary w-100">
//             Add Category
//           </button>
//         </form>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateCategory, UpdateCategory } from "../../Apis/apiHandlers";
import { toast, ToastContainer } from "react-toastify";

export default function AddNewCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [id, setId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.category) {
      const { category } = location.state;
      setCategoryName(category.name);
      
      setId(category.id);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: categoryName };
    const token = localStorage.getItem("token");

    console.log(payload)

    try {
      if (id) {
        //create Update API call
        const response = await UpdateCategory(id, token, payload);
        if (response.success) {
          toast.success(response.message);
          setTimeout(()=>{
            navigate("/categories");
          },1000) 
        } else {
          toast.error("Failed to update category");
        }
      } else {
        // Create Category API call
        const response = await CreateCategory(payload, token);
        if (response.success) {
          toast.success(response.message);
          setCategoryName(""); // Clear the form
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="category-section">
      <div className="container mt-5">
        <div className="page-tittle">
          <h4 className="mb-4">{id ? "Edit Category" : "Add New Category"}</h4>
        </div>
        <form id="addCategoryForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <button type="submit" className="category-btn btn btn-primary w-100">
            {id ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
