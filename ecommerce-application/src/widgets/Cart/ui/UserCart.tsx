import type { Cart, DiscountCodeInfo, LineItem } from '@commercetools/platform-sdk';
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
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type React from 'react';
import { Fragment, useEffect, useState } from 'react';

import { CustomButton } from '../../../shared/UI/button/CustomButton';
import CustomInputText from '../../../shared/UI/CustomInputText/CustomInputText';
import { applyPromoCode } from '../api/applyPromoCode';
import { getCart } from '../api/getCart';
import { centsPerEuro } from '../consts/centsPerEuro';
import { promoCodes } from '../consts/promocodes';
import { createCartItemsData } from '../lib/createCartItemsData';
import { PromoCodeMessages } from '../types/UserCart.types';
import { CartTableHead } from './CartTableHead/CartTableHead';
import { CheckoutButton } from './CheckoutButton/CheckoutButton';
import { ClearCartButton } from './ClearCartButton/ClearCartButton';
import { EmptyCart } from './EmptyCart/EmptyCart';
import { ItemImageBox } from './ItemImageBox/ItemImageBox';
import { ItemQuantityChange } from './ItemQuantityChange/ItemQuantityChange';
import { RemoveItemButton } from './RemoveItemButton/RemoveItemButton';
import classes from './UserCart.module.scss';

export const UserCart: React.FC = () => {
  const [cart, setCart] = useState<Cart>();
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<string>();
  const [totalCartPriceClass, setTotalCartPriceClass] = useState(classes.RealTotalPrice);
  const [cartDiscountCodes, setCartDiscountCodes] = useState<DiscountCodeInfo[]>([]);
  const [isCartChanged, setIsCartChanged] = useState(false);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');
  const [promoCodeMessage, setPromoCodeMessage] = useState('');
  const [promoCodeMessageClass, setPromoCodeMessageClass] = useState(classes.PromoCodeMessageGreen);
  const [discountedCartPrice, setDiscountedCartPrice] = useState<string>();

  const cartItemsData = createCartItemsData(cartItems);

  const promoCodesApplied = cartDiscountCodes.filter(item => {
    return item.state === 'MatchesCart';
  }).length;

  const setCartChange = (): void => {
    setIsCartChanged(true);
  };

  const handleClearCart = (): void => {
    setIsCartChanged(true);
    setCart(undefined);
    setCartItems([]);
    setTotalCartPrice(undefined);
  };

  const handleApplyPromoCode = (): void => {
    setPromoCodeMessage('');
    const [oneItemPromoCode, fiveItemsPromoCode] = promoCodes;
    if (cart && promoCodeInputValue) {
      if (promoCodeInputValue === oneItemPromoCode.code || promoCodeInputValue === fiveItemsPromoCode.code) {
        let isUsed = false;

        if (cartDiscountCodes.length > 0) {
          const usedCode = promoCodes.find(item => {
            return item.code === promoCodeInputValue;
          });

          if (
            usedCode &&
            cartDiscountCodes.find(item => {
              return item.discountCode.id === usedCode.id && item.state === 'MatchesCart';
            })
          ) {
            setPromoCodeMessage(PromoCodeMessages.Used);
            setPromoCodeMessageClass(classes.PromoCodeMessageRed);
            isUsed = true;
          }
        }

        if (
          !isUsed &&
          promoCodeInputValue === fiveItemsPromoCode.code &&
          cart.totalLineItemQuantity &&
          cart.totalLineItemQuantity < fiveItemsPromoCode.minItemsInCart
        ) {
          setPromoCodeMessage(PromoCodeMessages.NoMatch);
          setPromoCodeMessageClass(classes.PromoCodeMessageRed);
          isUsed = true;
        }

        if (!isUsed) {
          applyPromoCode(cart.id, cart.version, promoCodeInputValue);
          setIsCartChanged(true);
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
        const totalPrice = activeCart.totalPrice.centAmount;
        setCart(activeCart);
        setCartItems(activeCart.lineItems);
        setCartDiscountCodes(activeCart.discountCodes);
        if (activeCart.discountOnTotalPrice) {
          const discountedAmount = activeCart.discountOnTotalPrice.discountedAmount.centAmount;
          const oldTotalPrice = ((totalPrice + discountedAmount) / centsPerEuro).toFixed(2);
          setTotalCartPrice(oldTotalPrice);
          setTotalCartPriceClass(classes.oldTotalPrice);
          setDiscountedCartPrice((totalPrice / centsPerEuro).toFixed(2));
        } else {
          setTotalCartPrice((totalPrice / centsPerEuro).toFixed(2));
          setTotalCartPriceClass(classes.RealTotalPrice);
          setDiscountedCartPrice(undefined);
        }
      }
    };
    fetchCart();
    setIsCartChanged(false);
  }, [isCartChanged]);

  const smallScreen = useMediaQuery('(max-width: 767px)');

  return (
    <Box className={classes.CartContainer}>
      {!smallScreen && cartItems.length > 0 && cart && (
        <TableContainer className={classes.CartProductsTable}>
          <Table>
            <CartTableHead />
            <TableBody>
              {cartItemsData.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className={classes.ProductsCell}>
                      <ItemImageBox imagePath={item.image} />
                      <Stack sx={{ justifyContent: 'center' }}>
                        <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                        <Typography>Size: {item.size}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>€{item.price}</TableCell>
                    <TableCell>
                      <ItemQuantityChange
                        cartId={cart.id}
                        cartVersion={cart.version}
                        item={item}
                        setCartChange={setCartChange}
                      />
                    </TableCell>
                    <TableCell>€{item.totalItemPrice}</TableCell>
                    <TableCell size="small">
                      <RemoveItemButton
                        cartId={cart.id}
                        cartVersion={cart.version}
                        itemId={item.id}
                        setCartChange={setCartChange}
                      />
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
                  <ItemImageBox imagePath={item.image} />
                  <Stack className={classes.CartListItemDetails}>
                    <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                    <Typography>Size: {item.size}</Typography>
                    <Typography>Price: €{item.price}</Typography>
                    <Stack className={classes.ItemQuantityAndPrice}>
                      <ItemQuantityChange
                        cartId={cart.id}
                        cartVersion={cart.version}
                        item={item}
                        setCartChange={setCartChange}
                      />
                      <Typography sx={{ fontWeight: 700 }}>€{item.totalItemPrice}</Typography>
                    </Stack>
                  </Stack>
                  <Box className={classes.DeleteButton}>
                    <RemoveItemButton
                      cartId={cart.id}
                      cartVersion={cart.version}
                      itemId={item.id}
                      setCartChange={setCartChange}
                    />
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
          <Typography sx={{ fontSize: 14 }}>Promo Codes Applied: {promoCodesApplied}</Typography>
          <Divider variant="fullWidth" />
          <Stack className={classes.TotalPrice}>
            <Typography className={classes.RealTotalPrice}>Grand Total:</Typography>
            <Typography className={totalCartPriceClass}>€{totalCartPrice}</Typography>
            {discountedCartPrice && <Typography className={classes.RealTotalPrice}>€{discountedCartPrice}</Typography>}
          </Stack>
          <CheckoutButton />
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
