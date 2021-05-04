const Tarea = require('./tarea')
require('colors');
class Tareas{
    _listado ={};
    get listadoArr(){
        const listado =[];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }
    constructor() {
        this._listado ={};
    }
    borrarTarea(id = ''){
        delete this._listado[id];
    }
    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea=>{
             this._listado[tarea.id] = tarea;
        });


    }
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto(){
        let contador = 0
        console.log('\n')
        this.listadoArr.forEach(tarea=>{
            contador = contador + 1;
            let indice = contador.toString()
            let desc = tarea.desc;
            let comple = tarea.completadoEn;
            let lista = `${indice.green}. ${desc.green}:: Completada`
            if(comple == null){
                lista = `${indice.red}. ${desc.red}:: Pendiente`
            }
           console.log(lista)
        });

    }
    listarPendientesCompletadas(completadas = true){
        let contador = 0
        console.log('\n')
        this.listadoArr.forEach(tarea=>{

            let desc = tarea.desc;
            let comple = tarea.completadoEn;
            let lista;


            if((comple == null) && (completadas == false)){
                contador = contador + 1;
                let indice = contador.toString()
                lista = `${indice.red}. ${desc.red}:: Pendiente`
                console.log(lista)
            }else if((comple != null) && (completadas == true)){
                contador = contador + 1;
                let indice = contador.toString()
                lista = `${indice.green}. ${desc.green}:: ${comple.blue}`
                console.log(lista)
            }

        });
    }
    toggleCompletadas(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach(tareas =>{
            if (!ids.includes(tareas.id)){
                const tarea = this._listado[tareas.id];
                tarea.completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;