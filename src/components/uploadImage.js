import React, { Component } from 'react';
import 'react-dropzone-uploader/dist/styles.css'


class UploadImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
          
        }

    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


  

    render() {
        const {  uploadSingleFile,file} = this.props;
        let imgPreview;
        if (file) {
            imgPreview = <img src={file} alt='' />;
        }


        return (
            <>
                <form>
                    <div className="form-group  preview">
                        {imgPreview}
                    </div>

                    <div className="form-group"   >
                        <input type="file"  className="form-control"  onChange={uploadSingleFile}/>
                    </div>
                   
                </form >

                <button className="Back" onClick={this.back}>
                    « Back
                </button>
                <button className="Next" onClick={this.continue}>
                    Next »
                </button>
            </>
        );
    }
}



export default UploadImage;