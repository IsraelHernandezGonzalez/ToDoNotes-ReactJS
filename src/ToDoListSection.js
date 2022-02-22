import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TodoService from "./services/TodoService";

class ToDoListSection extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            rows: []
        }
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


        return (
            <TableContainer component={Paper} sx={{ width: '90%', marginLeft: '5%'}}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Priority</StyledTableCell>
                        <StyledTableCell align="center">Group</StyledTableCell>
                        <StyledTableCell align="center">ToDo Note</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.rows.map((row) => (
                        <StyledTableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row" align="center">
                                {row.priority}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.group}</StyledTableCell>                            
                            <StyledTableCell align="center">{row.todoNote}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

}

export default ToDoListSection;