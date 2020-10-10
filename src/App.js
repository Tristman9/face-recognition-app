import React, { Component } from 'react';
import Navigation from "./components/navigation/Navigation"
import './App.css';
import Logo from "./components/logo/Logo";
import Signin from "./components/Signin/Signin";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
// import ShowPhoto from "./components/showPhoto/showPhoto.js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "tachyons";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: "c171543d0ea649da9e3c3ae3f8e3e091",
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
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width * (clarifaiFace.right_col - 1),
      bottomRow: height * (clarifaiFace.bottom_row - 1 )
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log("click")
    // set imageUrl state
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input
    )
    .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
      // response data fetch from FACE_DETECT_MODEL 
      // for (let region of response.outputs[0].data.regions)
      //     console.log(region.region_info.bounding_box)
      /* data needed from the response data from clarifai API, 
        note we are just comparing the two for better understanding 
        would to delete the above console*/ 
      // console.log(
      //   response.outputs[0].data.regions[0].region_info.bounding_box
      // );
    // },
    


};

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({isSignedIn: false})
    }
    // else if (route === "register") {
    //   this.setState({isSignedIn: false})
    // }
    else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (

    <div className="App">
              <Particles className="particles"
                      params={particlesOptions}
                    />


    <Navigation isSignedIn={isSignedIn} signOff={this.onRouteChange}/>
        { route === "home"
        ? <div>

              <Logo/>
              <Rank />
              <ImageLinkForm onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          :
          
          (
            
            this.state.route === "signin"
            ?
              
              <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange} />
    

          )

      
        }
    </div>
    )
  };}


export default App;
