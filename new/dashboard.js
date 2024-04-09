const hambuger=document.querySelector("#toggle-btn");

hambuger.addEventListener("click",function(){
  document.querySelector("#sidebar").classList.toggle("expand");
})