import React from 'react';
import { Layout, CartContents, SEO } from 'components';

export default function CartPage() {
  return (
    <Layout>
      <SEO title="MadHatter Cart" description="Cart" />
      <CartContents />
    </Layout>
  );
}