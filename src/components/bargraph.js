import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };

const BarGraph = (props) => {
    if(props.data.length === 0) {
        return(
            <div>waiting for data</div>
        );
    }

    //accessors
    const x = d => d.start_date;
    const y = d => d[props.yData];

    // bounds
    const xMax = props.width;
    const yMax = props.height - margin.top - margin.bottom;

    // scales
    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: props.data.map(x),
        padding: 0.4
    });
    const yScale = scaleLinear({
        rangeRound: [yMax, 23],
        domain: [0, max(props.data, y)]
    });

    return (
        <svg width={props.width} height={props.height}>
            <GradientTealBlue id="teal" />
            <rect
                x={0}
                y={0}
                width={props.width}
                height={props.height}
                fill={`url(#teal)`}
                rx={1}
            />
            <Group top={40}>
                {props.data.map((activity, i) => {
                    const barHeight = yMax - yScale(y(activity));

                    return(
                        <Group className={{
                            marginBottom: '20px'
                        }} key={`bar-${i}`}>
                            <Bar
                                width={xScale.bandwidth()}
                                height={barHeight}
                                x={xScale(x(activity))}
                                y={yMax - barHeight}
                                fill="rgba(233, 233, 217, .5)"
                                data={{ 
                                    x: x(activity),
                                    y: y(activity),
                                }}
                            />
                        </Group>
                    );
                })}
            </Group>
        </svg>
    )
}

export default BarGraph;