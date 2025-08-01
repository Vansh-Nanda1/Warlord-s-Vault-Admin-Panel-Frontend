// import { Navigate, useLocation } from "react-router-dom";

// // const Privateroute = ({ children }) => {
// //   // Example: Check for authentication token in localStorage
// //   const isAuthenticated = localStorage.getItem("authToken"); // Replace with your auth logic
// //   const location = useLocation();

// //   // If not authenticated, redirect to login and preserve the attempted URL
// //   return isAuthenticated ? (
// //     children
// //   ) : (
// //     <Navigate to="/login" state={{ from: location }} />
// //   );
// // };


// const Privateroute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("authToken"); // Convert to boolean
//   const location = useLocation();

//   return isAuthenticated ? (
//     children
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };


// export default Privateroute;





// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const Privateroute = () => {
//   // const isAuthenticated = !!localStorage.getItem("authToken"); 
//   const { isAuthenticated } = useSelector(state => state.user);
//   console.log(isAuthenticated)
//   const location = useLocation();

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
// };

// export default Privateroute;







import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Privateroute = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const location = useLocation();

  // Ensure localStorage auth is used in case Redux state resets
  const isUserAuthenticated = isAuthenticated || !!localStorage.getItem("token");

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default Privateroute;


