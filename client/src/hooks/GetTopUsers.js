import React, { useState, useEffect } from 'react';

export const GetTopUsers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/users/topScore')
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
                    location: item.location
                }));
                setData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching top users:', error);
            });
    }, []);

    return data;
};