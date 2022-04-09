import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



function EventGenre(props) {
    const [data, setdata] = useState([])

    useEffect(() => {

        if (props.events) {
            setdata(() => getData());
        }

    },[props.events])

    function getData() {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = props.events.filter(event => event.summary.split(' ').includes(genre)).length;
            return {name: genre, value}
        })
        
    }

    return (
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({name, percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
}

export default EventGenre;
