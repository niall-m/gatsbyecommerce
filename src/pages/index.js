import React from 'react';
import { 
  SEO, 
  Layout, 
  FeaturedProducts,
  HomepageCollectionsGrid
} from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  const { collections } = React.useContext(ProductContext);
  console.log('collections', collections);

  return (
    <Layout>
      <HomepageCollectionsGrid 
        collections={collections.filter(
          collection => collection.title !== 'Featured Hats'
        )}
      />

      {Boolean(collections
        .find(collection => collection.title === 'Featured Hats')) &&
      <FeaturedProducts />}

    </Layout>
  );
};

export default IndexPage;
