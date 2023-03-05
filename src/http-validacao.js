import chalk from "chalk";

function extrai_Links(arrLinks)
{
    return arrLinks.map((objeto_Link) => Object.values(objeto_Link).join())
}

async function checa_Status(Lista_de_URLS)
{
    const arrStatus = await Promise.all
    (
        Lista_de_URLS.map(async (url) =>
        {
            try 
            {
                const response = await fetch(url);
                return response.status;    
            } 
            catch (error) 
            {
               return maneja_erros(error);
            }
        })
    )

    return arrStatus;
    
}

function maneja_erros(erro)
{
    if(erro.cause.code === 'ENOTFOUND')
    {
        return "Link nao encontrado";
        //console.log(chalk.green("LINK NAO ENCONTRADO"));
    }
    else
    {
        return "Ocorreu um Erro";
    }
    
    //return
}

export default async function listaValidada(lista_de_Links)
{
    const Links = extrai_Links(lista_de_Links);
    const status = await checa_Status(Links);
    //return extrai_Links(lista_de_Links);
    return lista_de_Links.map((objeto , indice) => 
    ({
        ...objeto,
        status: status[indice]
    }));
    //return status;

}