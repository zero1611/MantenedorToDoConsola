require('colors');

const mostrarMenu = ()=>{

    return new Promise(resolve => {
        console.clear();
        console.log('========================');
        console.log('Seleccione una opcion');
        console.log('========================\n')

        console.log(`1. Crear Tarea`);
        console.log(`2. Listar Tareas`);
        console.log(`3. Listar Tareas Completada`);
        console.log(`4. Listar Tareas Pendientes`);
        console.log(`5. Completar Tarea(s)`);
        console.log(`6. Borrar Tarea`);
        console.log(`0. Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Seleccione una Opcion: ',(opt)=>{

            readline.close();
            resolve(opt);
        })
    });

}
const pausa = ()=>{

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nPresione ${'Enter'.red} para continuar\n`,(opt)=>{
            readline.close();
            resolve();
        })
    })

}

module.exports = {
    mostrarMenu,
    pausa
}