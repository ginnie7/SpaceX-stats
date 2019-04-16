import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

class Launches extends Component {
  render() {
    const {
      data: { loading, launches }
    } = this.props;

    const today = new Date();

    return (
      <Fragment>
        <h1 id="list-title">SpaceX Launches</h1>
        <Tabs>
          <TabList>
            <Tab>Successful</Tab>
            <Tab>Upcoming</Tab>
            <Tab>Completed</Tab>
          </TabList>
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
