window.onload = function(){
    document.querySelector("header div#menu a#productos").addEventListener("click", function(){
        document.querySelector("header div#carro-compra").style.display = "flex";
    })

    
    document.querySelectorAll("header div#menu a:not(#productos)").forEach(element => {
        element.addEventListener("click", function(){
            document.querySelector("header div#carro-compra").style.display = "none";
        })
    });

    // 
    document.querySelectorAll("header div#menu a").forEach(element => {
        element.addEventListener("click", function(event){
            if(document.querySelector("header div#menu a.enlace-activo")){
                document.querySelector("header div#menu a.enlace-activo").classList.remove('enlace-activo');
            }
            element.classList.add('enlace-activo');
        })
    });
};