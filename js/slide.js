let slide_data = [
  {
    'src':'./slider/imagen2024.jpg',
    'title':'Tema del año.',
    'copy':'Slide 1'
  },
  {
    'src':'./slider/fachada.jpg', 
    'title':'Nuestra sede.',
    'copy':'Slide 2'
  },
  {
    'src':'./slider/celebracion.jpg', 
    'title':'Celebración dominical.',
    'copy':'Slide 3'
  },
  {
    'src':'./slider/grupomusical.jpg', 
    'title':'Grupo Musical',
    'copy':'Slide 4'
  },
  {
    'src':'./slider/niños.jpg', 
    'title':'Ministerio infantil',
    'copy':'Slide 5'
  },
  {
    'src':'./slider/consolidacion.jpg',
    'title':'Ministerio de consolidación',
    'copy':'Slide 6'
  },
  {
    'src':'./slider/semillero.jpg',
    'title':'Semillero de esperanza',
    'copy':'Slide 7'
  },
  
];
let slides = [],
  captions = [];
  
let autoplay = setInterval(function(){
  nextSlide();
},5000);
let container = document.getElementById('container');
let leftSlider = document.getElementById('left-col');
// console.log(leftSlider);
let down_button = document.getElementById('down_button');
// let caption = document.getElementById('slider-caption');
// let caption_heading = caption.querySelector('caption-heading');
  
down_button.addEventListener('click',function(e){
  e.preventDefault();
  clearInterval(autoplay);
  nextSlide();
  autoplay;
});
  
for (let i = 0; i< slide_data.length; i++){
  let slide = document.createElement('div'),
      caption = document.createElement('div'),
      slide_title = document.createElement('div');
      
  slide.classList.add('slide');
  slide.setAttribute('style','background:url('+slide_data[i].src+') no-repeat center center/cover ');
  caption.classList.add('caption');
  slide_title.classList.add('caption-heading');
  slide_title.innerHTML = '<h1>'+slide_data[i].title+'</h1>';
    
  switch(i){
    case 0:
        slide.classList.add('current');
        caption.classList.add('current-caption');
        break;
    case 1:
        slide.classList.add('next');
        caption.classList.add('next-caption');
        break;
    case slide_data.length -1:
      slide.classList.add('previous');
      caption.classList.add('previous-caption');
      break;
    default:
        break;       
  }
  caption.appendChild(slide_title);
  caption.insertAdjacentHTML('beforeend','<div class="caption-subhead"><span>'+slide_data[i].copy+'</span></div>');
  slides.push(slide);
  captions.push(caption);
  leftSlider.appendChild(slide);
  container.appendChild(caption);
}
// console.log(slides);

let current_slide = 0;
  
function nextSlide(){
  // caption.classList.add('offscreen');
    
  slides[0].classList.remove('current');
  slides[0].classList.add('previous','change');
  slides[1].classList.remove('next');
  slides[1].classList.add('current');
  slides[2].classList.add('next');

  let last = slides.length -1;

  slides[last].classList.remove('previous');
    
  captions[0].classList.remove('current-caption');
  captions[0].classList.add('previous-caption','change');
  captions[1].classList.remove('next-caption');
  captions[1].classList.add('current-caption');
  captions[2].classList.add('next-caption');
  
  let last_caption = captions.length -1;
    
  // console.log(last);
  captions[last_caption].classList.remove('previous-caption');
    
  let placeholder = slides.shift();
  let captions_placeholder = captions.shift();
  slides.push(placeholder); 
  captions.push(captions_placeholder);
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  updateSlides();
}

function updateSlides() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('current');
      captions[index].classList.add('current-caption');
    } else {
      slide.classList.remove('current');
      captions[index].classList.remove('current-caption');
    }
  });
}

down_button.addEventListener('click', function(e) {
  e.preventDefault();
  clearInterval(autoplay);
  prevSlide(); // Llamamos a la función prevSlide()
  autoplay;
});

// Agregamos un botón de flecha derecha para avanzar al siguiente slide
let up_button = document.getElementById('up_button');
up_button.addEventListener('click', function(e) {
  e.preventDefault();
  clearInterval(autoplay);
  nextSlide(); // Llamamos a la función nextSlide()
  autoplay;
});
  
let heading = document.querySelector('.caption-heading');
  
  
// https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");
  
  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }
  
  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}
  
var transitionEvent = whichTransitionEvent()
caption.addEventListener(transitionEvent, customFunction);
  
function customFunction(event) {
  caption.removeEventListener(transitionEvent, customFunction);
  console.log('animation ended');
  
  // Do something when the transition ends
}