import type { Cart, DiscountCodeInfo, LineItem } from '@commercetools/platform-sdk';
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
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import { addItem } from '../api/addItem';
import { applyPromoCode } from '../api/applyPromoCode';
import { getCart } from '../api/getCart';
import { removeItem } from '../api/removeItem';
import { promoCodes } from '../consts/promocodes';
import { createCartItemsData } from '../lib/createCartItemsData';
import { PromoCodeMessages } from '../types/UserCart.types';
import { ClearCartButton } from './ClearCartButton/ClearCartButton';
import { EmptyCart } from './EmptyCart/EmptyCart';
import classes from './UserCart.module.scss';

export const UserCart: React.FC = () => {
  const [cart, setCart] = useState<Cart>();
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<string>();
  const [cartDiscountCodes, setCartDiscountCodes] = useState<DiscountCodeInfo[]>([]);
  const [isChangedQuantity, setIsChangedQuantity] = useState<boolean>(false);
  const [isClearedCart, setIsClearedCart] = useState(false);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');
  const [promoCodeMessage, setPromoCodeMessage] = useState(' ');
  const [promoCodeMessageClass, setPromoCodeMessageClass] = useState(classes.PromoCodeMessageGreen);
  const [isPromoCodeUsed, setIsPromoCodeUsed] = useState(false);

  const cartItemsData = createCartItemsData(cartItems);

  const handleAddItem = (sku: string): void => {
    if (cart) {
      addItem(cart.id, cart.version, sku);
      setIsChangedQuantity(true);
    }
  };

  const handleRemoveItem = (id: string, quantity?: number): void => {
    if (cart) {
      removeItem(cart.id, cart.version, id, quantity);
      setIsChangedQuantity(true);
    }
  };

  const handleClearCart = (): void => {
    setIsClearedCart(true);
    setCart(undefined);
    setCartItems([]);
    setTotalCartPrice(undefined);
  };

  const handleApplyPromoCode = (): void => {
    if (cart) {
      if (promoCodeInputValue === promoCodes[0].code || promoCodeInputValue === promoCodes[1].code) {
        let isUsed = false;

        if (cartDiscountCodes.length > 0) {
          const code = promoCodes.find(item => {
            return item.code === promoCodeInputValue;
          });

          if (
            code &&
            cartDiscountCodes.find(item => {
              return item.discountCode.id === code.id && item.state === 'MatchesCart';
            })
          ) {
            setPromoCodeMessage(PromoCodeMessages.Used);
            setPromoCodeMessageClass(classes.PromoCodeMessageRed);
            isUsed = true;
          }
        }

        if (
          !isUsed &&
          promoCodeInputValue === promoCodes[1].code &&
          cart.totalLineItemQuantity &&
          cart.totalLineItemQuantity < promoCodes[1].minItemsInCart
        ) {
          setPromoCodeMessage(PromoCodeMessages.NoMatch);
          setPromoCodeMessageClass(classes.PromoCodeMessageRed);
          isUsed = true;
        }

        if (!isUsed) {
          applyPromoCode(cart.id, cart.version, promoCodeInputValue);
          setIsPromoCodeUsed(true);
          setPromoCodeMessage(PromoCodeMessages.Success);
          setPromoCodeMessageClass(classes.PromoCodeMessageGreen);
        }
      } else {
        setPromoCodeMessage(PromoCodeMessages.WrongCode);
        setPromoCodeMessageClass(classes.PromoCodeMessageRed);
      }
    }
  };

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      const activeCart = await getCart();
      if (activeCart) {
        setCart(activeCart);
        setCartItems(activeCart.lineItems);
        setTotalCartPrice((activeCart.totalPrice.centAmount / 100).toFixed(2));
        if (activeCart.discountCodes.length > 0) {
          setCartDiscountCodes(activeCart.discountCodes);
        }
      }
    };
    fetchCart();
    setIsChangedQuantity(false);
    setIsClearedCart(false);
    setIsPromoCodeUsed(false);
  }, [isChangedQuantity, isClearedCart, isPromoCodeUsed]);

  const smallScreen = useMediaQuery('(max-width: 767px)');

  return (
    <Box className={classes.CartContainer}>
      {!smallScreen && cartItems.length > 0 && cart && (
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
                        <IconButton
                          aria-label="Remove"
                          onClick={() => {
                            handleRemoveItem(item.id, 1);
                          }}
                        >
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
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          handleRemoveItem(item.id);
                        }}
                      >
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {smallScreen && cartItems.length > 0 && cart && (
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
                        <IconButton
                          aria-label="Remove"
                          onClick={() => {
                            handleRemoveItem(item.id, 1);
                          }}
                        >
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
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
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
      {cart && cartItems.length > 0 && (
        <Box className={classes.TotalPriceBox}>
          <Stack className={classes.PromoCodeArea}>
            <Typography>Enter Promo Code</Typography>
            <Stack className={classes.PromoCode}>
              <CustomInputText
                fullWidth
                value={promoCodeInputValue}
                onChange={event => {
                  setPromoCodeInputValue(event.target.value);
                }}
              />
              <CustomButton
                variant="contained"
                size="large"
                type="button"
                onClick={handleApplyPromoCode}
              >
                Apply
              </CustomButton>
            </Stack>
            <Typography className={promoCodeMessageClass}>{promoCodeMessage}</Typography>
          </Stack>
          <Divider variant="fullWidth" />
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
          <ClearCartButton
            cartId={cart.id}
            cartVersion={cart.version}
            handleClearCart={handleClearCart}
          />
        </Box>
      )}
      {!cartItems.length && <EmptyCart />}
    </Box>
  );
};
