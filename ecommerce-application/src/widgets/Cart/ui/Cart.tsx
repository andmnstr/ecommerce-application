import type { LineItem, LocalizedString } from '@commercetools/platform-sdk';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import {
  Box,
  Divider,
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
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../shared';
import { CustomButton } from '../../../shared/UI/button/CustomButton';
import classes from './Cart.module.scss';

const isLocalizedString = (value: unknown): value is LocalizedString => {
  return true;
};

interface ICartItemsData {
  id: string;
  image: string;
  name: string;
  size: string;
  price: string;
  quantity: number;
}

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const cartItemsData = cartItems.reduce((acc: ICartItemsData[], item) => {
    if (
      item.variant.images &&
      item.variant.attributes &&
      isLocalizedString(item.variant.attributes[1].value) &&
      item.price.discounted
    ) {
      const itemData = {
        id: item.id,
        image: item.variant.images[0].url,
        name: item.name['ru-RU'],
        size: item.variant.attributes[1].value['ru-RU'],
        price: (item.price.discounted.value.centAmount / 100).toFixed(2),
        quantity: item.quantity,
      };
      acc.push(itemData);
    }
    return acc;
  }, []);

  const getCartItems = async (): Promise<LineItem[] | undefined> => {
    try {
      const response = await getApiRoot().me().activeCart().get().execute();

      return response.body.lineItems;
    } catch (error) {
      console.error(error);
      return undefined;
      // добавить сообщение об ошибке для юзера
    }
  };

  useEffect(() => {
    const fetchCartItems = async (): Promise<void> => {
      const lineItems = await getCartItems();
      if (lineItems) {
        setCartItems(lineItems);
      }
    };
    fetchCartItems();
  }, []);

  const smallScreen = useMediaQuery('(max-width: 767px)');

  return (
    <Box className={classes.CartContainer}>
      {!smallScreen && cartItems.length && (
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
                        <Remove />
                        <Typography>{item.quantity}</Typography>
                        <Add />
                      </Stack>
                    </TableCell>
                    <TableCell>${(item.quantity * +item.price).toFixed(2)}</TableCell>
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
      {smallScreen && cartItems.length && (
        <List className={classes.CartProductsList}>
          <Divider
            variant="fullWidth"
            component="li"
          />
          {cartItemsData.map(item => {
            return (
              <>
                <ListItem
                  className={classes.CartListItem}
                  key={item.id}
                >
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
                        <Remove />
                        <Typography>{item.quantity}</Typography>
                        <Add />
                      </Stack>
                      <Typography sx={{ fontWeight: 700 }}>${(item.quantity * +item.price).toFixed(2)}</Typography>
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
              </>
            );
          })}
        </List>
      )}
      <Box className={classes.TotalPriceBox}>
        <Stack className={classes.TotalPrice}>
          <Typography sx={{ fontWeight: 700 }}>Grand Total:</Typography>
          <Typography sx={{ fontWeight: 700 }}>${}</Typography>
        </Stack>
        <CustomButton
          variant="contained"
          size="large"
          type="button"
        >
          Checkout
        </CustomButton>
      </Box>
    </Box>
  );
};
