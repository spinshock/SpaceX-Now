import React, { Component, ReactElement } from 'react';
import CountdownDate from '../utils/countdown-date';
import './launch-list.css';
import { LaunchListQuery } from '../../generated/graphql';

type LaunchListProps = {
    data: LaunchListQuery;
};

export default class LaunchList extends Component<LaunchListProps> {
    render(): ReactElement {
        return (
            <div className="launch-list">
                {!!this.props.data.launches &&
                    this.props.data.launches.map(
                        (launch, i) =>
                            !!launch && (
                                <li key={i}>
                                    {launch.mission_name}
                                    <CountdownDate
                                        date={
                                            new Date(
                                                (launch.launch_date_unix as number) *
                                                    1000
                                            )
                                        }
                                        format="DD-MM-YYYY"
                                    ></CountdownDate>
                                </li>
                            )
                    )}
            </div>
        );
        // {this.props.data.launches?.map((launch: Launch) => (
        //     <div>
        //         <CountdownDate
        //             date={new Date()}
        //             format="DD-MM-YYYY"
        //         ></CountdownDate>
        //     </div>
        // ))}
    }
}
