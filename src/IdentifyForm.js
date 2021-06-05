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

    render() {
        const {name, user_name, server_url, key_mnemonic, key_id, password} =  this.props.data;

        const list = key_mnemonic.map((numbers) =>
            <span>{numbers}, </span>
        )
        let key = {key_id};

        return (
            <div>
                <div className="custom-card">
                    <h1 className="card-title">
                        Your Identify details
                    </h1>
                    <p><b>Name: </b> {name}</p>
                    <p><b>User Name: </b> {user_name}</p>
                    <p className="display-flex"><b>Password: </b>
                        <div style={{ display: this.state.passwordStatus === true ? 'none' : 'block' }} className="password-field">{password}</div>
                        <div style={{ display: this.state.passwordStatus === true ? 'block' : 'none' }}  className="password-field"><input type="password" className="border-0" value={password} /></div>
                        <button className="btn btn-success" onClick={this.handleShow.bind(this)}>{ this.state.passwordStatus === true ? 'Show' : 'Hide' }</button>
                    </p>
                    <p><b>SMTP/POP server: </b> {server_url}</p>
                    <p><b>Private key recovery phrase:</b></p>
                    <p>{list}</p>
                    <p className="mobile_btn"> <a className="btn btn-primary" href={'https://alpha.ubikom.cc:8088/getKey?key_id='+key.key_id}>Download Private Key</a></p>
                </div>

            </div>
        );
    }
}

// IdentifyForm.propTypes = {
//
// };

export default IdentifyForm;
