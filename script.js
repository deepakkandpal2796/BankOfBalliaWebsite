'use strict';

//Selected Elements 
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const section1 = document.querySelector('#section--1');
const btnScroll = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent =  document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.nav__logo');

//Functions
const openModal = function (e) {
  e.preventDefault(); //! on click of the hyperlink the page refresh
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


//Event listners 
btnsOpenModal.forEach(element => {
  element.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




//---------------Website starts------------------

//*-----scrolling behaviour---------

//*------btn scroll----------------
btnScroll.addEventListener('click', function(e){
    section1.scrollIntoView({behavior:'smooth'});
});

//*------nav link scroll------
navLinks.addEventListener('click', function(e){
  e.preventDefault();
  const targetLink = e.target.classList.contains('nav__link');
  if(targetLink) {
    const targetSection = e.target.getAttribute('href');
    document.querySelector(targetSection).scrollIntoView({behavior: "smooth"});
  }
});

//*---------tabs navigation---------

tabsContainer.addEventListener("click", (e) => {
  //tab display
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //content Display
  tabContent.forEach(el => el.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  
});

//*---------Hover event nav links---------
const handelHover = function (e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('nav');
    console.log(siblings);
    const navLinks = siblings.querySelectorAll('.nav__link');
    
    navLinks.forEach((el) => {
      if(el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }

}

nav.addEventListener('mouseover', handelHover.bind(0.5));

nav.addEventListener('mouseout',  handelHover.bind(1));


//*---------Sticky nav bar---------

const obsFun = function(entries, observerr){
  entries.forEach(entry => {
    // console.log(entry);
    
     if(!entry.isIntersecting){
        nav.classList.add('sticky');
    }else{
        nav.classList.remove('sticky');
    }
  });
}

const navHeight = nav.getBoundingClientRect().height;

const obsOption  = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //give a negative margin to the intersection,
}


const observer = new IntersectionObserver(obsFun, obsOption)
observer.observe(header); 

//*---------Sliding section---------

const secObsCallbk = function(entries, observer){
  const [entry] = entries;
   
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  secObserver.unobserve(entry.target);
}

const secObsOption = {
  root: null,
  threshold: 0.15,
}

const secObserver = new IntersectionObserver(secObsCallbk, secObsOption);

const sections = document.querySelectorAll('.section');
sections.forEach(sec => {
  //! sec.classList.add('section--hidden')
  secObserver.observe(sec);
});

//*---------Img reveal on section---------

const imgCallBck = function(entries, observer){
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })
  imgObserver.unobserve(entry.target);
}


const imgOptns = {
  root: null,
  threshold: 0,

}

const imgObserver = new IntersectionObserver(imgCallBck, imgOptns);

const imgs = document.querySelectorAll('img[data-src]');
imgs.forEach(img => imgObserver.observe(img));


//*---------Tesimonial slider---------

const slides = document.querySelectorAll('.slide');
const slideWrapper = document.querySelector('.slider');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function(currentSlide){
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide) }%)`;
  });
}
goToSlide(0);



const nextSlide = function(){
  if(currentSlide == maxSlide - 1){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
}

const prevSlide = function(){
  if(currentSlide == 0){
    currentSlide = maxSlide - 1
  }else{
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDots(currentSlide);
}

sliderBtnRight.addEventListener('click', nextSlide);
sliderBtnLeft.addEventListener('click', prevSlide)

//On press of key event
document.addEventListener('keydown', function(e){
  if(e.key == 'ArrowRight'){
     nextSlide();
     activeDots(currentSlide);
    }else if(e.key == 'ArrowLeft'){
     prevSlide(); 
     activeDots(currentSlide);
  }
});

//dots 
const dotsContainer = document.querySelector('.dots');

//dots should be equal to the no of slides
slides.forEach((_, i) => {
  dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
})



//select dots
dotsContainer.addEventListener('click', function(e){
  if(!e.target.classList.contains('dots__dot')) return;
  const dotNo = e.target.dataset.slide;
  goToSlide(dotNo);
  activeDots(dotNo);
})


const dots = document.querySelectorAll('.dots__dot');
const activeDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add('dots__dot--active');

}
activeDots(0);