import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIcons } from '../../../core/actions/icons';
import ResponderIcon from './ResponderIcon';
import BaseStationIcon from './BaseStationIcon';
import SafeZone from './SafeZone';

class Icons extends Component {     
    async componentDidMount() {
        const response = await this.props.fetchIcons();
        this.setState({icons: response})
    }
    
    render() {
        return(
            <div>{
                this.props.icons.icons.map(icon => {
                    if (icon.item === 'Responder') {
                        return <ResponderIcon icon={icon} key={icon.id}/>
                    } else if (icon.item === 'Base Station') {
                        return <BaseStationIcon icon={icon} key={icon.id}/>
                    } else if (icon.item === 'Safe Zone') {
                        return <SafeZone icon={icon} key={icon.id} />
                    } 
                    return null;
                })
            }</div>
        );
    };
};

const mapStateToProps = state => {
    return {
        icons: state.icons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchIcons: () => dispatch(fetchIcons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Icons);