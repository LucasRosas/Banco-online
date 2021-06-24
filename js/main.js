$.getJSON("data/data1.json", function(json) {
    data = json
});
var $table = $('#table')
$(function() {

    $table.bootstrapTable({ data: data })
})



var $table = $('#table')
var $button = $('#button')

$(function() {
    $button.click(function() {
        $table.bootstrapTable('filterBy', {
            id: [1, 2, 3]
        })
    })
})