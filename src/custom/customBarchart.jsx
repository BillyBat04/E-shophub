import React, { useState } from 'react';
import { BarChart, ResponsiveContainer, YAxis, Tooltip, Bar, Cell, LabelList, XAxis } from 'recharts';

const CustomBarChart = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data} margin={{ top: 100, right: 30, left: 20, bottom: 5 }}>
                <YAxis />
                <XAxis dataKey = "name"/>
                <Tooltip />
                <Bar
                    dataKey="value"
                    onMouseLeave={handleMouseLeave}
                    radius={[10, 10, 0, 0]} 
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={index === activeIndex ? '#181818' : '#B2B2B2'} 
                            onMouseEnter={() => handleMouseEnter(index)}
                        />
                    ))}
                    <LabelList dataKey="value" position="top" /> 
                </Bar>
                <legend></legend>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;
