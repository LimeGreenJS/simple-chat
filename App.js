import React from 'react';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import NewMessageForm from './NewMessageForm';
import MessageList from './MessageList';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjjoa2ta44sb201919b2xa3rl',
});
const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.ap-northeast-1.graph.cool/v1/cjjoa2ta44sb201919b2xa3rl',
  options: {
    reconnect: true
  }
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>Simple Chat</h1>
      <NewMessageForm />
      <MessageList />
    </div>
  </ApolloProvider>
);

export default App;
