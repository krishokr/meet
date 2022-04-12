import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



function EventGenre(props) {
    const [data, setdata] = useState([])

    useEffect(() => {
      setdata(() => getData());
    },[props.events])

    function getData() {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        
        const data = genres.map((genre) => {
            const value = props.events.filter(event => event.summary.split(' ').includes(genre)).length;
            return {name: genre, value}
        });
        console.log(data);
        
    }

    return (
      <ResponsiveContainer height={400}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#fff" label/>
        </PieChart>
      </ResponsiveContainer>
    );
}

export default EventGenre;
