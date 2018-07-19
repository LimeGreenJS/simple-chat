import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
{
  allMessages(orderBy: createdAt_DESC, first: 20) {
    id
    createdAt
    text
    author
  }
}
`;

const subscription = gql`
subscription Message {
  Message {
    mutation
    node {
      id
      createdAt
      text
      author
    }
  }
}
`;

const MessageItem = ({ message }) => (
  <li style={{ borderTop: '1px solid lightgray' }}>
    <p>
      {message.author || 'Anonymous'}: {' '}
      {message.text} {' '}
      ({new Date(message.createdAt).toLocaleString()})
    </p>
  </li>
);

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
      {data.allMessages.map(message => <MessageItem key={message.id} message={message} />)}
      </ul>
    );
  }
};

const MessageList = () => (
  <Query query={query}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () => subscribeToMore({
        document: subscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { mutation, node } = subscriptionData.data.Message;
          if (mutation !== 'CREATED') return prev;
          return Object.assign({}, prev, {
            allMessages: [node, ...prev.allMessages].slice(0, 20),
          });
        },
      });
      return <MessageListView data={data} subscribeToMore={more}/>;
    }}
  </Query>
);

export default MessageList;
