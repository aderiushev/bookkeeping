module.exports = (app, db) => {
    var queries = require('./queries')(db);

    app.get(['/', '/reports-page', '/categories-page', '/settings-page'], function (req, res) {
        res.render('index')
    });

    app.get("/categories", function (req, res) {
        db.all(queries.categories.read(), [], function (error, rows) {
            var categories = [];
            if (error) {
                console.log(error);
            } else {
                categories = rows
            }
            res.json(categories)
        });
    });

    app.post("/consumptions", function (req, res) {
        if (req.body.category_id && req.body.budget_id && req.body.sum) {
            db.run(queries.consumptions.create(), [req.body.category_id, req.body.budget_id, req.body.sum, req.body.comment], function () {
                var lastId = this.lastID;
                db.get(queries.consumptions.readById(), [lastId], function (error, rows) {
                    if (error) {
                        console.log(error);
                    }
                    res.json(rows)
                });
            });
        }
        else {
            res.send(400);
        }
    });

    app.post("/categories", function (req, res) {
        if (req.body.name) {
            db.run(queries.categories.create(), [req.body.name], function () {
                var lastId = this.lastID;
                db.get(queries.categories.readById(), [lastId], function (error, rows) {
                    if (error) {
                        console.log(error);
                    }
                    res.json(rows)
                });
            });
        }
        else {
            res.send(400);
        }
    });

    app.get("/consumptions", function (req, res) {
        db.all(queries.consumptions.read(), [], function (error, rows) {
            var consumptions = [];
            if (error) {
                console.log(error);
            } else {
                consumptions = rows
            }
            res.json(consumptions)
        });
    });

    app.delete("/consumptions", function (req, res) {
        if (req.body.id) {
            db.run(queries.consumptions.delete(), [req.body.id], function () {
                res.json({status: true});
            });
        }
        else {
            res.send(400);
        }
    });

    app.put("/consumptions", function (req, res) {
        if (req.body.sum && req.body.id) {
            db.run(queries.consumptions.update(), [req.body.sum, req.body.comment, req.body.id], function () {
                res.json({status: true});
            });
        }
        else {
            res.send(400);
        }
    });

    app.put("/categories", function (req, res) {
        if (req.body.name && req.body.id) {
            db.run(queries.categories.update(), [req.body.name, req.body.id], function () {
                res.json({status: true});
            });
        }
        else {
            res.send(400);
        }
    });

    app.delete("/categories", function (req, res) {
        if (req.body.id) {
            db.run(queries.categories.delete(), [req.body.id], function () {
                res.json({status: true});
            });
        }
        else {
            res.send(400);
        }
    });

    app.get("/monthly-chart", function (req, res) {
        var reportData = {columns: [], rows: []};

        var columnsTmp = [];
        var rowsTmp = [];
        db.get(queries.common.monthInfo(), [], function (error, dateRow) {
            db.all(queries.reports.monthlyChart(), [dateRow.start_month, dateRow.end_month], function (error, rows) {
                if (!rows.length) {
                    return res.json(reportData);
                }

                rows.map(function (item) {
                    if (columnsTmp.indexOf(item.cat_id) === -1) {
                        reportData.columns.push({label: item.cat_name, type: 'number'});
                        columnsTmp.push(item.cat_id);
                    }
                });

                var day = 1;
                while (day <= dateRow.days_amount) {
                    if (day > dateRow.now_day) {
                        break;
                    }
                    var rowTmp = Array.apply(null, Array(columnsTmp.length + 1)).map(Number.prototype.valueOf, 0);
                    rowTmp[0] = ("0" + day).slice(-2) + '.' + ("0" + dateRow.now_month).slice(-2);
                    rowsTmp.push(rowTmp);
                    day++;
                }

                rowsTmp.map(function (rowTmp) {
                    rows.map(function (item) {
                        if (item.date == rowTmp[0]) {
                            var columnIndex = columnsTmp.indexOf(item.cat_id);
                            rowTmp[columnIndex + 1] = item.sum;
                        }
                    });
                });
                reportData.rows = rowsTmp;

                res.json(reportData);
            });
        });
    });

    app.get("/monthly-table", function (req, res) {
        var reportData = [];

        db.get(queries.common.monthInfo(), [], function (error, dateRow) {
            db.all(queries.reports.monthlyTable(), [dateRow.start_month, dateRow.end_month], function (error, rows) {
                if (!rows.length) {
                    return res.json(reportData);
                }

                reportData = rows;

                res.json(reportData);
            });
        });

    });

    app.get("/monthly-by-category", function (req, res) {
        var reportData = [];
        db.all(queries.reports.byCategory(), [], function (error, rows) {
            reportData = rows;
            res.json(reportData);
        });

    });

    app.get("/current-budget", function (req, res) {
        db.all(queries.budget.current(), [], function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                res.json(rows[0]);
            }
        });
    });

    app.get("/current-budget-per-day", function (req, res) {
        db.all(queries.budget.currentPerDay(), [], function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                if (rows[0]) {
                    res.json(rows[0].budget_per_day);
                }
                else {
                    res.json(0);
                }
            }
        });
    });

    app.post("/budget", function (req, res) {
        if (req.body.sum) {
            db.run(queries.budget.create(), [req.body.sum, req.body.comment], function () {
                var lastId = this.lastID;
                db.get(queries.budget.readById(), [lastId], function (error, rows) {
                    if (error) {
                        console.log(error);
                    }
                    res.json(rows)
                });
            });
        }
        else {
            res.send(400);
        }
    });

    app.get("/money-left", function (req, res) {
        db.all(queries.common.moneyLeft(), [], function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                res.json(rows[0]);
            }
        });
    });

    app.get("/month", function (req, res) {
        db.all(queries.common.monthInfo(), [], function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                res.json(rows[0]);
            }
        });
    });
};