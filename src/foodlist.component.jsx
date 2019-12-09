import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addItem } from './redux/cart/cart.actions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './food_inventory.css';


const fetchData = () => 
 new Promise( resolve => {
     const items = [];
    fetch("https://food-db-server.herokuapp.com/all", {
        method: "GET",
        mode: "cors",
      })
      .then(response => response.json())
      .then(function(data){
        for(var i = 0; i < data.response.length; i++)
        {
          items[i] = data.response[i];
        }
      })
      setTimeout(() => resolve(items), 1000);
    })

    const usePaperStyles = makeStyles(theme => ({
        root: { margin: theme.spacing(2) }
    }));
    
    
    const StatefulTables = ({ addItem }) => {
        const classes = usePaperStyles();
        const [items, setItems] = useState([]);
        useEffect(() => {
            fetchData().then(items => {
                setItems(items);
            });
        }, []);

        return(
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>image</TableCell>
                            <TableCell align="left">name</TableCell>
                            <TableCell align="left">price</TableCell>
                            <TableCell align="left">stock</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                      <img src={item.img_link}  className="the_img"/>
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.price}</TableCell>
                                    <TableCell align="left">
                                         {item.stock}
                                    </TableCell>
                                    <TableCell align="left">
                                        <button onClick={() => addItem(item)}>Add to cart</button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    const mapDispatchToProps = dispatch => ({
        addItem: item => dispatch(addItem(item))
    });

    export default connect(
        null,
        mapDispatchToProps
    )(StatefulTables);