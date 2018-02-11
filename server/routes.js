module.exports = (app, db) => {
    var moment = require('moment')
    var queries = require('./queries')(db);

    app.get(['/', '/reports-page', '/categories-page', '/settings-page'], function (req, res) {
        res.render('index')
    });

    app.get("/categories", function (req, res) {
        db.all(queries.categories.read(), [], function (error, rows) {
            if (error) {
                res.status(500).send(error)
            } else {
                res.json(rows)
            }
        });
    });

    app.post("/consumptions", function (req, res) {
        if (req.body.category_id && req.body.sum) {
            db.run(queries.consumptions.create(), [req.body.category_id, 0, req.body.sum, req.body.comment], function () {
                var lastId = this.lastID;
                db.get(queries.consumptions.readById(), [lastId], function (error, rows) {
                    if (error) {
                        res.status(500).send(error)
                    } else {
                        res.json(rows)
                    }
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
                        res.status(500).send(error)
                    } else {
                        res.json(rows)
                    }
                });
            });
        }
        else {
            res.send(400);
        }
    });

    app.get("/consumptions", function (req, res) {
        db.all(queries.consumptions.read(), [], function (error, rows) {
            if (error) {
                res.status(500).send(error)
            } else {
                res.json(rows)
            }
           
        });
    });

    app.delete("/consumptions", function (req, res) {
        if (req.body.id) {
            db.run(queries.consumptions.delete(), { ':id': req.body.id }, function (error) {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.json({ id: req.body.id });
                }
            });
        }
        else {
            res.send(400);
        }
    });

    app.put("/consumptions", function (req, res) {
        if (req.body.id, req.body.consumption) {
            db.run(queries.consumptions.update(), { ':id': req.body.id, ':sum': req.body.consumption.sum, ':comment': req.body.consumption.comment }, function (error) {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.json(req.body);
                }
            });
        }
        else {
            res.send(400);
        }
    });

    app.put("/categories", function (req, res) {
        if (req.body.id && req.body.category) {
            db.run(queries.categories.update(), { ':id': req.body.id, ':name': req.body.category.name }, function (error) {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.json(req.body);
                }
            });
        }
        else {
            res.sendStatus(400);
        }
    });

    app.delete("/categories", function (req, res) {
        if (req.body.id) {
            db.run(queries.categories.delete(), { ':id': req.body.id }, function (error) {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.json({ id: req.body.id });
                }
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

        db.all(queries.reports.monthlyChart(), [req.query.startDate, req.query.endDate], function (error, rows) {
            if (!rows.length) {
                return res.json(reportData);
            }

            rows.map(function (item) {
                if (columnsTmp.indexOf(item.cat_id) === -1) {
                    reportData.columns.push({ label: item.cat_name, type: 'number' });
                    columnsTmp.push(item.cat_id);
                }
            });

            var currentDate = moment(req.query.startDate)
            while (currentDate <= moment(req.query.endDate)) {
                var rowTmp = new Array(columnsTmp.length + 1).fill(0)
                rowTmp[0] = currentDate.format('DD.MM');
                rowsTmp.push(rowTmp);
                currentDate.add(1, 'day')
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

    app.get("/budget-chart", function (req, res) {
        var reportData = {columns: [], rows: []};

        var columnsTmp = [];
        var rowsTmp = [];

        db.all(queries.reports.budgetChart.consumption(), [req.query.startDate, req.query.endDate], function (error, consumptionRows) {
            db.all(queries.reports.budgetChart.budget(), [req.query.startDate, req.query.endDate], function (error, budgetRows) {
                reportData = { columns: [], rows: []}
                reportData.columns = [{ label: 'Budget', type: 'number' }];

                var currentDate = moment(req.query.startDate)
                var currentBudget = { sum: 0 }
                while (currentDate <= moment(req.query.endDate)) {
                    var formattedDate = currentDate.format('DD.MM')
                    var budgetChange = budgetRows.find(budgetRow => budgetRow.date === formattedDate)
                    if (budgetChange) {
                        currentBudget.sum += budgetChange.sum
                    }
                    
                    var currentConsumptions = consumptionRows.find(consumptionRow => consumptionRow.date === formattedDate)
                    if (currentConsumptions) {
                       currentBudget.sum = currentBudget.sum - currentConsumptions.sum
                    }
                    rowsTmp.push([
                        formattedDate,
                        currentBudget.sum
                    ]);

                    currentDate.add(1, 'day')
                }

                reportData.rows = rowsTmp

                res.json(reportData);
            })
        });
    });

    app.get("/monthly-table", function (req, res) {
        var reportData = [];

        db.all(queries.reports.monthlyTable(), [req.query.startDate, req.query.endDate], function (error, rows) {
            if (!rows.length) {
                return res.json(reportData);
            }

            reportData = rows;

            res.json(reportData);
        });
    });

    app.get("/monthly-by-category", function (req, res) {
        var reportData = [];
        db.all(queries.reports.byCategory(), [req.query.startDate, req.query.endDate], function (error, rows) {
            reportData = rows;
            res.json(reportData);
        });

    });

    app.get("/budget", function (req, res) {
        db.all(queries.budget.current(), [], function (error, rows) {
            if (error) {
                console.log(error);
            } else {
                res.json(rows[0]);
            }
        });
    });

    app.put("/budget", function (req, res) {
        if (req.body.id && req.body.budget) {
            db.run(queries.budget.update(), { ':id': req.body.id, ':sum': req.body.budget.sum, ':comment': req.body.budget.comment }, function (error) {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.json(req.body);
                }
            });
        }
        else {
            res.sendStatus(400);
        }
    });

    app.delete("/budget", function (req, res) {
        if (req.body.id) {
            db.run(queries.budget.delete(), { ':id': req.body.id }, function (error) {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.json({ id: req.body.id });
                }
            });
        }
        else {
            res.send(400);
        }
    });


    // app.get("/current-budget-per-day", function (req, res) {
    //     db.all(queries.budget.currentPerDay(), [], function (error, rows) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             if (rows[0]) {
    //                 res.json(rows[0].budget_per_day);
    //             }
    //             else {
    //                 res.json(0);
    //             }
    //         }
    //     });
    // });

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

    app.get("/budgets", function (req, res) {
        db.all(queries.budget.read(), [], function (error, rows) {
            if (error) {
                res.status(500).send(error)
            } else {
                res.json(rows)
            }
           
        });
    });
};