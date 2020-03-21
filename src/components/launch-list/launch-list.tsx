import React, { Component, ReactElement } from 'react';
import CountdownDate from '../utils/countdown-date';
import './launch-list.css';
import { LaunchListQuery } from '../../generated/graphql';
import { Link } from 'react-router-dom';

type LaunchListProps = {
    data: LaunchListQuery;
};

export default class LaunchList extends Component<LaunchListProps> {
    render(): ReactElement {
        return (
            <div className="launch-list">
                <ul>
                    {!!this.props.data.launches &&
                        this.props.data.launches.map(
                            (launch, i) =>
                                !!launch && (
                                    <li
                                        key={i}
                                        className={`launch-list-item ${
                                            !!(i % 2)
                                                ? 'list-odd-item '
                                                : 'list-even-item '
                                        }`}
                                    >
                                        <Link
                                            to={`/launches/${launch.flight_number}`}
                                        >
                                            <img
                                                className="launch-list-item--patch-img"
                                                src={
                                                    launch.links
                                                        ?.mission_patch_small ||
                                                    `${process.env.PUBLIC_URL}/images/default_mission_patch.png`
                                                }
                                                alt=""
                                            />
                                            <div className="launch-item-date launch-list-inline-item">
                                                <CountdownDate
                                                    date={
                                                        new Date(
                                                            (launch.launch_date_unix as number) *
                                                                1000
                                                        )
                                                    }
                                                    format="DD-MM-YYYY"
                                                ></CountdownDate>
                                            </div>
                                            <div className="launch-mission-name-container launch-list-inline-item">
                                                <span className="launch-mission-name">
                                                    {launch.mission_name}
                                                </span>
                                                {!launch.upcoming ? (
                                                    <div className="launch-mission-launched-wrapper">
                                                        <span
                                                            className={`launch-mission-launched-${
                                                                launch.launch_success
                                                                    ? 'success'
                                                                    : 'fail'
                                                            } launch-mission-launched`}
                                                        >
                                                            Launched
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div className="launch-mission-vehicle-container launch-list-inline-item">
                                                <span className="launch-mission-vehicle-head">
                                                    Rocket
                                                </span>
                                                <span className="launch-mission-vehicle">
                                                    {launch.rocket?.rocket_name}
                                                </span>
                                            </div>
                                            <div className="launch-mission-launchsite-container launch-list-inline-item">
                                                <span className="launch-mission-launchsite-head">
                                                    LaunchSite
                                                </span>
                                                <span className="launch-mission-launchsite">
                                                    {
                                                        launch.launch_site
                                                            ?.site_name_long
                                                    }
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                )
                        )}
                </ul>
            </div>
        );
    }
}
