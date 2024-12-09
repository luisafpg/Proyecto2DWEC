## Juego de Aventuras - Encuentra el cofre
### Descripción
 Un juego interactivo donde el héroe busca un cofre escondido en un tablero de 10x10. El héroe se mueve por el tablero según las tiradas de dados. Al finalizar, se muestra el número de tiradas realizadas y un ranking con los mejores resultados.

### Características
- Validación del Nombre: El jugador debe introducir un nombre válido (mínimo 4 caracteres y sin números) para comenzar.

- Tablero Dinámico: Tablero de 10x10 con el héroe y el cofre colocados al azar.

- Tiradas de Dados: El héroe avanza en función del resultado del dado.
- Resaltado de Celdas: Destaca la celda actual del héroe y la meta (cofre).

- Finalización del Juego:
- Mensaje de victoria con las tiradas realizadas.
- Opciones de nueva partida y ranking.

- Ranking Persistente: Guarda y muestra los resultados en localStorage.

------------



### Requisitos
Navegador web moderno (Chrome, Firefox, Safari, etc.) para ejecutar el juego.

------------


### Pasos de como jugar
1. Inicio: Introduce tu nombre y haz clic en "Introducir nombre"si es válido, se habilita  el botón "Jugar"

3. Juego: Haz clic en "Tirar dado" para mover al héroe. el héroe avanza hasta encontrar el cofre.

5. Finalización: se muestra un mensaje con las tiradas realizadas.

7. Opción para: Comenzar una nueva partida, Ver el ranking actual.

9. Ranking: Guarda los jugadores y sus tiradas en localStorage.

------------


### Funciones principales
1. validarNombre(): Valida que el nombre cumpla los requisitos.

3. iniciarJuego(): Configura el tablero y oculta el formulario inicial.

5. generarTablero(): Crea el tablero dinámicamente.

7. tirarDado(): Genera un número entre 1 y 6 y mueve al héroe.

9. moverHeroe(): Calcula y actualiza la posición del héroe.

11. resaltarCeldas(): Destaca la posición del héroe y la meta (cofre).

13. finalizarJuego(): Muestra el mensaje de victoria y guarda el resultado.

------------


### Almacenamiento
En este proyecto, utilizamos localStorage (pares de clave-valor) para almacenar las puntuaciones y récords de tiradas de los jugadores. Cuando un usuario encuentra el cofre, su número de tiradas se guarda en localStorage bajo la clave recordTiradas. Esta información se mantiene disponible entre sesiones de navegador, permitiendo que los jugadores vean su récord de tiradas y compitan con otros usuarios. Además, al hacer clic en "Mostrar ranking", los jugadores pueden ver un listado de las mejores puntuaciones, lo que hace posible una experiencia de juego competitiva y continuada.


------------


#### Creado por
Luisa Fernanda Puertas García Estudiante de Desarrollo de Aplicaciones Web
