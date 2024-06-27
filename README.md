# RMO-WebColaboracion-Fronted
Repositorio del proyecto Fronted para el portal de colaboracion.


1.	Frontend Standards
Overview
Estándares de nomenclatura
Nombres entendibles
Se debe hacer uso de palabras entendibles y descriptivas para los involucrados en general, no se debe usar abreviaciones:
●	Clases
Las clases seguirán la notación Pascal case.

●	Variables y métodos
Los métodos seguirán la notación Camell case.

●	Ficheros
Los ficheros deben seguir la siguiente estructura.
<nombre>.<tipo>.<tipo archivo>
Donde:
Nombre: el nombre del archivo.
Tipo: tipo de fichero, componente, servicio etc.
Tipo archivo: puede tomar ts, hmtl, css

●	Formulario de búsquedas
Para los Formularios de búsquedas se debe utilizar la siguiente estructura.
<nombre>.<shared>.<tipo accion>
<nombre>.<form>.<tipo accion>
Donde:
Carpeta contenedora: shared
Nombre: el nombre del archivo.u componente
Tipo: tipo de fichero, componente, servicio etc.
Tipo archivo: puede tomar ts, hmtl, css


●	Services
Para los Services se debe utilizar la siguiente estructura.
<nombre>.<service>
Donde:
Carpeta contenedora: services
Nombre: el nombre del archivo.u componente

●	Inferfaces
Para las inferfaces se debe utilizar la siguiente estructura.
<nombre>.<interfaces>
Donde:
Carpeta contenedora: interfaces
Nombre: el nombre del archivo. u componente

Para Funciones
●	Camel Case:
Las funciones seguirán el estilo de escritura en Camel Case, donde cada palabra, excepto la primera, comienza con una letra mayúscula y las demás letras son minúsculas.
getUserData(), 
calculateTotal(), 
fetchData().

●	Verbos
Los nombres de las funciones deben ser verbos que describan la acción que realizan. Por ejemplo: get, set, load, fetch, update, create, delete, etc. Esto ayuda a que el propósito de la función sea claro y comprensible.

●	Contexto específico:
Si es necesario, se agregará un contexto específico al nombre de la función para indicar su propósito o área de aplicación. Por ejemplo:
calculateOrderTotal(),
loadUserData(), 
fetchProductList()

●	Eventos
Para las funciones relacionadas con eventos, se utilizará el prefijo "on" seguido del nombre del evento.
onClick(), 
onSubmit(), 
onInputChange().

●	Getters y setters:
Para las funciones que obtienen o establecen valores de propiedades, se utilizará el prefijo "get" o "set" seguido del nombre de la propiedad.
getName(),
setName(), 
getAge(), 
setAge()

Para Métodos
●	Camel case
Los nombres de los métodos se escriben en camel case, donde la primera letra de la primera palabra se escribe en minúscula y la primera letra de las palabras siguientes se escribe en mayúscula.
getUsers(), 
saveData(), 
fetchUserById()

●	Verbos en infinitivo:
Los nombres de los métodos deben ser verbos que indiquen la acción que realiza el método.
get, 
set, 
fetch, 
create, 
update, 
delete

●	Prefijos indicativos:
Puedes usar prefijos en los nombres de los métodos para indicar su propósito o contexto. Algunos ejemplos comunes son:

get: Utilizado para obtener o recuperar información.
set: Utilizado para establecer o asignar valores.
fetch: Utilizado para recuperar datos de una API o servicio.
create: Utilizado para crear nuevos elementos o instancias.
update: Utilizado para actualizar o modificar elementos existentes.
delete: Utilizado para eliminar elementos o recursos.

●	Verbos con palabras clave:
Si es necesario, se utilizarán palabras clave adicionales para indicar el contexto o la acción específica del método. Por ejemplo: loadData(), initializeForm(), calculateTotal().

Buenas prácticas de Typescript.
●	Utilizar clases y herencia cuando sea apropiado:
TypeScript es un lenguaje orientado a objetos, por lo que se puede utilizar clases y herencia para organizar tu código y compartir funcionalidades comunes. Seguir los principios de diseño orientado a objetos, como el principio de responsabilidad única.
●	Habilitar la opción de compilación strict:
La opción strict del compilador de TypeScript habilita un conjunto de comprobaciones estrictas que ayudan a detectar errores comunes y mejorar
la calidad del código. Asegurarse de tenerla habilitada en tu archivo de configuración tsconfig.json.
●	Documentar tu código:
Añadir comentarios y documentación a tu código para explicar su funcionalidad, propósito y cómo utilizarlo. Esto ayuda a otros desarrolladores (incluido tú mismo en el futuro) a comprender y utilizar tu código de manera más eficiente.
●	Mantener actualizadas las dependencias de TypeScript:
Asegurarse de mantener actualizada la versión de TypeScript en tu proyecto, así como las dependencias relacionadas (como Angular) para aprovechar las mejoras y correcciones de errores más recientes.
●	Utilizar espacios de nombres (namespaces) y módulos (modules) de TypeScript:
Los espacios de nombres (namespaces) te permiten organizar tu código en contextos lógicos separados, mientras que los módulos (modules) te permiten definir unidades de código independientes y reutilizables.

●	Integración con el IDE:
Para aprovechar al máximo el formateo en Angular 14, es recomendable configurar el entorno de desarrollo integrado (IDE) para que lo integre de forma nativa o mediante extensiones específicas. Por ejemplo, si estás utilizando Visual Studio Code, se puede instalar las extensiones.

Propuesta de uso de componentes reutilizables
Angular tiene una arquitectura basada en componentes, lo que significa que los componentes son la unidad básica de construcción de una aplicación Angular. Aquí hay algunas prácticas recomendadas para crear componentes reutilizables en Angular:
●	Parámetros de entrada y salida:
Anotaciones @Input y @Output para definir propiedades de entrada y eventos de salida en tus componentes. Las propiedades de entrada permiten que los datos fluyan hacia el componente desde su contenedor, mientras que los eventos de salida permiten que el componente notifique a su contenedor sobre acciones o cambios importantes.

●	Modularización:
Agrupa componentes relacionados en módulos separados. Esto mejora la organización y facilita la reutilización de componentes específicos. Los módulos también pueden proporcionar servicios y otros recursos necesarios para el funcionamiento de los componentes.

●	Pruebas unitarias:
escribir pruebas unitarias para los componentes reutilizables. Esto garantizará su correcto funcionamiento y permitirá detectar posibles problemas antes de su implementación.
Al seguir estas prácticas recomendadas, se puede crear componentes reutilizables en Angular que sean fáciles de mantener, adaptar y compartir en diferentes contextos y proyectos. Ejemplo:

✔	Componente de tarjeta:
Puedes crear un componente de tarjeta reutilizable que muestre información en un formato de tarjeta. Puedes diseñarlo con propiedades de entrada para personalizar el contenido de la tarjeta, como título, descripción, imagen, etc. Además, puedes agregar eventos de salida para manejar interacciones específicas con la tarjeta, como hacer clic en un botón.

✔	Componente de barra de navegación:
Un componente de barra de navegación puede ser reutilizado en diferentes páginas o secciones de tu aplicación. Puedes crear un componente de barra de navegación que acepte una lista de elementos de navegación como entrada y genere los enlaces correspondientes automáticamente. Esto permitiría una fácil configuración de la barra de navegación en diferentes partes de la aplicación.

✔	Componente de diálogo modal:
Un componente de diálogo modal es muy útil para mostrar contenido o formularios en una ventana emergente. Puedes crear un componente de diálogo modal reutilizable que acepte propiedades de entrada para personalizar el contenido y el comportamiento del diálogo, como el título, el contenido, los botones de acción, etc. Esto te permitiría mostrar diferentes tipos de información en un diálogo modal en toda tu aplicación.

✔	Componente de lista desplegable:
Puedes crear un componente de lista desplegable reutilizable que acepte una lista de elementos como entrada y genere una lista desplegable automáticamente. Este componente podría tener propiedades de entrada para controlar el elemento seleccionado, así como eventos de salida para notificar cuando se realiza una selección.

✔	Estándar de Estructura de los componentes:
La siguiente es la estructura interna que debe tener el componente frontend de una aplicación Web:
src
¦ browserslist
¦ favicon.ico
¦ index.html
¦ karma.conf.js
¦ main.ts
¦ polyfills.ts
¦ styles.css
¦ test.ts
¦ tsconfig.app.json
¦ tsconfig.spec.json
¦ tslint.json
¦
+---app
¦ ¦ app-routing.module.ts
¦ ¦ app.component.css
¦ ¦ app.component.html
¦ ¦ app.component.spec.ts
¦ ¦ app.component.ts
¦ ¦ app.module.ts
¦ ¦
¦ +---modules
¦ ¦ +---<nombreModulo>
¦ ¦ ¦ <nombreModulo>-routing.module.ts
¦ ¦ ¦ <nombreModulo>.component.css
¦ ¦ ¦ <nombreModulo>.component.html
¦ ¦ ¦ <nombreModulo>.component.spec.ts
¦ ¦ ¦ <nombreModulo>.component.ts
¦ ¦ ¦ <nombreModulo>.module.ts
¦ ¦ ¦ ¦ +---components
¦ ¦ ¦ ¦ ¦ +---<nombreComponente>
¦ ¦ ¦ ¦ ¦ ¦ <nombreComponente>.component.css
¦ ¦ ¦ ¦ ¦ ¦ <nombreComponente>.component.html
¦ ¦ ¦ ¦ ¦ ¦ <nombreComponente>.component.ts
¦ ¦ ¦ ¦ ¦ ¦ +---<nombreSubComponente>
¦ ¦ ¦ ¦ ¦ ¦ ¦ <nombreSubComponente>.component.css
¦ ¦ ¦ ¦ ¦ ¦ ¦ <nombreSubComponente>.component.html
¦ ¦ ¦ ¦ ¦ ¦ ¦ <nombreSubComponente>.component.ts
¦ ¦ ¦ ¦ ¦
¦ ¦ ¦ ¦ +---guards
¦ ¦ ¦ ¦ ¦ <nombreGuard>.guard.ts
¦ ¦ ¦ ¦ +---directives
¦ ¦ ¦ ¦ ¦ <nombreDirectiva>.directive.ts
¦ ¦ ¦ ¦ +---pipes
¦ ¦ ¦ ¦ ¦ <nombrePipe>.pipe.ts
¦ ¦ ¦ ¦ +---helpers
¦ ¦ ¦ ¦ ¦ <nombreHelper>.helper.ts
¦ ¦ ¦ ¦ +---interceptors
¦ ¦ ¦ ¦ ¦ <nombreInterceptor>.interceptor.ts
¦ ¦ ¦ ¦ +---models
¦ ¦ ¦ ¦ ¦ <nombreModel>.ts
¦ ¦ ¦ ¦ +---services
¦ ¦ ¦ ¦ ¦ <nombreServicio>.service.ts
¦ ¦ ¦ ¦ +---utils
¦ ¦ ¦ ¦ ¦ <nombreUtil>.util.ts
¦ ¦ ¦ ¦ ¦
¦ +---guards
¦ ¦ <nombreGuard>.guard.ts
¦ +---directives
¦ ¦ <nombreDirectiva>.directive.ts
¦ +---pipes
¦ ¦ <nombrePipe>.pipe.ts
¦ +---helpers
¦ ¦ <nombreHelper>.helper.ts
¦ +---interceptors
¦ ¦ <nombreInterceptor>.interceptor.ts
¦ +---models
¦ ¦ <nombreModel>.ts
¦ +---services
¦ ¦ <nombreServicio>.service.ts
¦ +---utils
¦ ¦ <nombreUtil>.util.ts
¦
+---assets
¦ .gitkeep
¦
+---environments
environment.prod.ts
environment.ts

** ADICIONAL : USO DEL ESLINT
  1. Ejecuta el siguiente comando en la raíz del proyecto: 
  npx eslint --init

  2. Configurar el archivo ".eslintrc.json"
    {
      "env": {
        "browser": true,
        "es2021": true
      },
      "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb"
      ],
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
      },
      "plugins": [
        "react"
      ],
      "rules": {
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "linebreak-style": 0,
        "react/prop-types": 0,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
      }
    }
