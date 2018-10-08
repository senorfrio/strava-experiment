import React, { Component } from 'react';
import StravaLineSeries from '../components/StravaLineSeries';
import Spinner from '../components/Spinner';

class LineSeriesWithReactVis extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const data = this.props.data;

        if(data.length === 0) {
            return <Spinner />;
        }

        const filteredData = 
            data.filter(activity => activity.type === this.props.type)
                .map((activity, idx) => {
                    return {
                        x: idx,
                        y: activity[this.props.yData]
                    }
                });

        return (
            <StravaLineSeries {...this.props} data={filteredData} />
        );
    }
}

export default LineSeriesWithReactVis;