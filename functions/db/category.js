const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getCategory = async (client, categoryID) => {
    // category_name, item_name, item_price 로 JOIN 함.
    const { rows } = await client.query(
        `
        SELECT c.category_name, i.item_name, i.item_price
        FROM category c, category_item i
        WHERE c.id = i.category_id
            AND c.id = $1
        `,
        [categoryID],
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

const getAllCategory = async (client) => {
    // category_name, item_name, item_price 로 JOIN 함.
    const { rows } = await client.query(
        `
        SELECT c.category_name, i.item_name, i.item_price
        FROM category c, category_item i
        WHERE c.id = i.category_id
        `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

module.exports = { getCategory, getAllCategory }