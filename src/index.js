// @flow
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { ApolloProvider } from 'react-apollo'

import { resolvers, typeDefs } from './resolvers'
import * as serviceWorker from './serviceWorker'
import RouteLoader from './RouteLoader'
import packageJSON from '../package.json'

import './i18n'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
let client
const cache = new InMemoryCache()
const stateLink = withClientState({
  cache,
  resolvers,
  typeDefs,
  defaults: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      if (message.includes('You are not logged in')) {
        localStorage.removeItem('token')
        client.writeData({ data: { isLoggedIn: false } })
      } // eslint-disable-next-line no-console
      return console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    })
  }
  if (networkError) { // eslint-disable-next-line no-console
    console.warn(`[Network error]: ${networkError}`)
  }
})
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token'),
    },
  }
})
client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, errorLink, authLink, new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      'client-name': packageJSON.name + ' [web]',
      'client-version': packageJSON.version,
    },
  })]),
})

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RouteLoader />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
