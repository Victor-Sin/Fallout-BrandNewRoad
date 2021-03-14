//______________________________________________________________Global_______________________________________________________________________________________
let isNotAppear = true;
let isOnScreen = false;

new fullpage('#fullpage',{
  autoScrolling: true,
  verticalCentered : false,
  scrollingSpeed : 500,

})

$(window).ready(function(){
  $("input[name='Frise']")[0].checked = true;
  document.querySelector("#son").volume = 0.2;
  document.querySelector("#son").muted = true;
})

$(window).on("orientationchange",() => {
  setTimeout(function(){
    repositionnePhoto();
  },10);
})


        //_Suivie Slide_
            setInterval(function(){
              $(".CatMenu").removeClass("onSection");
              $(".CatMenu:nth-child("+  ((fullpage_api.getActiveSection().index+1)) +")").addClass("onSection");
              apparitionJeuxPhoto();
            },500)


      
        //_Cursor_
            $(document).on("mousemove",function(e){
              $(".cursor").css("top",e.clientY + "px");
              $(".cursor").css("left",e.clientX + "px");
            })

        //_Muted_btn_
            $("#muted-btn").on("click",function(e){
              if(document.querySelector("#son").muted == true){
                document.querySelector("#son").muted = false;
                $("#muted-btn").attr("src","img/Radio.svg");
              }
              else{
                document.querySelector("#son").muted = true;
                $("#muted-btn").attr("src","img/RadioMuted.svg");
              }
            })


//____________________________________________________Ecran de départ____________________________________________________

        //_Son_
            $("#sound").on("click",function(e){
              lancerAnimationLancement(e,false,6,3,8,11,15);
              document.querySelector("#son").muted = false;
              $("#muted-btn").attr("src","img/Radio.svg");
            })


            $("#noSound").on("click",function(e){
              lancerAnimationLancement(e,true,1,0,3,4,6);
              document.querySelector("#son").muted = true;
              $("#muted-btn").attr("src","img/RadioMuted.svg");
            })


function lancerAnimationLancement(event,mute,delay1,delay2,delay3,delay4,delay5){
  event.preventDefault();
  fullpage_api.silentMoveTo("Presentation");
  isOnScreen = true;

  document.querySelector("#son").muted = mute;
  document.querySelector("#son").play();
              
  $(".startScreen").css("opacity","0");
  $(".startScreen").css("pointerEvents","none");
  $(".startScreen").css("z-index","0");
  $("#fullpage").css("z-index","1");

  $("nav").css("animation","Appear 10s both");
  $(".LogoSite img").css("animation","Appear 10s both");
  $("nav .CatMenu").css("animation","Appear 5s both "+ delay1 +"s");  
  $("nav .Mid").css("animation","Appear 5s both "+ delay2 +"s");
  $(".PresT h1").css("animation","opaci 5s both "+ delay3 +"s");
  $(".PresT h1 span").css("animation","opaci 5s both "+ delay4 +"s");
  $(".PresT p").css("animation","opaci 5s both "+ delay5 +"s");

}




//________________________________________________________________Chronologie____________________________________________________________________________________________________

let inputs = $("input[name='Frise']");
let firstLabel = $("label[for='"+inputs[0].id+"']");
firstLabel.css("color","#e5ac2e"); 


class CounterUp {
  constructor(Selector,Start, End, Duration){
    this.Selector = Selector;
    //console.log('inner Selector = ' + this.Selector.innerHTML);
    this.Start = Start;
    this.End = End;    
    this.Duration = Duration;  
    this.Counter = this.Start;
    this.Steps = Math.abs(this.End - this.Start);
    this.StepDuration = this.Duration / this.Steps;  
  }
  
  timerCallback() {
    if ( (this.Counter > this.End && this.Start < this.End) || (this.Counter < this.End && this.Start > this.End) ) {
      clearInterval(this.timer);
    }
    else if( this.Counter < this.End && this.Start < this.End )
    {
      //console.log('Current = ' + this.Counter);      
      this.Counter++;
      this.Selector.innerHTML = Math.round(this.Counter);
    }
    else if (this.Counter > this.End && this.Start > this.End){   
      this.Counter--; 
      this.Selector.innerHTML = Math.round(this.Counter);
    };
  }
    
  start() {
      this.timer = setInterval(this.timerCallback.bind(this),  Math.round(this.StepDuration));
  }
  
}

let test = $("input").on("change", function(e) { //Fonction qui mets réinitialise le style du label et qui permet de mettre en valeur la date sélectionné et réajuste celle en titre.
  let Counter = new CounterUp(document.querySelector("#dateActuelle") ,document.querySelector("#dateActuelle").textContent, e.target.value,500);
  Counter.start();
  $("label").css("color", "white");
  $("label::before").css("background", "white");
  let label = $("label[for='"+e.target.id+"']");
  label.css("color","#e5ac2e"); 
});


//____________________________________________________________Jeux_________________________________________________________________





function initialisePhoto(nthChild,rotate,transX,transY){ //Donne les paramettres de base d'une photo une fois en place.
  $(".photoJeu:nth-child("+ nthChild+")").css("transform", "rotateZ("+ rotate +"deg) translateX("+ transX +"%) translateY("+ transY +"%)");
  $(".photoJeu:nth-child("+ nthChild+")").css("opacity","1");
  $(".photoJeu:nth-child("+ nthChild+")").css("box-shadow","2px 4px 10px rgb(0,0,0,0.3)");
  setTimeout(()=>{
    $(".photoJeu:nth-child("+ nthChild+")").css("pointer-events","auto");
  },1000);
}


function apparitionJeuxPhoto(){ //Permet de gérer l'apparition des différentes photos selon la taille d'écran
  
  if(fullpage_api.getActiveSection().index == 2 && isNotAppear && isOnScreen && ((window.screen.width > 726 && window.screen.width > window.screen.height) || (window.screen.width > 1024 && window.screen.width < window.screen.height)) ){
    isNotAppear = false;
    initialisePhoto(1,-10,25,15);
    setTimeout(function(){      
      initialisePhoto(3,10,-25,10);
      },500);
    setTimeout(function(){      
      initialisePhoto(5,3,-4,-8);
      },1000);
    setTimeout(function(){      
      initialisePhoto(4,12,25,-8);
      },1500);
    setTimeout(function(){      
      initialisePhoto(6,-10,-25,-10);
      },2000);
    setTimeout(function(){      
      initialisePhoto(2,-3,-10,6);
      },2500);
  }
  else if (fullpage_api.getActiveSection().index == 2 && isNotAppear && isOnScreen && window.screen.width < 1024 && window.screen.width < window.screen.height){
    isNotAppear = false;
    initialisePhoto(1,5,7,4);
    setTimeout(function(){      
      initialisePhoto(3,-5,0,-10);
      },500);
    setTimeout(function(){      
      initialisePhoto(2,-3,6,4);
      },1000);
    setTimeout(function(){      
      initialisePhoto(4,2,-4,0);
      },1500);
    setTimeout(function(){      
      initialisePhoto(6,-5,-5,-10);
      },2000);
    setTimeout(function(){        
      initialisePhoto(5,4,-4,-12);
      },2500);
  }
}


function repositionnePhoto(){
  if(fullpage_api.getActiveSection().index == 2 && !isNotAppear && isOnScreen && ((window.screen.width > 726 && window.screen.width > window.screen.height) || (window.screen.width > 1024 && window.screen.width < window.screen.height)) ){
    initialisePhoto(1,-10,25,15);
    initialisePhoto(3,10,-25,10);
    initialisePhoto(5,3,-4,-8);
    initialisePhoto(4,12,25,-8);
    initialisePhoto(6,-10,-25,-10);
    initialisePhoto(2,-3,-10,6);
  }
  else if (fullpage_api.getActiveSection().index == 2 && !isNotAppear && isOnScreen && window.screen.width < 1024 && window.screen.width < window.screen.height){
    initialisePhoto(1,5,7,4);
    initialisePhoto(3,-5,0,-10);
    initialisePhoto(2,-3,6,4);  
    initialisePhoto(4,2,-4,0);
    initialisePhoto(6,-5,-5,-10);     
    initialisePhoto(5,4,-4,-12);
  }
}



