import React from "react";
import Maps from "../components/maps";

const Dashboard = () => {
  return (
    <>
      <div>
        <h1 className="bg-red-500 font-bold">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
      </div>

      <Maps />
    </>
  );
};

export default Dashboard;
