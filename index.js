const menuIcon = document.querySelector(".sidebar-toggle");
const aside = document.querySelector("aside");
const closeBtn = document.querySelector(".close-btn");

$(".sidebar-toggle ,.close-btn").click(function(){
    $("aside").toggle();

})

$(".sidebar-toggle").click(function(){
    $("body").css("background","rgb(0,0,0,0.5)");
})
$(".close-btn").click(function(){
    $("body").css("background","transparent");
})



