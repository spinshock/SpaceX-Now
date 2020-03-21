import React from 'react';
import { useLaunchDetailsQuery } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import './launch-details.css';
import CountdownDate from '../utils/countdown-date';

type LaunchDetailsOwnProps = {
    launchId: string;
};

type LaunchDetailsProps = RouteComponentProps<LaunchDetailsOwnProps>;

const LaunchDetails: React.FC<LaunchDetailsProps> = ({
    history,
    match,
}: LaunchDetailsProps) => {
    const { data, error, loading } = useLaunchDetailsQuery({
        pollInterval: 1000,
        variables: { id: match.params.launchId },
    });

    if (error) {
        return <>Error</>;
    }
    if (loading) {
        return <>Loading...</>;
    }

    return (
        <div className="launch-details-container">
            <div className="launch-details-header">
                <button
                    className="launch-details-back-btn"
                    onClick={(): void => {
                        history.goBack();
                        console.log(history);
                    }}
                >
                    &lt; Go back
                </button>
            </div>
            <div className="launch-details">
                <img
                    className="launch-details-patch"
                    src={
                        data?.launch?.links?.mission_patch ||
                        `${process.env.PUBLIC_URL}/images/default_mission_patch.png`
                    }
                    alt=""
                />
                <div className="launch-details-top">
                    <div className="launch-details-name">
                        <span className="launch-details-nr">
                            {data?.launch?.flight_number}
                        </span>
                        {data?.launch?.mission_name}
                    </div>
                    <div className="launch-details-date-countdown">
                        <CountdownDate
                            date={
                                new Date(
                                    (data?.launch?.launch_date_unix as number) *
                                        1000
                                )
                            }
                            format="DD-MM-YYYY"
                        />
                    </div>
                    <div className="launch-details-rocket">
                        <span className="launch-details-rocket-header">
                            Rocket
                        </span>
                        <span className="launch-details-rocket-name">
                            {data?.launch?.rocket?.rocket_name}
                        </span>
                    </div>
                    <div className="launch-details-site">
                        <span className="launch-details-site-header">
                            Launch site
                        </span>
                        <span className="launch-details-site-name">
                            {data?.launch?.launch_site?.site_name_long}
                        </span>
                    </div>
                </div>
                <div className="launch-details-bottom">
                    {data?.launch?.details || 'No description yet'}
                </div>
            </div>
        </div>
    );
};

export default LaunchDetails;
