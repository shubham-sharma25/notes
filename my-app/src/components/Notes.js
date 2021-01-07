import React, { Component } from 'react';
import Navbar from './Navbar';
import { v1 as uuid } from 'uuid';
import { connect } from 'react-redux';
class Notes extends Component {
    constructor(props) {
        super(props);
        this.state={
            login: false,
            showForm:false,
            title:"",
            body:"",
            user:"",
            pass:""
        }
    }
    
    logIn = (e) => {
        if(this.state.user==="test" && this.state.pass==="test"){
            this.setState({ login: true });
        } else {
            alert("Wrong credentials!!")
        }
    }
    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    }
    handleTitle = (e) => {
        this.setState({ title: e.target.value })
    }
    handleBody = (e) => {
        this.setState({ body: e.target.value })
    }
    deleteNotes = (e) => {
        let selectedId = e.target.value;
        this.props.dispatch({type:"DELETE_NOTE", selectedId:selectedId})
    }
    saveNotes = (e) => {
        e.preventDefault();
        let newNote={
                id:uuid(),
                title:this.state.title,
                body:this.state.body
            }
        this.setState({title: "",body: ""})
        this.props.dispatch({type:"SAVE_NOTE",newNote:newNote})
    }
    render() {
        return (
            <div>
                <Navbar />
                {!this.state.login ? <form onSubmit={this.logIn}>
                    <div className="form-group">
                        <label >Name:</label>
                        <input type="text" className="form-control login-form" id="email" placeholder="Enter Username" onChange={(e)=>this.setState({user:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label >Password:</label>
                        <input type="password" className="form-control login-form" id="pwd" placeholder="Enter password" onChange={(e)=>this.setState({pass:e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                    :
                    <div className="row notes">
                        <div className="col-xs-4 notes-list">
                            {this.props.notes.notes.map(note => {
                                return (
                                    <div key={uuid()} className="country-list">
                                        <h5>{note.title}</h5><button className="close" value={note.id} onClick={this.deleteNotes}>&times;</button>
                                        {note.body}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-xs-8 notes-form">
                            <div className="text-right">
                            <button type="submit" className="btn btn-default" onClick={this.toggleForm}>+Add Note</button>
                            </div>
                            {this.state.showForm && <form onSubmit={this.saveNotes}>
                                <div className="form-group">
                                    <label >Title:</label>
                                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitle} />
                                </div>
                                <div className="form-group">
                                    <label >Body:</label>
                                    <textarea className="form-control" value={this.state.body} onChange={this.handleBody} rows="10"></textarea>
                                </div>
                                <div className="text-right">
                                <button type="submit" className="btn btn-primary" disabled={this.state.title==="" || this.props.notes.body===""}>Save</button>
                                </div>
                            </form>}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    notes: state
})
export default connect(mapStateToProps)(Notes);
