import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
import {Spinner} from "react-bootstrap";

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'password': '',
            'confirmPassword': '',
            'passwordErr': '',
            'confirmPasswordErr': '',
            'data': []
        };

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    keyPressPassword() {
        let password = this.state.password;

        if(password.length >= 6){
            this.setState({'passwordErr' : false});
        }else{
            this.setState({'passwordErr' : true });
        }
    }

    keyPressPasswordConfirm() {
        let password = this.state.password;
        let confirm_pass = this.state.confirmPassword;
        if(password !== confirm_pass){
            this.setState({'confirmPasswordErr' : true});
        }else{
            this.setState({'confirmPasswordErr' : false});
        }
    }

    async handleNext() {
        this.setState({isLoading: true});
        let apiUrl = 'https://alpha.ubikom.cc:8088';
        try{
            await axios.get(apiUrl+'/easySetup?name='+this.props.name+'&password='+this.state.password)
                .then(response => {
                    this.setState({isLoading: false});
                    let result = response.data;
                    if (result !== undefined && result !== null){
                        this.setState({data:result});
                        this.props.setStepState(result);
                    }
                });

        }catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>

                {this.state.isLoading === true && (
                    <SpinnerWrapper>
                        <Spinner animation="border" variant="secondary" />
                    </SpinnerWrapper>
                )}
                {this.state.isLoading !== true && (
                    <div className=" custom-card">
                        <div>
                        <h1 className="card-title">
                            Choose your password
                        </h1>
                        <div className="form-group row">
                            <label className="control-label col-sm-3" htmlFor="username">Password:</label>
                            <div className="col-sm-9">
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.handleChange.bind(this)}
                                       onKeyUp={this.keyPressPassword.bind(this)}
                                       placeholder="Enter Password"/>
                            </div>

                            <div className="col-sm-offset-3 col-sm-9">
                                {this.state.passwordErr ?
                                    <span className="text-danger">Please lengthen this password to 6 characters or more.</span> : ''}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="control-label col-sm-3" htmlFor="username">Confirm Password:</label>
                            <div className="col-sm-9">
                                <input type="password"
                                       className="form-control"
                                       name="confirmPassword"
                                       value={this.state.confirmPassword}
                                       onChange={this.handleChange.bind(this)}
                                       onKeyUp={this.keyPressPasswordConfirm.bind(this)}
                                       placeholder="Enter Confirm Password"/>
                            </div>
                            <div className="col-sm-offset-3 col-sm-9">
                                {this.state.confirmPasswordErr ?
                                    <span className="text-danger">Password doesn't match</span> : ''}
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-offset-3 col-sm-9">
                                <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleNext.bind(this)}
                                        disabled={( this.state.password.length >= 6 && this.state.confirmPassword.length >=6 ) &&
                                        (this.state.password === this.state.confirmPassword ) ? false : true }>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        );
    }
}

PasswordForm.propTypes = {
    name: PropTypes.string,
    setStepState: PropTypes.func
};
export default PasswordForm;