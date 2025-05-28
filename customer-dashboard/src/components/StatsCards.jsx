const StatsCards = ({ data }) => {
  const avgIncome = data.reduce((sum, d) => sum + d.Income, 0) / data.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-white p-4 rounded shadow">
        Total Customers: {data.length}
      </div>
      <div className="bg-white p-4 rounded shadow">
        Average Income: {avgIncome.toFixed(2)}
      </div>
      <div className="bg-white p-4 rounded shadow">
        Divisions: {new Set(data.map((d) => d.Division)).size}
      </div>
    </div>
  );
};
export default StatsCards;
