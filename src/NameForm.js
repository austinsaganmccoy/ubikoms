import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from "axios";

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name' : '',
            'nameError' : false,
            'nameAvailable' : true,
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
        if(name.length > 3){
            this.setState({'nameError' : false});
        }else{
            this.setState({'nameError' : true });
        }
    }

    keyPress(){
        this.handleValidation();
        // console.log(this.state.nameAvailable);
        if(this.state.name.length > 3)
        {
            const apiUrl = 'https://alpha.ubikom.cc:8088';
            var self = this;
            axios.get(apiUrl+'/lookupName',{
                params:{
                    name: this.state.name
                }
            })
                .then(function (response) {
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
        this.props.setName(this.state.name);
    }


    render() {
        return (
            <div>
                <div className="custom-card">
                    <h1 className="card-title">
                        Get your Ubikom Identity
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis metus nec risus euismod
                        mattis sed in orci. Fusce at tincidunt arcu. Curabitur eu tincidunt nulla. Vivamus consectetur
                        consequat dolor eu feugiat. Proin feugiat justo eget sapien aliquet pellentesque. In a neque
                        placerat, ultricies tellus quis, pulvinar nibh. Maecenas at eros vitae metus pretium pretium.
                        Phasellus porttitor finibus sapien, id dignissim arcu mattis sed. Etiam consectetur viverra sem.
                        Donec mattis tincidunt eleifend. Vivamus rhoncus ante et nisi egestas lobortis. Fusce interdum
                        nulla eget cursus lobortis. Proin sit amet pretium urna. Maecenas consectetur sem massa, sit
                        amet laoreet magna fringilla at. Aliquam erat volutpat.
                    </p>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="control-label col-sm-2" htmlFor="username">Name:</label>
                            <div className="col-sm-7">
                                <input type="text"
                                       className="form-control"
                                       name="name"
                                       value={this.state.name}
                                       onChange={this.handleChange.bind(this)}
                                       onKeyUp={this.keyPress}
                                       placeholder="Enter Name" />
                            </div>
                            <div className="col-sm-3">
                                <button type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleNext.bind(this)}
                                        disabled={ (this.state.nameAvailable && this.state.name.length > 3)  ? false : true }>
                                    Next
                                </button>
                            </div>
                            <div className="col-sm-offset-2 col-sm-10">
                                {this.state.nameError ? <span className="text-danger">Name is too short.</span> : ''} <br/>
                                {!this.state.nameAvailable ? <span className="text-danger">This name is not available.</span> : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

NameForm.propTypes = {
    setName:PropTypes.func
};

export default NameForm;