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
  let productSKU = '';
  const [products, setProducts] = useState(0);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [version, setVersion] = useState(0);
  const [cart, setCart] = useState<Cart>();

  if (localStorage.getItem('Product sku')) {
    productSKU = localStorage.getItem('Product sku') ?? '';
  }

  useEffect(() => {
    const getAllCartItems = async (): Promise<void> => {
      try {
        const currentCart = (await getExistingProductCart()).body.lineItems;
        setCartItems(
          currentCart.map(item => {
            return item.variant.sku ? item.variant.sku : '';
          })
        );
      } catch (error) {
        setCartItems([]);
      }
    };
    getAllCartItems();
  }, [version]);

  const [isItemInCart, setItemInCart] = useState(cartItems.includes(productSKU));
  const addCartButtonLabel = isItemInCart ? 'Remove from cart' : 'Add to cart';

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
  }, []);

  const handleAddItemToCart = (): void => {
    setIsLoading(true);

    if (cart) {
      addItemToCart(cart.id, version, productSKU, productSKU)
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

    if (cart) {
      removeItemFromCart(cart.id, version, productSKU)
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
