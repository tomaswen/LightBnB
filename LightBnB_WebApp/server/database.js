const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let user;
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1`, [email])
  .then(res => {
    return user = res.rows[0];
  })
  .catch( e => {
    return user = null;
  })
  
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  let user;
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [id])
  .then(res => {
    return user = res.rows[0];
  })
  .catch( e => {
    return user = null;
  })
  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, password, email)
  VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.password, user.email])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  let reservations;
  return pool.query(`
    SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.end_date < now()::date 
    AND reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
    LIMIT $2;`, [guest_id, limit]).then(res => {
      reservations = res.rows
      return reservations;
    })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT OUTER JOIN property_reviews ON properties.id = property_id
  `;
  if (options) {
     queryString += `WHERE `;
  }
  if (options.city) {
     queryParams.push(`%${options.city}%`);
     queryString += `city LIKE $${queryParams.length} AND `;
  }
 if (options.owner_id) {
     queryParams.push(`${options.owner_id}`);
     queryString += `owner_id = $${queryParams.length} AND `;
  }
  if (options.minimum_price_per_night) {
     queryParams.push(`${options.minimum_price_per_night}`);
     queryString += `cost_per_night >= $${queryParams.length} AND `;
  }
  if (options.maximum_price_per_night) {
     queryParams.push(`${options.maximum_price_per_night}`);
     queryString += `cost_per_night <= $${queryParams.length} AND `;
  }
  if (options.minimum_rating) {
     queryParams.push(`${options.minimum_rating}`);
     queryString += ` properties.id > 0
     GROUP BY properties.id HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
     queryParams.push(limit);
     queryString += `
     ORDER BY cost_per_night
     LIMIT $${queryParams.length};
     `;
  } else {  
    queryParams.push(limit);
    queryString += `properties.id > 0
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;}
  return pool.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  queryParams = [
  property.owner_id,
  property.title,
  property.description,
  property.thumbnail_photo_url,
  property.cover_photo_url,
  property.cost_per_night,
  property.parking_spaces,
  property.number_of_bathrooms,
  property.number_of_bedrooms,
  property.country,
  property.street,
  property.city,
  property.province,
  property.post_code,
  ];
  return pool.query(`
  INSERT INTO properties 
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES
  ($1::integer, $2::VARCHAR(255), $3::VARCHAR(255), $4::VARCHAR(255), $5::VARCHAR(255), $6::integer, $7::integer, $8::integer, $9::integer, $10::VARCHAR(255), $11::VARCHAR(255), $12::VARCHAR(255), $13::VARCHAR(255), $14::VARCHAR(255)) RETURNING *
  `, queryParams)
  .then(res => {
    return res.rows[0];
  })
}
exports.addProperty = addProperty;
