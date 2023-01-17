import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import Home from './Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-hleh5ooji5xervjb.us.auth0.com'
      clientId='ciwJEMEMLg64MCXGmyU9t2GHXpTSHf80'
      redirectUri='http://localhost:5173/home' // you have to include it in your settings in Auth0
      audience='https://example-api' // you create it in dashboard-api watch video: https://www.youtube.com/watch?v=pSOXSUmcYvo
      cacheLocation='localstorage' // to persist user on refresh
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
)
