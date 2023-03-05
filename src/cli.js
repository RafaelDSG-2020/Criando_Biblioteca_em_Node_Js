import FileSystem from 'fs';
import chalk from "chalk";
import pegaArquivo from "./index.js";
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprime_Lista(valida,resultado, identificador = "")
{
    if(valida)
    {
        console.log(
            chalk.yellow("Lista Validada"),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    }
    else
    {
        console.log(
            chalk.yellow("Lista de Links"),
            chalk.black.bgGreen(identificador),
            resultado);
    }

    

}


async function processaTexto(argumentos)
{
    const caminho = argumentos[2];
    const valida = argumentos[3] === "--valida";
    
    try 
    {
        FileSystem.lstatSync(caminho);    
    } 
    catch (erro) 
    {
        if(erro.code === "ENOENT")
        {
            console.log("Arquivo ou Diretório não Existente");
            return;
        }    
    }

    if(FileSystem.lstatSync(caminho).isFile())
    {
        const resultado = await pegaArquivo(argumentos[2]);
        imprime_Lista(valida , resultado);
    }
    else if(FileSystem.lstatSync(caminho).isDirectory())
    {
        const arquivos = await FileSystem.promises.readdir(caminho);
        arquivos.forEach(async (nome_de_Arquivo) => 
        {
            const Lista = await pegaArquivo(`${caminho}/${nome_de_Arquivo}`);
            imprime_Lista(valida ,Lista, nome_de_Arquivo);
        })
        //console.log(arquivos);
    }

}

processaTexto(caminho);

