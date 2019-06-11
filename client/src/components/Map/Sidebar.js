import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { action_creator, sendCoordinates } from '../../core/actions/data';
import './styles/Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props) 
      this.state = {
        filter: ''
      }
  }

  componentDidMount() {
    const response = this.props.action_creator();
    this.setState({ data: response });
  }

  render() {
    const handleChange = (e) => {
      this.setState({ filter: e.target.value })
    }

    const filteredData = this.props.data.data.filter(data => {
      return data.ismi.toString().indexOf(this.state.filter) !== -1
    });

    return (
      <Card body className="card">
        <input value={this.state.filter} onChange={handleChange}/>
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
    action_creator: () => dispatch(action_creator()),
    sendCoordinates: (props) => dispatch(sendCoordinates(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);