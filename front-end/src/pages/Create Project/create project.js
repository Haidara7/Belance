import React from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBInput, MDBCol,  } from "mdbreact";

import './create_project.css';

class CreateProject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      title:"",


      selectedFile: null,
      loaded: 0
    }

  }

  handleChangeInput = event => {
    this.setState({
      title : event.target.value
    });
    console.log(event.target.value)
  };

  handlDefault = e => {
    e.preventDefault();
  };

  maxSelectFile = (event) => {
    let files = event.target.files // create file object
    if (files.length > 10) {
      const msg = 'Only 10 images can be uploaded at a time'
      event.target.value = null // discard selected file
      toast.warn(msg);
      return false;

    }
    return true;

  }
  checkMimeType = (event) => {

    let files = event.target.files
    let err = [] // create empty array
    const types = ['image/png', 'image/jpeg', 'image/gif']
    for (let x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + ' is not a supported format\n';
        // assign message to array
      }
    };
    for (var z = 0; z < err.length; z++) { // loop create toast massage
      event.target.value = null
      toast.error(err[z])
    }
    return true;
  }

  checkFileSize = (event) => {
    let files = event.target.files
    let size = 2000000
    let err = [];
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    };
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z])
      event.target.value = null
    }
    return true;
  }



  onChangeHandler = event => {
    var files = event.target.files
    if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkMimeType(event)) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded:0
      })
    }
  }



  onSubmitHandler = event => {
    event.preventDefault();
    const data = new FormData()
    for (let x = 0; x < this.state.selectedFile.length; x++) {
      data.append('photos', this.state.selectedFile[x]);
    }
    data.append('user_id', 2);
    data.append("title", this.state.title)
    // data.append('title', 'hello world')
    // debugger;
    axios.post("http://localhost:5001/api/projectimg/create", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      },
    })
    .then(res => {
      toast.success('upload success')
    })
    .catch(err => {
      console.log('err', err);
      toast.error('upload fail')
      
    })
  }

  render() {
    return (

       <div className="Createproject">
        <div className="items">
          <div className="shop_product">
            <h2>
              <i class="red-text " aria-hidden="true"></i>
                   Create Project
            </h2>
          </div>
          <MDBCol md="4">
            <form onSubmit={this.onSubmitHandler}>
              <MDBInput
                label="Project Title"
                size="lg"
                // icon="fa fa-spinner"
                onInput={this.handleChangeInput}
                name="title"
              />
             
                
              
              <input
                className="btn btn-light"
                onChange={this.handleChangeInput}
                type="file"
                multiple
                onChange={this.onChangeHandler}
              />
              <div className="form-group">
                <ToastContainer />
                <Progress
                  classNam="btn btn-success"
                  max="100"
                  color="success"
                  value={this.state.loaded}
                >
                  {Math.round(this.state.loaded, 6)}%
                </Progress>
              </div>
              
             
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </MDBCol>
        </div>
      </div>
    );
  }
}

export default CreateProject;
