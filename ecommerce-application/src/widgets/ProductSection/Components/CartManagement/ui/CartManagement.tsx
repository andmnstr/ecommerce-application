import type { Cart } from '@commercetools/platform-sdk';
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
  const [products, setProducts] = useState(0);
  const [isItemInCart, setItemInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addCartButtonLabel = isItemInCart ? 'Remove from cart' : 'Add to cart';
  const [cart, setCart] = useState<Cart>();
  const [cartVersion, setCartVersion] = useState(0);
  let productSKU = '';

  if (localStorage.getItem('Product sku')) {
    productSKU = localStorage.getItem('Product sku') ?? '';
  }

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      getExistingProductCart()
        .then(activeCart => {
          const currentCart = activeCart.body;

          setCart(currentCart);
          setCartVersion(currentCart.version);
        })
        .catch(() => {
          createProductCart().then(newCart => {
            const currentCart = newCart.body;

            setCart(currentCart);
            setCartVersion(currentCart.version);
          });
        });
    };
    fetchCart();
  }, [setItemInCart]);

  const handleAddItemToCart = (): void => {
    setIsLoading(true);

    if (cart) {
      addItemToCart(cart.id, cart.version, productSKU, productSKU)
        .then(() => {
          setItemInCart(true);
          setIsLoading(false);
          setCart(cart);
        })
        .catch(() => {
          setIsLoading(false);
          console.error('Error while product was added to cart.');
        });
    }
  };

  const handleRemoveItemFromCart = (): void => {
    setIsLoading(true);

    if (cart) {
      removeItemFromCart(cart.id, cartVersion, productSKU)
        .then(() => {
          setItemInCart(false);
        })
        .catch(() => {
          setIsLoading(false);
          console.error('Error while product was removed from cart.');
        });
    }
  };

  useEffect(() => {
    if (products < 0) {
      setProducts(0);
    }
  }, [products]);

  return (
    <div className={styles.product__cart_control}>
      <div
        className={styles.product__counter}
        style={{ display: 'none' }}
      >
        <CustomButton
          variant="outlined"
          className={styles.product__count}
          onClick={() => {
            setProducts(products - 1);
          }}
        >
          -
        </CustomButton>
        <span className={styles.product__number}>{products}</span>
        <CustomButton
          variant="outlined"
          className={styles.product__count}
          onClick={() => {
            setProducts(products + 1);
          }}
        >
          +
        </CustomButton>
      </div>
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
