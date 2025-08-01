import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import $ from "jquery";
import "jquery-validation";
import { toast } from "react-toastify";
import { CreateProduct, GetAllCategory } from "../../Apis/apiHandlers";

export default function AddNewProduct() {
  const [parentCategories, setParentCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    productPrice: null,
    quantity: null,
    sold: "",
    isCustomize: ""
  });
  const [selectedOption, setSelectedOption] = useState(""); 
  const [clasps, setClasps] = useState([""]); 
  const [claspPrice, setClaspPrice] = useState(); 
  const [barQuantity, setBarQuantity] = useState();

  // Handle radio button change
  const handleOptionChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value);

    if (value === "clasps") {
      setBarQuantity(); 
    } else if (value === "barQuantity") {
      setClasps([""]);
      setClaspPrice();
    }
  };

  // Handle clasp name change
  const handleClaspNameChange = (index, e) => {
    const updatedClasps = [...clasps];
    updatedClasps[index] = e.target.value;
    setClasps(updatedClasps);
  };

  // Add new clasp name field
  const addClaspField = () => {
    setClasps([...clasps, ""]);
  };

  // Remove clasp name field
  const removeClaspField = (index) => {
    const updatedClasps = clasps.filter((_, i) => i !== index);
    setClasps(updatedClasps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onDropImages = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles],
    }));
  };

  const onDropGalleryImages = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      galleryImages: [...prevData.galleryImages, ...acceptedFiles],
    }));
  };

  const {
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
  } = useDropzone({
    onDrop: onDropImages,
    accept: ".jpeg,.jpg,.png,.webp",
  });

  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
  } = useDropzone({
    onDrop: onDropGalleryImages,
    accept: ".jpeg,.jpg,.png,.webp",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const payload = {
  //     name: formData.title,
  //     description: formData.description,
  //     categoryName: formData.parentCategory,
  //     price: Number(formData.productPrice), 
  //     stock: Number(formData.quantity), 
  //     claspsPrice: Number(claspPrice) || 0, 
  //     clasps: clasps.filter((clasp) => clasp.trim() !== ""), 
  //     barQuantity: selectedOption === "barQuantity" ? Number(barQuantity) : 0, 
  //     docs: formData.images,
  //     sold: formData.sold === "true", 
  //     isCustomize: formData.isCustomize === "true", 
  //   };
  
  //   console.log(payload);

  //   const token = localStorage.getItem("token")
  //   try {
  //     const response = await CreateProduct(payload, token);
  
  //     if (response.success) {
  //       toast.success("Product added successfully!");
  //     } else {
  //       toast.error(response.message || "Failed to add product.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error while adding product.");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = new FormData();
    payload.append("name", formData.title);
    payload.append("description", formData.description);
    payload.append("categoryName", formData.parentCategory);
    payload.append("price", Number(formData.productPrice));
    payload.append("stock", Number(formData.quantity));
    payload.append("claspsPrice", Number(claspPrice) || 0);
    payload.append("barQuantity", selectedOption === "barQuantity" ? Number(barQuantity) : 0);
    payload.append("sold", formData.sold);
    payload.append("isCustomized", formData.isCustomize || false);
  
    payload.append("clasps", JSON.stringify(clasps.filter((clasp) => clasp.trim() !== "")));
  
    formData.images.forEach((image) => {
      payload.append("docs", image);
    });
  
    for (let [key, value] of payload.entries()) {
      console.log(key, value);
    }
    const token = localStorage.getItem("token")
    try {
      const response = await CreateProduct(payload, token);
  
      if (response.success) {
        toast.success("Product added successfully!");
      } else {
        toast.error(response.message || "Failed to add product.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while adding product.");
    }
  };
  
  

  // jQuery Validation Setup
  useEffect(() => {
    // Validate form using jQuery validation
    $("#addProductForm").validate({
      rules: {
        title: {
          required: true,
        },
        description: {
          required: true,
        },
        category: {
          required: true,
        },
        productPrice: {
          required: true,
          number: true,
        },
        productSellPrice: {
          required: true,
          number: true,
        },
        quantity: {
          required: true,
          number: true,
        },
      },
      messages: {
        title: {
          required: "Please enter the product title",
        },
        description: {
          required: "Please enter a product description",
        },
        category: {
          required: "Please select a category",
        },
        productPrice: {
          required: "Please enter the product price",
          number: "Please enter a valid price",
        },
        productSellPrice: {
          required: "Please enter the product sell price",
          number: "Please enter a valid price",
        },
        quantity: {
          required: "Please enter the product quantity",
          number: "Please enter a valid quantity",
        },
      },
      submitHandler: handleSubmit,
    });
  }, [formData]); // Re-run the effect when formData changes

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

  return (
    <div className="add-product-section">
      <div className="container my-5">
        <div className="page-tittle">
          <h4 className="mb-4">Add New Product</h4>
        </div>
        <form id="addProductForm" onSubmit={handleSubmit}>
          {/* Product Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          {/* Category */}
          <div className="mb-3">
            <label htmlFor="parentCategory" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="parentCategory"
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select a Category</option>
              {parentCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>


          {/* Product Images */}
          <div className="mb-3">
            <label htmlFor="images" className="form-label">
              Product Images
            </label>
            <div
              {...getRootPropsImages()}
              style={{
                border: "2px dashed #E7AF17",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputPropsImages()} />
              <p>Drag your images here or click to select files</p>
              <p>(Only *.jpeg, *.webp, *.png images will be accepted)</p>
              {formData.images.length > 0 && (
                <div className="preview">
                  <h5>Images Preview:</h5>
                  {formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Product Image ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Price */}
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              className="form-control"
              value={formData.productPrice}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Product Quantity */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Product Stock
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sold" className="form-label">
              Sold Status
            </label>
            <select
              className="form-control"
              id="sold"
              name="sold"
              value={formData.sold}
              onChange={handleChange}
              required
            >
              <option value="">Select a Sold Status</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>



          {
            formData.parentCategory === "Replica Medals" && (
              <div className="mb-3">
            <label>Do you want to Customize the Product?</label>
            <select
              name="isCustomize"
              value={formData.isCustomize}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
            )
          }



          

          {/* Show radio buttons only if isCustomize is true */}
          {formData.isCustomize === "true" && (
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="option"
                  value="clasps"
                  checked={selectedOption === "clasps"}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label">Clasps</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="option"
                  value="barQuantity"
                  checked={selectedOption === "barQuantity"}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label">Bar Quantity</label>
              </div>
            </div>
          )}

          {/* Clasps Fields */}
          {selectedOption === "clasps" && (
            <div className="mb-3">
              <h5>Clasps</h5>
              {clasps.map((clasp, index) => (
                <div key={index} className="mb-2 d-flex align-items-center">
                  <input
                    type="text"
                    placeholder={`Clasp Name ${index + 1}`}
                    value={clasp}
                    onChange={(e) => handleClaspNameChange(index, e)}
                    className="form-control me-2"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeClaspField(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={addClaspField}
              >
                Add Clasp Name
              </button>

              {/* Single Clasp Price Input */}
              <div className="mb-3">
                <label htmlFor="claspPrice" className="form-label">
                  Clasp Price
                </label>
                <input
                  type="number"
                  name="claspPrice"
                  className="form-control"
                  value={claspPrice}
                  onChange={(e) => setClaspPrice(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          )}

          {/* Bar Quantity Field */}
          {selectedOption === "barQuantity" && (
            <div className="mb-3">
              <label htmlFor="barQuantity" className="form-label">
                Bar Quantity
              </label>
              <input
                type="number"
                name="barQuantity"
                className="form-control"
                value={barQuantity}
                onChange={(e) => setBarQuantity(e.target.value)}
                min="1"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="mb-3">
            <button
              type="submit"
              className="product-add-btn btn btn-success w-100"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



















{
  /* Product Gallery Images */
}
{
  /* <div className="mb-3">
            <label htmlFor="galleryImages" className="form-label">
              Product Gallery Images
            </label>
            <div
              {...getRootPropsGallery()}
              style={{
                border: "2px dashed #E7AF17",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputPropsGallery()} />
              <p>Drag your gallery images here or click to select files</p>
              <p>(Only *.jpeg, *.webp, *.png images will be accepted)</p>
              {formData.galleryImages.length > 0 && (
                <div className="preview">
                  <h5>Gallery Images Preview:</h5>
                  {formData.galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Gallery Image ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div> */
}
