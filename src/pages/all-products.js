import React from 'react';
import { Layout, Filters, ProductsGrid, SEO } from 'components';
import ProductContext from 'context/ProductContext';
import styled from 'styled-components';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 20px;
  grid-template-columns: 1fr 3fr;
`;

export default function AllProducts() {
  const { products, collections } = React.useContext(ProductContext);
  const collectionProductMap = {};
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const selectedCollectionIds = qs.c?.split(',').filter(c => Boolean(c)) || [];
  // get collectionIds in URI, remove empty strings, default to array
  const selectedCollectionIdsMap = {};
  const searchTerm = qs.s;

  selectedCollectionIds.forEach(collectionId => {
    selectedCollectionIdsMap[collectionId] = true;
  });

  if (collections) {
    collections.forEach(collection => {
      collectionProductMap[collection.shopifyId] = {};
      collection.products.forEach(product => {
        collectionProductMap[collection.shopifyId][product.shopifyId] = true;
      });
    });
  }
  
  const filterByCategory = (product) => {
    // return whether product matches category
    if (Object.keys(selectedCollectionIdsMap).length) {
      // if it has keys, loop through
      for (let key in selectedCollectionIdsMap) {
        if (collectionProductMap[key]?.[product.shopifyId]) {
          // if key in map and product belongs to collection
          return true;
        }
      }
      return false;
    }
    // no selected categories, return each
    return true;
  };

  const filterBySearchTerm = (product) => {
    if (searchTerm) {
      // if searchTerm exists and is part of title
      return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    }

    // else return all products
    return true;
  };
  
  const filteredProducts = products
    .filter(filterByCategory)
    .filter(filterBySearchTerm);
  
  return (
    <Layout>
      <SEO title="MadHatter store all products" description="all products" />
      {Boolean(searchTerm) && Boolean(filteredProducts.length) &&
        <h3>Search term: <strong>'{searchTerm}'</strong></h3>
      }
      {Boolean(filteredProducts.length) &&
        <h4>{filteredProducts.length} products</h4>
      }
      <Content>
        <Filters />
        {!filteredProducts.length &&
          <div>
            <h3>
              <span>Oh no! Nothing matches</span>
              &nbsp;
              <strong>
                '{searchTerm}'
              </strong>
            </h3>
            <div>
              To help with your search, why not try:
              <br />
              <br />
              <ul>
                <li>Checking your spelling</li>
                <li>Using less words</li>
                <li>Try using a different search term</li>
              </ul>
            </div>
          </div>
        }
        {Boolean(filteredProducts.length) &&
          <div>
            <ProductsGrid products={filteredProducts} />
          </div>
        }
      </Content>
    </Layout>
  );
}