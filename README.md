# Scoreboard

## Running

1. `npm i`
2. `npm run build`
3. `npm run dev`
4. `npm run test`

## Design

To manage the scoreboard state, a new TypeScript library, `@lib/scoreboard` (located in `packages/scoreboard`), has been implemented. This library is environment-agnostic, meaning it can be used on both the client and server. It includes the `Scoreboard` class, along with an auxiliary `Match` class that is utilized internally by the `Scoreboard` class.

1. TypeScript is chosen to achieve type safety
2. In-memory data storage using hash map is used to achieve constant times lookups and creations
3. OOP is used to adhere SOLID principles

### Constraints

1. Teams mustn't be empty names
2. Team can only play in one match at a time
3. Scores must be non-negative integers (`>= 0`)
