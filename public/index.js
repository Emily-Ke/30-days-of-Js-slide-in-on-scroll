const imagesToSlideIn = [];

const isOnScreen = (el) => {
  const { top, bottom } = el.getBoundingClientRect();
  return top < window.innerHeight && bottom > 0;
};

const slideImages = () => {
  imagesToSlideIn.forEach((image, index) => {
    if (isOnScreen(image)) {
      image.style.transform = 'translateX(0)';
      imagesToSlideIn.splice(index, 1);
    }
  });
  if (imagesToSlideIn.length === 0) {
    document.removeEventListener('scroll', slideImages);
  }
};

const init = () => {
  // any image that is not visible on screen should be pushed off
  const images = document.querySelectorAll('.container img');
  images.forEach((image) => {
    if (!isOnScreen(image)) {
      imagesToSlideIn.push(image);
      if (image.classList.contains('left')) {
        image.style.transform = 'translateX(-110%)';
      } else if (image.classList.contains('right')) {
        image.style.transform = 'translateX(110%)';
      }
    }
  });

  document.addEventListener('scroll', slideImages);
};

window.addEventListener('load', init);
