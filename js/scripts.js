var paises;
const paisesContainer = $("#paisesContainer");
const inputCheckBoxTema = $("#inputCheckBoxTema");

// paginação
const quantidadePorPagina = 12;
const paginacaoBtnAnterior = $("#btnAnterior");
const paginacaoBtnPrimeiroN = $("#btnPrimeiroN");
const paginacaoBtnSegundoN = $("#btnSegundoN");
const paginacaobtnTerceiroN = $("#btnTerceiroN");
const paginacaobtnProximo = $("#btnProximo");
const paginacaoContainer = $("#paginacao");

let quantidadeTotalDePaginas;
let paginaAtual = 1;
//fim paginação

// pesquisa
const pesquisaBtn = $("#pesquisaBtn");
const barraDePesquisa = $("#barraDePesquisa");
// fim pesquisa

// filtros
const filtroFilhos = $(".filtroFilho");

let filtroAtual = '';
// fim filtros

const filtrosEBarraDePesquisa = $("#filtrosEBarraDePesquisa");
const secaoDePaginacao = $("#secaoDePaginacao");
const segundaPagina = $("#segundaPagina");
const btnBackSegundaPag = $("#btnBackSegundaPag");

const nativeNameSegundaPagina = $("#nativeNameSegundaPagina");
const populationSegundaPagina = $("#populationSegundaPagina");
const regionSegundaPagina = $("#regionSegundaPagina");
const subRegionSegundaPagina = $("#subRegionSegundaPagina");
const capitalSegundaPagina = $("#capitalSegundaPagina");
const domainSegundaPagina = $("#domainSegundaPagina");
const currenciesSegundaPagina = $("#currenciesSegundaPagina");
const languagesSegundaPagina = $("#languagesSegundaPagina");
const borderCountriesPai = $("#borderCountriesPai");
const nomePaisSegundaPagina = $("#nomePaisSegundaPagina");
const bandeiraSegundaPagina = $("#bandeiraSegundaPagina");





$(async () => {
    paises = await fetch(`./data.json`)
        .then(async response => await response.json())
        .catch(error => {

        });

    atualizarPaginacao();

});

const atualizarPaginacao = () => {
    paisesContainer.empty();

    const paisesFiltrados = paises.filter(pais => pais.region.includes(filtroAtual));

    const nomePesquisado = barraDePesquisa.val().toLowerCase();
    const paisesPesquisados = paisesFiltrados.filter(pais =>
        pais.name.toLowerCase().includes(nomePesquisado)
    );

    quantidadeTotalDePaginas = Math.ceil(paisesPesquisados.length / quantidadePorPagina);
    paginacaobtnTerceiroN.text(quantidadeTotalDePaginas);

    const posicaoInicial = ((paginaAtual - 1) * quantidadePorPagina);
    const posicaoFinal = (paginaAtual * quantidadePorPagina);
    const paisesPaginacao = paisesPesquisados.slice(posicaoInicial, posicaoFinal);

    paisesPaginacao.forEach(pais => {
        let paisElement;

        if (inputCheckBoxTema.prop('checked')) {
            paisElement = $(
                `<div data-id="${pais.alpha3Code}" class="paises-filhos elementos modo-claro-elementos">
                <img class="bandeiras" src="${pais.flags.svg}" alt="${pais.name}">
                <div class="textoPais modo-claro-texto">
                <h4 class="elemento-texto modo-claro-texto">${pais.name}</h4>
                <p class="elemento-texto modo-claro-texto"><span>Population:</span> ${formatarNumero(pais.population)}</p>
                <p class="elemento-texto modo-claro-texto"><span>Region:</span> ${pais.region}</p>
                <p class="elemento-texto modo-claro-texto"><span>Capital:</span> ${pais.capital}</p>
                </div>
                </div>`
            );
        } else {
            paisElement = $(
                `<div data-id="${pais.alpha3Code}" class="paises-filhos elementos">
                <img class="bandeiras" src="${pais.flags.svg}" alt="${pais.name}">
                <div class="textoPais">
                <h4 class="elemento-texto">${pais.name}</h4>
                <p class="elemento-texto"><span>Population:</span> ${formatarNumero(pais.population)}</p>
                <p class="elemento-texto"><span>Region:</span> ${pais.region}</p>
                <p class="elemento-texto"><span>Capital:</span> ${pais.capital}</p>
                </div>
                </div>`
            );
        }

        adicionarEventoSegundaPagina(paisElement);
        paisesContainer.append(paisElement);
    });

    paginacaoBtnSegundoN.text(paginaAtual)
    if (quantidadeTotalDePaginas > 1) {
        paginacaoContainer.show()
    }
    else {
        paginacaoContainer.hide()
    }
};

const formatarNumero = (numero) => {
    return numero.toLocaleString("pt-BR");
};

const exibirPaisPorAlpha3Code = (paisAlpha3Code) => {
    const pais = paises.find(pais => pais.alpha3Code === paisAlpha3Code);
    const currenciesString = pais.currencies ? pais.currencies.map(currencie => currencie.name).join(', ') : 'Uninformed';
    const languagesString = pais.languages ? pais.languages.map(language => language.name).join(', ') : 'Uninformed';

    const borderCountries = pais.borders ? paises.filter(unidadePais => pais.borders.includes(unidadePais.alpha3Code)) : [];


    nomePaisSegundaPagina.text(pais.name ? pais.name : 'Uninformed');
    nativeNameSegundaPagina.text(pais.nativeName ? pais.nativeName : 'Uninformed');
    populationSegundaPagina.text(pais.population ? formatarNumero(pais.population) : 'Uninformed');
    regionSegundaPagina.text(pais.region ? pais.region : 'Uninformed');
    subRegionSegundaPagina.text(pais.subregion ? pais.subregion : 'Uninformed');
    capitalSegundaPagina.text(pais.capital ? pais.capital : 'Uninformed');
    domainSegundaPagina.text(pais.topLevelDomain ? pais.topLevelDomain : 'Uninformed');
    currenciesSegundaPagina.text(currenciesString);
    languagesSegundaPagina.text(languagesString);

    if (pais.flags && pais.flags.svg) {
        bandeiraSegundaPagina.attr('src', pais.flags.svg);
    } else if (pais.flags && pais.flags.png) {
        bandeiraSegundaPagina.attr('src', pais.flags.png);
    }

    borderCountries.forEach(borderCountry => {
        let borderCountryElemento;
        if (inputCheckBoxTema.prop('checked')) {
            borderCountryElemento = $(
                `<div class="borderBoxes elementos elemento-texto modo-claro-elementos modo-claro-texto">${borderCountry.name}</div>`
            );
        } else {
            borderCountryElemento = $(
                `<div class="borderBoxes elementos elemento-texto">${borderCountry.name}</div>`
            );
        }
        borderCountriesPai.append(borderCountryElemento);
    });
}

const adicionarEventoSegundaPagina = (elemento) => {

    elemento.on("click", function (evento) {
        const paisAlpha3Code = $(evento.target).data('id');
        exibirPaisPorAlpha3Code(paisAlpha3Code)


        filtrosEBarraDePesquisa.css('display', 'none');
        paisesContainer.css('display', 'none');
        secaoDePaginacao.css('display', 'none');
        segundaPagina.css('display', 'block');
    });
}
const limparAtributosSegundaPagina = () => {

    nomePaisSegundaPagina.text("Carregando...");
    nativeNameSegundaPagina.text("Carregando...");
    populationSegundaPagina.text("Carregando...");
    regionSegundaPagina.text("Carregando...");
    subRegionSegundaPagina.text("Carregando...");
    capitalSegundaPagina.text("Carregando...");
    domainSegundaPagina.text("Carregando...");
    currenciesSegundaPagina.text("Carregando...");
    languagesSegundaPagina.text("Carregando...");
    bandeiraSegundaPagina.attr('src', "https://flagcdn.com/br.svg");

    borderCountriesPai.find('.borderBoxes').remove();
}

paginacaobtnProximo.on("click", function () {
    if (paginaAtual >= quantidadeTotalDePaginas) return;
    paginaAtual++;
    atualizarPaginacao();
});

paginacaoBtnAnterior.on("click", function () {
    if (paginaAtual <= 1) return;
    paginaAtual--;
    atualizarPaginacao();
});

paginacaoBtnPrimeiroN.on("click", function () {
    paginaAtual = 1;
    atualizarPaginacao();
});

paginacaobtnTerceiroN.on("click", function () {
    paginaAtual = quantidadeTotalDePaginas;
    atualizarPaginacao();
});

pesquisaBtn.on("click", function () {
    atualizarPaginacao();
});

barraDePesquisa.on("keypress", function (evento) {
    if (evento.key !== 'Enter') return;
    paginaAtual = 1;
    atualizarPaginacao();

});

filtroFilhos.on("click", function (evento) {
    filtroAtual = $(evento.target).text() === 'All Regions' ? '' : $(evento.target).text();
    paginaAtual = 1;
    atualizarPaginacao();
    $("#filtrosPai").css("display", "none")
});

btnBackSegundaPag.on("click", function () {
    limparAtributosSegundaPagina()

    filtrosEBarraDePesquisa.css('display', 'flex');
    paisesContainer.css('display', 'grid');
    secaoDePaginacao.css('display', 'flex');
    segundaPagina.css('display', 'none');
});

$("#btnFiltros").on("click", function () {
    let filtros = $("#filtrosPai");

    if (filtros.css("display") === "flex") {
        filtros.css("display", "none");
    } else {
        filtros.css("display", "flex");
    }
});

inputCheckBoxTema.on("change", function () {
    $(".elementos").toggleClass("modo-claro-elementos");
    $("#filtrosPai").toggleClass("modo-claro-elementos");
    $(".elemento-texto").toggleClass("modo-claro-texto");
    $("#barraDePesquisa").toggleClass("modo-claro-input");
    $(".imagens-elementos").toggleClass("modo-claro-input");
    $("body").toggleClass("modo-claro-background");
    $("#btnSegundoN").toggleClass("btnSegundoNLightMode");

    let icon = $(".btn-tema i");
    icon.toggleClass("fa-regular fa-sun");

    atualizarPaginacao()
});

$("#btnRecarregar").on("click", function () {
    location.reload(); // Recarrega a página ao clicar no botão
});
