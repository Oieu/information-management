import axios from "axios";

export const getUserData = async (setData, setError, setLoading) => {
  await axios
    .get(
      `http://localhost:5000/admin/analytics/api/user/${new Date().getFullYear()}`
    )
    .then((res) => setData(res.data))
    .catch((err) => setError(err.Message))
    .finally(() => {
      setTimeout(() => setLoading(false), 1000);
    });
};

export const currentMonthIndex = () => {
  const date = new Date();
  const month = date.getMonth();
  return month - 1;
};

export const getOrderIncreasePercentage = async (
  currentTotalRevenue,
  previousTotalRevenue
) => {
  const increase = currentTotalRevenue - previousTotalRevenue;
  const percentage = (increase / previousTotalRevenue) * 100;
  return percentage.toFixed(2);
};
  