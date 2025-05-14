import { useState, useEffect } from "react";

export const GetTopUsers = (numUsers) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "http://localhost:5001/api/users/topScore?numUsers=" + numUsers;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const temp = Array.isArray(data) ? data : [];

        const formattedData = temp.map((item) => ({
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          points: item.points,
          dateCreated: item.dateCreated,
          location: item.location,
          streak: item.streak,
          badges: item.badges,
          rewards: item.rewards,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching top users:", error);
      });
  }, [numUsers]);

  return data;
};
