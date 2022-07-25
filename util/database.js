import camelCase from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

config();
// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Get all products from database
export async function getCoffees() {
  const coffees = await sql`
  SELECT * FROM coffees
  `;
  return coffees.map((coffee) => camelCase(coffee));
}

// Get single product from database
export async function getSingleCoffee(id) {
  const [coffee] = await sql`
  SELECT * FROM coffees WHERE id=${id}
  `;
  return camelCase(coffee);
}

// export const coffeeDatabase = [
//   {
//     id: '1',
//     name: 'El Capitan',
//     price: 9.9,
//     description: '250gr, 50% Brazil, 50% Ethiopea',
//     taste: 'Toffee, Dark Chocolate, Light Floral',
//     image: '/../public/ElCapitan.png',
//   },
//   {
//     id: '2',
//     name: 'Mexiko',
//     price: 10.5,
//     description: '250gr, 100% Mexico',
//     taste: 'Marzipan, Nougat, Waffle',
//     image: '/../public/Mexiko.png',
//   },
//   {
//     id: '3',
//     name: 'Mujeres Fuertes',
//     price: 10.5,
//     description: '250gr, Venezuela',
//     taste: 'Raisin, Toffee, Dark Chocolate',
//     image: '/../public/MujeresFuertes.png',
//   },
//   {
//     id: '4',
//     name: 'Nocciola',
//     price: 9.9,
//     description: '250gr, 70% Mexiko, 30% Tanzania',
//     taste: 'Roasted Hazelnuts, Cocoa',
//     image: '/../public/Nocciola.png',
//   },
//   {
//     id: '5',
//     name: 'Montecristo Organic',
//     price: 9.9,
//     description: '250gr, 100% Nicaragua',
//     taste: 'Walnuts, Dark Chocolate, Peach',
//     image: '/../public/Montecristo.png',
//   },
//   {
//     id: '6',
//     name: 'Primavera Decaf',
//     price: 11.5,
//     description: '250gr, 100% Guatemala',
//     taste: 'Toffee, Chocolate, Chamomile ',
//     image: '/../public/PrimaveraDecaf.png',
//   },
// ];
