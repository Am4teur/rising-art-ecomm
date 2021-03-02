import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

interface cartProps {
  cart: any;
  updateCartQuantity: (productId: string, quantity:number) => void;
  removeItemFromCart: (productId: string) => void;
  emptyCart: () => void;
}

const Cart = ({cart, updateCartQuantity, removeItemFromCart, emptyCart}:cartProps) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <>
    <Typography variant="subtitle1"> Your cart is empty! </Typography>
    <Button component={Link} to="/" type="button" variant="contained" color="primary">Go to Shop</Button>
    </>
  );

  const FilledCart = () => (
    <>
    <Grid container spacing={3}>
      {
        cart.line_items.map((item:any) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} updateCartQuantity={updateCartQuantity} removeItemFromCart={removeItemFromCart} />
          </Grid>
        ))
      }
    </Grid>
    <div className={classes.cardDetails}>
      <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
      <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary"
          onClick={emptyCart}>Empty Cart</Button>
        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
      </div>
    </div>
    </>
  );

  if(!cart.line_items) return (<div>Loading...</div>);

  return (
    <Container>
      <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
      <Typography className={classes.title} variant="h5" gutterBottom>You have {cart.total_items} items on the your cart</Typography>
      { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  )
}

export default Cart;
