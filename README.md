# simple-chat
LimeGreenJS-enabled simple chat example

## Graphcool schema
```
type Message @model {
  id: ID! @isUnique
  createdAt: DateTime!
  text: String!
  author: String
}

type File @model {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}

type User @model {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
}
```

You need to enable all permissions for the Message model.
