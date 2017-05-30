export const typeDefs = [`
  type LearnedWordsByLanguageCode {
    languageCode: String
    words: [String]
  }
  type Comment {
    _id: String
    message: String
  }
  type WordsByLanguageCode {
    languageCode: String
    words: [String]
  }
  type AddWord {
    languageCode: String
    word: String
  }
  type Query {
    userLearnedWordsByLanguageCode(languageCodes: [String]): [LearnedWordsByLanguageCode]
    helloWorld: String
    getAllComments: [Comment]
    wordsByLanguageCode(languageCodes: [String]): [WordsByLanguageCode]
  }
  type Mutation {
    addComment(message: String): Comment
    addWord(languageCode: String, word: String): AddWord
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];
