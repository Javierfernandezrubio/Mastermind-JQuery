/**
 * MasterMind juego con Jquery
 * 
 * @author Javier Fernández Rubio
 * 
 */

{
    // Variables globales
    let $contadorBolasUsuario; // Contador para controlar las bolas elegidas por el usuario
    let $casillas; // Array con las casillas escogidas por el usuario 
    let $pistas;
    let $filaCasillas;
    let $casillasPistas;
    let $numeroFilas; // Permite crear distintas filas de casillas y pistas
    let $intento = -1; // -1 para que el primer intento sea el 0
    let $fila;

    /**
     * Genera una nueva fila de casillas a rellenar y de casillas para pistas.
     */
    const crearFila = function () {
        // Declaración de variables
        let nuevaCasilla;
        let nuevaCasillaPista;
        $fila = document.createElement("div");
        $filaCasillas = document.createElement("div");
        $pistas = document.createElement("div");


        // Añadimos los correspondientes ids
        $fila.id = "fila";
        $filaCasillas.id = $casillas;
        $pistas.id = $pistas;


        // Generamos las casillas
        for (let i = 0; i < 4; i++) {
            nuevaCasilla = document.createElement("div");
            nuevaCasilla.classList.add("casilla");
            nuevaCasilla.classList.add("casilla" + $numeroFilas);
            $filaCasillas.append(nuevaCasilla);
        }

        // Generamos las casillas de pistas
        for (let i = 0; i < 4; i++) {
            nuevaCasillaPista = document.createElement("div");
            nuevaCasillaPista.classList.add("casillaPista");
            nuevaCasillaPista.classList.add("casillaPista" + $numeroFilas);
            $pistas.append(nuevaCasillaPista);
        }

        // Añadimos las filas al tablero
        $fila.append($filaCasillas);
        $fila.append($pistas);
        $('#tablero').append($fila);

        nuevoTurno();
        $intento++;
        $('#intentos').text("Intentos: " + $intento);
    }

    /**
     * Pinta una casilla de un color según el id introducido por parámetro.
     */
    const pintarBola = function (id) {
        if ($contadorBolasUsuario == 4) {
            return;
        }
        for (let i = 0; i < $casillas.length; i++) {
            if ($casillas[i].style.backgroundColor == "gray" || $casillas[i].style.backgroundColor == "") {
                $($casillas[i]).css("background-color", id);
                $(this).animate({
                    opacity: 0.5,
                    scale: 0.5
                }, 500).animate({
                    opacity: 1,
                    scale: 1
                }, 500);
                $($casillas[i]).on("click", quitaBolaUsuario);
                break; // Para que no se pinte más de una casilla
            }
        }
        if ($contadorBolasUsuario < 4)
            $contadorBolasUsuario++;
    }

    /**
     * Quita una casilla pintada por el usuario.
     */
    const quitaBolaUsuario = function () {
        $(this).css("background-color", "gray").fadeOut().fadeIn();
        $(this).off("click", quitaBolaUsuario);
        $contadorBolasUsuario--;
    }

    /**
     * Quita la función de quitarBolaUsuario a
     * la fila anterior de casillas.
     * 
     */
    const quitarFunBorrado = function () {
        for (let i = 0; i < $casillas.length; i++) {
            $($casillas[i]).off("click", quitaBolaUsuario);
        }
    }

    /**
     * Reinicia y modifica los valores necesarios para iniciar un nuevo turno
     */
    const nuevoTurno = function () {
        quitarFunBorrado();
        $contadorBolasUsuario = 0;
        $casillas = document.getElementsByClassName("casilla" + $numeroFilas);
        $casillasPistas = document.getElementsByClassName("casillaPista" + $numeroFilas);
        $numeroFilas++;
    }

    /**
     * Comprueba si la combinación introducida por el usuario es correcta
     */
    const comprobar = function () {
        // Animaciones
        $('#btn-Comprobar').animate({
            height: "150%",
            opacity: 0.5
        }, 500);
        $('#btn-Comprobar').animate({
            height: "100%",
            opacity: 1
        }, 500).hover(function () {
            $(this).animate({
                height: "150%",
                opacity: 0.5
            }, 500);
        });


        let coloresUsuario = [];
        let indice = 0; // Indice para controlar la cantidad de pistas

        for (let i = 0; i < $casillas.length; i++) {
            switch ($casillas[i].style.backgroundColor) {
                case "red":
                    coloresUsuario.push("red");
                    break;
                case "white":
                    coloresUsuario.push("white");
                    break;
                case "black":
                    coloresUsuario.push("black");
                    break;
                case "green":
                    coloresUsuario.push("green");
                    break;
                case "blue":
                    coloresUsuario.push("blue");
                    break;
                case "yellow":
                    coloresUsuario.push("yellow");
                    break;
                case "brown":
                    coloresUsuario.push("brown");
                    break;
                case "orange":
                    coloresUsuario.push("orange");
                    break;
                default:
                    break;
            }
        }

        if ($contadorBolasUsuario >= 4) {
            $pistas = masterMind.comprobarCombinacion(coloresUsuario);

            if ($pistas.pistasNegras) {
                while (indice < $pistas.pistasNegras) {
                    $casillasPistas[indice].style = "background-color: black;";
                    indice++;
                }
            }

            if (indice == 4) {
                $('#divGanar').css("display", "block");
                $('#divGanar').animate({
                    opacity: .1
                }, 500).animate({
                    opacity: 1
                }, 500);

                $('#listaBolas div').off("click", pintarBola).off("animate");

                quitarFunBorrado(); // Desactivamos la función de quitarBolaUsuario a la última fila
                $("#btn-Comprobar").off(); // Desactivamos el botón de comprobar
            } else if ($pistas.pistasBlancas) {
                for (let i = 0; i < $pistas.pistasBlancas; i++) {
                    $casillasPistas[indice].style = "background-color: white;";
                    indice++;
                    if (indice == 4) {
                        crearFila();
                        indice = 0;
                        return;
                    }
                }
                indice = 0;
            }

            if (indice != 4) {
                crearFila();
            }
        }
    }

    /**
     * Reinicia el juego
     */
    const reiniciar = function () {
        location.reload();
    }

    /**
     * Cierra el juego
     */
    const salir = function () {
        window.close();
    }

    const init = function () {
        masterMind.init();
        masterMind.mostrar();

        $numeroFilas = 0; // Reinicia las filas
        $casillas = $(".casilla");
        $casillasPistas = $(".casillaPista");
        $divGanar = $("#divGanar");

        // Botones
        $("#btn-Comprobar").click(comprobar).animate({
            opacity: .1
        }, 1500).animate({
            opacity: 1
        }, 1500);
        $("#btn-Reiniciar").click(reiniciar);
        $("#btn-Salir").click(salir);

        // Eventos
        $("#listaBolas div").each(function () {
            $(this).click(function () {
                $(this).fadeOut().fadeIn();
                pintarBola(this.id);
            }).fadeOut().fadeIn();
        });

        crearFila();
    }


    $(document).ready(init);
}