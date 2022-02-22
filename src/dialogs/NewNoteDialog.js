import React from "react";
import "./styles/NewNoteDialog.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TodoService from "../services/TodoService";

class NewNoteDialog extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            openDialog: this.props.show,
            priority: 1,
            group: '',
            note: ''
        }

        this.saveClickHandler = this.saveClickHandler.bind(this);   
        this.cancelClickHandler = this.cancelClickHandler.bind(this);

        this.priorityChangeHandler = this.priorityChangeHandler.bind(this);
        this.groupChangeHandler = this.groupChangeHandler.bind(this);     
        this.noteChangeHandler = this.noteChangeHandler.bind(this);     
    }

    saveClickHandler () {        

        let seft = this;

        TodoService.addToDo(this.props.user, {
                priority: this.state.priority,
                group: this.state.group,
                note: this.state.note
            })
            .then(function(response)  {
                seft.props.onDialogClosingEvent({wasSaved: response.data});
            })
            .catch(function(error) {
                console.log(error.message);
            });    
        
    }  

    cancelClickHandler () {                
        this.setState({        
            openDialog: false
        });

        this.props.onDialogClosingEvent({wasSaved: false});
    }

    priorityChangeHandler (event) {
        this.setState({ priority: event.target.value });
    }

    groupChangeHandler (event) {
        this.setState({ group: event.target.value });
    }

    noteChangeHandler (event) {
        this.setState({ note: event.target.value });
    }

    render() {

        return (
            <Dialog open={this.props.show} onClose={this.cancelClickHandler}>
              <DialogTitle>New ToDo Note</DialogTitle>
              <DialogContent>        
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    label="Priority"
                    value={this.state.priority}
                    onChange={this.priorityChangeHandler}
                >
                    <MenuItem value={1}>Low</MenuItem>
                    <MenuItem value={2}>Middle</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                </Select>              
                <TextField
                    margin="dense"
                    id="group"
                    label="Group"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 50}}
                    onChange={this.groupChangeHandler}
                />    
                <TextField
                    multiline
                    margin="dense"
                    id="note"
                    label="Note"
                    type="text"
                    fullWidth   
                    maxRows={4}
                    variant="standard"
                    onChange={this.noteChangeHandler}
                />                   
              </DialogContent>
              <DialogActions>
                <Button onClick={this.saveClickHandler}>Save</Button>
                <Button onClick={this.cancelClickHandler}>Cancel</Button>
              </DialogActions>
            </Dialog>          
        );   
    }

}

export default NewNoteDialog;