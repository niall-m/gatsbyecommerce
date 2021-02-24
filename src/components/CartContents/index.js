import React from 'react';
import CartContext from 'context/CartContext';
import { CartItem, CartHeader, CartFooter, Footer } from './styles';
import { QuantityAdjuster } from '../QuantityAdjuster';
import { RemoveLineItem } from '../RemoveLineItem';
import { Button } from '../Button';
import { navigate } from '@reach/router';

export function CartContents() {
  const { checkout, updateLineItem } = React.useContext(CartContext);

  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId });
  };
  
  return (
    <section>
      <h1>Your Cart</h1>
      {Boolean(checkout?.lineItems) &&
      <CartHeader>
        <div>Product</div>
        <div>Unit Price</div>
        <div>Quantity</div>
        <div>Amount</div>
      </CartHeader>
      }
      {checkout?.lineItems?.map(item => (
      <CartItem key={item.variant.id}>
        <div>
          <div>{item.title}</div>
          <div>
            {item.variant.title === 'Default Title' ? '' : item.variant.title}
          </div>
        </div>
        <div>${item.variant.price}</div>
        <div>
          <QuantityAdjuster item={item} onAdjust={handleAdjustQuantity}></QuantityAdjuster>
        </div>
        <div>${(item.quantity * item.variant.price).toFixed(2)}</div>
        <div>
          <RemoveLineItem lineItemId={item.id} />
        </div>
      </CartItem>
      ))}
      {Boolean(checkout?.lineItems) &&
      <CartFooter>
        <div><strong>Total:</strong></div>
        <div>
          <span>${checkout?.totalPrice}</span>
        </div>
      </CartFooter>
      }
      {!checkout?.lineItems &&
      <h4>Your cart is empty.</h4>
      }
      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>
            Continue shopping
          </Button>
        </div>
        <div>
          {Boolean(checkout?.webUrl) && 
          <Button onClick={() => {
            window.location.href = checkout.webUrl;
          }}>
            Checkout
          </Button>
          }
        </div>
      </Footer>
    </section>
  );
}