import axios from 'axios'
import { browserHistory } from 'react-router'

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types'

const ROOT_URL = 'http://localhost:3000';



export function signupUser({email,password}){
	//dispatch any actions with redux thunk
	return function(dispatch){

		//submit email and password to server
		axios.post(ROOT_URL+'/signup', {email:email,password:password})
			.then(response => {
				//update state to indicate user is authenticated
				dispatch({type:AUTH_USER})

				//save to JWT token
				localStorage.setItem('token',response.data.token)
				
				//redirect to the route '/feature'
				browserHistory.push('/feature')
			})
			.catch((response) => dispatch(authError(response.response.data.error)))
	}
}


export function signinUser({email,password}){
	//dispatch any actions with redux thunk
	return function(dispatch){

		//submit email and password to server
		axios.post(ROOT_URL+'/signin', {email:email,password:password})
			.then(response => {
				//update state to indicate user is authenticated
				dispatch({type:AUTH_USER})

				//save to JWT token
				localStorage.setItem('token',response.data.token)
				
				//redirect to the route '/feature'
				browserHistory.push('/feature')
			})
			.catch((response) => dispatch(authError('Invalid Account Information')))
	}
}


//Send authentication error
export function authError(error){
	return { type:AUTH_ERROR,payload:error }
}


//Sign out
export function signoutUser(){
	localStorage.removeItem('token')
	return { type: UNAUTH_USER }
}


//Get message from authenticated routed
export function fetchMessage(){
	return function(dispatch){
		axios.get(ROOT_URL, {headers:{authorization:localStorage.getItem('token')}})
			.then(response => dispatch({type:FETCH_MESSAGE, payload:response.data.message}))
	}
}








