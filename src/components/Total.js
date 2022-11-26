import React from 'react';
import { accounting } from 'accounting';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh"
    },
    button: {
        marginTop: "2rem" 
    }
}))

const Total = () => {
    const classes = useStyles()
    const [{basket}, dispatch] = useStateValue();
    
    const getBasketTotal = (basket) => {
        return basket?.reduce((amount, item) => item.price + amount, 0);
    }
    
    return (
        <div className={classes.root}>
            <h5>Total items: {basket?.length}</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket))}</h5>
            <Link to="/checkout">
                <Button className={classes.button} variant="contained" color="secondary">Check Out</Button>
            </Link>
        </div>
    )
}

export default Total