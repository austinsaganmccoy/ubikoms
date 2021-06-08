import React, {Component } from 'react';
import axios from "axios";

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            nameError : false,
            nameAvailable : true,
        };

        this.handleChange = (e) => {
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        this.keyPress = this.keyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleValidation(){
        let name = this.state.name;

        if(name.length >= 3)
            this.setState({'nameError' : false});
        else if(name.length > 0 && name.length <= 3)
            this.setState({'nameError' : true });
        else  if(name.length === 0)
            this.setState({'nameError' : false});

    }


    keyPress(){
        this.handleValidation();
        if(this.state.name.length >= 3)
        {
            const apiUrl = 'https://alpha.ubikom.cc:8088';
            var self = this;
            axios.get(apiUrl+'/lookupName',{
                params:{
                    name: this.state.name
                }
            })
                .then(function (response) {
                    // console.log(response.data.available);
                    self.setState({'nameAvailable': response.data.available})
                })
                .catch(function (error){
                    console.log(error);
                })
        }
    }

    handleSubmit(event){
        event.preventDefault();
    }

    handleNext(){
        this.props.history.push({
            pathname: '/password',
            state: {
                'name': this.state.name
            }
        })
    }


    render() {
        return (
            <div>
                <div className="custom-card">
                    <h1 className="card-title">
                        Get your Ubikom Identity
                    </h1>

                    <p>
                        dummy content,dummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy content
                        dummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentdummy contentd
                    </p>

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-9 mb-10">
                                <input type="text"
                                       className="form-control"
                                       name="name"
                                       value={this.state.name}
                                       onChange={this.handleChange.bind(this)}
                                       onKeyUp={this.keyPress}
                                       placeholder="Enter Name" />
                            </div>
                            <div className="col-sm-3 mb-10">
                                <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleNext.bind(this)}
                                        disabled={ (this.state.nameAvailable && this.state.name.length >= 3)  ? false : true }>
                                    Next
                                </button>
                            </div>
                            <div className="col-sm-10">
                                {this.state.nameError ? <span className="text-danger">Name is too short.</span> : ''}  {'  '}
                                {!this.state.nameAvailable ? <span className="text-danger">This name is not available.</span> : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NameForm;
