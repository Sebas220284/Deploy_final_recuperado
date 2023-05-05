
import React from 'react';
import Geolocated  from 'react-geolocated';


class Location  {
  render() {
    return (
      <div>
        {this.props.isGeolocationAvailable ? (
          <p>Geolocation is available</p>
        ) : (
          <p>Geolocation is not available</p>
        )}
        {this.props.isGeolocationEnabled ? (
          <p>Geolocation is enabled</p>
        ) : (
          <p>Geolocation is not enabled</p>
        )}
        {this.props.coords ? (
          <p>
            Latitude: {this.props.coords.latitude}, Longitude:{' '}
            {this.props.coords.longitude}
          </p>
        ) : (
          <p>Getting the location data&hellip;</p>
        )}
      </div>
    );
  }
}
export default Location