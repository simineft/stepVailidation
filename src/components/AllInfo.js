import React, { Component } from 'react';

class AllInfo extends Component {

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { firstName, lastName, nationalCode, birthDay, file } = this.props;

        return (
            <>
                <h2>اطلاعات  خود ر ا مشاهده نمایید </h2>
                <p>  نام: {firstName}</p>
                <p>  نام خانوادگی: {lastName}</p>
                <p>  کدملی:  {nationalCode} </p>
                <p>  تاریخ تولد:  {birthDay} </p>
                <p  className="showImag"   >  آبلود عکس:  {file && <img src={file} alt='' />} </p>

                <button className="Back" onClick={this.back}>
                    « Back
                </button>
            </>
        );
    }
}

export default AllInfo;