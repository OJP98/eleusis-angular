//*Estructura de datos para almacenar clientes
clientes = {
  sala: {
    clientes: [clientes],
    regla: 'String',
    baraja: [cartas],
    cartasAplican: [cartas],
    cartasNoAplican: [cartas],
    dios: Number,
    turno: Number,
  },
};

//?ejemplo
clientes = {
  1: {
    clientes: [obj1, obj2, obj3],
    regla: 'RGB',
    cartas: [carta1, carta2, '...'],
    dios: obj1,
    turno: 1,
  },
  2: {
    clientes: [obj4, obj5, obj6],
    regla: 'BGR',
    cartas: [carta25, carta36, '...'],
    dios: obj5,
    turno: 2,
  },
};

/*
 *###################################################
 */

//*Opciones de requests con estructura

//?Option 1
conectar = {
  sala: Number,
  user: 'String',
};
//!Retorna
status = Number;
id: Number;

//?Option 2
mensaje = {
  sala: Number,
  user: 'String',
  id: Number,
  mensaje: 'String',
};
//!Retorna
status = Number;

//?Option 3
jugada = {
  sala: Number,
  user: 'String',
  id: Number,
  cartaJugada: 'String',
};
//!Retorna a todos

//?Option 4
noJugada = {
  sala: Number,
  user: 'String',
  id: Number,
  cartas: [cartas],
};
//!Retorna a todos

//?Option 5
adivinar = {
  sala: Number,
  user: 'String',
  id: Number,
  regla: 'String',
};
//!Retorna a todos

/*
 *###################################################
 */
//*Estructura del request
Estructura_de_request = {
  option: Number,
  param1: 'Number/String',
  param2: 'Number/String',
};

//?ejemplo
Estructura_de_request = {
  option: 1,
  sala: 5001,
  user: 'BigJ',
};
