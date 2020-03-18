import React from 'react';
import { useLaunchListQuery } from '../../generated/graphql';
import LaunchList from './launch-list';

const LaunchListContainer: React.FC = () => {
    const { data, error, loading } = useLaunchListQuery();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>There has been an error.</div>;
    }

    return <LaunchList data={data} />;
};

export default LaunchListContainer;
