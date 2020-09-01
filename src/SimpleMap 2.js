import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
          lat: 10.8033079,
          lng: 106.6321654
        },
        zoom: 14,
        options: {
            fullscreenControl: false,
            zoomControl: false
        }
      };
  render() {
      
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA2APphG_TJcxxCtKhJ2f8_A1so9oZAIUA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={this.props.options}
        >
          <AnyReactComponent
            lat={10.8033079}
            lng={106.6321654}
            text="My Work"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;