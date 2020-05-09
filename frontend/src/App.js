import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank /Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai'
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register'



const app = new Clarifai.App({
  apiKey: '7a0f9e3cee15414884a9454fe932e2b1'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800 
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        email: '',
        name: '',
        password: '',
        entries: '',
        joined: ''
      }

    }
  }

  loadUser = (user) => {
    this.setState({
      id: user.id,
      name: user.name ,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: user.join
    });
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value })
  }

  calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col * width),
      bottomRow: height - (faceBox.bottom_row * height)
    }                        /// object that will calculate
  }

  DisplayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  }
  //https://images.generated.photos/RdJAvMRpzGLN2JGhdRyqxPh-Vgk5VBjoaC-2oiTfFOE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4MDIwOTkuanBn.jpg

  onSumbit = () => {

    this.setState({ imageUrl: this.state.input })
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // URL
        this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body:
              JSON.stringify({
                id: this.state.user.id
              })
          }).then(response => response.json())
            .then(count =>{
              this.setState({user: {
                entries: count
              }})
            })
        }
        this.DisplayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(this.eroor));
  }

  onRouteChange = (route) => {

    this.setState({ route: route });
    if (route === 'signedout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    console.log(this.state.isSignedIn);
    console.log(this.state.route);
  }

  render() {
    //  { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {
          this.state.route === 'home'
            ? <div>
              <Logo />
              <Rank entries={this.state.entries} user={this.state.name}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSumbit={this.onSumbit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> </div>
            : (this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
