import React from 'react';

const Card = ({ title, value, color }) => {
    return (
        <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
};

export default Card;
