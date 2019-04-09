import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

// TODO: order by date descending

class Launches extends Component {
  render() {
    const {
      data: { loading, launches }
    } = this.props;

    const today = new Date();

    return (
      <Fragment>
        <Tabs>
          <TabList>
            <Tab>All</Tab>
            <Tab>Completed</Tab>
            <Tab>Upcoming</Tab>
            <Tab>Successful</Tab>
          </TabList>
          <TabPanel>
            {' '}
            <MissionKey />
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              launches.map(launch => (
                <LaunchItem key={launch.flight_number} launch={launch} />
              ))
            )}
          </TabPanel>
          <TabPanel>
            <MissionKey />
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              launches
                .filter(
                  launch => launch.launch_date_local < today.toISOString()
                )
                .map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))
            )}
          </TabPanel>
          <TabPanel className="successTab">
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              launches
                .filter(
                  launch => launch.launch_date_local > today.toISOString()
                )
                .map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              launches
                .filter(launch => launch.launch_success === true)
                .map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))
            )}
          </TabPanel>
        </Tabs>
      </Fragment>
    );
  }
}

export default graphql(
  gql`
    {
      launches {
        flight_number
        mission_name
        launch_date_local
        launch_success
      }
    }
  `
)(Launches);
