import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../actions'



class Signout extends Component {
	componentWillMount(){
		this.props.signoutUser()
	}

	render(){
		return <div>Sorry to see you go...</div>
	}
}



//connect the actions to props
Signout = connect(null, actions)(Signout);

export default Signout