var timer;
var butterflyWingspan = 100;
var rotationDamping = 10;
var container = document.querySelector('.container');
container.style.top = '100px';
container.style.left = '100px';
var x;
document.addEventListener('mousemove', function (e) {
    if (x) clearTimeout(x);
    x = setTimeout(function () {
        moveTo(e);
    }, 200);
}, false);
// document.addEventListener('click', moveTo);

function moveTo(e) {
    var currentX = parseInt(container.style.left, 10);
    var currentY = parseInt(container.style.top, 10);
    var newX = e.clientX - butterflyWingspan;
    var newY = e.clientY;
    var deltaX = newX - currentX;
    var deltaY = newY - currentY;

    var rotateZ = -Math.min(Math.max(deltaX / rotationDamping, -90), 90);
    var rotateX = 90 - Math.min(Math.max(deltaY / rotationDamping, -90), 90);
    var translateZ = newY - 500;

    container.style.left = newX + 'px';
    container.style.top = newY + 'px';
    container.style.transform = 'translateZ(' + translateZ + 'px) rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg)';

    clearTimeout(timer);
    timer = setTimeout(function() {
        container.style.transform = 'rotateX(' + rotateX + 'deg) rotateZ(0deg)';
    }, 2000);
}
