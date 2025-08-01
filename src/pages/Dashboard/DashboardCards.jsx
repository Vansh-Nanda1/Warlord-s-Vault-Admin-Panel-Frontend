import { useEffect, useState } from 'react';
import { GetDashboardDetails } from '../../Apis/apiHandlers';
import { toast } from 'react-toastify';

export default function DashboardCards() {
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState()

  const fetchDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("token"); 

    try {
      const response = await GetDashboardDetails(token);

      if (response.success) {
        setDetails(response);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders: ", error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  useEffect(()=>{
    fetchDetails()
  },[])

  return (
    <div className="dashboardcards-section">
      <div className="container-fluid mt-3">
        <div className="dashboardcards-section-tittle">
          <h3>Welcome Admin</h3>
        </div>

        <div className="row mt-3">
          {/* {cardData.map((card) => ( */}
            <div className="col-12 col-md-3 mb-3">
              <div
                className="dashboardcards-main p-3 text-center"
                style={{ backgroundColor: '#f8d7da' }}
              >
                <div className="icon">
                  <img src="/assets/icon/new-product.png" alt="product" />
                </div>
                <h5 className="mt-2">Total Products</h5>
                <h4 className="mt-2">{details.totalProducts}</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <div
                className="dashboardcards-main p-3 text-center"
                style={{ backgroundColor: '#d1ecf1' }}
              >
                <div className="icon">
                  <img src="/assets/icon/trade.png" alt="trade" />
                </div>
                <h5 className="mt-2">Total Sells</h5>
                <h4 className="mt-2">{details.totalSells}</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <div
                className="dashboardcards-main p-3 text-center"
                style={{ backgroundColor: '#d4edda'}}
              >
                <div className="icon">
                  <img src="/assets/icon/tracking.png" alt="orders" />
                </div>
                <h5 className="mt-2">Total Orders</h5>
                <h4 className="mt-2">{details.totalOrders}</h4>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <div
                className="dashboardcards-main p-3 text-center"
                style={{ backgroundColor: '#fff3cd'}}
              >
                <div className="icon">
                  <img src="/assets/icon/customer-service.png" alt="Customer" />
                </div>
                <h5 className="mt-2">Total Customer</h5>
                <h4 className="mt-2">{details.totalCustomers}</h4>
              </div>
            </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
