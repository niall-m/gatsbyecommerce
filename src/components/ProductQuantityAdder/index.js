import React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { ProductQuantityAdderWrapper } from './styles';

export function ProductQuantityAdder({ variantId, available }) {
  const [quanitity, setQuantity] = React.useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

  };

  return (
    <ProductQuantityAdderWrapper>
      <strong>Quantity</strong>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={!available}
          type="number"
          min="1"
          step="1"
          value={quanitity} 
          onChange={handleQuantityChange}
        />
        <Button 
          type="submit"
          disabled={!available}
          fullWidth
        >
          Add to cart
        </Button>
      </form>
    </ProductQuantityAdderWrapper>
  );
}