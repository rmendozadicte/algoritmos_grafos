class GrafoRecorridos{

    constructor(){
        this.redUsuarios = new Map()
    }

    agregarUsuario(nombreUsuario){
        if( this.redUsuarios.has(nombreUsuario) == false){
            this.redUsuarios.set(nombreUsuario,[]);
        }
    }
    
    conectarUsuarios(usuarioX,usuarioY){
        this.agregarUsuario(usuarioX); 
        this.agregarUsuario(usuarioY);

        this.redUsuarios.get(usuarioX).push(usuarioY);
        this.redUsuarios.get(usuarioY).push(usuarioX);
    }

    encontrarCaminoMasCorto(nodoInicio, nodoDestino){
        
        // Inicializar
        let cola = []; // Cola (FIFO) para explorar los nodos
        let visitados = new Map(); // Registrar nodos ya visitados y evitamos los bucles
        let predecesores = new Map(); // Guardamos quien descubrió a quien para tener el camino de regreso

        // Configurar el punto de partido
        cola.push(nodoInicio); // Agregamos el nodo de inicio a la cola
        visitados.set(nodoInicio,true); // Lo registramos como visitado
        predecesores.set(nodoInicio,null); // El nodo de inicio no tiene predecesor

        let encontrado = false;

        // Bucle principal para explorar nivel por nivel
        while(cola.length>0){

            let nodoActual = cola.shift();

            if(nodoActual === nodoDestino){
                encontrado = true;
                break;
            }
            let vecinos = this.redUsuarios.get(nodoActual) || [];

            for(let vecino of vecinos){
                if(visitados.has(vecino) == false){
                    visitados.set(vecino,true);
                    predecesores.set(vecino,nodoActual);
                    cola.push(vecino) // 
                }
            }
        }

        if(encontrado == false){
            console.log(`No hay un camino posible entre [${nodoInicio}] y [${nodoDestino}]`);
            return;
        }

        // Reconstruccion del camino desde destino al inicio
        let camino = [];
        let actual = nodoDestino;

        while(actual !== null){
            camino.unshift(actual); // Agregar el elemento al inicio del arreglo
            actual = predecesores.get(actual)
        }

        console.log(`Camino más corto de [${nodoInicio}] a [${nodoDestino}] es:`, camino.join(" -> "));
        
    }

}

let red = new GrafoRecorridos();

red.conectarUsuarios("ana","carlos");
red.conectarUsuarios("ana","bruno");
red.conectarUsuarios("daniela","raul");
red.conectarUsuarios("raul","carlos");
red.conectarUsuarios("carlos","diana");
red.conectarUsuarios("bruno","maria");
red.conectarUsuarios("maria","ana");
red.conectarUsuarios("diana","jose");

red.encontrarCaminoMasCorto("ana","daniela");
