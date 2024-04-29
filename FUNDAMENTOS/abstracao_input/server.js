import inquirer from 'inquirer'
import colors from 'colors'
import media from './media.js'

// console.log('Texto de exemplo'.rainbow)
inquirer
    .prompt([
        {
            name: 'p1',
            message: 'Qual a primeira nota?'
        },
        {
            name: 'p2',
            message: 'Qual a segunda nota?'
        }
    ]).then((answers) => {
        //Crie um módulo interno de soma, e chame esse módulo para resolver o problema abaixo
        const arg1 = Number(answers.p1)
        const arg2 = Number(answers.p2)
        console.log(answers)
        // const media = parseInt(answers.p1) + parseInt(answers.p2) / 2
        const fmedia = media(arg1, arg2)
        if(fmedia >= 7){
            console.log(`Você foi Aprovado ${fmedia}`.bgGreen)
        }else{
            console.log(`Você foi Reprovado ${fmedia}`.rainbow)
        }
        console.log(`A sua média é ${fmedia}`.bgCyan)
    })
    .catch((err) => {
        console.error(err)
    })