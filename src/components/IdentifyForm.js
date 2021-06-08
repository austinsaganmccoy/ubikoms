import React, {Component} from 'react';
import axios from "axios";
import {Button, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

class IdentifyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            passwordStatus : true,
            isLoading: true,
            name : this.props.location.state.name,
            password : this.props.location.state.password,
            confirmPassword : this.props.location.state.confirmPassword,
        }
    }

    componentDidMount() {

        const apiUrl = 'https://alpha.ubikom.cc:8088';
        let self = this;

        // If name is exist
        axios.get(apiUrl+'/lookupName',{
            params:{
                name: this.state.name
            }
        })
            .then(function (response) {
                if(response.data.available === false){
                    self.props.history.push('/');
                }
            })
            .catch(function (error){
                self.props.history.push('/');
            })

        self.props.history.push({
            pathname: '/identify',
            state: {
                'name': this.props.location.state.name,
                'password': this.props.location.state.password,
                'confirmPassword': this.props.location.state.confirmPassword
            }
        });

        this.getIdentifyData();
        window.addEventListener('popstate', this.handleOnPopState);

        window.addEventListener("beforeunload", (ev) =>
        {
            ev.preventDefault();
            if(this.state.isLoading === true)
            {
                return ev.returnValue = 'Are you sure you want to close?';
            }
        });
    }

    componentWillUnmount(){
        window.removeEventListener('popstate', this.handleOnPopState);
        window.removeEventListener('beforeunload',(ev) => {
            ev.preventDefault();
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnPopState = () => {
        if(this.state.isLoading === true){  // if waiting bar true
            var r = window.confirm("If you close this window, your chosen name will be lost and you will have to chose a new one");

            if (r === true) {
                this.props.history.push('/');
            }
        }else{
            this.props.history.push('/');
        }
    }

    async getIdentifyData(){
        const apiUrl = 'https://alpha.ubikom.cc:8088';
        var self = this;

        this.setState({isLoading: true});
        try{
            await axios.get(apiUrl+'/easySetup?name='+this.state.name+'&password='+this.state.password)
                .then(response => {
                    this.setState({isLoading: false, data:response.data});
                });

        }catch (e) {
            console.log(e);
            self.props.history.push({
                pathname: '/password',
                state: {
                    name: this.state.name
                }
            })
        }
    }


    handleShow(){
        this.setState({
            'passwordStatus' : !(this.state.passwordStatus)
        })
    }

    handleChange(){

    }


    render() {
        return (
            <div>
                {this.state.isLoading === true && (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span style={{marginLeft:15}}>Please wait while your Identify is generated </span> <br/>
                        It may take a minute, please don't close this window.
                    </Button>
                )}
                {this.state.isLoading !== true && (
                    <div className="custom-card">
                        <h1 className="card-title">
                            Your Identify details
                        </h1>
                        <div className="form-group row">
                            <label className="control-label col-sm-4 col-4" htmlFor="username"><b>Name </b></label>
                            <div className="col-sm-8 col-8">
                                {this.state.data !== undefined && this.state.data !== null && this.state.data.name}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="control-label col-sm-4 col-4" htmlFor="username"><b>User Name </b></label>
                            <div className="col-sm-8 col-8">
                                {this.state.data !== undefined && this.state.data !== null && this.state.data.user_name}
                            </div>
                        </div>

                        <div className="form-group row" style={{marginBottom:5}}>
                            <label className="control-label col-sm-4 col-4" htmlFor="username"><b>Password </b></label>
                            <div className="col-sm-3 col-5">
                                <div style={{ display: this.state.passwordStatus === true ? 'none' : 'block' }} className="password-field">
                                    {this.state.data !== undefined && this.state.data !== null && this.state.data.password}
                                </div>
                                <div style={{ display: this.state.passwordStatus === true ? 'block' : 'none' }}  className="password-field">
                                    <input type="password" onChange={this.handleChange.bind(this)} className="border-0" value={this.state.data !== undefined && this.state.data !== null && this.state.data.password} />
                                </div>
                            </div>
                            <div className="col-md-3 col-3">
                                <button className="btn btn-success" onClick={this.handleShow.bind(this)}>{ this.state.passwordStatus === true ? 'Show' : 'Hide' }</button>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="control-label col-sm-4 col-6" htmlFor="username"><b>SMTP/POP server </b></label>
                            <div className="col-sm-8 col-6">
                                {this.state.data !== undefined && this.state.data !== null && this.state.data.server_url}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="control-label col-sm-4" htmlFor="username"><b>Private key recovery phrase </b></label>
                            <div className="col-sm-8">
                                {this.state.data !== undefined && this.state.data !== null && this.state.data.key_mnemonic.map((numbers) => <span key={`key_${numbers}`}>{numbers}, </span>)}
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-offset-4 col-sm-8">
                                <a className="btn btn-primary" href={`https://alpha.ubikom.cc:8088/getKey?key_id=${this.state.data !== undefined && this.state.data !== null && this.state.data.key_id}`}>Download Private Key</a>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}

IdentifyForm.propTypes = {
    history: PropTypes.object,
}
export default IdentifyForm;

