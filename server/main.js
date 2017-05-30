import { Meteor } from 'meteor/meteor';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { typeDefs } from '../imports/api/apolloServer/schema';
import { resolvers } from '../imports/api/apolloServer/resolvers';
import cors from 'cors';
import { UserLearnedWords } from '../imports/collections/userLearnedWords';
import { Comments } from '../imports/collections/commets';
import { Words } from '../imports/collections/words';

let corsOptions = {
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
},
{
  configServer: expressServer => expressServer.use(cors(corsOptions))
});

const fakeData = [
  {
    hash: 'ccc',
    lessonId: '1',
    productId: '1',
    languageCode: 'es',
  },
  {
    hash: 'qaq',
    lessonId: '1',
    productId: '1',
    languageCode: 'es',
  },
];

const fakeComments = [
  {
    message: 'This is really good',
  },
  {
    message: 'Hi! I am Mister MeeSeeks look at me!',
  },
  {
    message: 'That is the power of love',
  },
  {
    message: 'Back to the future is a great movie',
  },
];

const fakeWords = [
  {
    languageCode: 'es',
    word: 'Papa',
  },
  {
    languageCode: 'es',
    word: 'Capitulo',
  },
  {
    languageCode: 'es',
    word: 'Vaso',
  },
  {
    languageCode: 'es',
    word: 'Computadora',
  },
  {
    languageCode: 'es',
    word: 'Celular',
  },
];

fakeWords.forEach(item => {
  const word = Words.findOne({ word: item.word });

  if (!word) {
    Words.insert(item);
  }
});

fakeComments.forEach(comment => {
  const userComment = Comments.findOne({ message: comment.message });

  if (!userComment) {
    Comments.insert(comment);
  }
});

fakeData.forEach(data => {
  const userLearnedWord = UserLearnedWords.findOne({
    hash: data.hash,
    lessonId: data.lessonId,
    productId: data.productId,
  });

  if (!userLearnedWord) {
    UserLearnedWords.insert(data);
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});
