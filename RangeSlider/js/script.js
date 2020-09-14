let slider = document.querySelector('.range-control');
let thumb_start = slider.querySelector('.pin-start');
let thumb_end = slider.querySelector('.pin-end');
let startX = 0;
let endX = 150;
let fillRange = slider.querySelector('.range-fill');

thumb_start.onmousedown = function(event) {
    event.preventDefault(); 

    let shiftX = event.clientX - thumb_start.getBoundingClientRect().left;
    

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft > endX-20) {
            newLeft = endX-20;
        }

        startX = newLeft;
        thumb_start.style.left = newLeft + 'px';
        fillRange.style.marginLeft = (10/29) * startX + '%';
        fillRange.style.width = (100 - (10/29) * startX - (10/29) * (290 - endX)) + '%';
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

thumb_start.ondragstart = function() {
    return false;
};

thumb_end.onmousedown = function(event) {
    event.preventDefault(); 

    let shiftX = event.clientX - thumb_end.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        
        if (newLeft < startX + 20) {
            newLeft = startX + 20;
        }
        let rightEdge = slider.offsetWidth - thumb_end.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        endX = newLeft;
        thumb_end.style.left = newLeft + 'px';
        fillRange.style.width = (100 - (10/29) * startX - (10/29) * (290 - endX)) + '%';
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

thumb_end.ondragstart = function() {
    return false;
};
