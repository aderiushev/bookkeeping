module.exports = db => ({
  categories: {
    create: () => 'INSERT INTO category(name) VALUES(?)',
    read: () => "SELECT category.id, category.name,  strftime('%d.%m.%Y %H:%m', category.ts) as date FROM category ORDER BY category.ts DESC",
    readById: () => "SELECT category.id, category.name, strftime('%d.%m.%Y %H:%m', category.ts) as date FROM category WHERE category.id = ?",
    update: () => 'UPDATE category SET name = :name WHERE id = :id',
    delete: () => 'DELETE FROM category WHERE id = :id',
  },
  consumptions: {
    create: () => 'INSERT INTO consumption(category_id, budget_id, sum, comment) VALUES(?, ?, ?, ?)',
    read: () => "SELECT consumption.id, category.name, consumption.sum, consumption.comment, strftime('%d.%m.%Y %H:%m', consumption.ts) as date FROM consumption INNER JOIN category ON consumption.category_id = category.id ORDER BY consumption.ts DESC LIMIT 200",
    readById: () => "SELECT consumption.id, category.name, consumption.sum, consumption.comment, strftime('%d.%m.%Y %H:%m', consumption.ts) as date FROM consumption INNER JOIN category ON consumption.category_id = category.id WHERE consumption.id = ?",
    update: () => 'UPDATE consumption SET sum = :sum, comment = :comment WHERE id = :id',
    delete: () => 'DELETE FROM consumption WHERE id = :id',
  },
  report: {
    categoryConsumptionSum: () => `SELECT COALESCE(sum(consumption.sum), 0) as sum, category.name from consumption
                INNER JOIN category on category.id = consumption.category_id
                WHERE consumption.ts >= ?
                AND strftime('%Y-%m-%d', consumption.ts) <= ?
                GROUP BY category.id
                ORDER BY sum DESC`,
    totalSpent: () => ` SELECT COALESCE(SUM(consumption.sum), 0) as total FROM consumption
                WHERE consumption.ts >= ?
                AND strftime('%Y-%m-%d', consumption.ts) <= ?`,
  },
});
