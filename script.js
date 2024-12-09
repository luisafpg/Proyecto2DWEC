'use strict';
//asigamos la funcion inicio, para que se ejecute cuando el documento HTML ha sido 
//completamente cargado y analizado por el navegador
document.addEventListener("DOMContentLoaded", inicio);

function inicio (){
//Empezamos recogiendo todos los id de los ementos, que haremos uso de cada uno de ellos en el codigo
//tenemos contenedores (div) que son contenedorLogin, que es el que contiene valga la redundancia el formulario
//donde se muestra una bienvenida para el juego y la respectiva solictud de nombre del usuario que va a jugar
//luego tenemos el contenedorJuego, que ahi se muestra un mensaje al usuario
//tenemos el contenedor 'tablero' que ahi mostramos el tablero de juego, el contenedor 'contenedorDado' que ahi mostramos la imagen y el boton del dado
//luego contenedorFin, donde seria el final del juego, donde se muestra el mensaje de victoria, el numero de tiradas, tambien los botones de 'mostrarrankin' y 'Nueva partida'
//todos estos id de los elementos, se haran uso de ellos cada ves que vayamos codificando
    const contenedorlogin = document.getElementById("ContenedorLogin");
    const BotonJugar = document.getElementById("btn-jugar");
    const nombrebtn = document.getElementById("botonNombre");
    const formulario = document.getElementById("formularioNombre");
    const nombreInput = document.getElementById("nombre");
    const validacion = document.getElementById("mensajeValidacion");
    const Contenedorjuego = document.getElementById("contenedorJuego");
    const mensajejuego = document.getElementById("mensajeJuego");
    const imagenDado = document.getElementById("imagen-dado");
    const Tirardado = document.getElementById("btn-tirar-dado");
    const tablero = document.getElementById("tablero");
    const Contenedorfinal = document.getElementById("contenedorFin");
    const victoriaMensaje = document.getElementById("mensajeVictoria");
    const NuevaPartidabtn = document.getElementById("boton-nueva-partida");
    const Rankingbtn = document.getElementById("boton-ranking");

//respectiva creacion de variables:
    let nombre = ""; //nombre del usuario
//posicionHeroe y posicionCofre son arrays porque almacenan coordenadas bidimensionales en la cuadrícula del juego
//cada posicion se define por una fila y una columna, como [fila, columna]
    let posicionHeroe = [];
    let posicionCofre = [];
    let numeroTiradas = 0; // lleva el conteo del número de tiradas del dado realizadas por el jugador
    let recordTiradas; //almacena el record de tiradas del jugador, que se compara y actualiza en localStorage

    //funcion para validar la informacion del usuario:
    //obtenemos la informacion introducida por el usuario con .value y .trim para eliminar espacios en blanco
    //comprobamos si esa informacion tiene menos de 3 caracteres para informarle al usuario o jugador que El nombre debe tener 4 o más letras
    //aqui estaria desabilitado el boton 'jugar' ya que el campo de informacion no es el correcto
    //en el caso del boton 'introducir nombre' estara habilitado hasta que el usuario introduzca todo correctamente, es decir, cuando todo esté validado, solo estara habilitado el boton 'jugar'
    //tambien comprobamos si el usuario introduce numeros, para informarle que no esta permitido, usando la expresion regular '/\d/' y .test para comprobar si la cadena de texto cumple con el patron especifico
    //por ultimo el else, para comprobar que todo está bien, mostrandole el mensaje 'A luchar heroe' con el nombre del usuario y habilitando el boton 'jugar'

    function validarNombre(){
        const nombreValue = nombreInput.value.trim();
        validacion.style.fontSize = "25px";
        if(nombreValue.length < 4){
            validacion.textContent = "El nombre debe tener 4 o más letras";
            BotonJugar.disabled = true;
            nombrebtn.disabled = false;
        }
      else if(/\d/.test(nombreValue)){
            validacion.textContent = "No se permiten números";
            BotonJugar.disabled = true;
            nombrebtn.disabled = false;
        }

        else{
            nombre = nombreValue;
            validacion.textContent = `A luchar héroe: ${nombre}`;
            BotonJugar.disabled = false;
            nombrebtn.disabled = true;
        }
    }

    //una vez ya validado el campo nombre, aqui en esta funcion se empieza el juego, ocultando previamente el contenido inicial que es el formulario con display none
    //para que solo se vea el tablero del juego, para eso llamamos la funcion generarTablero, para el respectivo funcionamiento
    function iniciarJuego(){
        contenedorlogin.style.display = "none";
        generarTablero();
        
    }

    //aqui, cada vez que el valor del campo de entrada 'nombreInput' cambia, hace que la función 'validarNombre' se ejecute automáticamente
    //esto permite validar el nombre en tiempo real mientras el usuario lo escribe
    nombreInput.addEventListener("input", validarNombre);

    //agrega un evento submit al formulario para ejecutar una función al enviar el formulario. 
    //La funcion previene la recarga automática de la pgina y, si el botón "Jugar" está habilitado, llama a la función iniciarJuego para comenzar el juego.
    formulario.addEventListener("submit", envio) 
        function envio(event){
        event.preventDefault();
     if(BotonJugar.disabled === false){
        iniciarJuego();
     }
}
  
//funcion que genera la tabla 10x10 e inicia la posición del héroe y el cofre.
 function generarTablero(){
    //actualizamos el mensaje del juego con el nombre del heroe
        mensajejuego.textContent = `¡Tira el dado ${nombre}, y desplazate para alcanzar el cofre!`;
        mensajejuego.style.color = "red";
        mensajejuego.style.marginLeft = "-90px";
       
    //creamos una nueva tabla html para el tablero del juego
        const tabla  = document.createElement('table');
    //agregamos la clase 'tablero' a la tabla para los estilos css
        tabla.classList.add('tablero');
//bucles para crear las filas y columnas de la tabla (10*10)
        for(let i = 0; i<10; i++){
            const fila = document.createElement('tr'); //crea una nueva fila
            for(let j = 0; j<10; j++){
                const celda = document.createElement('td'); //crea una nueva celda
                fila.appendChild(celda);// se añade la celda a la fila
            }
            tabla.appendChild(fila); //se añade la fila a la tabla
        }
        //se añade la tabla generada al contenedor del tablero en el html
        tablero.appendChild(tabla);
//establecemos la posicion inicial del heroe en la esquina superior izquierda
//selecciona la celda en la posicion inicial, hacemos uso de .rows para filas y .cells para columnas
//y se coloca la imagen del heroe en esa celda
//lo mismo hacemos para la posicion del cofre, pero en la posicion del cofre la ubicamos en la esquina inferior derecha
//y se coloca la imagen del cofre en la celda
        posicionHeroe = [0,0];
        const celdaHeroe = tabla.rows[0].cells[0];
        celdaHeroe.innerHTML = '<img src="img/heroe.svg" alt="Héroe">';
       
        posicionCofre = [9,9];
        const celdaCofre = tabla.rows[9].cells[9];
        celdaCofre.innerHTML = '<img src="img/cofre.jpg" alt="Cofre">';
//mostramos el contenedor del juego y el boton para tirar el dado
        Contenedorjuego.style.display = "block";
        Tirardado.style.display = "block";
 }

//funcion que Lanza un dado y determina las posibles celdas de movimiento
//primero agregamos la clase'animarDado' para iniciar la animacion del dado
//luego usamos un setTimeout para esperar 500 milisegundos antes de cambiar de dado
//ya que en este proyecto consta de una carpeta imagen donde está las imaganes del dado general y dados individual, dado1, dado2, dado3, etc 
//luego generamos un numero aleatorio entre 1 y 6, despues se cambia la imagen del dado para mostrar el resultado del lanzamiento
//luego se elimina la clase 'animarDado' para detener la animacion del dado
//llamamos a la funcion 'resaltarCeldas(numero) para resaltar las celdas a las que el heroe puede moverse
//por ultimo desabilitamos el boton tirar dato hasta que el jugador mueva el heroe
function tirarDado() {
 
    imagenDado.classList.add('animarDado');
    setTimeout(() => {
        const numero = parseInt(Math.random() * 6 + 1);
        imagenDado.src = `img/dado${numero}.png`; 

        imagenDado.classList.remove('animarDado'); 

        resaltarCeldas(numero);
        Tirardado.disabled = true;
    }, 500); 

}

//funcion que utilizaremos para resaltar esas celdas en las que el heroe puede moverse
//seleccionamos la tabla del tablero del juego, luego obtenemos la posicion actual del heroe 
//proseguimos con limpiar los resaltados anteriores y elimina eventos previos, 
//iteramos sobre cada fila y cada columna d la tabla en los dos primeros for
//con const nuevaCelda = celda.cloneNode(true), clono la celda para eliminar cualquier evento previo asociado a ella
//con celda.replaceWith(nuevaCelda) reemplaza la celda original con la celda clonada y limpia
function resaltarCeldas(numero) {
    const tabla = document.querySelector('.tablero');
    const [fila, columna] = posicionHeroe;

    for (let f = 0; f < 10; f++) {
        for (let c = 0; c < 10; c++) {
            const celda = tabla.rows[f].cells[c];
            celda.style.backgroundColor = '';
            const nuevaCelda = celda.cloneNode(true);
            celda.replaceWith(nuevaCelda); 
        }
    }

    //con este array almacenamos los movimientos validos para el heroe 
    const movimientos = [];

    //con todos estos for a continuacion, calcularemos las posiciones validas tanto de arriba, abajo, derecha e izquierda desde la posicion actual del heroe

    // para este for calcularemos hacia arriba, rango desde 1 hasta numero (numero obtenido del dado)
    //en la condicion se asegura que la nueva posicion no salga de los limites superiores de la tabla
    //se agrega la posicion valida [fila - i, columna] al array movimientos
    for (let i = 1; i <= numero; i++) {
        if (fila - i >= 0) movimientos.push([fila - i, columna]);
    }
    //para este for calcularemos hacia abajo, rango desde 1 hasta numero (numero obtenido del dado)
    //en la condicion se asegura que la nueva posicion no salga de los limites inferiores de la tabla
    //se agrega la posicion valida [fila + i, columna] al array movimientos
    for (let i = 1; i <= numero; i++) {
        if (fila + i < 10) movimientos.push([fila + i, columna]);
    }
    //para este for calcularemos hacia la izquierda, rango desde 1 hasta numero (numero obtenido del dado)
    //en la condicion se asegura que la nueva posicion no salga de los limites izquierdos de la tabla
    //se agrega la posicion valida [fila, columna - i] al array movimientos
    for (let i = 1; i <= numero; i++) {
        if (columna - i >= 0) movimientos.push([fila, columna - i]);
    }
    //para este for calcularemos hacia la derecha, rango desde 1 hasta numero (numero obtenido del dado)
    //en la condicion se asegura que la nueva posicion no salga de los limites drechos de la tabla
    //se agrega la posicion valida [fila, columna + i] al array movimientos
    for (let i = 1; i <= numero; i++) {
        if (columna + i < 10) movimientos.push([fila, columna + i]);
    }

    //aqui resaltamos las celdas validas, utilizamos el foreach para recorrer el array
    movimientos.forEach(([f, c]) => {
        const celda = tabla.rows[f].cells[c]; // seleccionamos la celda del movimiento valido
        celda.style.backgroundColor = 'red';  //resaltamos la celda en rojo

        // agregamos evento de clic para mover el héroe
        //y llama a moverHeroe con la nueva posicion
        celda.addEventListener('click', movimiento)
             function movimiento(){
             moverHeroe(f, c);
     }
    });

    Tirardado.disabled = true; // Deshabilitamos el boton de tirar dado hasta que el héroe se mueva
}

//esta funcion permite al héroe moverse en la cuadrícula y actualiza su posición
function moverHeroe(filaDestino, columnaDestino) {
    const tabla = document.querySelector('.tablero'); // seleccionamos la tabla del tablero del juego
    const [fila, columna] = posicionHeroe; // obtenemos la posición actual del héroe

    // verificamos que la posición de destino esté dentro de los límites de la tabla
    if (filaDestino >= 0 && filaDestino < 10 && columnaDestino >= 0 && columnaDestino < 10) {
        
        const celdaActual = tabla.rows[fila].cells[columna]; // seleccionamos la celda actual del héroe
        celdaActual.innerHTML = ''; // Limpiamos la celda actual, eliminando la imagen del héroe

        // actualizamos la posición del héroe a la nueva posición
        posicionHeroe = [filaDestino, columnaDestino];

        // seleccionamos la nueva celda del héroe
        const nuevaCelda = tabla.rows[filaDestino].cells[columnaDestino]; 
        nuevaCelda.innerHTML = '<img src="img/heroe.svg" alt="Héroe" style="width: 100%;">'; // colocamos la imagen del héroe en la nueva celda

        numeroTiradas++; // incrementamos el contador de tiradas

        // verificamos si el héroe ha llegado a la posición del cofre
        if (filaDestino === posicionCofre[0] && columnaDestino === posicionCofre[1]) {
            finalizarJuego(); // Llamamos a la función para finalizar el juego si el héroe encuentra el cofre
        }
    }

    Tirardado.disabled = false; // habilita el botón de tirar dado para el siguiente turno
}


//hacemos un orejon cuando hacemos click en el botonjugar, hacemos la funcion manejadora, que contendrá dentro otra funcion
//que es la funcion 'iniciarJuego', cuando hacemos clic en 'jugar', se da inicio al juego
//tambien hago un console log, para ir probando en consola cada ves que se haga clic en el boton
BotonJugar.addEventListener("click", iniciojuego)
function iniciojuego(){
    console.log("Boton Jugar pulsado");
    iniciarJuego(); 
};

//hacemos un orejon tambien cuando hacemos click en el boton 'tirardado', que se muestra con el tablero de juego una vez hayamos iniciado el juego
//hacemos la funcion manejadora, que contendrá dentro otra funcion que es la funcion 'tirarDado', cuando hacemos clic en 'tirarDado', se hace el respectivo funcionamiento de esta funcion
//tambien hago un console log, para ir probando en consola cada ves que se haga clic en el boton 'tirarDado'
Tirardado.addEventListener("click", botondado);
function botondado(){
    console.log("boton tirar dado pulsado");
    tirarDado();
}

// la funcion `finalizarJuego` es responsable de manejar el final del juego
// se muestra un mensaje de victoria personalizado, actualiza el récord de tiradas 
// en localStorage si corresponde, y gestionar el ranking de los jugadores
// tambien configuramos los botones de "Nueva partida" y "Mostrar ranking"

function finalizarJuego() {
    // mostramos un mensaje de victoria con el nombre del jugador y las tiradas realizadas
    victoriaMensaje.textContent = `¡Felicidades ${nombre}, encontraste el cofre en ${numeroTiradas} tiradas!`;
    victoriaMensaje.style.fontSize = "30px";

    // clave para el ranking en localStorage y formato para el jugador actual
    const rankingKey = 'ranking'; 
    const jugadorActual = `${nombre}=${numeroTiradas}`;
    let ranking = localStorage.getItem(rankingKey) || ''; // recupera el ranking o lo inicializa vacio.

    // comprobamos si no existe un record previo o el número de tiradas es menor que el récord actual, actualiza el récord
    if (!recordTiradas || numeroTiradas < recordTiradas) {
        recordTiradas = numeroTiradas; // actualizamos el record global
        localStorage.setItem('recordTiradas', recordTiradas.toString()); // guardamos el nuevo record en localStorage.
        victoriaMensaje.textContent += " - ¡Nuevo récord!"; // indicamos que se logro un nuevo record
    } else {
        // si no hay nuevo record, se muestra el record actual
        victoriaMensaje.textContent += ` - Récord actual: ${recordTiradas} tiradas`;
    }

    // actualizamos el ranking almacenado. si ya existe, añade al jugador actual; si no, lo crea
    if (ranking) {
        ranking += `;${jugadorActual}`; // se agrega al nuevo jugador al final con un separador
    } else {
        ranking = jugadorActual; // si es el primer jugador, solo guarda su informacion
    }
    localStorage.setItem(rankingKey, ranking); // guardamos el ranking actualizado en localStorage

    // mostramos el contenedor de finalizacion y ocultamos el del juego
    Contenedorfinal.style.display = "block";
    Contenedorjuego.style.display = "none";

    // configuramos el boton de "Nueva partida" para reiniciar el juego recargando la pagina
    NuevaPartidabtn.addEventListener("click", nuevapartida)
    function nuevapartida(){
        location.reload();
    }

    // configuramos el botón de "Ranking" para mostrar la lista de jugadores y sus tiradas
    Rankingbtn.addEventListener("click", rankingbt)
    function rankingbt(){
        // recuperamos el ranking almacenado en localStorage
        const ranking = localStorage.getItem(rankingKey) || '';
        
        // si hay jugadores en el ranking, se muestra el listado detallado
        if (ranking) {
            let rankingTexto = "Ranking actual:\n"; // inicializa la cadena para el listado del ranking
            const jugadores = ranking.split(';'); // divide la cadena en cada jugador segun el separador ';'.
            jugadores.forEach((jugador, index) => {
                const [nombre, tiradas] = jugador.split('='); // separamos el nombre y las tiradas para cada jugador
                rankingTexto += `${index + 1}. ${nombre} - ${tiradas} tiradas\n`; // formateamos cada entrada para el texto
            });
            alert(rankingTexto); // muestro el ranking completo en un alert
        } else {
            // si no hay jugadores en el ranking, muestra un mensaje indicando que no hay récords
            alert("Aún no hay ningún récord establecido.");
        }
    }
}







}