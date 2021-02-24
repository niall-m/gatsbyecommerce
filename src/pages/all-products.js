import React from 'react';
import { Layout } from 'components';
import ProductContext from 'context/ProductContext';

export default function AllProducts() {
  const { products, collections } = React.useContext(ProductContext);
  console.log('products', products);
  
  return (
    <Layout>
      <h4>{products.length} products</h4>
      <div>
        {collections.map(collection => (
          <div key={collection.shopifyId}>{collection.title}</div>
        ))}
      </div>
    </Layout>
  );
}