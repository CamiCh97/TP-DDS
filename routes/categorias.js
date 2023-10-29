const express = require('express');
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/categorias", async function (req, res, next) {
  let data = await db.categorias.findAll({
    attributes: ["IdCategoria", "Nombre"],
  });
  res.json(data);
});


router.get("/api/categorias/:id", async function (req, res, next) {
    // #swagger.tags = ['categorias']
    // #swagger.summary = 'obtiene una categoria'
    // #swagger.parameters['id'] = { description: 'identificador de categorias...' }
    let data = await db.categorias.findAll({
      attributes: ["IdCategoria", "Nombre"],
      where: { IdCategoria: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

  
module.exports = router;
