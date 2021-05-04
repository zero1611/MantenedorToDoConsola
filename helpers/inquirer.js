const inquirer = require('inquirer');
require('colors');
const preguntas =[{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: '1',
            name: `${'1'.red}. Crear Tarea`
        },
        {
            value:'2',
            name: `${'2'.red}. Listar Tareas`
        },
        {
            value:'3',
            name: `${'3'.red}. Listar Tareas Completada`
        },
        {
            value:'4',
            name: `${'4'.red}. Listar Tareas Pendientes`
        },
        {
            value:'5',
            name: `${'5'.red}. Completar Tarea(s)`
        },
        {
            value:'6',
            name: `${'6'.red}. Borrar Tarea`
        },
        {
            value:'7',
            name: `${'7'.red}. Salir`
        }
    ]
}];
const pausa = {
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.red} para continuar`
}

const inquirerMenu = async () =>{
    console.clear();
    console.log('========================');
    console.log('Seleccione una opcion'.red);
    console.log('========================\n');

   const {opcion} = await inquirer.prompt(preguntas);
   return opcion;
}
const  inquirePausa = async ()=>{
    console.log('\n');
    await inquirer.prompt(pausa);

}
const leerInput = async(message)=>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}
const listadoTareasBorrar = async (tareas = [])=>{
    console.log('\n');
    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}`.red;
        return{
            value: tarea.id,
            name: `${idx } ${tarea.desc}`
        }

    });
    choices.unshift({
        value: '0',
        name: '0.' .green + ' Cancelar'
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async (message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}
const mostrarListadoChecklist = async (tareas = [])=>{
    console.log('\n');
    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}`.red;
        return{
            value: tarea.id,
            name: `${idx } ${tarea.desc}`,
            checked: (tarea.completadoEn)?true : false
        }

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}
module.exports = {
    inquirerMenu,
    inquirePausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}