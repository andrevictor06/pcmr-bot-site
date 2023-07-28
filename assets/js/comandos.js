$(document).ready(() => {
    
    $('#input-search').on("keyup change", (event) => {
        const search = $('#input-search').val()
        if(search){
            $("#lista-comandos li").each((i, item)=>{
                const parent = $(item)
                if($(item).text().includes(search)){
                    parent.show()
                }else{
                    parent.hide()
                }
            })
        }else{
            $("#lista-comandos li").show()
        }
    })
})
