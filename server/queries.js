module.exports = (db) => {
    return {
        common: {
            moneyLeft: () => {
                return `SELECT COALESCE(SUM(b.sum), 0) - 
                    (
                        SELECT COALESCE(SUM(c.sum), 0) 
                        FROM consumption c
                    ) moneyLeft FROM budget b`;
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
                return "UPDATE category SET name = :name WHERE id = :id";
            },
            delete: () => {
                return "DELETE FROM category WHERE id = :id";
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
                return "UPDATE consumption SET sum = :sum, comment = :comment WHERE id = :id";
            },
            delete: () => {
                return "DELETE FROM consumption WHERE id = :id";
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
                    AND strftime('%Y-%m-%d', cons.ts) <= ?
                    GROUP BY date, cat_id ORDER BY date`;
            },
            budgetChart: { 
                consumption: () => {
                    return `SELECT SUM(c.sum) sum, strftime('%d.%m',  c.ts)  date
                        FROM consumption c
                        WHERE c.ts >= ?
                        AND strftime('%Y-%m-%d', c.ts) <= ?
                        GROUP by date
                        ORDER BY date`
                },
                budget: () => {
                    return `
                        SELECT b.sum sum, strftime('%d.%m',  b.ts) date
                        FROM budget b
                        WHERE b.ts >= ?
                        AND strftime('%Y-%m-%d', b.ts) <= ?
                        GROUP BY date
                        ORDER BY date`
                }             
            },
            monthlyTable: () => {
                return `SELECT strftime('%d.%m', cons.ts) AS date,
                    sum(cons.sum) AS sum,
                    GROUP_CONCAT(cons.comment, '; ') as comments,
                    GROUP_CONCAT(cat.name, '; ') AS categories
                    FROM consumption cons
                    INNER JOIN category cat ON cat.id = cons.category_id
                    WHERE cons.ts >= ?
                    AND strftime('%Y-%m-%d', cons.ts) <= ?
                    GROUP BY date ORDER BY date DESC`;
            },
            byCategory: () => {
                return `SELECT COALESCE(sum(consumption.sum), 0) as sum, category.name from consumption
                    INNER JOIN category on category.id = consumption.category_id
                    WHERE consumption.ts >= ?
                    AND strftime('%Y-%m-%d', consumption.ts) <= ?
                    GROUP BY category.id
                    ORDER BY sum DESC`
            }
        },
        budget: {
            create: () => {
                return "INSERT INTO budget(sum, comment) VALUES(?, ?)";
            },
            readById: () => {
                return "SELECT id, COALESCE(sum, 0) as sum, comment, strftime('%d.%m.%Y %H:%m', ts) as date from budget WHERE budget.id = ?";
            },
            current: () => {
                return "SELECT id, COALESCE(sum, 0) as sum, comment from budget " +
                    "WHERE ts >= date('now', 'start of month') " +
                    "AND ts <  date('now','start of month','+1 month') " +
                    "ORDER BY ts DESC LIMIT 1";
            },
            read: () => {
                return "SELECT budget.id, budget.sum, budget.comment, strftime('%d.%m.%Y %H:%m', budget.ts) as date FROM budget ORDER BY budget.ts DESC LIMIT 20"
            },
            update: () => {
                return "UPDATE budget SET sum = :sum, comment = :comment WHERE id = :id";
            },
            delete: () => {
                return "DELETE FROM budget WHERE id = :id";
            }
            // currentPerDay: () => {
            //     return "SELECT COALESCE(sum, 0) / strftime('%d', date('now','start of month','+1 month', '-1 day')) as budget_per_day from budget " +
            //         "WHERE ts >= date('now', 'start of month') " +
            //         "AND ts < date('now','start of month','+1 month') " +
            //         "ORDER BY ts DESC LIMIT 1";
            // }
        }
    }
};