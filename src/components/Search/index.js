import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { FaSearch } from 'react-icons/fa';
import { SearchForm } from './styles';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export function Search() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { search } = useLocation();
  const c = queryString.parse(search)?.c || '';

  // navigate to all products, set new query string, s=searchTerm
  const handleSubmit = (e) => {
    e.preventDefault();

    if (c) {
      // if category filters are present in url, preserve them
      navigate(
        `/all-products?s=${encodeURIComponent(
          searchTerm
        )}&c=${encodeURIComponent(
          c
        )}`
      );
    } else {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        placeholder="Search"
      />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  );
}