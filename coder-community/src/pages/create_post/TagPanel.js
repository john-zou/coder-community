import React from 'react';
import { connect } from 'react-redux';
import { setTag } from '../../actions';

class TagPanel extends React.Component {

    constructor() {
	super();
	this.cur = '';
	this.tag = [];
    }
    
    _onChange = (event) => {
	this.cur = event.target.value;
        // this.props.load(event.target.value);
    }

    _onSubmit = (event) => {
        event.preventDefault();
        // this.props.store('MESS_ADD', this.props.input);
	this.props.setTag(this.cur);
    }

    _onDel = (event) => {
	event.preventDefault();
	
    }

    render() {
	let alltags = [];
	
        return(
		<div class="cptag">
                <form id="tagform">
                <h4>Add tags</h4>
	        <input id="newtag" onChange={this._onChange} placeholder="Type here"></input>
	        <br></br>
	        <button id="submit" onClick={this._onSubmit}>Submit</button>
                </form>
		<ul id="tags" onClick={this._onDel}>{alltags}</ul>
		</div>)
    }
}

const mapStateToProps = (state) => {
    return { tags: state.tags };
}

export default connect(mapStateToProps, { setTag })(TagPanel);
