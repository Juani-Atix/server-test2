export const typeDefs = [`
  type LearnedWordsByLanguageCode {
    languageCode: String
    words: [String]
  }
  type Comment {
    _id: String
    message: String
  }
  type Query {
    userLearnedWordsByLanguageCode(languageCodes: [String]): [LearnedWordsByLanguageCode]
    helloWorld: String
    getAllComments: [Comment]
  }
  type Mutation {
    addComment(message: String): Comment
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];
