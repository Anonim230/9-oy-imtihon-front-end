import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Provider from './hooks/data';
import vars from './variables'
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri:vars.graph,
  cache:new InMemoryCache() 
})
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
export default client;