# Gestión de Entrenamientos

Aplicación web para el registro y seguimiento de entrenamientos deportivos individuales.

## Descripción

Sistema de gestión de entrenamientos que permite a los usuarios registrarse, iniciar sesión y llevar un control detallado de sus actividades deportivas. La aplicación incluye funcionalidades de registro de entrenamientos, análisis de rendimiento y un foro público para compartir comentarios.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage para persistencia de datos

## Estructura del Proyecto

```
/
├── index.html          # Página principal
├── styles.css          # Estilos de la aplicación
├── clases.js          # Definición de clases Persona y Entrenamiento
├── script.js          # Lógica de la aplicación
└── public/
    └── favicon-gym.png # Icono de la aplicación
```

## Funcionalidades

### Página Inicial

- Opciones de Añadir Persona, Iniciar Sesión y acceso al Foro público

### Gestión de Usuarios

- **Registro de Usuario**: formulario con validación de campos obligatorios
  - Nombre completo (mínimo 3 caracteres)
  - Correo electrónico (formato válido)
  - Altura en cm (1-230)
  - Peso en kg (1-180)
  - Edad (10-120 años)
  - Usuario (mínimo 3 caracteres)
  - Contraseña (mínimo 4 caracteres)

- **Inicio de Sesión**: validación de credenciales contra localStorage

### Gestión de Entrenamientos sólo con Usuario Autenticado

1. **Añadir Entrenamiento**
   - Registro de distancia en metros
   - Registro de tiempo en minutos
   - Cálculo automático de velocidad en km/h
   - Fecha y hora del registro

2. **Mostrar Entrenamientos**
   - Listado completo de entrenamientos del usuario
   - Visualización de distancia, tiempo y velocidad
   - Fecha y hora de cada entrenamiento
   - Opción de añadir comentarios

3. **Mejor Entrenamiento**
   - Mejor tiempo registrado
   - Mayor distancia recorrida
   - Mayor velocidad alcanzada

4. **Resumen de Entrenamientos**
   - Distancia total acumulada
   - Tiempo total invertido
   - Promedios de distancia y tiempo

5. **Eliminar Entrenamientos**
   - Listado de entrenamientos con opción de eliminación
   - Confirmación antes de eliminar

### Foro Público

- Publicación de comentarios visibles para todos los usuarios
- Registro de usuario y fecha/hora de cada comentario
- Accesible desde menú principal y menú de usuario

## Clases Principales

### Clase Entrenamiento

Propiedades:

- distancia (número)
- tiempo (número)
- fecha (string)
- comentario (string)
- velocidad (número)

Métodos:

- calcularVelocidad(): calcula velocidad en km/h

### Clase Persona

Propiedades:

- nombreCompleto (string)
- correo (string)
- altura (número)
- peso (número)
- edad (número)
- usuario (string)
- contrasena (string)
- entrenamientos (array de Entrenamiento)

Métodos:

- agregarEntrenamiento()
- obtenerMejorTiempo()
- obtenerMejorDistancia()
- obtenerMejorVelocidad()
- obtenerDistanciaTotal()
- obtenerTiempoTotal()
- eliminarEntrenamiento()

## Almacenamiento de Datos

La aplicación utiliza localStorage del navegador para:

- Persistencia de usuarios registrados
- Almacenamiento de entrenamientos por usuario
- Gestión de comentarios del foro público

## Usuarios de Prueba

La aplicación incluye dos usuarios predefinidos para facilitar las pruebas:

- Usuario: luz / Contraseña: 1234
- Usuario: dario / Contraseña: 1234

## Instalación y Uso

1. Clonar o descargar el repositorio
2. Abrir el archivo `index.html` en un navegador web moderno
3. La aplicación está lista para usar

No requiere instalación de dependencias ni servidor web.

## Validaciones Implementadas

- Formato de correo electrónico
- Rangos numéricos para altura, peso y edad
- Longitud mínima para nombres de usuario y contraseñas
- Verificación de usuario duplicado en registro
- Validación de valores positivos en entrenamientos

## Características Técnicas

- Interfaz responsive adaptada a diferentes tamaños de pantalla
- Sistema de notificaciones visuales para feedback al usuario
- Modales de confirmación para acciones críticas
- Manipulación dinámica del DOM mediante creación de nodos
- Gestión de eventos de usuario
- Almacenamiento y recuperación de datos en formato JSON

## Trabajo realizado por:

Elena Bragado Romeo
Proyecto para el módulo de Desarrollo Web en Entorno Cliente.
