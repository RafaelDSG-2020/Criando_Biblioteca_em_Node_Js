import fs from 'fs';
import chalk from 'chalk';



function extrai_Linha(texto)
{
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [... texto.matchAll(regex)];
    //const capturas = regex.exec(texto);
    //const capturas =  texto.match(regex);
    const resultados = capturas.map(captura => ({[captura[1]] : captura[2]}));
    return resultados.length !==0 ? resultados : "Nao existe Links no Arquivo"; // //console.log(resultados);
}

function trataErro(erro)
{
    throw new Error(chalk.red(erro.code, "Erro Inesperado"));
}

async function pegaArquivo(Caminho_do_arquivo)
{
    try 
    {
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(Caminho_do_arquivo, enconding);
        return extrai_Linha(texto);
        //console.log(chalk.green(texto));
    
    } catch (error) 
    {
        trataErro(error);    
    }
    
}

export default pegaArquivo;

// Funçao assicrona
/*function pegaArquivo (Caminho_do_arquivo)
{
    const enconding = 'utf-8';
    fs.promises.readFile(Caminho_do_arquivo, enconding)
      .then((texto)=> console.log(chalk.green(texto)))
      .catch((erro)=> trataErro(erro));
}
*/
/*function pegaArquivo(Caminho_do_arquivo)
{
    const enconding = 'utf-8';
    fs.readFile(Caminho_do_arquivo,enconding,( erro , texto) => 
    {
        if(erro)
        {
            trataErro(erro);
        }
        console.log(chalk.green(texto));
    })
}*/



//pegaArquivo("./arquivos/texto.md");

//console.log(chalk.blue('Hello world!'));