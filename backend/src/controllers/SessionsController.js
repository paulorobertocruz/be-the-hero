const connection = require("../database/connection");

module.exports = {
    async create(request, response) {
        const { id } = request.body;        
        const non_profit = await connection('non_profits')
            .where('id', id)
            .select('name')
            .first();
        
        return response.json(non_profit);
    }
}