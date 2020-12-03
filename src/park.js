const { gql } = require("apollo-server");

const typeDefs = gql`
  type EntranceFee {
    cost: String
    title: String
  }

  type Image {
    altText: String!
    title: String
    url: String!
  }

  type Park {
    _id: ID!
    fullName: String!
    state: String
    map: String!
    latLng: [String]
    activities: [String]
    entranceFees: [EntranceFee]
    url: String!
    weatherInfo: String
    hours: String
    description: String
    images: [Image]
    address: String
  }
`;

module.exports = { typeDefs };
