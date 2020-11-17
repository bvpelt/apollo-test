const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type Activiteiten { identificatie: String
  procedurestatus: String
  naam: String
 _links: Links
  groep: Groep }

type ActiviteitLinks { is: Is
  isGereguleerdVoor: IsGereguleerdVoor
  beschrevenIn: BeschrevenIn
  self: Self }

type BeschrevenIn { href: String }

type EmbeddedActiviteiten { activiteiten: [Activiteiten ] }

type First { href: String }

type Groep { code: String waarde: String }

type Is { href: String }

type IsGereguleerdVoor { href: String }

type Last { href: String }

type Links { last: Last next: Next self: Self first: First }

type Next { href: String }

type Page { size: Int
  totalElements: Int
  totalPages: Int
  number: Int }


type Self { href: String }


type ActiviteitenResponseType { page: Page _links: Links _embedded: EmbeddedActiviteiten }


type ActiviteitResponseType { identificatie: String
  procedurestatus: String
  naam: String
  _links: ActiviteitLinks
  groep: Groep }


  type ActiviteitenGerelateerdResponseType { identificatie: String
  procedurestatus: String
  naam: String
  _links: ActiviteitLinks
  groep: Groep }

# Types with identical fields:
# Last Next Self First Is IsGereguleerdVoor BeschrevenIn
# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query { 
  activiteiten: ActiviteitenResponseType
  activiteit(id: ID!): ActiviteitResponseType
  activiteitengerelateerd(id: ID!): ActiviteitenGerelateerdResponseType
}

#type Mutation {
#  
#}


`;


module.exports = typeDefs;