module.exports = (db) => {
    return {
        common: {
            moneyLeft: () => {
                return `SELECT COALESCE(budget.sum, 0) - COALESCE(sum(consumption.sum), 0) as moneyLeft from budget
                    LEFT JOIN consumption on consumption.budget_id  = budget.id
                    ORDER BY budget.ts DESC
                    LIMIT 1`;
            },
            monthInfo: () => {
                return `SELECT date('now', 'start of month') AS start_month,
                    date('now','start of month','+1 month','-1 day') AS end_month,
                    strftime('%m', 'now') as now_month,
                    strftime('%d', 'now') as now_day,
                    strftime('%d', date('now','start of month','+1 month','-1 day')) AS days_amount,
                    strftime('%d', date('now','start of month','+1 month','-1 day')) - strftime('%d', 'now') as days_left`;
            }
        },
        categories: {
            create: () => {
                return "INSERT INTO category(name) VALUES(?)";
            },
            read: () => {
                return "SELECT category.id, category.name,  strftime('%d.%m.%Y %H:%m', category.ts) as date FROM category ORDER BY category.ts DESC";
            },
            readById: () => {
                return "SELECT category.id, category.name, strftime('%d.%m.%Y %H:%m', category.ts) as date FROM category WHERE category.id = ?";
            },
            update: () => {
                return "UPDATE category SET name = ? WHERE id = ?";
            },
            delete: () => {
                return "DELETE FROM category WHERE id = ?";
            }
        },
        consumptions: {
            create: () => {
                return "INSERT INTO consumption(category_id, budget_id, sum, comment) VALUES(?, ?, ?, ?)";
            },
            read: () => {
                return "SELECT consumption.id, category.name, consumption.sum, consumption.comment, strftime('%d.%m.%Y %H:%m', consumption.ts) as date FROM consumption INNER JOIN category ON consumption.category_id = category.id ORDER BY consumption.ts DESC LIMIT 20";
            },
            readById: () => {
                return "SELECT consumption.id, category.name, consumption.sum, consumption.comment, strftime('%d.%m.%Y %H:%m', consumption.ts) as date FROM consumption INNER JOIN category ON consumption.category_id = category.id WHERE consumption.id = ?";
            },
            update: () => {
                return "UPDATE consumption SET sum = ?, comment = ? WHERE id = ?";
            },
            delete: () => {
                return "DELETE FROM consumption WHERE id = ?";
            }
        },
        reports : {
            monthlyChart: () => {
                return `SELECT strftime('%d.%m', cons.ts) AS date,
                    sum(cons.sum) AS sum,
                    cons.category_id AS cat_id,
                    cat.name AS cat_name
                    FROM consumption cons
                    INNER JOIN category cat ON cat.id = cons.category_id
                    WHERE cons.ts >= ?
                    AND cons.ts < ?
                    GROUP BY date, cat_id ORDER BY date`;
            },
            monthlyTable: () => {
                return `SELECT strftime('%d.%m', cons.ts) AS date,
                    sum(cons.sum) AS sum,
                    GROUP_CONCAT(cons.comment, '; ') as comments,
                    GROUP_CONCAT(cat.name, '; ') AS categories
                    FROM consumption cons
                    INNER JOIN category cat ON cat.id = cons.category_id
                    WHERE cons.ts >= ?
                    AND cons.ts < ?
                    GROUP BY date ORDER BY date DESC`;
            },
            byCategory: () => {
                return `SELECT COALESCE(sum(consumption.sum), 0) as sum, category.name from consumption
                    INNER JOIN category on category.id = consumption.category_id
                    WHERE consumption.ts >= date('now', 'start of month')
                    AND consumption.ts < date('now','start of month','+1 month')
                    GROUP BY category.id
                    ORDER BY sum DESC`
            }
        },
        budget: {
            create: () => {
                return "INSERT INTO budget(sum, comment) VALUES(?, ?)";
            },
            readById: () => {
                return "SELECT COALESCE(sum, 0) as sum, strftime('%m.%Y', 'now') date, comment from budget WHERE budget.id = ?";
            },
            current: () => {
                return "SELECT id, COALESCE(sum, 0) as sum, strftime('%m.%Y', 'now') date, comment from budget " +
                    "WHERE ts >= date('now', 'start of month') " +
                    "AND ts <  date('now','start of month','+1 month') " +
                    "ORDER BY ts DESC LIMIT 1";
            },
            currentPerDay: () => {
                return "SELECT COALESCE(sum, 0) / strftime('%d', date('now','start of month','+1 month', '-1 day')) as budget_per_day from budget " +
                    "WHERE ts >= date('now', 'start of month') " +
                    "AND ts < date('now','start of month','+1 month') " +
                    "ORDER BY ts DESC LIMIT 1";
            }
        }
    }
};