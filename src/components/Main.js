import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import UploadImage from './uploadImage';
import AllInfo from './AllInfo';

export class StepForm extends Component {
    state = {
        step: 1,
     

        // step 1
        firstName: '',
        lastName: '',
        email: '',
        nationalCode: '',
        birthDay: "",

        // step 2
        file: null,

    }

    handleChange = e => {
        const checkBox = e.target.type === "checkbox";

        this.setState({
            [e.target.name]: checkBox ? e.target.checked : e.target.value
        });
    };

    nextStep = () => {
        const { step } = this.state;

        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {
        // console.log("handleChange", { [input]: e.target.value });
        this.setState({ [input]: e.target.value });
    }


    handleDateChange = (date) => {
        this.setState({ birthDay: date })

    }

    uploadSingleFile = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        })
        // console.log(this.state.file,"fileeeeeeeeee")
    }


    showStep = () => {
        const { step, firstName, lastName, nationalCode, birthDay, file } = this.state;

        if (step === 1)
            return (<PersonalInfo
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
                firstName={firstName}
                lastName={lastName}
                nationalCode={nationalCode}
                birthDay={birthDay}
            />);
        if (step === 2)
            return (<UploadImage
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                uploadSingleFile={this.uploadSingleFile}
                file={file}


            />);
        if (step === 3)
            return (<AllInfo
                firstName={firstName}
                lastName={lastName}
                nationalCode={nationalCode}
                birthDay={birthDay}
                file={file}
                prevStep={this.prevStep}
            />);
    }

    render() {
        const { step} = this.state;
    
        

        return (
            <>
                <h2>Step {step} of 3.</h2>
                {this.showStep()}
            </>
        );
    }
}

export default StepForm;