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

/*
const checklike = async (client, userid, reviewid) => {
  const { rows : existingRows } = await client.query(
    `
    SELECT like
    FROM reviewlike
    WHERE user_id=$1 AND review_id=$2

    `,[userid, reviewid],
  );
  if (existingRows.length === 0) return false; //존재하지않다면 False
};*/
/*

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
};*/


const updatelike = async (client, userid, reviewid) => {
  const { rows : existingRows } = await client.query(
    `
    SELECT "like"
    FROM reviewlike
    WHERE user_id=$1 AND review_id=$2

    `,[userid, reviewid],
  );

  if (existingRows.length === 0) {
    const { rows } = await client.query(
      `
      INSERT INTO reviewlike(user_id, review_id, "like")
      VALUES ($1, $2, $3)
  
      `,[userid, reviewid, false],
    );
    return convertSnakeToCamel.keysToCamel(false);
      
  }; 
  

};

const update2 = async (client, userid, reviewid, check) => {
  const { rows } = await client.query(
    `
    UPDATE reviewlike
    SET "like"=$1
    WHERE user_id = $2 AND review_id=$3
    RETURNING * 
    `,
    [!check, userid, reviewid],
  );
  
  return convertSnakeToCamel.keysToCamel(rows);
};

const update3 = async (client, reviewid, num) => {
  const { rows2 } = await client.query(
    `
    UPDATE review
    SET count=count+$2
    WHERE id = $1
    RETURNING * 
    `,
    [reviewid,num],
  );
  const { rows } = await client.query(
    `
    SELECT review.id, "user".name, pickup_star, delivery_star, laundry_star, review.count AS likeCount, content, image, "user".count AS usingCount
    FROM "user", review
    WHERE review.user_id="user".id AND review.id=$1

    `,[reviewid],
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getReview, updatelike , update2, update3};