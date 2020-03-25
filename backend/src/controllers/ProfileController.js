const connection = require("../database/connection");

module.exports = {
    async list(request, response) {
        const non_profit_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('non_profit_id', non_profit_id)
            .select('*')
        return response.json(incidents);
    }
}