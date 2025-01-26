# Scoreboard

## Running

1. `npm i`
2. `npm run build`
3. `npm run dev`
4. `npm run test`

## Design

To manage the scoreboard state, a new TypeScript library, [@lib/scoreboard](packages/scoreboard/src) located in [packages/scoreboard](packages/scoreboard/src), has been implemented. This library is environment-agnostic, meaning it can be used on both the client and server. It includes the `Scoreboard` class, along with an auxiliary `Match` class that is utilized internally by the `Scoreboard` class.

To display the matches on UI a small React application has been created located in [apps/web/app](apps/web/app).
This client application utilizes the `scoreboard` library mentioned earlier from the packages. The `scoreboard` library is wrapped in a [React hook](apps/web/app/scoreboard-ui/useScoreboard.ts), enabling seamless integration and usage. This will allow to seamlessly replace the underlying library in future if needed updating only this hook.

### Justification for tool and approach

1. TypeScript is chosen to achieve type safety
2. In-memory data storage uses hashmap to achieve constant times lookups and creations
3. Object-Oriented Programming (OOP) is utilized to adhere to SOLID principles and abstract away unnecessary details.
4. Tests has been written before implementation to ensure that the solution meets the expected requirements and works as intended from the start as well as to detect bugs earlier.

### Constraints

1. Teams mustn't be empty names
2. Team can only play in one match at a time
3. Scores must be non-negative integers

## Assumptions

According to the requirements, the scoreboard methods accept teams, which likely refers to team names. To enhance reliability and mitigate potential risks arising from slight variations in names or spelling across different countries or regions, I would suggest introducing unique team identifiers as a consistent point of reference.
