$.getJSON("data/data1.json", function(json) {
    data = json
});
var $table = $('#table')
$(function() {

    $table.bootstrapTable({ data: data })
    ajusta()
})

var tds = document.getElementsByTagName('TD')

for (var i = 0; i < tds.length; i++) {
    tds[i].addEventListener('mouseover', function(e) {
        console.log(e);
    })
};

var $table = $('#table')
var $button = $('#button')



$(function() {
    $button.click(function() {
        $table.bootstrapTable('filterBy', {
            id: [1, 2, 3]
        })
    })
})


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

var selecionadas = []

$('#table').on('check-all.bs.table', function(e, row) {
    marcanaregua(row)
    selecionadas()
})

$('#table').on('check.bs.table', function(e, row) {
    if (selecionadas.includes(row.id)) {} else { selecionadas.push(row.id) }
    marcanaregua()
    listaselecionadas()
})

$('#table').on('uncheck.bs.table', function(e, row) {

    desmarcanaregua(row)
    listaselecionadas()
})
$('#table').on('uncheck-all.bs.table', function(e, row) {
    desmarcanaregua(row)
    listaselecionadas()
})

function listaselecionadas() {
    lista = ""
    for (i = 0; i < selecionadas.length; i++) {
        lista = lista + '<div class="col p-1 mx-3">' + selecionadas[i] + '</div>'
    }

    document.getElementById('selecionadas').innerHTML = lista
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


            console.log(selecionadas);

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
    console.log(selecionadas);
}


// based on prepared DOM, initialize echarts instance



function ajusta() {
    cheks = document.getElementsByTagName('TR')
    for (i = 1; i < cheks.length; i++) {
        id = cheks[i].getElementsByTagName('TD')[1].innerText
        cheks[i].getElementsByTagName('td')[1].outerHTML = `<td onmouseover="mid(this)" onmouseout="eid()" onclick="aid(this)"><a href="${id}" target="blank">${id}</a></td>`

        ac = cheks[i].getElementsByTagName('TD')[2].innerText
        cheks[i].getElementsByTagName('td')[2].outerHTML = `<td onmouseover="mid(this)" onmouseout="eid()" onclick="aac(this)"><a href="${ac}" target="blank">${ac}</a></td>`

        bp = cheks[i].getElementsByTagName('TD')[14].innerText
        bp = bp.split(' ')
        bp = '<a href="https://youtu.be/7JEYuEstxzg" target="blank">' + bp.join('</a> <a href="https://youtu.be/7JEYuEstxzg" target="blank">') + '</a>'

        cheks[i].getElementsByTagName('td')[14].outerHTML = `<td onclick="aac(this)">${bp}</td>`
    }
}

function mid(x) {

    document.getElementById('imagemid').classList.add('mostra')
    document.getElementById('imagemid').innerText = x.innerText
}

function eid() {
    document.getElementById('imagemid').classList.remove('mostra')
}

function aid(x) {

}

function pesquisa(x) {
    document.getElementById("table").setAttribute("data-search-text", x);
}

function limpafiltro() {
    $table.bootstrapTable('resetSearch')
}

function customSearch(data, text) {
    return data.filter(function(row) {
        return row.area.indexOf(text) > -1
    })
}