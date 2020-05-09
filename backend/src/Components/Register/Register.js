import React, { Component } from 'react';




class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }


  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }
  onEmailChange = (event) =>{
    this.setState({email: event.target.value});
  }
  onPasswordChange = (event) =>{
    this.setState({password: event.target.value});
  }
  onSubmit = () =>{
    console.log(this.state);
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json())
      .then(user =>{
        console.log('rec:', user);
        if(user){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  }

  render() {
     // const {onRouteChange} = this.props.onRouteChange
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0"> Register </legend>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" forhtml="name">Name</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name"
                onChange ={this.onNameChange} />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" 
                onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" 
                onChange ={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmit} />
            </div>
            {/* <div className="lh-copy mt3">
                    <p onClick = {() => onRouteChange('register')}  className="f2 link dim black db"> Register</p>
      
                  </div> */}
          </div>
        </main>
      </article>
    );
  }
}
export default Register;