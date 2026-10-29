class Laberinto{

    constructor(){
        this.habitaciones = new Map();
    }

    agregarHabitacion(habitacion){
        if(this.habitaciones.has(habitacion) == false){
            this.habitaciones.set(habitacion,[]);
        }
    }

    conectarPuerta(hab1,hab2){
        this.agregarHabitacion(hab1);
        this.agregarHabitacion(hab2);
        this.habitaciones.get(hab1).push(hab2);
        this.habitaciones.get(hab2).push(hab1);
    }

    escaparLaberinto(inicio,salida){

        let cola = [];
        let visitados = new Map();
        let predecesores = new Map();
        
        cola.push(inicio);
        visitados.set(inicio,true);
        predecesores.set(inicio,null);
        
        let encontrado = false;
   
        while(cola.length>0){

            let actual = cola.shift();

            if(actual === salida){
                encontrado = true;
                break;
            }

            let puertas = this.habitaciones.get(actual) || [];

            for(let puerta of puertas){
                if(visitados.has(puerta) == false){
                    visitados.set(puerta,true);
                    predecesores.set(puerta,actual);
                    cola.push(puerta);
                }
            }

        }

        if(encontrado == false){
            console.log(`No hay una salida posible en este laberinto`);
            return;
        }

        let camino = [];
        let actual = salida;

        while(actual !== null){
            camino.unshift(actual);
            actual = predecesores.get(actual);
        }

        console.log(`Ruta de escape más rápida de [${inicio}] a [${salida}]:`, camino.join(" -> "));
        
    }

}

let laberinto = new Laberinto();

laberinto.conectarPuerta("Entrada","Pasillo A");
laberinto.conectarPuerta("Entrada","Pasillo B");
laberinto.conectarPuerta("Pasillo A","Sala Oscura");
laberinto.conectarPuerta("Pasillo B","Patio");
laberinto.conectarPuerta("Pasillo B","Sala de Tesoro");
laberinto.conectarPuerta("Sala de Tesoro","Salida");
laberinto.conectarPuerta("Patio","Cochera");
laberinto.conectarPuerta("Cochera","Pasaje");
laberinto.conectarPuerta("Pasaje","Salida");

laberinto.escaparLaberinto("Entrada","Salida");