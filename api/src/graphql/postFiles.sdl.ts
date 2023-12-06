export const schema = gql`
  type Owner {
    DisplayName: String!
    ID: String!
  }

  type FileAWS {
    Key: String!
    LastModified: DateTime!
    ETag: String!
    Size: Int!
    StorageClass: String!
    Owner: Owner!
  }

  type Query {
    getFiles: [FileAWS!]! @skipAuth
  }

  type Mutation {
    postFiles(file: String!, base64: String!): Boolean! @skipAuth
    deleteFile(fileKey: String!): Boolean! @skipAuth
  }
`
