//Clase entrenamiento
class Entrenamiento {
  /**
   * Constructor de la clase Entrenamiento
   * @param {number} distancia
   * @param {number} tiempo
   */
  constructor(distancia, tiempo) {
    this.distancia = Number(distancia);
    this.tiempo = Number(tiempo);
    this.fecha = new Date().toLocaleString("es-ES");
    this.comentario = "";
    this.velocidad = this.calcularVelocidad();
  }

  /**
   * Calculamos la velocidad en km/h basándonos en distancia y tiempo
   * @returns {string}
   */
  calcularVelocidad() {
    if (this.tiempo === 0) return "0.00";
    const distanciaKm = this.distancia / 1000;
    const tiempoHoras = this.tiempo / 60;
    return (distanciaKm / tiempoHoras).toFixed(2);
  }
}

//Clase persona
class Persona {
  /**
   * Constructor de la clase Persona
   * @param {string} nombreCompleto
   * @param {string} correo
   * @param {number} altura
   * @param {number} peso
   * @param {number} edad
   * @param {string} usuario
   * @param {string} contrasena
   */
  constructor(nombreCompleto, correo, altura, peso, edad, usuario, contrasena) {
    this.nombreCompleto = nombreCompleto;
    this.correo = correo;
    this.altura = Number(altura);
    this.peso = Number(peso);
    this.edad = Number(edad);
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.entrenamientos = [];
  }

  /**
   * Agregamos un nuevo entrenamiento al array
   * @param {Entrenamiento} entrenamiento
   */
  agregarEntrenamiento(entrenamiento) {
    this.entrenamientos.push(entrenamiento);
  }

  /**
   * Obtenemos el entrenamiento con menor tiempo
   * @returns {Entrenamiento|null}
   */
  obtenerMejorTiempo() {
    if (this.entrenamientos.length === 0) return null;
    return this.entrenamientos.reduce((mejor, actual) =>
      actual.tiempo < mejor.tiempo ? actual : mejor,
    );
  }

  /**
   * Obtenemos el entrenamiento con mayor distancia
   * @returns {Entrenamiento|null}
   */
  obtenerMejorDistancia() {
    if (this.entrenamientos.length === 0) return null;
    return this.entrenamientos.reduce((mejor, actual) =>
      actual.distancia > mejor.distancia ? actual : mejor,
    );
  }

  /**
   * Obtener el entrenamiento con mayor velocidad
   * @returns {Entrenamiento|null}
   */
  obtenerMejorVelocidad() {
    if (this.entrenamientos.length === 0) return null;
    return this.entrenamientos.reduce((mejor, actual) =>
      Number(actual.velocidad) > Number(mejor.velocidad) ? actual : mejor,
    );
  }

  /**
   * Calculamos la suma total de distancias de todos los entrenamientos
   * @returns {number}
   */
  obtenerDistanciaTotal() {
    return this.entrenamientos.reduce((total, e) => total + e.distancia, 0);
  }

  /**
   * Calculamos la suma total de tiempos de todos los entrenamientos
   * @returns {number}
   */
  obtenerTiempoTotal() {
    return this.entrenamientos.reduce((total, e) => total + e.tiempo, 0);
  }

  /**
   * Eliminamos un entrenamiento del array por su índice
   * @param {number} index
   */
  eliminarEntrenamiento(index) {
    if (index >= 0 && index < this.entrenamientos.length) {
      this.entrenamientos.splice(index, 1);
    }
  }
}
