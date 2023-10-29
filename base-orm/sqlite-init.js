// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;


  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'categorias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table categorias( IdCategoria INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("tabla categorias creada!");
    await db.run(
      "insert into categorias values (1,'Higiene'),(2,'Limpieza'),(3,'Mascotas'),(4,'Almacen'),(5,'Lácteos'),(6,'Carnicería');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'productos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table productos( 
              Idproductos INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Precio real
            , CodigoDeBarra
            , Idcategoria integer
            , Stock integer
            , FechaAlta text
            , Activo boolean,
            FOREIGN KEY (IdCategoria) REFERENCES categorias(IdCategoria)
            );`
    );
    console.log("tabla productos creada!");

    await db.run(
        `insert into productos values
        (1,'Jabón', '300', 10273847293874, 1, 329,'2017-01-19', 1 ),
        (2,'Talco', '800', 10245667753456, 1, 600,'2017-05-30', 1 ),
        (3,'Lavandina', '1200', 12435387945714, 2, 420,'2016-12-02', 1 ),
        (4,'Perfumina', '900', 12609380375847, 2, 500,'2017-01-04', 1 ),
        (5,'Alimento balanceado', '2000', 15182746596826, 3, 300,'2017-08-22', 1 ),
        (6,'Arroz', '700', 15048571628394, 4, 1000,'2018-02-14', 1 ),
        (7,'Leche', '750', 14238574629485, 5, 300,'2019-12-12', 1 ),
        (8,'Yogurth', '1000', 10273847293459, 5, 410,'2019-08-10', 1 ),
        (9,'Pollo', '2200', 151285630576, 6, 520,'2019-09-10', 1 ),
        (10,'Fideo', '460', 15294857023851, 4, 500,'2019-01-21', 1 )
        ;`
        );
    }
  
    db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
