import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import FeeCard from "../../components/FeeCard";

import { getMyFees } from "../../services/feeService";

function Fees() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
  try {
    const data = await getMyFees();

    console.log(data);

    setFees(data.fees);
  } catch (error) {
    console.log(error);
    alert("Failed to load fees");
  }
};

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Fees
      </h1>

      <div className="grid md:grid-cols-2 gap-5">
        {fees.map((fee) => (
          <FeeCard
            key={fee._id}
            fee={fee}
          />
        ))}
      </div>
    </StudentLayout>
  );
}

export default Fees;