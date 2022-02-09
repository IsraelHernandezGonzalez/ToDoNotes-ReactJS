import React from "react";
import BaseDialog from "./BaseDialog";
import "./styles/NewNoteDialog.css"

class NewNoteDialog extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            noteId: '',
            note: ''
        }

        this.saveClickHandler = this.saveClickHandler.bind(this);   
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.noteIdChangeHandler = this.noteIdChangeHandler.bind(this);
        this.noteChangeHandler = this.noteChangeHandler.bind(this);     
    }

    saveClickHandler () {        

        // TODO : It's necessary to include some code to save noteId and note data.
        this.props.onDialogClosingEvent({wasSaved: true});
    }  

    cancelClickHandler () {                
        this.setState({        
            noteId: '',
            note: ''
        });

        this.props.onDialogClosingEvent({wasSaved: false});
    }

    noteIdChangeHandler (event) {
        this.setState({noteId: event.target.value});
    }

    noteChangeHandler (event) {
        this.setState({note: event.target.value});
    }

    render() {

        if (this.props.show === false) {
            return null;
        }

        const bodyPart = (
            <div className="new-note-dialog-body">                
                <div className="new-note-dialog-input">
                    <label htmlFor='NoteId'>NoteID:</label>
                    <input id='NoteId' type='text' onChange={this.noteIdChangeHandler}></input>
                </div>
                <div className="new-note-dialog-input">
                    <label htmlFor="note" >Note:</label>
                    <input id="note" type='text' onChange={this.noteChangeHandler}></input>
                </div>
                <div className='new-note-dialog-button-section'>
                    <button className='new-note-dialog-button' onClick={this.saveClickHandler}>
                        Save
                    </button>
                    <button className='new-note-dialog-button' onClick={this.cancelClickHandler}>
                        Cancel
                    </button>
                </div>
            </div>
        );

        return (
             <BaseDialog title='New Note' body={bodyPart} />            
        );    
    }

}

export default NewNoteDialog;