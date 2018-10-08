import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

const StravaLineSeries = (props) => {
    return (
        <div>
            <XYPlot
                width={props.width}
                height={props.height}
            >
                <HorizontalGridLines />
                <LineSeries
                    data={props.data} />
                <XAxis />
                <YAxis />
            </XYPlot>
        </div>
    );
}

export default StravaLineSeries;
