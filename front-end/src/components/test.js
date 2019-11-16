import React from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

class CreateProject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }

  }

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
        selectedFile: files
      })
    }
  }



  onClickHandler = () => {
    const data = new FormData()
    for (let x = 0; x < this.state.selectedFile.length; x++) {
      data.append('photos', this.state.selectedFile[x]);
    }
    data.append('user_id', 1);
    data.append('title', 'hello world')
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

      <div class="container">
        <div class="row">
          <div class="offset-md-3 col-md-6">


            <div class="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control btn btn-light" multiple onChange={this.onChangeHandler} />


            </div>

            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

          </div>
          <div class="form-group">

            <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
            <ToastContainer />
          </div>
        </div>
        
      </div>
    );
  }
}

export default CreateProject;
