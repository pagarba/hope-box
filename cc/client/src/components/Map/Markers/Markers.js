import React, { Component } from 'react';
import { connect } from 'react-redux';
import InjuredMarker from './InjuredMarker';
import UnharmedMarker from './UnharmedMarker';
import AssistanceMarker from './AssistanceMarker';
import { fetchData } from '../../../core/actions/data';

class Markers extends Component {  
  async componentDidMount() {
    const response = await this.props.fetchData()
    this.setState({ data: response })
  }
  
  
  render() {
    return (
      <div>
        {
          this.props.data.data.map(data => {
            if (data.status === 'injured') {
              return <InjuredMarker data={data}  key={data.imsi}/>
            } else if (data.status === 'unharmed') {
              return <UnharmedMarker data={data}  key={data.imsi}/>
            } else if (data.status === 'assistance') {
              return <AssistanceMarker data={data}  key={data.imsi}/>
            }
          return null;
          })
        }      
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Markers);


