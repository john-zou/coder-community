import React from 'react';
import { connect } from 'react-redux';
import { setImg } from '../../actions';

class ImgPanel extends React.Component {

    constructor() {
	super();
	this.url = '';
    }
    
    _onImgUpload = (event) => {
	/*
	event.preventDefault();
	alert(this.url);
	this.props.setImg(this.url);
	*/
    }

    _onChange = (event) => {
	/*
	this.url = event.target.value;
	*/
    }

    _omImgRm = (event) => {
	/*
	event.preventDefault();
	this.url = '';
	this.props.setImg('');
	*/
    }
    
    render() {
	// if (this.props.imgurl === '')
	    return (<div id="cpimg">
		    <form onSubmit={this._onImgUpload}>
		    <input type="text" placeholder="img url" onChange={this._onChange}></input>
		    <button onClick={this._onImgUpload}>Upload</button>
		    </form>
		    </div>);
	/*
        return (<div id="cpimg">
		<h2>Your image is here:</h2>
		<img src={this.url}/>
		<button onClick={this._onImgRm}>Delete</button>
                </div>
               )
	*/
    }
}

const mapStateToProps = (state) => {
    return { imgurl: state.imgurl };
}

export default connect(mapStateToProps, { setImg })(ImgPanel);
