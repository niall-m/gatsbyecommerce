import React from 'react';
import { CollectionTile } from '../CollectionTile';
import { RemainingCollections } from './styles';

export function HomepageCollectionsGrid({ collections }) {
  const saleCollection = collections.find(
    collection => collection.title === 'SALE'
  );
  const remainingCollections = collections.filter(
    collection => collection.title !== 'SALE'
  );
  
  return (
    <div>
      {Boolean(saleCollection) &&
        <CollectionTile
          sale 
          title={saleCollection.title}
          description={saleCollection.description}
          backgroundImage={saleCollection.image.localFile.childImageSharp.fluid}
        />
      }
      <RemainingCollections>
        {remainingCollections.map(collection => (
          <CollectionTile 
            key={collection.shopifyId} 
            title={collection.title}
            description={collection.description}
            backgroundImage={collection.image.localFile.childImageSharp.fluid}
          />
        ))}
      </RemainingCollections>
    </div>
  );
}