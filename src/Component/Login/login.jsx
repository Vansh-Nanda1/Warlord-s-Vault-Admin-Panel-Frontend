// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import $ from "jquery";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Login() {
//   const predefinedEmail = "hello@123.com";
//   const predefinedPassword = "hello@123";

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to handle form submission
//     const handleFormSubmit = (e) => {
//       e.preventDefault(); // Prevent form submission

//       const email = $("#email").val().trim();
//       const password = $("#password").val().trim();
//       let isValid = true;

//       // Clear previous error messages
//       $(".error-message").remove();

//       // Validate email
//       if (!email) {
//         $("#email")
//           .after(
//             '<span class="error-message text-danger">Email is required.</span>'
//           )
//           .focus();
//         isValid = false;
//       } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//         $("#email")
//           .after(
//             '<span class="error-message text-danger">Invalid email format.</span>'
//           )
//           .focus();
//         isValid = false;
//       }

//       // Validate password
//       if (!password) {
//         $("#password")
//           .after(
//             '<span class="error-message text-danger">Password is required.</span>'
//           )
//           .focus();
//         isValid = false;
//       }

//       // If validation passes, check credentials
//       if (isValid) {
//         if (email === predefinedEmail && password === predefinedPassword) {
//           $(".error-message").remove();
//           toast.success("Login successful!", {
//             position: "top-right",
//             autoClose: 2000,
//           });
//           setTimeout(() => {
//             navigate("/dashboard");
//           }, 2000);
//         } else {
//           toast.error("Invalid email or password. Please try again.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         }
//       }
//     };

//     // Attach the event listener
//     $("#loginForm").on("submit", handleFormSubmit);

//     // Cleanup on component unmount
//     return () => {
//       $("#loginForm").off("submit", handleFormSubmit);
//     };
//   }, [navigate]);

//   return (
//     <div className="login-section">
//       <div className="container">
//         <div className="row justify-content-center align-items-center min-vh-100">
//           {/* Left Column: Logo */}
//           <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center login-side-icon ">
//             <div className="login-img">
//               <img src="assets/logo.png" alt="Logo" className="img-fluid" />
//             </div>
//           </div>

//           {/* Right Column: Login Form */}
//           <div className="col-lg-6 col-md-8 p-0">
//             <div className="login-container p-4 shadow bg-white">
//               <h1 className="text-center mb-4">Login</h1>
//               <form id="loginForm">
//                 <div className="form-group mb-3">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your Email"
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group mb-4">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     placeholder="Enter your Password"
//                     className="form-control"
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary login-btn w-100 mt-2">
//                   Login
//                 </button>

//                 <div className="forgrt-btn mt-4 text-center">
//                   <a href="#">Forgot password</a>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../../redux/userSlice";
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { isAuthenticated } = useSelector((state) => state.user);

  // UNCOMMENT THE LINE WHEN APIS WORKS
  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);



  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();

  //   const loginData = {
  //     email: email.slice(0, 50), 
  //     password: password.slice(0, 20),
  //   };

  //   try {
  //     const response = await dispatch(loginUser(loginData)).unwrap();

  //     if(response.message === "Logged In Sucessfully"){
  //       setTimeout(()=>{
  //         navigate("/dashboard");
  //       },1500)
  //     }

  //   } catch (error) {
  //     // toast.error("Login failed");
  //   }
  // };



  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();

  //   const loginData = {
  //     email: email.slice(0, 50), 
  //     password: password.slice(0, 20),
  //   };

  //   try {
  //     const response = await dispatch(loginUser(loginData)).unwrap();

  //     if (response.message === "Logged In Sucessfully") {
  //       localStorage.setItem("authToken", response.token); // Store the token
  //       navigate("/dashboard", { replace: true }); // Navigate immediately
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };



  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();

  //   const loginData = { email, password };

  //   try {
  //     const response = await dispatch(loginUser(loginData)).unwrap();

  //     if (response.message === "Logged In Sucessfully") {
  //       navigate("/dashboard", { replace: true }); // Navigate immediately
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };




  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await dispatch(loginUser(loginData)).unwrap();
      if (response.message === "Logged In Sucessfully") {
        localStorage.setItem("authToken", response.token); // Store token
        navigate("/dashboard", { replace: true }); // Navigate immediately
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };




  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-section">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          {/* Left Column: Logo */}
          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center login-side-icon">
            <div className="login-img">
              <img src="assets/logo.png" alt="Logo" className="img-fluid" />
            </div>
          </div>
          {/* Right Column: Login Form */}
          <div className="col-lg-6 col-md-8 p-0">
            <div className="login-container p-4 shadow bg-white">
              <h1 className="text-center mb-4">Login</h1>
              <form id="loginForm" onSubmit={handleLoginSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="loginUsername"
                    placeholder="Email"
                    value={email}
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <div className="d-flex position-relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="loginPassword"
                      placeholder="Password"
                      value={password}
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <i className="bx bxs-lock-alt"></i>
                    <span
                      className="eye-icon position-absolute passEye"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary login-btn w-100 mt-2">
                  Login
                </button>
                {/* <div className="forget-btn mt-4 text-center">
                  <a href="#">Forgot password</a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
