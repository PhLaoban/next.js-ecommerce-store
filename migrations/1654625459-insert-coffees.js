const coffees = [
  {
    name: 'El Capitan',
    price: 9,
    description: '250gr, 50% Brazil, 50% Ethiopea',
    taste: 'Toffee, Dark Chocolate, Light Floral',
    image: '/../public/ElCapitan.png',
  },
  {
    name: 'Mexiko',
    price: 9,
    description: '250gr, 100% Mexico',
    taste: 'Marzipan, Nougat, Waffle',
    image: '/../public/Mexiko.png',
  },
  {
    name: 'Mujeres Fuertes',
    price: 11,
    description: '250gr, Venezuela',
    taste: 'Raisin, Toffee, Dark Chocolate',
    image: '/../public/MujeresFuertes.png',
  },
  {
    name: 'Nocciola',
    price: 10,
    description: '250gr, 70% Mexiko, 30% Tanzania',
    taste: 'Roasted Hazelnuts, Cocoa',
    image: '/../public/Nocciola.png',
  },
  {
    name: 'Montecristo Organic',
    price: 10,
    description: '250gr, 100% Nicaragua',
    taste: 'Walnuts, Dark Chocolate, Peach',
    image: '/../public/Montecristo.png',
  },
  {
    name: 'Primavera Decaf',
    price: 11,
    description: '250gr, 100% Guatemala',
    taste: 'Toffee, Chocolate, Chamomile ',
    image: '/../public/PrimaveraDecaf.png',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO coffees ${sql(
    coffees,
    'name',
    'price',
    'description',
    'taste',
    'image',
  )}
`;
};

exports.down = async (sql) => {
  for (const coffee of coffees) {
    await sql`
  DELETE FROM

	coffees

	WHERE

	name = ${coffee.name} AND
	price = ${coffee.price} AND
	description = ${coffee.description} AND
	taste = ${coffee.taste} AND
	image = ${coffee.image}

  `;
  }
};
