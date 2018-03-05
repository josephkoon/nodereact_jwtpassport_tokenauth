import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions'





class Signup extends Component {

  //Submit form
	handleFormSubmit(formValues){
		this.props.signupUser(formValues)
	}


  //Render alert
  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className='alert alert-danger'>{this.props.errorMessage}</div>
      )
    }
  }


	render(){
    //From reduxForm
		const { handleSubmit, fields:{email,password,passwordConfirm}} = this.props

		return(
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      			<Field 
      				name="email" 
      				type="email" 
      				component={renderField} 
      				label="Email"/>
      			<br />
      			<Field 
      				name="password" 
      				type="password" 
      				component={renderField} 
      				label="Password"/>
      			<br/>
      			<Field 
      				name="passwordConfirm" 
      				type="password" 
      				component={renderField} 
      				label="Confirm Password"/>
      			<br />
        {this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign Up</button>
			</form>
		)
	}
}



//Generate form inputs
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset>
    <label>{label}</label>
    <div>
      <input className='form-control' {...input} placeholder={label} type={type}/>
    {touched && ((error && <span className='alert-danger'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </fieldset>
)


//Validate form inputs
const validate = values => {
  const errors = {}

  //Email validation
  if(!values.email){
    errors.email = 'Please enter an email'
  } else {

    if(! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email='Not a valid email'
    }
    
    if(values.email.length < 8 || values.email.length > 30){
      errors.email='Email must be between 8 and 30 characters'
    }
    
  }

  //Password validation
  if(!values.password){
    errors.password= 'Please enter a password'
  }  else {

    if(values.password.length < 4 || values.password.length > 16){
      errors.password='Password must be between 8 and 20 characters'
    }

  }

  //Confirm validation
  if(!values.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation'
  } else {
    if(values.password !== values.passwordConfirm){
      errors.password = 'Passwords must match'
    }
  }

  return errors
}


const warn = values => {
  const warnings = {}
  return warnings
}





function mapStateToProps(state){
	return { errorMessage:state.auth.error }
}

Signup = connect(mapStateToProps, actions)(Signup);

Signup = reduxForm({
	form:'signup', 
	fields:['email','password','passwordConfirm'],
	validate:validate,
	warn:warn
})(Signup)

export default Signup




