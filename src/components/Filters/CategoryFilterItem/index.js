import React from 'react';
import { Checkbox } from 'components';
import { navigate, useLocation } from '@reach/router';
import { CategoryFilterItemWrapper } from './styles';
import queryString from 'query-string';

export function CategoryFilterItem({ title, id }) {
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const collectionIds = qs.c?.split(',').filter(c => Boolean(c)) || [];
  const checked = collectionIds?.find(cId => cId === id);
  const searchTerm = qs.s;

  const onClick = () => {
    let baseUrl = '/all-products';
    
    let newIds = [];
    
    if (checked) {
      // remove from checked items
      newIds = collectionIds
        .filter(cId => cId !== id)
        .map(cId => encodeURIComponent(cId));
    } else {
      // add to checked items
      collectionIds.push(id);
      newIds = collectionIds.map(cId => encodeURIComponent(cId));
    }
    
    if (newIds.length && !searchTerm) {
      navigate(`${baseUrl}?c=${newIds.join(',')}`);
    } else if (newIds.length && Boolean(searchTerm)) {
      navigate(`${baseUrl}?c=${newIds.join(',')}&s=${encodeURIComponent(searchTerm)}`);
    } else if (!newIds.length && Boolean(searchTerm)) {
      navigate(`${baseUrl}?s=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`${baseUrl}`);
    }
  };
  
  return (
    <CategoryFilterItemWrapper onClick={onClick}>
      <Checkbox checked={checked} />
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
}