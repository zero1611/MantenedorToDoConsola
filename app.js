require('colors');
const {inquirerMenu , inquirePausa, leerInput,listadoTareasBorrar, confirmar,mostrarListadoChecklist} = require('./helpers/inquirer')
const {guardarDB, leerDB} = require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas')

console.clear();
const main = (async ()=>{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
               const ids = await mostrarListadoChecklist(tareas.listadoArr);
               tareas.toggleCompletadas(ids);
            break;
            case '6':
               const id = await listadoTareasBorrar(tareas.listadoArr);

               if(id !== '0'){
                   const ok = await confirmar('Esta seguro?')
                   if(ok){
                       tareas.borrarTarea(id);
                       console.log('Tarea Borrada Exitosamente'.red);
                   }
               }

            break;

        }
        guardarDB(tareas.listadoArr);
        await inquirePausa();

    }while (opt !== '7');



})();


