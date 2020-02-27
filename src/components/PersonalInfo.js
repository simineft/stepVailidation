import React, { Component } from 'react';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';

class PersonalInfo extends Component {
    state = {
        value: momentJalaali(),
        isGregorian: true,
        errors: {},
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }

    //let e = {target:{value:'some value', name:'some name'}}
    validateField = ({ target: { value, name } }) => {

        // let { value, name } = target

        this.setState({
            errors: {
                ...this.state.errors,
                [name]: value.length > 3 ? null : `${name} must be longer than 3 characters`

            }

        });

    }

    isValidIranianNationalCode = ({ target: { value, name } }) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: /^\d{10}$/.test(value) ? null : `${name} must be longer than 10 digit`
            }
        });
        var check = +name[9];
        var sum = Array(9).fill().map((_, i) => +name[i] * (10 - i)).reduce((x, y) => x + y) % 11;
        return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);

    }

    switchLanguage = (e) => {
        e.preventDefault();
        this.setState({
            isGregorian: !this.state.isGregorian
        })

    }



    render() {
        const { firstName, lastName, handleChange, nationalCode, handleDateChange } = this.props;
        console.log("state", this.state);

        console.log(this.props, "personallinfo")
        return (
            <>
                <form  >
                    <h2> لطفا اطلاعات خود را وارد نمایید</h2>
                    <div className="settingForm" >
                        <label> نام: </label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            placeholder="نام"
                            onChange={handleChange('firstName')}
                            onKeyPress={this.validateField}

                        />
                    </div>
                    {
                        this.state.errors.firstName &&
                        <div className="error"    >
                            {this.state.errors.firstName}
                        </div>
                    }
                    <div className="settingForm" >
                        <label>  نام خانوادگی: </label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            placeholder="نام خانوادگی"
                            onChange={handleChange('lastName')}
                            onKeyPress={this.validateField}

                        />


                    </div>
                    {
                        this.state.errors.lastName &&
                        <div className="error" >
                            {this.state.errors.lastName}
                        </div>
                    }


                    <div className="settingForm" >
                        <label>  کدملی: </label>
                        <input
                            type="text"
                            name="nationalCode"
                            value={nationalCode}
                            placeholder="کد ملی"
                            onChange={handleChange('nationalCode')}
                            onKeyPress={this.isValidIranianNationalCode}

                        />

                    </div>
                    {
                        this.state.errors.nationalCode &&
                        <div className="error" >
                            {this.state.errors.nationalCode}
                        </div>
                    }

                    <div className="settingForm  calender" >
                        <label>تاریخ تولد: </label>
                        <DatePicker
                            value={this.state.value}
                            isGregorian={this.state.isGregorian}
                            onChange={value => handleDateChange(value.toJSON())}

                        />
                        <br />
                        <div className="settingButton"  >
                            <button onClick={this.switchLanguage}>
                                {this.state.isGregorian ? 'میلادی' : 'شمسی'}
                            </button>
                        </div>
                    </div>

                    <button className="Next" onClick={this.continue}>
                        Next »
                </button>
                </form>
            </>
        );
    }
}

export default PersonalInfo;