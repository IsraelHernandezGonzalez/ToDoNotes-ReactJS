import React from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TodoService from "./services/TodoService";
import { Button } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';

import NewNoteDialog from './dialogs/NewNoteDialog';
import Icon from '@mui/material/Icon';

import Global from './Global';

class ToDoListSection extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            rows: [],
            showConfirmDeleteDialog: false,
            idToDelete: -1,
            showNewNoteDialog: false,
            newEditNoteData: {                
                id: -1,
                priority: 1,
                group: '',
                note: ''
            }
        }

        this.addNoteClickHandler = this.addNoteClickHandler.bind(this);
        this.newNoteDialogClosingEventHandler = this.newNoteDialogClosingEventHandler.bind(this);
    }

    componentDidMount () {

        let seft = this;

        TodoService.getToDoByUser(this.props.user)
            .then(function(response) {
                seft.setState({
                    rows: response.data
                });
            })
            .catch(function(error) {
                console.log(error.message);
            });

    }

    
    addNoteClickHandler () {
        this.setState({
            showNewNoteDialog: true,
            newEditNoteData: {                
                id: -1,
                priority: 1,
                group: '',
                note: ''
            }
        });
    }

    newNoteDialogClosingEventHandler (result) {      

        if (result.wasSaved === true) {

            let self = this;

            TodoService.getToDoByUser(self.props.user)
                .then(function(response) {
                    self.setState({
                        rows: response.data           
                    });
                })
                .catch(function(error) {
                    console.log(error.message);
                })
                .then(function() {
                    self.setState({showNewNoteDialog: false});
                });
        } else {
            this.setState({showNewNoteDialog: false});
        }
    }

    updateClickHandler (data) {
        this.setState({
            showNewNoteDialog: true,
            newEditNoteData: {                
                id: data.id,
                priority: data.priority,
                group: data.group,
                note: data.note
            }
        });
    }

    deleteClickHandler (data) {

        this.setState({
            showConfirmDeleteDialog: true,
            idToDelete: data.id
        })

    }    

    closeConfirmDeleteDialogHandler (confirmDeleteItem, id) {

        if (confirmDeleteItem === false) {

            this.setState({
                showConfirmDeleteDialog: false,
                idToDelete: -1
            });
        
        } else {
            
            let self = this;

            TodoService.deleteToDo(this.props.user, id)
                .then(function(response) {
            
                    TodoService.getToDoByUser(self.props.user)
                        .then(function(response) {
                            self.setState({
                                rows: response.data,
                                showConfirmDeleteDialog: false,
                                idToDelete: -1
                            });
                        })
                        .catch(function(error) {
                            console.log(error.message);
                        });

                })
                .catch(function(error) {
                    console.log(error.message);
                });

        }        

    }


    render () {

        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
              fontSize: 14,
            },
          }));
          
        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
              backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
              border: 0,
            },
          }));

        let newNoteDialog = null;
        
        if (this.state.showNewNoteDialog === true) {
            newNoteDialog = (
                <NewNoteDialog 
                    user={this.props.user} 
                    data={this.state.newEditNoteData}
                    onDialogClosingEvent={this.newNoteDialogClosingEventHandler}
                />);
        }

        return (
            <Box sx={{ width: '90%', marginRight: '5%', marginLeft: '5%', paddingBottom: '10px'}}>
                <Button onClick={this.addNoteClickHandler}>
                    <Icon>add_circle</Icon>Add note
                </Button>                
                {newNoteDialog}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Priority</StyledTableCell>
                            <StyledTableCell align="center">Group</StyledTableCell>
                            <StyledTableCell align="center">ToDo Note</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.rows.map((row) => (
                            <StyledTableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" align="center">
                                    {Global.priorityDescriptionResolver(row.priority)}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.group}</StyledTableCell>                            
                                <StyledTableCell align="center">{row.note}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button onClick={this.updateClickHandler.bind(this, row)} size="small">Update</Button>
                                    <Button onClick={this.deleteClickHandler.bind(this, row)} size="small">Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    // fullScreen={fullScreen}
                    open={this.state.showConfirmDeleteDialog}
                    onClose={this.closeConfirmDeleteDialogHandler.bind(this, false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                    {"Confirm delete item?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Do you want to delete the item?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeConfirmDeleteDialogHandler.bind(this, false)} autoFocus>
                        No
                    </Button>
                    <Button onClick={this.closeConfirmDeleteDialogHandler.bind(this, true, this.state.idToDelete)} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

}

export default ToDoListSection;