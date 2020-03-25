const connection = require("../database/connection");

async function list(request, response) {
    const { page = 1, limit = 5 } = request.query;
    const [count] = await connection('incidents').count();
    const incidents = await connection('incidents')
        .join('non_profits', 'non_profits.id', '=', 'incidents.non_profit_id')
        .limit(limit)
        .offset((page - 1) * limit)
        .select([
            'incidents.*',
            'non_profits.name',
            'non_profits.email',
            'non_profits.whatsapp',
            'non_profits.city',
            'non_profits.state'
        ]);
    response.header('X-Total-Count', count['count(*)']);
    return response.json(incidents);
}

async function create(request, response) {
    const { title, description, value } = request.body;
    const non_profit_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        non_profit_id,
    });
    return response.json({ id });
}

async function remove(request, response) {
    const { id } = request.params;
    const non_profit_id = request.headers.authorization;

    const incident = await connection('incidents')
        .where('id', id)
        .select("non_profit_id")
        .first();

    if (incident === undefined) {
        return response.status(400).json({ error: "Incident not found." });
    }

    if (incident.non_profit_id !== non_profit_id) {
        return response.status(401).json({ error: "Operation not allowed." });
    }
    await connection('incidents').where('id', id).delete();
    return response.status(204).send();
}



module.exports = {
    list,
    create,
    delete: remove,
}