import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import accounting from 'accounting';
import { actionTypes } from '../Reducer';
import { useStateValue } from '../StateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  action: {
    marginTop: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", //16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  cardRating: {
      display: "flex",
  },
}));

export default function CheckoutCard({product: {id, name, productType, image, price, rating, description} }) {
    const classes = useStyles(); 
    const [{basket}, dispatch] = useStateValue();
    
    const removeToBasket = () => {
      dispatch({
        type: actionTypes.REMOVE_TO_BASKET,
        id: id
      });
    }
  return (
    <Card sx={{ maxWidth: classes.maxWidth }}>
      <CardHeader
        action={
            <Typography
              className={classes.action} 
              variant="h5" 
              color="textSecondary"
             >
              {accounting.formatMoney(price)}
          </Typography>
        }
        title= {name}
        subheader="In Stock"
      />
      <CardMedia
        // className={classes.media} 
        component="img"
        image= {image}
        title= {name}
        alt="shoRes1"
      />
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cardRating}>
            {Array(rating)
                .fill()
                .map((_,i) => (
                    <p>&#11088;</p>
                ))}
        </div>
        <IconButton>
            <DeleteIcon fontSize="large" onClick={removeToBasket}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
