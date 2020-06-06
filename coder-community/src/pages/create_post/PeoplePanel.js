import React from 'react';
import { connect } from 'react-redux';
import { setPeople }  from '../../actions';

class PeoplePanel extends React.Component {

   constructor() {
	super();
	this.cur = '';
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

    render() {
	let alltags = [];
	
        return(
		<div class="cppeople">
                <form id="peopleform">
                <h4>Add people</h4>
	        <input id="newperson" onChange={this._onChange} placeholder="Type here"></input>
	        <br></br>
	        <button id="submit" onClick={this._onSubmit}>Submit</button>
                </form>
		<ul id="tags" onClick={this._onDel}>{alltags}</ul>
		</div>)
    }
}

const mapStateToProps = (state) => {
    return { people: state.people };
}

export default connect(mapStateToProps, { setPeople })(PeoplePanel);
