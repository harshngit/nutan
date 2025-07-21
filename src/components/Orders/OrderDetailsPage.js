"use client"; // Ensure the component runs only on the client side

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // For accessing the orderId from the URL
import { db } from "@/app/firebase.config";
import { doc, getDoc } from "firebase/firestore";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = router.query; // Get orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return; // If no orderId, do nothing

    const fetchOrderDetails = async () => {
      try {
        const orderRef = doc(db, "Order", orderId); // Reference to the order document in Firestore
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          setOrder(orderSnapshot.data()); // Set the order data to state
        } else {
          console.log("No such order!");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]); // Fetch data when the orderId changes

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (!order) {
    return <p>No order found!</p>;
  }

  const date = order.createdAt?.toDateString();
  const time = order.createdAt?.toLocaleTimeString("en-US");

  return (
    <div>
      <h2>Order Details</h2>
      <div>
        <p>Order ID: {order.OrderID}</p>
        <p>Customer Name: {order.customerName}</p>
        <p>Status: {order.orderStatus || "N/A"}</p>
        <p>Total: ${order.invoices?.[0]?.n_value}</p> {/* Display total from invoices */}
      </div>

      <h3>Items:</h3>
      {order.dimensions?.map((item, idx) => (
        <div key={idx}>
          <p>
            Product: {item.p_name}, Color: {item.p_color}, Size: {item.p_size}, Quantity: {item.p_qty}, Price: ${item.p_price}
          </p>
          <img src={item.p_img} alt={item.p_name} style={{ width: "100px" }} />
        </div>
      ))}

      <h3>Shipping Information:</h3>
      <div>
        <p>Address: {order.dropoff_location?.address}</p>
        <p>City: {order.dropoff_location?.city}</p>
        <p>Region: {order.dropoff_location?.region}</p>
        <p>Zip Code: {order.dropoff_location?.zip}</p>
        <p>Phone: {order.dropoff_location?.phone}</p>
        <p>Email: {order.dropoff_location?.email}</p>
      </div>

      <h3>Coupons:</h3>
      {order.coupon?.map((coupon, idx) => (
        <div key={idx}>
          <p>Coupon Code: {coupon.couponCode}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsPage;
