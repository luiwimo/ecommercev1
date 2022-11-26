import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddShoppingCart } from '@material-ui/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@mui/material/Collapse';
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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    // transition: theme.transition.create("transform",{
    //   duration: theme.transitions.duration.shortest,
    // }), 
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },

}));

const ExpandMore = makeStyles((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})//(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto',
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
//}));

export default function Product({product: {id, name, productType, image, price, rating, description} }) {
    const classes = useStyles(); 
    const [expanded, setExpanded] = React.useState(false);
    const [{basket}, dispatch] = useStateValue();

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const addToBasket = () => {
      dispatch({
        type: actionTypes.ADD_TO_BASKET,
        item: {
          id,
          name,
          productType,
          image,
          price,
          rating,
          description
        }
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
        //className={classes.media} 
        component="img"
        image= {image}
        title= {name}
        alt="shoes1"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productType}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to Cart" onClick={addToBasket}>
            <AddShoppingCart fontSize='large'/>
        </IconButton>
        <IconButton>
            {Array(rating)
                .fill()
                .map((_,i) => (
                    <p>&#11088;</p>
                ))}
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
