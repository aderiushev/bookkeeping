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
      }
      else {
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

  app.delete("/api/categories", function (req, res) {
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

  app.get("/api/monthly-chart", function (req, res) {
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

  app.get("/api/monthly-table", function (req, res) {
      var reportData = [];

      db.all(queries.reports.monthlyTable(), [req.query.startDate, req.query.endDate], function (error, rows) {
          if (!rows.length) {
              return res.json(reportData);
          }

          reportData = rows;

          res.json(reportData);
      });
  });

  app.get("/api/monthly-by-category", function (req, res) {
      var reportData = [];
      db.all(queries.reports.byCategory(), [req.query.startDate, req.query.endDate], function (error, rows) {
          reportData = rows;
          res.json(reportData);
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