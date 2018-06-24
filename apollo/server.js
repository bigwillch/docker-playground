import 'babel-polyfill';
const { ApolloServer, gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')
const qs = require('qs')
// const { RedisCache } = require('apollo-server-redis');

const md5 = require('md5')

const auth = {
  marvel: {
    public: process.env.MARVEL_PUBLIC,
    private: process.env.MARVEL_PRIVATE
  }
}

const ts = Date.now();
const authParams = {
  apikey: auth.marvel.public,
  ts: ts,
  hash: md5(ts + auth.marvel.private + auth.marvel.public)
}

class MarvelAPI extends RESTDataSource {
  baseURL = 'http://gateway.marvel.com/v1/public/';

  async getCharacters(name) {
    const args = { 
      limit: 20,
      orderBy: 'name',
      nameStartsWith: name 
    }
    const params = qs.stringify({
      ...authParams,
      ...args
    })
    console.log(params)

    const result = await this.get(`characters?${params}`);

    return result.data.results

  }

  // async getProgressFor(movieId: string) {
  //   return this.get('progress', {
  //     id: movieId,
  //   });
  // }
}

// const characters = [
//   {
//     name: 'Spider-Man',
//     img: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg',
//   },
//   {
//     name: 'Captain America',
//     img: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg',
//   },
// ];

const typeDefs = gql`
  type Character {
    name: String
    img: String
  }

  type Query {
    characters(name: String): [Character]
  }

`;

const resolvers = {
  Query: {
    characters: async (_source, { name }, { dataSources }) => {
      return dataSources.marvelAPI.getCharacters(name)
    },
  },
  Character: {
    name: (obj) => obj.name,
    img: (obj) => obj.thumbnail.path + obj.thumbnail.extension
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      marvelAPI: new MarvelAPI()
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});