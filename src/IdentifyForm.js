import React, {Component} from 'react';
import axios from "axios";


class IdentifyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            passwordStatus : true
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
        const {name, user_name, server_url, key_mnemonic, key_id, password} =  this.props.data;

        const list = key_mnemonic.map((numbers) =>
            <span key={"key"+numbers}>{numbers}, </span>
        )
        let key = {key_id};

        return (
            <div>
                <div className="custom-card">
                    <h1 className="card-title">
                        Your Identify details
                    </h1>

                    <div className="form-group row">
                        <label className="control-label col-sm-4" htmlFor="username"><b>Name </b></label>
                        <div className="col-sm-8">
                            {name}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-sm-4" htmlFor="username"><b>User Name </b></label>
                        <div className="col-sm-8">
                            {user_name}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-sm-4" htmlFor="username"><b>Password </b></label>
                        <div className="col-sm-5">
                            <div style={{ display: this.state.passwordStatus === true ? 'none' : 'block' }} className="password-field">{password}</div>
                            <div style={{ display: this.state.passwordStatus === true ? 'block' : 'none' }}  className="password-field"><input type="password" onChange={this.handleChange.bind(this)} className="border-0" value={password} /></div>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-success" onClick={this.handleShow.bind(this)}>{ this.state.passwordStatus === true ? 'Show' : 'Hide' }</button>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-sm-4" htmlFor="username"><b>SMTP/POP server </b></label>
                        <div className="col-sm-8">
                            {server_url}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-sm-4" htmlFor="username"><b>Private key recovery phrase </b></label>
                        <div className="col-sm-8">
                            {list}
                        </div>
                    </div>

                    <p className="text-center"> <a className="btn btn-primary" href={'https://alpha.ubikom.cc:8088/getKey?key_id='+key.key_id}>Download Private Key</a></p>

                </div>

            </div>
        );
    }
}

// IdentifyForm.propTypes = {
//
// };

export default IdentifyForm;
