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
      return data.imsi.toString().indexOf(this.props.data.filter) !== -1
    });
    
    return (
      <Card body className="card">
        <SearchBar />
        {
          filteredData.map(data => (
            <div key ={data.imsi}>
              <div className="body">
                <div>
                  <CardTitle className="ismi">{data.imsi}</CardTitle>
                  <CardText className="text">{data.message}</CardText>
                </div>
                <div className="button">
                  <Button className="button" color="info" onClick={() => this.props.sendCoordinates({lat: parseFloat(data.lat), lon: parseFloat(data.lon)})}>Go</Button> 
                </div> 
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