import React, {Component} from 'react';
import NameForm from "./NameForm";
import PasswordForm from "./PasswordForm";
import IdentifyForm from "./IdentifyForm";
import axios from "axios";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step_state:0,
            data: {
                "name": "zzzz",
                "user_name": "FrSpW5PggFE",
                "server_url": "alpha.ubikom.cc",
                "key_mnemonic": ["wealth", "rescue", "cake", "broken", "style", "garlic", "talent", "umbrella", "peace", "black", "melt", "chronic", "town", "exercise", "power", "deputy", "future", "safe", "young", "ticket", "reopen", "engage", "pond", "either"],
                "key_id": "841a42d8-db29-4e11-91d3-4e9f33b0f21c",
                "password": "123456"
            }
        };
    }

    setName = (name) => {
        let step_state = this.state.step_state;
        step_state++;
        this.setState({
            step_state: step_state,
            name:name
        })
    }

    setStepState = (data) => {
        let step_state = this.state.step_state;
        // console.log('data', data);
        step_state++;
        this.setState({
            step_state:  step_state++,
            data: data
        })
    }


    render() {
        const {name, user_name, server_url, key_mnemonic, key_id, password} = this.state.data;


        return (
            <div>

                {this.state.step_state === 0 && (
                    <NameForm
                        setName = {this.setName}
                    />
                )}
                {this.state.step_state === 1 && (
                    <PasswordForm
                        name = {this.state.name}
                        setStepState={this.setStepState}
                    />
                )}
                {this.state.step_state === 2 && (
                    <IdentifyForm
                        data = {this.state.data}
                    />
                )}
            </div>
        );
    }
}

Main.propTypes = {};

export default Main;