import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type React from 'react';
import { Fragment, useEffect, useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import { addItem } from '../api/addItem';
import { getCart } from '../api/getCart';
import { isLocalizedString } from '../lib/isLocalizedString';
import type { ICartItemsData } from '../types/UserCart.types';
import { EmptyCart } from './EmptyCart/EmptyCart';
import classes from './UserCart.module.scss';

export const UserCart: React.FC = () => {
  const [cart, setCart] = useState<Cart>();
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<string>();
  const [isChangedQuantity, setIsChangedQuantity] = useState<boolean>(false);

  const cartItemsData = cartItems.reduce((acc: ICartItemsData[], item) => {
    if (
      item.variant.images &&
      item.variant.sku &&
      item.variant.attributes &&
      isLocalizedString(item.variant.attributes[1].value) &&
      item.price.discounted
    ) {
      const itemData = {
        id: item.id,
        sku: item.variant.sku,
        image: item.variant.images[0].url,
        name: item.name['ru-RU'],
        size: item.variant.attributes[1].value['ru-RU'],
        price: (item.price.discounted.value.centAmount / 100).toFixed(2),
        quantity: item.quantity,
        totalItemPrice: (item.totalPrice.centAmount / 100).toFixed(2),
      };
      acc.push(itemData);
    }
    return acc;
  }, []);

  const handleAddItem = (sku: string): void => {
    if (cart) {
      addItem(cart.id, cart.version, sku);
      setIsChangedQuantity(true);
    }
  };

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      const activeCart = await getCart();
      if (activeCart) {
        setCart(activeCart);
        setCartItems(activeCart.lineItems);
        setTotalCartPrice((activeCart.totalPrice.centAmount / 100).toFixed(2));
      }
    };
    fetchCart();
    setIsChangedQuantity(false);
  }, [isChangedQuantity]);

  const smallScreen = useMediaQuery('(max-width: 767px)');

  return (
    <Box className={classes.CartContainer}>
      {!smallScreen && cartItems.length > 0 && (
        <TableContainer className={classes.CartProductsTable}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItemsData.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className={classes.ProductsCell}>
                      <Box
                        component="img"
                        src={item.image}
                        className={classes.CartItemImage}
                      />
                      <Stack sx={{ justifyContent: 'center' }}>
                        <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                        <Typography>Size: {item.size}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <Stack className={classes.ItemQuantity}>
                        <IconButton aria-label="Remove">
                          <Remove />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          aria-label="Add"
                          onClick={() => {
                            handleAddItem(item.sku);
                          }}
                        >
                          <Add />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>${item.totalItemPrice}</TableCell>
                    <TableCell size="small">
                      <DeleteForever />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {smallScreen && cartItems.length > 0 && (
        <List className={classes.CartProductsList}>
          <Divider
            variant="fullWidth"
            component="li"
          />
          {cartItemsData.map(item => {
            return (
              <Fragment key={item.id}>
                <ListItem className={classes.CartListItem}>
                  <Box
                    component="img"
                    src={item.image}
                    className={classes.CartItemImage}
                  />
                  <Stack className={classes.CartListItemDetails}>
                    <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                    <Typography>Size: {item.size}</Typography>
                    <Typography>Price: ${item.price}</Typography>
                    <Stack className={classes.ItemQuantityAndPrice}>
                      <Stack className={classes.ItemQuantity}>
                        <IconButton aria-label="Remove">
                          <Remove />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          aria-label="Add"
                          onClick={() => {
                            handleAddItem(item.sku);
                          }}
                        >
                          <Add />
                        </IconButton>
                      </Stack>
                      <Typography sx={{ fontWeight: 700 }}>${item.totalItemPrice}</Typography>
                    </Stack>
                  </Stack>
                  <Box className={classes.DeleteButton}>
                    <DeleteForever />
                  </Box>
                </ListItem>
                <Divider
                  variant="fullWidth"
                  component="li"
                />
              </Fragment>
            );
          })}
        </List>
      )}
      {cartItems.length > 0 && (
        <Box className={classes.TotalPriceBox}>
          <Stack className={classes.TotalPrice}>
            <Typography sx={{ fontWeight: 700 }}>Grand Total:</Typography>
            <Typography sx={{ fontWeight: 700 }}>${totalCartPrice}</Typography>
          </Stack>
          <CustomButton
            variant="contained"
            size="large"
            type="button"
          >
            Checkout
          </CustomButton>
        </Box>
      )}
      {!cartItems.length && <EmptyCart />}
    </Box>
  );
};
