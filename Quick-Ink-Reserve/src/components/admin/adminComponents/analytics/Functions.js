import axios from "axios";

export const fetchData = (setData, year) => {
    axios.get(`http://localhost:5000/admin/analytics/api/user/${year}`)
      .then(response => {
        const apiData = response.data.Data;
        setData(apiData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
};

export const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"
];

export const colors = ['#0088FE', '#0088FE', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#0088FE', '#0088FE', '#0088FE', '#0088FE'];

export const handleMonthChange = (e, setMonth) => {
    setMonth(parseInt(e.target.value, 10));
};

export const fetchInactiveData = (setInactiveUsers, year) => {
    axios.get(`http://localhost:5000/admin/analytics/api/user/status/${year}`)
      .then(response => {
        const apiData = response.data.Data;
        setInactiveUsers(apiData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
};