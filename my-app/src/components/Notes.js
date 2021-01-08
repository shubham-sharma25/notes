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
            pass:"",
            newTitle:"",
            newBody:""
        }
        this.updateTitleRef=React.createRef();
        this.updateBodyRef=React.createRef();
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
    updateNotes =(e)=>{
        let selectedId = e.target.value;
        this.props.dispatch({type:"UPDATE_NOTE", selectedId:selectedId})
    }
    saveUpdateNotes=(e)=>{
        if(document.getElementById("update-title").value!=="" && document.getElementById("update-body").value!==""){
            let newNote={
            id:e.target.value,
            title:document.getElementById("update-title").value,
            body:document.getElementById("update-body").value
        }
    this.setState({newTitle: "",newBody: ""})
    this.props.dispatch({type:"SAVE_UPDATE_NOTE",newNote:newNote})
} else {
    alert("Fille title as well as body")
}
    }
    render() {
        console.log(this.props)
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
                                        {note.editable?
                                        <div>
                                        <input type="text" className="form-control update-form" id="update-title" ref={this.updateTitleRef} onChange={()=>this.updateTitleRef.current.focus()}/>
                                        <button className="close" value={note.id} onClick={this.deleteNotes}>&times;</button>
                                        <button className="close edit" value={note.id} onClick={this.saveUpdateNotes}>Update</button>
                                        <input type="text" className="form-control update-form" id="update-body" ref={this.updateBodyRef} onChange={()=>this.updateBodyRef.current.focus()}/>
                                        </div>
                                        :
                                        <div>
                                        <h5>{note.title}</h5><button className="close" value={note.id} onClick={this.deleteNotes}>&times;</button>
                                        <button className="close edit" value={note.id} onClick={this.updateNotes}>edit</button>
                                        {note.body}
                                        </div>
                                        }
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
