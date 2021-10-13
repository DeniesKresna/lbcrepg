/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import CreditPage from 'containers/CreditPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <div>
      <CreditPage />
      <GlobalStyle />
    </div>
  );
}
