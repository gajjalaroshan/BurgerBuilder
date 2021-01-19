import React, { useState, useEffect } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import checkValidity from '../../shared/validation';

const auth = (props) => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignUp, setIsSignUp] = useState(true);

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(() => {
        if(!buildingBurger && authRedirectPath!=='/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        };

        setControls(updatedControls);
    }

        let formElementsArray = [];

        for (let key in controls) {
            formElementsArray.push(
                <Input
                    key={key}
                    className={classes.Input}
                    {...controls[key]}
                    invalid={!controls[key].valid}
                    shouldValidate={controls[key].validation}
                    touched={controls[key].touched}
                    changed={(event) => inputChangedHandler(event, key)} />
            );
        }

        let errorMessage = null;
        if (props.error) {
            errorMessage = (<p>{props.error.message}</p>)
        }

        let authRedirect = null;

        if (props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath || "/" } />;
        }
        
        return (
            props.loading ? <Spinner /> :
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={submitHandler}>
                        {formElementsArray}
                        <Button btnType="Success" clicked={submitHandler}> SUBMIT </Button>
                    </form>
                    <Button
                        btnType="Danger"
                        clicked={switchAuthModeHandler}>
                        SWITCH To  {isSignUp ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                </div>
        )
    }

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        buildingBurger: state.burgerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authUser(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);