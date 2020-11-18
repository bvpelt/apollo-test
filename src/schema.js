const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type AangeleverdDoorEen { naam: String code: String _links: Links }

type Activiteiten { identificatie: String
  procedurestatus: String
  naam: String
 _links: Links
  groep: Groep }

type BeheertAmbtsgebied { href: String }

type BeschrevenIn { href: String }

type Documentstructuur { href: String }

type EmbeddedActiviteiten { activiteiten: [Activiteiten ] }

type EmbeddedOmgevingsdocumenten { omgevingsdocumenten: [Omgevingsdocumenten ] }

type First { href: String }

type Groep { code: String waarde: String }

type HeeftRegelingsgebied { href: String }

type Is { href: String }

type IsGereguleerdVoor { href: String }

type Last { href: String }

type Links { last: Last next: Next self: Self first: First }

type LinksActiviteit { is: Is
  isGereguleerdVoor: IsGereguleerdVoor
  beschrevenIn: BeschrevenIn
  self: Self }

type LinksOmgevingsdocument { themas: Themas
  documentstructuur: Documentstructuur
  heeftRegelingsgebied: HeeftRegelingsgebied
  self: Self }

type Next { href: String }

type Omgevingsdocumenten { identificatie: String
  type: String
  citeertitel: String
  opschrift: String
  procedurestatus: String
  inwerkingVanaf: String
  geldigVanaf: String
  _links: Links
  aangeleverdDoorEen: AangeleverdDoorEen }

type Page { size: Int
  totalElements: Int
  totalPages: Int
  number: Int }

type Self { href: String }

type Themas { href: String }

input ZoekParameters { parameter: String zoekWaarden: [String ] }
input ZoekParameterInputType { zoekParameters: [ZoekParameters ] }

type ActiviteitenResponseType { page: Page _links: Links _embedded: EmbeddedActiviteiten }

type ActiviteitResponseType { identificatie: String
  procedurestatus: String
  naam: String
  _links: LinksActiviteit
  groep: Groep }

type ActiviteitenGerelateerdResponseType { identificatie: String
  procedurestatus: String
  naam: String
  _links: LinksActiviteit
  groep: Groep }

type OmgevingsdocumentenResponseType { page: Page _links: Links _embedded: EmbeddedOmgevingsdocumenten }

type OmgevingsdocumentResponseType { identificatie: String
  type: String
  opschrift: String
  procedurestatus: String
  inwerkingVanaf: String
  geldigVanaf: String
  _links: LinksOmgevingsdocument
  aangeleverdDoorEen: AangeleverdDoorEen }

# Types with identical fields:
# Last Next Self First Is IsGereguleerdVoor BeschrevenIn
# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query { 
  activiteiten: ActiviteitenResponseType
  activiteit(id: ID!): ActiviteitResponseType
  activiteitengerelateerd(id: ID!): ActiviteitenGerelateerdResponseType
  omgevingsdocumenten: OmgevingsdocumentenResponseType
  omgevingsdocument(id: ID!): OmgevingsdocumentResponseType
}

type Mutation {
  activiteitenzoek(parameter: ZoekParameterInputType): ActiviteitenResponseType  
}


`;


module.exports = typeDefs;