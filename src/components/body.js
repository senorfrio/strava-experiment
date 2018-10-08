import styled from 'styled-components';
import React, { Component } from 'react';
import BarGraph from './BarGraph';
import ControlPanel from './ControlPanel';
import { Link, Route } from 'react-router-dom';
import apiKeys from '../apiKeys';
import LineSeries from '../enhancers/LineSeriesWithReactVis';

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
    async getData() {
        try {
            const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${apiKeys.stravaAccessToken}`);
            this.parseActivities(await response.json());
        }
        catch(err) {
            console.log('fetch failed', err);
        }
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
        const StyledLink = styled(Link)`
            color: palevioletred;
            display: block;
            margin: 0.5em 0;
            font-family: Helvetica, Arial, sans-serif;

            &:hover {
                text-decoration: underline;
            }
            &.active {
                color: red;
            }
            `;
        return (
                <div>
                    <ControlPanel setGraphType={this.setGraphType} />
                    <nav>
                        <StyledLink to="/lineseriesreactvis">
                            Line Series React-Vis</StyledLink>
                        <StyledLink to="/vxbargraph">@vx Bar Graph</StyledLink>
                    </nav>
                    <div>
                        <Route path="/lineseriesreactvis"
                            component={() => <LineSeries 
                                width={800} 
                                height={480} 
                                data={this.state.activity_data} 
                                yData={this.state.graphType}
                                type='Ride' />}
                        />
                        <Route path="/vxbargraph"
                            component={() => <BarGraph
                                width={800}
                                height={480}
                                yData={this.state.graphType}
                                data={this.state.activity_data}
                            />}
                        />
                    </div>
                </div>
        )
    }
}

export default Body;