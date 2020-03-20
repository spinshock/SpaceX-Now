import gql from 'graphql-tag';

export const QUERY_LAUNCH_LIST = gql`
    query LaunchList(
        $ids: [String]
        $range: LaunchRange
        $limit: Int
        $offset: Int
        $order: Order
        $sort: String
    ) {
        launches(
            ids: $ids
            range: $range
            limit: $limit
            offset: $offset
            order: $order
            sort: $sort
        ) {
            flight_number
            mission_name
            launch_date_unix
            rocket {
                rocket_name
            }
            launch_site {
                site_name_long
            }
            links {
                mission_patch
                mission_patch_small
            }
            launch_success
            upcoming
            details
        }
    }
`;
