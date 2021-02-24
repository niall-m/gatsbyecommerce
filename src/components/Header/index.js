import React from 'react';
import { HeaderWrapper } from './styles';
import { Cart } from '../Cart';
import { Search } from '../Search';
import { Logo } from '../Logo';
import { Link } from 'gatsby';

export function Header() {
  return (
    <HeaderWrapper>
      <div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <Search />
      <Cart />
    </HeaderWrapper>
  );
}