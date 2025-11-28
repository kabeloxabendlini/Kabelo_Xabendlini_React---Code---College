import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert } from 'react-bootstrap';

/*
  UserForm Component
  ------------------
  This is a login form that collects a username, password, and a role selection.
  It performs validation on username and password fields and provides immediate
  feedback to the user. It also handles form submission and login simulation.
*/
class UserForm extends Component {

  // Properties to store error messages for username and password
  errorUsername;
  errorPassword;

  // Predefined roles for the role selection dropdown
  roles = ['Read', 'Write', 'Administrator'];    

  constructor(props){
    super(props);

    // Initialize error messages
    this.errorUsername = '';
    this.errorPassword = '';

    // Component state
    this.state = {
      username: '',           // User input for username
      password: '',           // User input for password
      usernameTouched: false, // Tracks if username field was touched
      passwordTouched: false, // Tracks if password field was touched
      errorLogin: false       // Indicates invalid login attempts
    };  
    
    // Bind event handlers
    this.handleChange = this.handleChange.bind(this);  
    this.handleBlur = this.handleBlur.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);    
  } 

  /*
    Validation for username field
    -----------------------------
    - Required
    - Minimum 3 characters
    - No spaces allowed
  */
  getUserNameValidationState() {    
    const length = this.state.username.length;

    if(this.state.usernameTouched){
      if (length === 0){
        this.errorUsername = 'Username is required';        
        return 'error';
      } 
      else if (length < 3){
        this.errorUsername = 'Username should be minimum 3 characters';        
        return 'error';
      }  
      else if(this.state.username.indexOf(' ') >= 0){        
        this.errorUsername = 'Username cannot contain spaces';        
        return 'error';             
      }           
      else {
        this.errorUsername = '';                 
        return 'success'
      }       
    }    
  }

  /*
    Validation for password field
    -----------------------------
    - Minimum 3 characters
  */
  getPasswordValidationState() {    
    const length = this.state.password.length;

    if(this.state.passwordTouched){
      if(length < 3) return 'error'
        else return 'success';      
    }
  }

  /*
    Handle blur event
    -----------------
    Marks the field as touched when user leaves the input field
    to trigger validation messages
  */
  handleBlur(e){
    const target = e.target;    
    const name = target.name;        
    this.setState({
      [name+'Touched']: true
    });    
  }

  /*
    Handle change event
    -------------------
    Updates state as the user types
  */
  handleChange(e) {
    const target = e.target;   
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }  

  /*
    Handle form submission
    ----------------------
    - Prevents submission if validation fails
    - Simulates login check
    - Shows alert if login is successful
  */
  handleSubmit(event) { 
    this.errorLogin = false; 

    // Prevent submission if form is invalid
    if (!this.canBeSubmitted()) {      
      event.preventDefault();
      return;
    }
    else {     
      // Simulated login check
      if(!this.login(this.state.username,this.state.password)){  
        this.setState({
          errorLogin: true
        });         
        console.log("invalid login");             
        event.preventDefault();        
        return;
      }                

      // Successful submission
      this.setState({
        errorLogin: false
      });       
      alert('name: ' + this.state.username + '\npassword: ' + this.state.password);      
    }          
  }  

  /*
    Simulated login function
    ------------------------
    Accepts only:
      username: "jason"
      password: "123"
  */
  login(username, password){       
    if(username === "jason" && password === "123")
        return true; 
    else
        return false;
  }  
  
  /*
    Check if form can be submitted
    -------------------------------
    Ensures both fields are touched and valid
  */
  canBeSubmitted() {    
    return (
      this.state.usernameTouched && this.state.passwordTouched 
        && this.errorUsername.length === 0 && this.errorPassword.length === 0      
    );
  }  

  render() {    
    // Generate dropdown options for roles
    const listRoles = this.roles.map((role) => 
      <option value="select">{role}</option>
    );    
    const isEnabled = this.canBeSubmitted(); // Determines if submit button is enabled

    return (
      <form onSubmit={this.handleSubmit}>

        {/* Username field */}
        <FormGroup
          controlId="formBasicText"
          validationState={this.getUserNameValidationState()}
        >
          <ControlLabel>User Name</ControlLabel>
          <FormControl
            name="username"
            type="text"
            value={this.state.username}
            placeholder="Enter Username"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <FormControl.Feedback />
          { this.errorUsername.length > 0 && this.state.usernameTouched &&            
            <HelpBlock>{this.errorUsername}</HelpBlock>
          }                              
        </FormGroup>

        {/* Password field */}
        <FormGroup
          controlId="formBasicText"
          validationState={this.getPasswordValidationState()}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <FormControl.Feedback />
          <HelpBlock></HelpBlock>
        </FormGroup>

        {/* Role selection dropdown */}
        <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Role</ControlLabel>
            <FormControl componentClass="select" placeholder="select" name="role">                              
              <option value="select">select</option>
              {listRoles}
              <option value="other">...</option>
            </FormControl>
        </FormGroup>            

        {/* Submit button */}
        <Button type="submit" disabled={!isEnabled}>
          Submit
        </Button>    

        {/* Error message alert */}
        { this.state.errorLogin &&             
            <Alert bsStyle="danger">
              <strong>Error:</strong> Username or password is invalid.
            </Alert>            
        }                   

      </form>
    );
  }

}

export default UserForm;
