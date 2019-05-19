module.exports = (app, db) => {
  const moment = require('moment');
  const queries = require('./queries')(db);

  app.get(['/', '/reports', '/categories', '/settings'], function (req, res) {
    res.render('index');
  });

  app.get('/api/categories', function (req, res) {
    db.all(queries.categories.read(), [], (error, rows) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(rows);
      }
    });
  });

  app.post('/api/consumptions', function (req, res) {
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
    } else {
      res.send(400);
    }
  });

  app.post("/api/categories", function (req, res) {
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

  app.get("/api/consumptions", function (req, res) {
    db.all(queries.consumptions.read(), [], function (error, rows) {
      if (error) {
        res.status(500).send(error)
      } else {
        res.json(rows)
      }

    });
  });

  app.delete("/api/consumptions", function (req, res) {
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

  app.put("/api/consumptions", function (req, res) {
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

  app.put("/api/categories", function (req, res) {
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

  app.delete('/api/categories', (req, res) => {
    if (req.body.id) {
      db.run(queries.categories.delete(), { ':id': req.body.id }, (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.json({ id: req.body.id });
        }
      });
    } else {
      res.send(400);
    }
  });

  app.get('/api/report/category-consumption-sum', (req, res) => {
    db.all(queries.report.categoryConsumptionSum(), [req.query.startDate, req.query.endDate], (error, rows) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(rows);
      }
    });
  });

  app.get('/api/report/total-spent', (req, res) => {
    db.get(queries.report.totalSpent(), [req.query.startDate, req.query.endDate], (error, row) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(row.total);
      }
    });
  });
};
