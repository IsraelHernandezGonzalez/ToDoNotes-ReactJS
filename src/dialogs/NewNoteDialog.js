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
import TodoService from '../services/TodoService';

import { PRIORITIES } from '../Global';

class NewNoteDialog extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            priority: this.props.data.priority,
            group: this.props.data.group,
            note: this.props.data.note
        }

        this.saveClickHandler = this.saveClickHandler.bind(this);   
        this.cancelClickHandler = this.cancelClickHandler.bind(this);

        this.priorityChangeHandler = this.priorityChangeHandler.bind(this);
        this.groupChangeHandler = this.groupChangeHandler.bind(this);     
        this.noteChangeHandler = this.noteChangeHandler.bind(this);     
    }

    saveClickHandler () {        

        let self = this;

        if (this.props.data.id === -1) {

            TodoService.addToDo(self.props.user, {
                    priority: self.state.priority,
                    group: self.state.group,
                    note: self.state.note
                })
                .then(function(response)  {
                    self.props.onDialogClosingEvent({wasSaved: response.data});
                })
                .catch(function(error) {                
                    console.log(error.message);
                });    

        } else {

            TodoService.updateToDo(self.props.user, {
                id: self.props.data.id,
                priority: self.state.priority,
                group: self.state.group,
                note: self.state.note
            })
            .then(function(response)  {
                self.props.onDialogClosingEvent({wasSaved: response.data});
            })
            .catch(function(error) {                
                console.log(error.message);
            });    

        }
        
    }  

    cancelClickHandler () {           
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


        let title;

        if (this.props.data.id === -1) {
            title = 'New ToDo Note';
        } else {
            title = 'Edit ToDo Note';
        }


        return (
            <Dialog open={true} onClose={this.cancelClickHandler}>
              <DialogTitle>{title}</DialogTitle>
              <DialogContent>        
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    label="Priority"
                    value={this.state.priority}
                    onChange={this.priorityChangeHandler}
                >
                    <MenuItem value={PRIORITIES.LowId}>{PRIORITIES.Low}</MenuItem>
                    <MenuItem value={PRIORITIES.MiddleId}>{PRIORITIES.Middle}</MenuItem>
                    <MenuItem value={PRIORITIES.HighId}>{PRIORITIES.High}</MenuItem>
                </Select>              
                <TextField
                    margin="dense"
                    id="group"
                    label="Group"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 50}}
                    value={this.state.group}
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
                    value={this.state.note}
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