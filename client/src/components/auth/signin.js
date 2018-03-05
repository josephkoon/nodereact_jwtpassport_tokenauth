import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions'



class Signin extends Component {

	//Subit form
	handleFormSubmit({email,password}){
		this.props.signinUser({email,password})
	}

	//Render error alert
	renderAlert(){
		console.log(this.props.errorMessage)
		if(this.props.errorMessage){
			return (
				<div className='alert alert-danger'>{this.props.errorMessage}</div>
			)
		}
	}


	render(){

		const { handleSubmit, fields:{email,password}} = this.props

		return (
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
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign In</button>
			</form>
		)
	}
}



//Render form fields
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset>
    <label>{label}</label>
    <div>
      <input className='form-control' {...input} placeholder={label} type={type}/>
	  {touched && ((error && <span className='alert-danger'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </fieldset>
)




function mapStateToProps(state){
	return { errorMessage:state.auth.error }
}

Signin = connect(mapStateToProps, actions)(Signin);

Signin = reduxForm({
	form:'signin', 
	fields:['email','password']
})(Signin)

export default Signin





