import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const QuestionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="question" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Bar dataKey="average" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default QuestionChart;
