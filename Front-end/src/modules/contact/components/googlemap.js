import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
 
 
const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'red', 
      background: '#FCDF87',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '60%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );
  
  class Map extends Component {
    static defaultProps = {
      center: {lat: 13.829054, lng: 100.698207},
      zoom: 16
    };
  
    render() {
      return (
          <div style={{ height: '50vh', width: '100%' }}><GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent 
            lat={13.829054} 
            lng={100.698207} 
            text={'Sushi Ngai'} 
          />
        </GoogleMapReact></div>
      );
    }
  }
  
  export default Map
  