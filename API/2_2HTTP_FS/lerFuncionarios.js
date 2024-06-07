import fs from 'node:fs';

const lerDadosFuncionarios = (callback) => {
    fs.readFile("funcionarios.json", "utf8", (err, data)=>{
        if(err){
            callback(err);
        }
        try{
            const funcionarios =  JSON.parse(data);
            callback(null, funcionarios);
        }
        catch (error) {
            callback(error)
        }
    });
    
};

export default lerDadosFuncionarios;