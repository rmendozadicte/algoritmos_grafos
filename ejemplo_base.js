
class GrafoPorNiveles{

    constructor(){
        this.adyacencia = new Map();
    }

    agregarVertice(vertice){
        if(this.adyacencia.has(vertice) == false){
            this.adyacencia.set(vertice,[]);
        }
    }

    agregarArista(origen,destino){
        this.agregarVertice(origen);
        this.agregarVertice(destino);

        this.adyacencia.get(origen).push(destino);
        this.adyacencia.get(destino).push(origen);
    }

    algoritmoBfs(nodoInicio){
        let cola = [];
        let visitados = new Map();

        //Guardamos un objeto con el nodo y su nivel inicial (Nivel 0)
        cola.push({ nodo: nodoInicio, nivel: 0 })
        visitados.set(nodoInicio,true);
    
        console.log(`Exploración por niveles desde [${nodoInicio}]`);

        while(cola.length > 0){
            //Extraemos el objeto actual de la cola
            let actual = cola.shift();

            //Imprimimos el nodo y su respectivo nivel
            console.log(`Nivel ${actual.nivel} -> ${actual.nodo}`);
            
            //Obtenemos sus vecinos 
            let vecinos = this.adyacencia.get(actual.nodo) || [];

            for(let vecino of vecinos){
                if(visitados.has(vecino) == false){
                    visitados.set(vecino,true);

                    cola.push({ nodo: vecino, nivel: actual.nivel + 1 })
                }
            }
        }
        
    }

}

let grafos = new GrafoPorNiveles();

grafos.agregarArista("ana","carlos");
grafos.agregarArista("ana","bruno");
grafos.agregarArista("carlos","diana");
grafos.agregarArista("bruno","maria");
grafos.agregarArista("diana","jose");

grafos.algoritmoBfs("ana");