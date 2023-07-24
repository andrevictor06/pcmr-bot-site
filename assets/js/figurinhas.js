$(document).ready(() => {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 200,
        percentPosition: true
    })

    $('.image').on("load", () => {
        $('.grid').masonry()
    })
})
