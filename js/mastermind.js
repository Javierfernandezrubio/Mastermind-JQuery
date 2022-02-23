/**
 * Mastermind
 * 
 * @author Javier Fernández Rubio
 */



const masterMind = (function () {

    const COLORES = ["red", "brown", "yellow", "green", "orange", "blue", "white", "black"];
    const NUM_COLORES = COLORES.length;
    const NUM_CASILLAS = 4;
    let solucion; // Array con los colores de la solución, sin inicializar

    /**
     * Genera un número aleatorio entre 0 y el número de COLORES.
     */
    let generarAleatorio = function () {
        return Math.floor((Math.random() * NUM_COLORES));
    };

    /**
     * Genera la solucion a adivinar.
     */
    let generarSolucion = function () {
        for (let i = 0; i < NUM_CASILLAS; i++) {
            solucion.push(COLORES[generarAleatorio()]);
        }
    }

    /**
     * Muestra la solucion por consola
     */
    let mostrar = function () {
        console.log(solucion);
    }

    /**
     * Comprueba si la combinación coincide y devuelve las pistas
     */
    let comprobarCombinacion = function (coloresUsuario) {

        let copiaSolucion = solucion.slice();
        let combinacionUsuario = coloresUsuario.slice();

        return {
            pistasNegras: contarNegros(combinacionUsuario, copiaSolucion),
            pistasBlancas: contarBlancos(combinacionUsuario, copiaSolucion),
        }
    }

    /**
     * Devuelve las pistas negras a devolver
     */
    let contarNegros = function (combinacionUsuario, copiaSolucion) {
        let pistasNegras = 0;

        combinacionUsuario.forEach(function (elemento, indice) {
            if (elemento == copiaSolucion[indice]) {
                pistasNegras++;
                copiaSolucion[indice] = null
                combinacionUsuario[indice] = -1;
            }
        });

        return pistasNegras;
    }

    /**
     * Devuelve la cantidad de pistas blancas
     */
    let contarBlancos = function (combinacionUsuario, copiaSolucion) {
        let pistasBlancas = 0;

        combinacionUsuario.forEach(function (elemento) {
            let indice = copiaSolucion.indexOf(elemento);
            if (indice !== -1) {
                pistasBlancas++;
                copiaSolucion[indice] = null
            }
        });

        return pistasBlancas;
    }


    /**
     * Inicia la partida inicializando solucion y generando una nueva combinación de COLORES.
     */
    let init = function () {
        solucion = [];
        generarSolucion();
    }

    // Devolvemos el objeto
    return {
        init: init,
        mostrar: mostrar,
        comprobarCombinacion: comprobarCombinacion
    };
})();