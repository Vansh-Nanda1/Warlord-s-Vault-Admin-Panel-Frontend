// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './pages/Layout/Layout';
// import Dashboard from './Component/Dashboard';
// import Products from './Component/Products';
// import Orders from './Component/Orders';
// import Customer from './Component/Customer';
// import Categories from './Component/Categories';
// import Login from './Component/Login/login';
// import SubCategories from './Component/SubCategories';
// import AddNewProduct from './Component/Forms/AddNewProduct';
// import AddNewCategory from './Component/Forms/AddNewCategory';
// import AddSubCategory from './Component/Forms/AddSubCategory';
// import AuctionsPage from './Component/Auctions/AuctionsPage';
// import AddNewAuction from './Component/Forms/AddNewAuction';
// import Selling from './Component/Selling/Selling';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login Route Without Layout */}
//         <Route path="/login" element={<Login />} />

//         {/* Base Layout with nested routes */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="selling" element={<Selling />} />
//           <Route path="products" element={<Products />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="customer" element={<Customer />} />
//           <Route path="categories" element={<Categories />} />
//           <Route path="sub-categories" element={<SubCategories/>} />
//           <Route path="products/add-new-product" element={<AddNewProduct/>} />
//           <Route path="categories/add-new-category" element={<AddNewCategory/>} />
//           <Route path="add-sub-category" element={<AddSubCategory/>} />
//           <Route path="auctions" element={<AuctionsPage/>} />
//           <Route path="add-new-auction" element={<AddNewAuction/>} />


          
//           {/* <Route path="add-new-product" element={<AddNewProduct/>} /> */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// UNCOMMENT THE LINE WHEN APIS WORKS

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Dashboard from './Component/Dashboard';
import Products from './Component/Products';
import Orders from './Component/Orders';
import Customer from './Component/Customer';
import Categories from './Component/Categories';
import Login from './Component/Login/login';
import SubCategories from './Component/SubCategories';
import AddNewProduct from './Component/Forms/AddNewProduct';
import AddNewCategory from './Component/Forms/AddNewCategory';
import AddSubCategory from './Component/Forms/AddSubCategory';
import AuctionsPage from './Component/Auctions/AuctionsPage';
import AddNewAuction from './Component/Forms/AddNewAuction';
import Selling from './Component/Selling/Selling'

// Example authentication check
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Base Layout with nested routes */}
        <Route path="/" element={<Layout />}>
          {/* Private Routes */}
          <Route index element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="products" element={<PrivateRoute element={<Products />} />} />
          <Route path="orders" element={<PrivateRoute element={<Orders />} />} />
          <Route path="customer" element={<PrivateRoute element={<Customer />} />} />
          <Route path="categories" element={<PrivateRoute element={<Categories />} />} />
          <Route path="sub-categories" element={<PrivateRoute element={<SubCategories />} />} />
          <Route path="products/add-new-product" element={<PrivateRoute element={<AddNewProduct />} />} />
          <Route path="categories/add-new-category" element={<PrivateRoute element={<AddNewCategory />} />} />
          <Route path="add-sub-category" element={<PrivateRoute element={<AddSubCategory />} />} />
          <Route path="auctions" element={<PrivateRoute element={<AuctionsPage />} />} />
          <Route path="add-new-auction" element={<PrivateRoute element={<AddNewAuction />} />} />
          <Route path="selling" element={<PrivateRoute element={<Selling />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;









// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './pages/Layout/Layout';
// import Dashboard from './Component/Dashboard';
// import Products from './Component/Products';
// import Orders from './Component/Orders';
// import Customer from './Component/Customer';
// import Categories from './Component/Categories';
// import Login from './Component/Login/login';
// import SubCategories from './Component/SubCategories';
// import AddNewProduct from './Component/Forms/AddNewProduct';
// import AddNewCategory from './Component/Forms/AddNewCategory';
// import AddSubCategory from './Component/Forms/AddSubCategory';
// import AuctionsPage from './Component/Auctions/AuctionsPage';
// import AddNewAuction from './Component/Forms/AddNewAuction';
// import Privateroute from './Component/Privateroute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Base Layout with nested private routes */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Privateroute><Dashboard /></Privateroute>} />
//           <Route path="dashboard" element={<Privateroute><Dashboard /></Privateroute>} />
//           <Route path="products" element={<Privateroute><Products /></Privateroute>} />
//           <Route path="orders" element={<Privateroute><Orders /></Privateroute>} />
//           <Route path="customer" element={<Privateroute><Customer /></Privateroute>} />
//           <Route path="categories" element={<Privateroute><Categories /></Privateroute>} />
//           <Route path="sub-categories" element={<Privateroute><SubCategories /></Privateroute>} />
//           <Route path="products/add-new-product" element={<Privateroute><AddNewProduct /></Privateroute>} />
//           <Route path="categories/add-new-category" element={<Privateroute><AddNewCategory /></Privateroute>} />
//           <Route path="add-sub-category" element={<Privateroute><AddSubCategory /></Privateroute>} />
//           <Route path="auctions" element={<Privateroute><AuctionsPage /></Privateroute>} />
//           <Route path="add-new-auction" element={<Privateroute><AddNewAuction /></Privateroute>} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
