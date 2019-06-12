import React from 'react';
import { connect } from 'react-redux';
import { filterData } from '../../core/actions/data';

const SearchBar = (props) => {
    const handleChange = (e) => {
        props.filterData(e.target.value)
    }
    
    return (
        <input onChange={handleChange}/>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterData: (props) => dispatch(filterData(props))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);