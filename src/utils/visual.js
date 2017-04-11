export const rippleEffect = (event, keyboardUsed, key) => {
  // Getting the div that the effect is relative to
  var element = keyboardUsed ? key : event.target,
      // Creating the effect's div
      create = document.createElement('div'),
      // Getting the button's size, distance to top and left
      boxWidth = element.offsetWidth,
      boxHeight = element.offsetHeight,
      boxY = element.getBoundingClientRect().top,
      boxX = element.getBoundingClientRect().left,
      // Getting the mouse position
      mouseX = event.clientX || boxX + boxWidth / 2,
      mouseY = event.clientY || boxY + boxHeight / 2,
      // Mouse position relative to the box
      rippleX = mouseX - boxX,
      rippleY = mouseY - boxY,
      // Calculate which is the farthest corner
      rippleWidth = boxWidth / 2 < rippleX
                      ? rippleX
                      : boxWidth - rippleX,
      rippleHeight = boxHeight / 2 < rippleY
                      ? rippleY
                      : boxHeight - rippleY,
      // Distance to the farthest corner
      boxSize = Math.sqrt(Math.pow(rippleWidth, 2) +
                          Math.pow(rippleHeight, 2));

  // Creating and moving the effect div inside the button
  element.appendChild(create);

  // Ripple style (size, position, color and border-radius)
  create.setAttribute('data-rippleEffect', 'effect');
  create.style.height = 2 * boxSize + 'px';
  create.style.width = 2 * boxSize + 'px';
  create.style.top = mouseY - boxY - boxSize + 'px';
  create.style.left = mouseX - boxX - boxSize + 'px';

  setTimeout(function () {
      element.removeChild(create);
  }, 800);
}

export const rippleEffectDisplay = () => {
  // Getting the div that the effect is relative to
  var element = document.querySelector('.display'),
      // Creating the effect's div
      create = document.createElement('div'),
      // Getting the button's size, distance to top and left
      boxWidth = element.offsetWidth,
      boxHeight = element.offsetHeight,
      boxY = element.getBoundingClientRect().top,
      boxX = element.getBoundingClientRect().left,
      // Getting the ripple start position
      mouseX = boxX,
      mouseY = boxY + boxHeight,
      // Ripple start position relative to the box
      rippleX = mouseX - boxX,
      rippleY = mouseY - boxY,
      // Calculate which is the farthest corner
      rippleWidth = boxWidth / 2 < rippleX
                      ? rippleX
                      : boxWidth - rippleX,
      rippleHeight = boxHeight / 2 < rippleY
                      ? rippleY
                      : boxHeight - rippleY,
      // Distance to the farthest corner
      boxSize = Math.sqrt(Math.pow(rippleWidth, 2) +
                          Math.pow(rippleHeight, 2));

  // Creating and moving the effect div inside the button
  element.appendChild(create);

  // Ripple style (size, position, color and border-radius)
  create.setAttribute('data-rippleEffect', 'effectClear');
  create.style.height = 2 * boxSize + 'px';
  create.style.width = 2 * boxSize + 'px';
  create.style.top = mouseY - boxY - boxSize + 'px';
  create.style.left = mouseX - boxX - boxSize + 'px';

  setTimeout(function () {
      element.removeChild(create);
  }, 800);
}
