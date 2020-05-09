import React, {Component} from 'react';


class Signin extends Component{

  constructor(){
    super();
    this.state= {
      isSigned: false,
      signedInEmail: '',
      signedInPassword: ''
    }
  }
  onEmailChange = (event) =>{
    this.setState({signedInEmail: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({signedInPassword: event.target.value});
  }
  onSubmitSignIn = ()=> {
    console.log(this.state);
    fetch('http://localhost:3000/signin', {
    method: 'post', 
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(
      {
      email: this.state.signedInEmail, 
      password: this.state.signedInPassword
      })
    }).then(response => response.json())
    .then( user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
    })
    }
    

  render(){
    const {onRouteChange} = this.props;
    return(
    <div>
         <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
         <main className="pa4 black-80">
           <div className="measure">
             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
               <legend className="f4 fw6 ph0 mh0">Sign In</legend>
               <div className="mt3">
                 <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
                 <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                 onChange = {this.onEmailChange}/>
               </div>
               <div className="mv3">
                 <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
                 <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                 onChange = {this.onPasswordChange}/>
               </div>
             </fieldset>
             <div className="">
               <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
               type="submit"
                value="Sign in"
                onClick= {() => this.onSubmitSignIn()}/>
            </div>
            <div className="lh-copy mt3">
              <p href="#0" className="f3 link dim black db" onClick= {() => onRouteChange('register')}>Register</p>
            </div>
          </div>
        </main>
        </article>
      </div>
      );
  }

}

export default Signin;