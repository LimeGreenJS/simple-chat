import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_MESSAGE = gql`
mutation createMessage($text: String!, $author: String) {
  createMessage(text: $text, author: $author) {
    id
  }
}
`;

const NewMessageForm = () => (
  <Mutation mutation={CREATE_MESSAGE}>
    {(createMessage) => {
      const onSubmit = (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        if (!text) return;
        const author = event.target.author.value;
        createMessage({ variables: { text, author } });
        event.target.text.value = '';
      };
      return (
        <form onSubmit={onSubmit}>
          <input name="author" placeholder="Author" />
          :
          <input name="text" placeholder="Text" />
          <button type="submit">Send</button>
        </form>
      );
    }}
  </Mutation>
);

export default NewMessageForm;
