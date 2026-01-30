//Variables
let usuarioActual = null;
let personas = [];

//Inicializar y cargar los datos de los usuarios de prueba
const inicializar = () => {
  cargarDatos();
  crearUsuariosPrueba();
};

//Localstorage
//Cargamos los datos de personas del localstorage e intanciamos Persona y Entrenamiento
const cargarDatos = () => {
  const datosGuardados = localStorage.getItem("personas");
  if (datosGuardados) {
    const datosParseados = JSON.parse(datosGuardados);
    personas = datosParseados.map((p) => {
      const persona = new Persona(
        p.nombreCompleto,
        p.correo,
        p.altura,
        p.peso,
        p.edad,
        p.usuario,
        p.contrasena,
      );
      persona.entrenamientos = (p.entrenamientos || []).map((e) => {
        const ent = new Entrenamiento(e.distancia, e.tiempo);
        ent.fecha = e.fecha;
        ent.comentario = e.comentario || "";
        return ent;
      });
      return persona;
    });
  }
};

//Guardamos el array de Personas en el localStorage
const guardarDatos = () => {
  localStorage.setItem("personas", JSON.stringify(personas));
};
//Creamos usuarios si no existen
const crearUsuariosPrueba = () => {
  if (personas.length === 0) {
    const usuario1 = new Persona(
      "Luz García",
      "luz@gmail.com",
      175,
      65,
      25,
      "luz",
      "1234",
    );
    const usuario2 = new Persona(
      "Darío García",
      "dario@gmail.com",
      195,
      90,
      30,
      "dario",
      "1234",
    );

    //Agregamos entrenamientos
    usuario1.agregarEntrenamiento(new Entrenamiento(5000, 30));
    usuario1.agregarEntrenamiento(new Entrenamiento(3000, 20));
    usuario2.agregarEntrenamiento(new Entrenamiento(4000, 25));

    personas.push(usuario1, usuario2);
    guardarDatos();
  }
};

//Notificaciones visuales

/**Mostramos mensaje en la interfaz
 * @param {string} mensaje
 * @param {string} tipo
 */
const mostrarMensaje = (mensaje, tipo = "info") => {
  const contenedor = document.getElementById("mensajeNotificacion");
  //Limpiamos clases
  contenedor.className = "mensaje-notificacion";
  contenedor.classList.add(tipo);
  contenedor.textContent = mensaje;

  // Mostramos mensaje
  contenedor.classList.remove("oculto");

  //Ocultamos después de 2 segundos
  setTimeout(() => {
    contenedor.classList.add("oculto");
  }, 2000);
};

/**
 * Mostramos modal de confirmación
 * @param {string} mensaje
 * @param {function} callback
 */
const mostrarConfirmacion = (mensaje, callback) => {
  const modal = document.getElementById("modalConfirmacion");
  const mensajeModal = document.getElementById("mensajeModal");
  const btnConfirmar = document.getElementById("btnConfirmar");
  const btnCancelar = document.getElementById("btnCancelar");

  mensajeModal.textContent = mensaje;
  modal.classList.remove("oculto");

  //Manejo de confirmación
  btnConfirmar.onclick = () => {
    modal.classList.add("oculto");
    callback();
  };

  //Manejo de cancelación
  btnCancelar.onclick = () => {
    modal.classList.add("oculto");
  };
};

//Navegación entre las secciones

//Ocultamos todas las secciones de la interfaz
const ocultarTodo = () => {
  document
    .querySelectorAll(
      ".menu-principal, .formulario, #menuUsuario, #listaEntrenamientos, #mejorEntrenamiento, #resumenEntrenamientos, #eliminarEntrenamientos, #foro",
    )
    .forEach((e) => {
      e.classList.add("oculto");
    });
};

//Volver al menú principal

const volverInicio = () => {
  ocultarTodo();
  document.querySelector(".menu-principal").classList.remove("oculto");
  limpiarFormularios();
};

//Volver al menú del usuario autenticado
const volverMenuUsuario = () => {
  ocultarTodo();
  document.getElementById("menuUsuario").classList.remove("oculto");
};

//Volver al menú correspondiente según el estado de autenticación
const volverMenuActual = () => {
  if (usuarioActual) {
    volverMenuUsuario();
  } else {
    volverInicio();
  }
};

//Limpiar todos los campos de entrada de formularios
const limpiarFormularios = () => {
  document
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.value = ""));
};

//Fn para mostrar las secciones
const mostrarRegistro = () => {
  ocultarTodo();
  document.getElementById("formRegistro").classList.remove("oculto");
};

const mostrarLogin = () => {
  ocultarTodo();
  document.getElementById("formLogin").classList.remove("oculto");
};

const mostrarForo = () => {
  ocultarTodo();
  document.getElementById("foro").classList.remove("oculto");
  cargarComentariosForo();
};

const mostrarAgregarEntrenamiento = () => {
  ocultarTodo();
  document.getElementById("formEntrenamiento").classList.remove("oculto");
};

const mostrarEntrenamientos = () => {
  ocultarTodo();
  document.getElementById("listaEntrenamientos").classList.remove("oculto");
  listarEntrenamientos();
};

const mostrarMejorEntrenamiento = () => {
  ocultarTodo();
  document.getElementById("mejorEntrenamiento").classList.remove("oculto");
  document.getElementById("resultadoMejor").classList.add("oculto");
};

const mostrarResumen = () => {
  ocultarTodo();
  document.getElementById("resumenEntrenamientos").classList.remove("oculto");
  mostrarResumenEntrenamientos();
};

const mostrarEliminarEntrenamientos = () => {
  ocultarTodo();
  document.getElementById("eliminarEntrenamientos").classList.remove("oculto");
  listarEntrenamientosEliminar();
};

//Validaciones
/**
 * Validar formato de email
 * @param {string} email
 * @returns {boolean} True si el email es válido
 */
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validar los datos del formulario
 * @param {Object} datos
 * @returns {boolean} True si todos los datos son válidos
 */
const validarRegistro = (datos) => {
  if (!datos.nombreCompleto || datos.nombreCompleto.trim().length < 3) {
    mostrarMensaje(
      "El nombre completo debe tener al menos 3 caracteres",
      "error",
    );
    return false;
  }
  if (!validarEmail(datos.correo)) {
    mostrarMensaje("El correo electrónico no es válido", "error");
    return false;
  }
  if (datos.altura <= 0 || datos.altura > 230) {
    mostrarMensaje("La altura debe estar entre 1 y 230 cm", "error");
    return false;
  }
  if (datos.peso <= 0 || datos.peso > 180) {
    mostrarMensaje("El peso debe estar entre 1 y 180 kg", "error");
    return false;
  }
  if (datos.edad < 10 || datos.edad > 120) {
    mostrarMensaje("La edad debe estar entre 10 y 120 años", "error");
    return false;
  }
  if (!datos.usuario || datos.usuario.trim().length < 3) {
    mostrarMensaje("El usuario debe tener al menos 3 caracteres", "error");
    return false;
  }
  if (!datos.contrasena || datos.contrasena.length < 4) {
    mostrarMensaje("La contraseña debe tener al menos 4 caracteres", "error");
    return false;
  }

  //Verificamos que el usuario no existe
  if (personas.some((p) => p.usuario === datos.usuario)) {
    mostrarMensaje("El usuario ya existe", "error");
    return false;
  }

  return true;
};

//REgistro y autenticación
//Registramos una nueva persona en el sistema
const registrarPersona = () => {
  const datos = {
    nombreCompleto: document.getElementById("nombreCompleto").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    altura: parseFloat(document.getElementById("altura").value),
    peso: parseFloat(document.getElementById("peso").value),
    edad: parseInt(document.getElementById("edad").value),
    usuario: document.getElementById("usuario").value.trim(),
    contrasena: document.getElementById("contrasena").value.trim(),
  };

  if (!validarRegistro(datos)) return;

  const persona = new Persona(
    datos.nombreCompleto,
    datos.correo,
    datos.altura,
    datos.peso,
    datos.edad,
    datos.usuario,
    datos.contrasena,
  );

  personas.push(persona);
  guardarDatos();
  mostrarMensaje("Usuario registrado correctamente", "exito");

  setTimeout(() => {
    volverInicio();
  }, 2000);
};

//Inciamos sesion de usuario
const iniciarSesion = () => {
  const usuario = document.getElementById("loginUsuario").value.trim();
  const contrasena = document.getElementById("loginContrasena").value.trim();

  const persona = personas.find(
    (p) => p.usuario === usuario && p.contrasena === contrasena,
  );

  if (persona) {
    usuarioActual = persona;
    ocultarTodo();
    document.getElementById("menuUsuario").classList.remove("oculto");
    document.getElementById("bienvenida").textContent =
      `¡Hola, ${persona.nombreCompleto}!`;
    mostrarMensaje(`Sesión iniciada como ${persona.usuario}`, "exito");
  } else {
    mostrarMensaje("Usuario o contraseña incorrectos", "error");
  }
};

//Cerramos sesión de usuario actual
const cerrarSesion = () => {
  usuarioActual = null;
  mostrarMensaje("Sesión cerrada correctamente", "info");
  setTimeout(() => {
    volverInicio();
  }, 1500);
};

//Gestión de entrenamientos
//Agregamos un nuevo entrenamiento al usuario logueado
const agregarEntrenamiento = () => {
  const distancia = parseFloat(document.getElementById("distancia").value);
  const tiempo = parseFloat(document.getElementById("tiempo").value);

  if (!distancia || distancia <= 0) {
    mostrarMensaje("La distancia debe ser mayor a 0", "error");
    return;
  }

  if (!tiempo || tiempo <= 0) {
    mostrarMensaje("El tiempo debe ser mayor a 0", "error");
    return;
  }

  const entrenamiento = new Entrenamiento(distancia, tiempo);
  usuarioActual.agregarEntrenamiento(entrenamiento);
  guardarDatos();

  mostrarMensaje("Entrenamiento agregado correctamente", "exito");
  limpiarFormularios();

  setTimeout(() => {
    volverMenuUsuario();
  }, 1500);
};

//Listamos todos los entrenamientos del user usando creación de nodos
const listarEntrenamientos = () => {
  const lista = document.getElementById("entrenamientosLista");
  lista.innerHTML = "";

  if (usuarioActual.entrenamientos.length === 0) {
    const li = document.createElement("li");
    li.className = "nota";
    li.textContent = "No hay entrenamientos registrados";
    lista.appendChild(li);
    return;
  }

  usuarioActual.entrenamientos.forEach((e, index) => {
    //Creamos elemento li
    const li = document.createElement("li");
    li.className = "nota";

    //Creamos contenedor div
    const contenedor = document.createElement("div");

    //Distancia
    const distanciaLabel = document.createElement("strong");
    distanciaLabel.textContent = "Distancia: ";
    contenedor.appendChild(distanciaLabel);
    contenedor.appendChild(document.createTextNode(`${e.distancia} m`));
    contenedor.appendChild(document.createElement("br"));

    //Tiempo
    const tiempoLabel = document.createElement("strong");
    tiempoLabel.textContent = "Tiempo: ";
    contenedor.appendChild(tiempoLabel);
    contenedor.appendChild(document.createTextNode(`${e.tiempo} min`));
    contenedor.appendChild(document.createElement("br"));

    //Velocidad
    const velocidadLabel = document.createElement("strong");
    velocidadLabel.textContent = "Velocidad: ";
    contenedor.appendChild(velocidadLabel);
    contenedor.appendChild(document.createTextNode(`${e.velocidad} km/h`));
    contenedor.appendChild(document.createElement("br"));

    //Fecha
    const fechaLabel = document.createElement("strong");
    fechaLabel.textContent = "Fecha: ";
    contenedor.appendChild(fechaLabel);
    contenedor.appendChild(document.createTextNode(e.fecha));
    contenedor.appendChild(document.createElement("br"));

    //Comentario
    const comentarioLabel = document.createElement("strong");
    comentarioLabel.textContent = "Comentario: ";
    contenedor.appendChild(comentarioLabel);
    contenedor.appendChild(document.createElement("br"));

    const inputComentario = document.createElement("input");
    inputComentario.type = "text";
    inputComentario.value = e.comentario;
    inputComentario.className = "entrada-nota";
    inputComentario.placeholder = "Añade un comentario...";
    inputComentario.addEventListener("change", () => {
      agregarComentario(index, inputComentario.value);
    });
    contenedor.appendChild(inputComentario);

    li.appendChild(contenedor);
    lista.appendChild(li);
  });
};

/**
 * Agregamos un comentario a un entrenamiento específico
 * @param {number} index
 * @param {string} comentario
 */
const agregarComentario = (index, comentario) => {
  usuarioActual.entrenamientos[index].comentario = comentario;
  guardarDatos();
  mostrarMensaje("Comentario guardado", "exito");
};

//Mejores entrenamientos:
const mostrarMejorTiempo = () => {
  const mejor = usuarioActual.obtenerMejorTiempo();
  mostrarResultadoMejor(
    mejor,
    "Mejor Tiempo",
    mejor ? `${mejor.tiempo} minutos` : null,
  );
};

const mostrarMejorDistancia = () => {
  const mejor = usuarioActual.obtenerMejorDistancia();
  mostrarResultadoMejor(
    mejor,
    "Mejor Distancia",
    mejor ? `${mejor.distancia} metros` : null,
  );
};

const mostrarMejorVelocidad = () => {
  const mejor = usuarioActual.obtenerMejorVelocidad();
  mostrarResultadoMejor(
    mejor,
    "Mejor Velocidad",
    mejor ? `${mejor.velocidad} km/h` : null,
  );
};

/**Mostramos el resultado del mejor entrenamiento usando creación de nodos
 * @param {Entrenamiento} entrenamiento
 * @param {string} titulo
 * @param {string} valor
 */
const mostrarResultadoMejor = (entrenamiento, titulo, valor) => {
  const resultado = document.getElementById("resultadoMejor");
  resultado.innerHTML = "";
  if (!entrenamiento) {
    const p = document.createElement("p");
    p.textContent = "No hay entrenamientos registrados";
    resultado.appendChild(p);
  } else {
    const tituloLabel = document.createElement("strong");
    tituloLabel.textContent = `${titulo}: `;
    resultado.appendChild(tituloLabel);
    resultado.appendChild(document.createTextNode(valor));
    resultado.appendChild(document.createElement("br"));

    const distanciaLabel = document.createElement("strong");
    distanciaLabel.textContent = "Distancia: ";
    resultado.appendChild(distanciaLabel);
    resultado.appendChild(
      document.createTextNode(`${entrenamiento.distancia} m`),
    );
    resultado.appendChild(document.createElement("br"));

    const tiempoLabel = document.createElement("strong");
    tiempoLabel.textContent = "Tiempo: ";
    resultado.appendChild(tiempoLabel);
    resultado.appendChild(
      document.createTextNode(`${entrenamiento.tiempo} min`),
    );
    resultado.appendChild(document.createElement("br"));

    const velocidadLabel = document.createElement("strong");
    velocidadLabel.textContent = "Velocidad: ";
    resultado.appendChild(velocidadLabel);
    resultado.appendChild(
      document.createTextNode(`${entrenamiento.velocidad} km/h`),
    );
    resultado.appendChild(document.createElement("br"));

    const fechaLabel = document.createElement("strong");
    fechaLabel.textContent = "Fecha y hora: ";
    resultado.appendChild(fechaLabel);
    resultado.appendChild(document.createTextNode(entrenamiento.fecha));
  }

  resultado.classList.remove("oculto");
};

//Resumen de entrenamientos
const mostrarResumenEntrenamientos = () => {
  const contenido = document.getElementById("resumenContenido");
  contenido.innerHTML = "";

  if (usuarioActual.entrenamientos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No hay entrenamientos registrados";
    contenido.appendChild(p);
    return;
  }

  const distanciaTotal = usuarioActual.obtenerDistanciaTotal();
  const tiempoTotal = usuarioActual.obtenerTiempoTotal();
  const promedio = usuarioActual.entrenamientos.length;

  //Total de entrenamientos
  const totalLabel = document.createElement("strong");
  totalLabel.textContent = "Total de entrenamientos: ";
  contenido.appendChild(totalLabel);
  contenido.appendChild(document.createTextNode(promedio.toString()));
  contenido.appendChild(document.createElement("br"));

  //Distancia total
  const distanciaLabel = document.createElement("strong");
  distanciaLabel.textContent = "Distancia total: ";
  contenido.appendChild(distanciaLabel);
  contenido.appendChild(
    document.createTextNode(
      `${distanciaTotal} metros (${(distanciaTotal / 1000).toFixed(2)} km)`,
    ),
  );
  contenido.appendChild(document.createElement("br"));

  //Tiempo total
  const tiempoLabel = document.createElement("strong");
  tiempoLabel.textContent = "Tiempo total: ";
  contenido.appendChild(tiempoLabel);
  contenido.appendChild(
    document.createTextNode(
      `${tiempoTotal} minutos (${(tiempoTotal / 60).toFixed(2)} horas)`,
    ),
  );
  contenido.appendChild(document.createElement("br"));

  //Cálculo promedio de distancia
  const promedioDistLabel = document.createElement("strong");
  promedioDistLabel.textContent = "Promedio de distancia: ";
  contenido.appendChild(promedioDistLabel);
  contenido.appendChild(
    document.createTextNode(`${(distanciaTotal / promedio).toFixed(2)} metros`),
  );
  contenido.appendChild(document.createElement("br"));

  //Cálculo promedio de tiempo
  const promedioTiempoLabel = document.createElement("strong");
  promedioTiempoLabel.textContent = "Promedio de tiempo: ";
  contenido.appendChild(promedioTiempoLabel);
  contenido.appendChild(
    document.createTextNode(`${(tiempoTotal / promedio).toFixed(2)} minutos`),
  );
};

//Elimnar entrenamientos
//Listamos entrenamientos con opción de borrar
const listarEntrenamientosEliminar = () => {
  const lista = document.getElementById("listaEliminar");
  lista.innerHTML = "";

  if (usuarioActual.entrenamientos.length === 0) {
    const li = document.createElement("li");
    li.className = "nota";
    li.textContent = "No hay entrenamientos para eliminar";
    lista.appendChild(li);
    return;
  }

  usuarioActual.entrenamientos.forEach((e, index) => {
    //Creamos elemento li
    const li = document.createElement("li");
    li.className = "nota";

    //Creamos contenedor principal
    const contenedorPrincipal = document.createElement("div");
    contenedorPrincipal.className = "nota-entrenamiento";

    //Creamos div de información
    const divInfo = document.createElement("div");

    const distanciaLabel = document.createElement("strong");
    distanciaLabel.textContent = "Distancia: ";
    divInfo.appendChild(distanciaLabel);
    divInfo.appendChild(document.createTextNode(`${e.distancia} m | `));

    const tiempoLabel = document.createElement("strong");
    tiempoLabel.textContent = "Tiempo: ";
    divInfo.appendChild(tiempoLabel);
    divInfo.appendChild(document.createTextNode(`${e.tiempo} min | `));

    const fechaLabel = document.createElement("strong");
    fechaLabel.textContent = "Fecha: ";
    divInfo.appendChild(fechaLabel);
    divInfo.appendChild(document.createTextNode(e.fecha));

    //Creamos botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "boton-mini";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarEntrenamiento(index);
    });

    contenedorPrincipal.appendChild(divInfo);
    contenedorPrincipal.appendChild(btnEliminar);
    li.appendChild(contenedorPrincipal);
    lista.appendChild(li);
  });
};

/**
 * Eliminamos un entrenamiento específico
 * @param {number} index
 */

const eliminarEntrenamiento = (index) => {
  mostrarConfirmacion("¿Estás seguro de eliminar este entrenamiento?", () => {
    usuarioActual.eliminarEntrenamiento(index);
    guardarDatos();
    listarEntrenamientosEliminar();
    mostrarMensaje("Entrenamiento eliminado", "exito");
  });
};

//Foro público
//Agregar comentario al foro público
const agregarComentarioForo = () => {
  const inputComentario = document.getElementById("comentarioForo");

  //Verificamos que el elemento existe
  if (!inputComentario) {
    console.error("No se encontró el elemento comentarioForo");
    mostrarMensaje("Error al cargar el formulario", "error");
    return;
  }

  const comentario = inputComentario.value.trim();

  if (!comentario || comentario === "") {
    mostrarMensaje("Escribe un comentario", "error");
    return;
  }

  try {
    const comentarios = JSON.parse(localStorage.getItem("foro") || "[]");

    const nuevoComentario = {
      usuario: usuarioActual ? usuarioActual.usuario : "Anónimo",
      comentario: comentario,
      fecha: new Date().toLocaleString("es-ES"),
    };

    comentarios.push(nuevoComentario);
    localStorage.setItem("foro", JSON.stringify(comentarios));

    inputComentario.value = "";
    cargarComentariosForo();
    mostrarMensaje("Comentario publicado correctamente", "exito");
  } catch (error) {
    console.error("Error al guardar comentario:", error);
    mostrarMensaje("Error al publicar el comentario", "error");
  }
};

//Cargamos y mostramos los comentarios del foro con nodos
const cargarComentariosForo = () => {
  const lista = document.getElementById("listaComentarios");

  //Verificamos que el elemento existe
  if (!lista) {
    console.error("No se encontró el elemento listaComentarios");
    return;
  }

  try {
    const comentarios = JSON.parse(localStorage.getItem("foro") || "[]");

    //Limpiamos la lista
    lista.innerHTML = "";

    if (comentarios.length === 0) {
      const li = document.createElement("li");
      li.className = "nota";
      li.textContent = "No hay comentarios aún. ¡Sé el primero en comentar!";
      lista.appendChild(li);
      return;
    }

    //Creamos una copia del array antes de invertirlo para mostrar los más recientes primero
    const comentariosOrdenados = [...comentarios].reverse();

    comentariosOrdenados.forEach((c) => {
      const li = document.createElement("li");
      li.className = "comentario-foro";

      const divHeader = document.createElement("div");
      divHeader.className = "comentario-header";

      const spanUsuario = document.createElement("span");
      spanUsuario.className = "comentario-usuario";
      spanUsuario.textContent = `Usuario: ${c.usuario}`;

      const spanFecha = document.createElement("span");
      spanFecha.className = "comentario-fecha";
      spanFecha.textContent = `Publicación: ${c.fecha}`;

      divHeader.appendChild(spanUsuario);
      divHeader.appendChild(spanFecha);

      //Texto del comentario
      const divTexto = document.createElement("div");
      divTexto.className = "comentario-texto";
      divTexto.textContent = c.comentario;

      li.appendChild(divHeader);
      li.appendChild(divTexto);
      lista.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
    lista.innerHTML = "";
    const li = document.createElement("li");
    li.className = "nota";
    li.textContent = "Error al cargar los comentarios";
    lista.appendChild(li);
  }
};

//Fn de inicialización cuando se carga la página
inicializar();
