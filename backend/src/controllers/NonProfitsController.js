const crypto = require("crypto");
const connection = require("../database/connection");

async function list(request, response) {
    const non_profits = await connection('non_profits').select("*");
    return response.json(non_profits);
}


async function create(request, response) {
    const { name, email, whatsapp, city, state } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('non_profits').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        state,
    });
    return response.json({ id });
}
module.exports = {
    list,
    create,
}
