import { UserLearnedWords } from '../../collections/userLearnedWords';
import { Comments } from '../../collections/commets';

export const resolvers = {
  Mutation: {
    addComment: (root, args, context) => {
      console.log('resolver', 'Mutation', 'addComment', args);
      const commentId = Comments.insert({ message: args.message });

      return {
        _id: commentId,
        message: args.message,
      };
    },
  },
  Query: {
    userLearnedWordsByLanguageCode(root, args, context) {
      console.log('resolver', 'Query', 'userLearnedWordsByLanguageCode', args, context.userId);
      const userWords = UserLearnedWords.find({ languageCode: { $in: args.languageCodes } }).fetch();
      const learnedWordsByLanguageCode = [];
      const languages = {};
      
      if (userWords) {
        userWords.forEach(function(word) {
          if (!languages[word.languageCode]) {
            languages[word.languageCode] = [];
          }

          languages[word.languageCode].push(word.hash);
        });

        _.keys(languages).forEach(function(keyName) {
          learnedWordsByLanguageCode.push({
            languageCode: keyName,
            words: languages[keyName]
          });
        });
      }

      return learnedWordsByLanguageCode;
    },
    helloWorld(root, args, context) {
      console.log('resolver', 'Query', 'userLearnedWordsByLanguageCode', args);
      const result = context.userId ? 'Hello World' : 'Invalid User';

      return result;
    },
    getAllComments(root, args, context) {
      console.log('resolver', 'Query', 'getAllComments', args);
      const comments = Comments.find({}).fetch();
      console.log('getAllComments', comments);

      return comments;
    },
  }
};
