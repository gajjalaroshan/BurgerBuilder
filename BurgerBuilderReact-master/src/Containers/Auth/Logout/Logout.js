import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

const logout = (props) => {
    const {onLogout} = props;
    useEffect(() => { onLogout() }, [onLogout]);
    return (<Redirect to="/" />)
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(logout);