const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getReview = async (client) => {
  const { rows } = await client.query(
    `
    SELECT review.id, "user".name, pickup_star, delivery_star, laundry_star, review.count AS likeCount, content, image, "user".count AS usingCount
    FROM "user", review
    WHERE review.user_id="user".id 
    ORDER BY review.count DESC
    LIMIT 3

    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};


const getLike = async (client, id) => {
 
  const { rows : existingRows} = await client.query( //rows는 항상배열
    `
    SELECT * FROM review
    WHERE id = $1
    
    `,
    [id],
  );
  if (existingRows.length === 0) return false;

  //const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), {id}); 
  //merge할 때 lodash 사용?!?
  
  const { rows } = await client.query(
    `
    UPDATE review
    SET count=count+1
    WHERE id = $1
    RETURNING * 
    `,
    [id],
  );
  
};

const getOneReview = async (client, id) => {
  const { rows } = await client.query(
    `
    SELECT review.id, "user".name, pickup_star, delivery_star, laundry_star, review.count AS likeCount, content, image, "user".count AS usingCount
    FROM "user", review
    WHERE review.user_id="user".id AND review.id=$1

    `,[id],
  );
  return convertSnakeToCamel.keysToCamel(rows);
};


module.exports = { getReview, getLike, getOneReview };