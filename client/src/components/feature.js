import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../actions'


class Feature extends Component {
	constructor(){
		super()
		this.state = {
			token:''
		}
	}


	componentWillMount(){
		this.props.fetchMessage()

		this.setState({
			token:localStorage.getItem('token')
		})
	}

	render(){
		return (
			<div>
				<h2>Your Token is...</h2>
				<h6>{this.state.token}</h6>
				<br />
				<h2>Your Message is...</h2>
				<h6>{this.props.message}</h6>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {message:state.auth.message}
}

export default connect(mapStateToProps,actions)(Feature)