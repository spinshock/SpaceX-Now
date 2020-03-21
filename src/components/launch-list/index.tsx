import React, { useState } from 'react';
import {
    useLaunchListQuery,
    LaunchRange,
    Order,
} from '../../generated/graphql';
import LaunchList from './launch-list';
import './launch-filter.css';

export type LaunchListState = {
    range: LaunchRange;
    limit: number;
    offset: number;
    order: Order;
    sort: string;
};

type LaunchListProps = {
    state: LaunchListState;
    updateState: (state: LaunchListState) => void;
};

const LaunchListContainer: React.FC<LaunchListProps> = (
    props: LaunchListProps
) => {
    const [state, setState] = useState({
        range: (LaunchRange as { [key: string]: LaunchRange })[''],
        limit: 10,
        offset: 0,
        order: Order.Desc,
        sort: 'launch_date_utc',
    });
    const { data, error, loading } = useLaunchListQuery({
        pollInterval: 1000,
        variables: {
            range: state.range,
            limit: state.limit,
            offset: state.offset,
            order: state.order,
            sort: state.sort,
        },
    });

    const handleRange = (range: string): void => {
        setState((prevState: LaunchListState) => ({
            ...prevState,
            range: (LaunchRange as { [key: string]: LaunchRange })[range],
        }));
        props.updateState(state);
    };

    return (
        <>
            <div className="launch-filter">
                <div className="launch-filter-range">
                    Launch range:
                    <span
                        className={`launch-filter-option ${
                            !state.range ? 'active' : ''
                        }`}
                        onClick={(): void => handleRange('')}
                    >
                        All
                    </span>
                    {Object.keys(LaunchRange).map((range, i) => (
                        <span
                            className={`launch-filter-option ${
                                range.toLowerCase() === state.range
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={(): void => handleRange(range)}
                            key={i}
                        >
                            {range}
                        </span>
                    ))}
                </div>
                <div className="launch-filter-order">
                    Order:
                    <span
                        className={`launch-filter-option ${
                            state.order === Order.Asc ? 'active' : ''
                        }`}
                        onClick={(): void => {
                            setState((prevState: LaunchListState) => ({
                                ...prevState,
                                order: Order.Asc,
                            }));
                            props.updateState(state);
                        }}
                    >
                        Asc
                    </span>
                    <span
                        className={`launch-filter-option ${
                            state.order === Order.Desc ? 'active' : ''
                        }`}
                        onClick={(): void => {
                            setState((prevState: LaunchListState) => ({
                                ...prevState,
                                order: Order.Desc,
                            }));
                            props.updateState(state);
                        }}
                    >
                        Desc
                    </span>
                </div>
                <div className="launch-filter-order">
                    Per page:
                    {[5, 10, 20, 50].map((limit: number, i) => (
                        <span
                            className={`launch-filter-option limit-option ${
                                state.limit === limit ? 'active' : ''
                            }`}
                            onClick={(): void => {
                                setState((prevState: LaunchListState) => ({
                                    ...prevState,
                                    limit,
                                }));
                                props.updateState(state);
                            }}
                            key={i}
                        >
                            {limit}
                        </span>
                    ))}
                </div>
                <div className="launch-filter-order">
                    Sort by:
                    <span
                        className={`launch-filter-option ${
                            state.sort === 'launch_mission_name' ? 'active' : ''
                        }`}
                        onClick={(): void => {
                            setState((prevState: LaunchListState) => ({
                                ...prevState,
                                sort: 'launch_mission_name',
                            }));
                            props.updateState(state);
                        }}
                    >
                        Name
                    </span>
                    <span
                        className={`launch-filter-option ${
                            state.sort === 'launch_date_utc' ? 'active' : ''
                        }`}
                        onClick={(): void => {
                            setState((prevState: LaunchListState) => ({
                                ...prevState,
                                sort: 'launch_date_utc',
                            }));
                            props.updateState(state);
                        }}
                    >
                        Date
                    </span>
                    <span
                        className={`launch-filter-option ${
                            state.sort === 'rocket_name' ? 'active' : ''
                        }`}
                        onClick={(): void => {
                            setState((prevState: LaunchListState) => ({
                                ...prevState,
                                sort: 'rocket_name',
                            }));
                            props.updateState(state);
                        }}
                    >
                        Rocket
                    </span>
                </div>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error || !data ? (
                <div>There has been an error</div>
            ) : (
                <LaunchList data={data} />
            )}
        </>
    );
};

export default LaunchListContainer;
