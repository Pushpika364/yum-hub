import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Customer Orders</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Order Date</b>
          <b>Name</b>
          <b>Contact</b>
          <b>Amount</b>
          <b>Status</b>
        </div>
        {list.map((order, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{new Date(order.date).toLocaleDateString()}</p>
              <p>{order.address.firstName + order.address.lastName}</p>
              <p>{order.address.phone}</p>
              <p>{order.amount}</p>
              <p>{order.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
