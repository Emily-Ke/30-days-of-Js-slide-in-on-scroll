const debounce = (func: Function, wait = 20) => {
  let timeout = 0;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(args), wait);
  };
};

const isOnScreen = (el: Element, amount = 0) => {
  const { top, bottom, height } = el.getBoundingClientRect();
  const ratio = height * amount;
  return top + ratio < window.innerHeight && bottom - ratio > 0;
};

const slideImages = (images: Element[]) => {
  images.forEach((image) => {
    if (isOnScreen(image, 0.25)) {
      image.classList.remove('hidden');
    } else if (!isOnScreen(image)) {
      image.classList.add('hidden');
    }
  });
};

const init = () => {
  // any image that is not visible on screen should be pushed off
  const imagesToSlideIn = [...document.querySelectorAll('.container img')];
  imagesToSlideIn.forEach((image) => {
    if (!isOnScreen(image, 0.25)) {
      image.classList.add('hidden');
    }
  });

  document.addEventListener(
    'scroll',
    debounce(() => slideImages(imagesToSlideIn), 20)
  );
};

window.addEventListener('load', init);
