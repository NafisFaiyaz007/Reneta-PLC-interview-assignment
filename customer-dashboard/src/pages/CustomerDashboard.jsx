import React from "react";
import AgeGenderIncomeChart from "../components/AgeGenderIncomeChart";
// import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import customerData from "../assets/customers.json";
import IncomeAgeScatterChart from "../components/IncomeAgeScatterChart";
const CustomerDashboard = () => {
  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">
          Average Income by Age Group and Gender
        </h2>
        <div className="w-full h-[400px]">
          <AgeGenderIncomeChart data={customerData} />
        </div>
      </div>
      <div className="shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">
          Income vs Age 
        </h2>
        <div className="w-full h-[400px]">
          <IncomeAgeScatterChart data={customerData} />
        </div>
      </div>

      {/* Future visualizations can be added below */}
      {/* Add charts like: Income Distribution, Division Breakdown, Gender Ratio */}
    </motion.div>
  );
};

export default CustomerDashboard;
