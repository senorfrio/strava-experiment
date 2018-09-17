import styled from 'styled-components';
import React, { Component } from 'react';
import BarGraph from './bargraph';
import ControlPanel from './controlpanel';
import apiKeys from '../apiKeys';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity_data: [],
            graphType: 'total_elevation_gain'
        };
        this.setGraphType = this.setGraphType.bind(this);
    }
    componentDidMount() {
        this.getData();
    }
    parseActivities(data) {
        if(data) {
            const parsedActivities = data.map(activity => {
                return {
                    id: activity.id,
                    start_date: activity.start_date,
                    distance: activity.distance,
                    moving_time: activity.moving_time,
                    total_elevation_gain: activity.total_elevation_gain,
                    type: activity.type,
                }
            });
            this.setState({
                activity_data: parsedActivities.reverse()
            })
        }
    }
    getData() {
        fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${apiKeys.stravaAccessToken}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            this.parseActivities(json);
        });
    }
    setGraphType(e) {
        let newType;

        switch (e.target.value) {
            case 'elevation':
                newType = 'total_elevation_gain';
                break;
            case 'distance':
                newType = 'distance';
                break;
            default:
                newType = 'total_elevation_gain';
                break;
        }
        this.setState({
            graphType: newType
        });
    }
    render() {
        return (
                <div>
                    <ControlPanel setGraphType={this.setGraphType} />
                    <div>
                        <BarGraph width={800} height={480} yData={this.state.graphType} data={this.state.activity_data} />
                    </div>
                </div>
        )
    }
}

export default Body;