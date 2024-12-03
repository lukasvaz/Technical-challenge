import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryChart = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/sales')
            .then(response => response.json())
            .then(data => {setData(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <ResponsiveContainer width={700} height={400}>
            <LineChart data={data.map(item => {
                item._date = item._date.split('T')[0];
                return item;
            })}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_date" tick={{ angle: -10, textAnchor: 'end' }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="quantity"  activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default InventoryChart;