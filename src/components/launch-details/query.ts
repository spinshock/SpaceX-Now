import gql from 'graphql-tag';

export const QUERY_LAUNCH_LIST = gql`
    query LaunchDetails($id: String) {
        launch(id: $id) {
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
            }
            launch_success
            upcoming
            details
        }
    }
`;
