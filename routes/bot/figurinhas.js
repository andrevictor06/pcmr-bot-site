function consultaFigurinhas(){
    console.log("Bora");
    $("#div_imagens").html("")
    $("#div_imagens").hide()
    fetch("/figurinhas").then( (data)=> data.json()).then( (data)=> {

    data.forEach(element => {
        $("#div_imagens").append(`<div class='grid-item'><label>${element.split(".")[0]}</label><div class='div-image'><img src="/images/figurinhas/${element}" alt="" srcset=""/></div></div>`)
    }); 

    // jQuery
    setTimeout(()=>{
        $("#div_imagens").show()
        $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: 200,
            percentPosition: true
        });
    }, 25)
    
    }).catch(() => {})
}

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize) {
        var R = [];
        for (var i = 0; i < this.length; i += chunkSize)
        R.push(this.slice(i, i + chunkSize));
        return R;
    }
});

consultaFigurinhas()