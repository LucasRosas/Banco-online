var $table = $('#table')


// constrói tabela
$.getJSON("data/data1.json", function(json) {
    data = json
});


$(function() {

    $table.bootstrapTable({ data: data })
    ajusta()
})

// configurações da régua
var option;

option = {
    animation: true,

    grid: [{
        top: 50,
        left: 50,
        right: 50,
        bottom: 150

    }],
    xAxis: [{
            gridIndex: 0,
            min: 0,
            max: 1200,
            bottom: 0,
            splitNumber: 20
        }

    ],
    yAxis: [{
        show: false
    }],
    series: [{
        symbolSize: 15,
        data: [],
        type: 'scatter'
    }]
};

$(window).on('resize', function() {
    if (myChart != null && myChart != undefined) {
        myChart.resize();
    }
});


// Gerencia a lista de questões gerecionadas
var selecionadas = []

$('#table').on('check-all.bs.table', function(a, b) {
    b.forEach(x => {
        if (!selecionadas.includes(x.id)) { selecionadas.push(x.id) }
    });
    marcanaregua()
    listaselecionadas()
})

$('#table').on('check.bs.table', function(e, row) {
    if (!selecionadas.includes(row.id)) { selecionadas.push(row.id) }
    marcanaregua()
    listaselecionadas()
})

$('#table').on('uncheck.bs.table', function(e, row) {

    desmarcanaregua(row)
    listaselecionadas()
})
$('#table').on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
    selecionadas = []
    option.series[0].data = []
    myChart.setOption(option);

    listaselecionadas()
})

function listaselecionadas() {
    lista = ""
    for (i = 0; i < selecionadas.length; i++) {
        lista = lista + '<div class="outdot col-2 p-1 my-1 mx-3 border bg-white shadow shadow-sm text-center rounded" onmouseover="midq(this)" onmouseout="eid()" onclick="aid(this)"><div class="dot"></div>' + selecionadas[i] + '</div>'
    }

    document.getElementById('selecionadas').innerHTML = lista
    if (selecionadas.length == 1) {
        document.getElementById('status').innerHTML = `Apenas <red>uma</red> questão foi selecionada.`
    } else if (selecionadas.length == 2) {
        document.getElementById('status').innerHTML = `Foram selecionadas <red>duas</red> questões.`
    } else {
        document.getElementById('status').innerHTML = `Foram selecionadas <red>${selecionadas.length}</red> questões.`
    }
}


$('#table').on('reset-view.bs.table', function(e) {
    ajusta()
})

function marcanaregua() {
    lista = $table.bootstrapTable('getSelections')

    lista.forEach(x => {
        bool = false
        dados = option.series[0].data
        dados.forEach(y => {
            if (JSON.stringify(y) != JSON.stringify([x.B, 0, x.id])) {} else {
                bool = true
            }
        });

        if (!bool) {
            dados.push([x.B, 0, x.id])
            myChart.setOption(option);
        }

    });
}

function desmarcanaregua(row) {
    dados = []
    lista = $table.bootstrapTable('getSelections')
    lista.forEach(x => {
        dados.push([x.B, 0, x.id])


    });
    option.series[0].data = dados
    myChart.setOption(option);
    selecionadas.splice(selecionadas.indexOf(row.id), 1)
}


//Filtros


function ajusta() {
    cheks = document.getElementsByTagName('TR')
    mina = Number(document.getElementById('mina').value)
    maxa = Number(document.getElementById('maxa').value)
    minb = Number(document.getElementById('minb').value)
    maxb = Number(document.getElementById('maxb').value)
    minc = Number(document.getElementById('minc').value)
    maxc = Number(document.getElementById('maxc').value)
    for (i = 1; i < cheks.length; i++) {
        id = cheks[i].getElementsByTagName('TD')[1].innerText
        cheks[i].getElementsByTagName('td')[1].outerHTML = `<td onmouseover="midq(this)" onmouseout="eid()" onclick="aid(this)"><a href="${id}" target="blank">${id}</a></td>`

        ac = cheks[i].getElementsByTagName('TD')[2].innerText
        cheks[i].getElementsByTagName('td')[2].outerHTML = `<td onmouseover="midr(this)" onmouseout="eid()" onclick="aac(this)"><a href="${ac}" target="blank">${ac}</a></td>`

        pa = Number(cheks[i].getElementsByTagName('TD')[5].innerText)
        if (pa <= maxa && pa >= mina) {
            cheks[i].getElementsByTagName('td')[5].outerHTML = `<td class='bg-info' >${pa}</td>`
        } else {
            cheks[i].getElementsByTagName('td')[5].outerHTML = `<td>${pa}</td>`
        }

        pb = Number(cheks[i].getElementsByTagName('TD')[6].innerText)
        if (pb <= maxb && pb >= minb) {
            cheks[i].getElementsByTagName('td')[6].outerHTML = `<td class='bg-info' >${pb}</td>`
        } else {
            cheks[i].getElementsByTagName('td')[6].outerHTML = `<td>${pb}</td>`
        }

        pc = Number(cheks[i].getElementsByTagName('TD')[7].innerText)
        if (pc <= maxc && pc >= minc) {
            cheks[i].getElementsByTagName('td')[7].outerHTML = `<td class='bg-info' >${pc}</td>`
        } else {
            cheks[i].getElementsByTagName('td')[7].outerHTML = `<td>${pc}</td>`
        }


        bp = cheks[i].getElementsByTagName('TD')[14].innerText
        bp = bp.split(' ')
        link1 = data.filter(element => element.id == id)[0].link1
        bp = '<a href="' + link1 + '" target="blank">' + bp.join(`</a> <a href="${link1}" target="blank">`) + '</a>'

        cheks[i].getElementsByTagName('td')[14].outerHTML = `<td onclick="aac(this)">${bp}</td>`
    }
}

function midq(x) {
    id = x.innerText
    var data_filter = data.filter(element => element.id == id)
    document.getElementById('imagemid').classList.remove('oculto')
    document.getElementById('idtri').innerText = id
    document.getElementById('garea').innerText = data_filter[0].area
    document.getElementById('bvalue').innerText = `B = ${data_filter[0].B}`
    document.getElementById("imgmodal").src = data_filter[0].img1;
}

function midr(x) {

    id = x.parentElement.getElementsByTagName('td')[1].innerText

    var data_filter = data.filter(element => element.id == id)
    document.getElementById('imagemid').classList.remove('oculto')
    document.getElementById('idtri').innerText = id
    document.getElementById('garea').innerText = data_filter[0].area
    document.getElementById('bvalue').innerText = `B = ${data_filter[0].B}`
    document.getElementById("imgmodal").src = data_filter[0].img2;

}

function eid() {
    document.getElementById('imagemid').classList.add('oculto')
}



function limpafiltro() {
    $table.bootstrapTable('resetSearch')
    document.getElementById('mina').value = 0
    document.getElementById('maxa').value = 0
    document.getElementById('minb').value = 0
    document.getElementById('maxb').value = 0
    document.getElementById('minc').value = 0
    document.getElementById('maxc').value = 0
    ajusta()
}

function customSearch(data, text) {
    return data.filter(function(row) {
        return row.area.indexOf(text) > -1
    })
}