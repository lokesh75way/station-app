import React, {useState, useEffect} from 'react';
import {ResponsivePie} from '@nivo/pie';
import './App.css';

const DATA_SET = [
  {
    id: 'css',
    label: 'css22',
    value: 394,
    // color: 'hsl(25,20%,44%)',
  },
  {
    id: 'c',
    label: 'c',
    value: 8,
    // color: 'hsl(5, 70%, 50%)',
  },
  {
    id: 'rust',
    label: 'rust',
    value: 469,
    // color: 'hsl(177, 39%, 32%)',
  },
  {
    id: 'erlang',
    label: 'erlang',
    value: 377,
    // color: 'hsl(128, 70%, 50%)',
  },
  {
    id: 'haskell',
    label: 'haskell',
    value: 312,
    // color: 'hsl(177, 39%, 32%)',
  },
  {
    id: 'javascript',
    label: 'javascript',
    value: 102,
    // color: 'hsl(346, 73%, 21%)',
  },
];

function App() {
  window.addEventListener('message', message => {
    console.log('What is it', message.data);
  });
  const [text, settext] = useState('test');
  const [data, setdata] = useState([]);

  let getoken = window.localStorage.getItem('tokenKey');
  const fetchData = async () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getoken}`,
      },
    };
    try {
      const response = await fetch(
        `https://75way.com/api/quantum/lead/dashboard`,
        config,
      );
      const result = await response.json();
      console.log('Result', result.body.lifetime);
      sequlizeData(result.body.lifetime);
      // if (response.data.statuscode === 200) {
      //   // sequlizeData(response.data.body.lifetime);
      //   console.log(response.formData.body.lifetime);
      // }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.body.name === 'TokenExpiredError');
        console.log('Error', error.response.data.message);
      }
    } finally {
    }
  };

  const sequlizeData = async graphData => {
    let xi = [];

    await graphData.forEach(async (item, i) => {
      // console.log('All Checki', item);
      let insert = {
        id: `${item.caseType}`,
        label: `${item.caseType}`,
        value: item.count,
      };
      xi.push(insert);
    });
    setdata(xi);
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  console.log('What the data we get is ', data);

  if (data.length == 0) {
    return (
      <div className="containerloader">
        <img src={require('./loader.gif')} width={150} height={150} />
      </div>
    );
  }
  return (
    <div className="container">
      <ResponsivePie
        data={data}
        margin={{top: 40, right: 80, bottom: 80, left: 80}}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{from: 'color'}}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'row',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 0,
        //     itemWidth: 70,
        //     itemHeight: 18,
        //     itemTextColor: '#999',
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#000',
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
}

export default App;
