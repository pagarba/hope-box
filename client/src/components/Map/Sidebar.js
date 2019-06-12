import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { fetchData, sendCoordinates } from '../../core/actions/data';
import SearchBar from './SearchBar';
import './styles/Sidebar.css';

class Sidebar extends Component {
  componentDidMount() {
    const response = this.props.fetchData();
    this.setState({ data: response });
  }

  render() {
    const filteredData = this.props.data.data.filter(data => {
      return data.ismi.toString().indexOf(this.props.data.filter) !== -1
    });
    
    return (
      <Card body className="card">
        <SearchBar />
        {
          filteredData.map(data => (
            <div className="body" key={data.text}>
            <div>
              <CardTitle key={data.ismi}>{data.ismi}</CardTitle>
              <CardText key={data.text}>{data.text}</CardText>
            </div>
            <div className="button">
              <Button onClick={() => this.props.sendCoordinates({lat: data.lat, lon: data.lon})}>Go To Marker</Button> 
            </div> 
            </div> 
          ))
        }
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    sendCoordinates: (props) => dispatch(sendCoordinates(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);