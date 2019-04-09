import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_success
      launch_date_local
      details
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        youtube_id
      }
    }
  }
`;

// TODO: for future launches do not display "Successful" and youtube
// launch.launch_date_local > today.toISOString()

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            const {
              mission_name,
              flight_number,
              launch_success,
              launch_date_local,
              details,
              launch_site: { site_name_long },
              rocket: { rocket_name, rocket_type },
              links: { youtube_id }
            } = data.launch;

            return (
              <div>
                <h1 className="display-4 my-3">Mission: {mission_name}</h1>
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Flight Number: {flight_number}
                  </li>
                  <li className="list-group-item">
                    Launch Date:{' '}
                    <Moment format="DD-MM-YYYY HH:mm">
                      {launch_date_local}
                    </Moment>
                  </li>
                  <li className="list-group-item">
                    Successful: {launch_success ? 'Yes' : 'No'}
                  </li>
                  <li className="list-group-item">
                    Launch Site: {site_name_long}
                  </li>
                  <li className="list-group-item">Launch Details: {details}</li>
                  <li className="list-group-item">
                    <iframe
                      title="ytplayer"
                      id="ytplayer"
                      type="text/html"
                      width="640"
                      height="360"
                      src={`https://www.youtube.com/embed/${youtube_id}?autoplay=0`}
                      frameBorder="0"
                      style={{ maxWidth: '100%' }}
                    />
                  </li>
                </ul>
                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket: {rocket_name}</li>
                  <li className="list-group-item">
                    Rocket Type: {rocket_type}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launch;
