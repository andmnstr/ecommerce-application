import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { AddShoppingCart } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { createProductCart, getExistingProductCart } from '../../../../../shared';
import { CustomButton } from '../../../../../shared/UI/button/CustomButton';
import { addItemToCart } from '../Api/addItemToCart';
import { removeItemFromCart } from '../Api/removeItemFromCart';
import styles from './CartManagement.module.scss';

export const CartManagement: React.FC = () => {
  let productSKU = '';
  const [cartItem, setCartItem] = useState<LineItem>();
  const [isLoading, setIsLoading] = useState(false);
  const [isItemInCart, setItemInCart] = useState(false);
  const addCartButtonLabel = isItemInCart ? 'Remove from cart' : 'Add to cart';
  const [version, setVersion] = useState(0);
  const [cart, setCart] = useState<Cart>();

  if (localStorage.getItem('Product sku')) {
    productSKU = localStorage.getItem('Product sku') ?? '';
  }

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      getExistingProductCart()
        .then(activeCart => {
          const currentCart = activeCart.body;
          const currentItem = currentCart.lineItems.filter(item => {
            return item.variant.sku === productSKU;
          })[0];

          setCartItem(currentItem);

          if (currentItem.id) {
            setItemInCart(true);
          }
        })
        .catch(() => {
          setCartItem(undefined);
        });
    };
    fetchCart();
  }, [version, productSKU]);

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      getExistingProductCart()
        .then(activeCart => {
          const currentCart = activeCart.body;
          setCart(currentCart);
          setVersion(currentCart.version);
        })
        .catch(() => {
          createProductCart().then(newCart => {
            const currentCart = newCart.body;
            setCart(currentCart);
            setVersion(currentCart.version);
          });
        });
    };
    fetchCart();
  }, [version]);

  const handleAddItemToCart = (): void => {
    setIsLoading(true);

    if (cart) {
      addItemToCart(cart.id, version, productSKU)
        .then(cartVersion => {
          setVersion(cartVersion);
          setItemInCart(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          console.error('Error while product was added to cart.');
        });
    }
  };

  const handleRemoveItemFromCart = (): void => {
    setIsLoading(true);

    if (cart && cartItem) {
      removeItemFromCart(cart.id, version, cartItem.id)
        .then(cartVersion => {
          setVersion(cartVersion);
          setItemInCart(false);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          console.error('Error while product was removed from cart.');
        });
    }
  };

  return (
    <div className={styles.product__cart_control}>
      <CustomButton
        variant={isItemInCart ? 'outlined' : 'contained'}
        className={styles.product__cart_addition}
        onClick={isItemInCart ? handleRemoveItemFromCart : handleAddItemToCart}
        disabled={isLoading}
      >
        {isLoading && (
          <CircularProgress
            size={24}
            color="secondary"
          />
        )}
        {!isLoading && addCartButtonLabel}
        {!isLoading && (
          <AddShoppingCart
            fontSize="small"
            style={{ marginLeft: '10px' }}
          />
        )}
      </CustomButton>
    </div>
  );
};
