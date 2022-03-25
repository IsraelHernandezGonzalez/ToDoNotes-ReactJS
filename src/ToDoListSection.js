import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import NewNoteDialog from './dialogs/NewNoteDialog';
import Icon from '@mui/material/Icon';

import Global from './Global';
import { UserAuthenticationContext } from "./contexts/user/userAuthenticationProvider";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


const Observer = ({ value, didUpdate }) => {
    useEffect(() => {
        didUpdate(value);
    }, [value, didUpdate]);
    return null; // component does not render anything
};

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
            },
            page: 0,
            rowsPerPage: 5
        }

        this.addNoteClickHandler = this.addNoteClickHandler.bind(this);
        this.newNoteDialogClosingEventHandler = this.newNoteDialogClosingEventHandler.bind(this);
        this.changePageHandler = this.changePageHandler.bind(this);
        this.changeRowsPerPageHandler = this.changeRowsPerPageHandler.bind(this);

        this.updateList = this.updateList.bind(this);
    }    

    updateList () {

        const isAuthenticated = this.context[0].isAuthenticated;

        if (isAuthenticated === false) {
            return;
        }

        let self = this;
        let token = this.context[0].token;

        TodoService.getToDoByUser(token)
            .then(function(response) {
                self.setState({
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
            let token = this.context[0].token;

            TodoService.getToDoByUser(token)
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
        });

    }    

    closeConfirmDeleteDialogHandler (confirmDeleteItem, id) {

        if (confirmDeleteItem === false) {

            this.setState({
                showConfirmDeleteDialog: false,
                idToDelete: -1
            });
        
        } else {
            
            let self = this;
            let token = this.context[0].token;

            TodoService.deleteToDo(token, id)
                .then(function(response) {
            
                    TodoService.getToDoByUser(token)
                        .then(function(response) {
                            self.setState({
                                rows: response.data,
                                showConfirmDeleteDialog: false,
                                idToDelete: -1
                            });                            

                            // Correct the page if necessary.
                            if (Math.ceil(self.state.rows.length/self.state.rowsPerPage) - 1 < self.state.page) {
                                self.changePageHandler(null, self.state.page - 1);
                            }

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

    changePageHandler (event, newPage)  {
        this.setState({page: newPage})
    };

    changeRowsPerPageHandler (event) {        
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    render () {

        const showTable = this.context[0].isAuthenticated;

        const  emptyRows =
            this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.rows.length) : 0;

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
                    user={this.context[0].userName} 
                    data={this.state.newEditNoteData}
                    onDialogClosingEvent={this.newNoteDialogClosingEventHandler}
                />);
        }

        return (
            <Box sx={{ width: '90%', marginRight: '5%', marginLeft: '5%', paddingBottom: '10px', visibility: showTable?'visible':'hidden'}}>
                <Observer value={this.context[0].isAuthenticated} didUpdate={this.updateList} />
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
                        {(this.state.rowsPerPage > 0
                                ? this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.rows
                            ).map((row) => (
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
                         {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={this.state.rows.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                SelectProps={{
                                    inputProps: {
                                    'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={this.changePageHandler}
                                onRowsPerPageChange={this.changeRowsPerPageHandler}
                                ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                            </TableFooter>
                    </Table>
                </TableContainer>
                <Dialog
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

ToDoListSection.contextType = UserAuthenticationContext;

export default ToDoListSection;