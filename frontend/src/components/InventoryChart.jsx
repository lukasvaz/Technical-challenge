import React, { useState, useEffect } from 'react';

const InventoryChart = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/inventory')
            .then(response => response.json())
            .then(data => {setData(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryChart;