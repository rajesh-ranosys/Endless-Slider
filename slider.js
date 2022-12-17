function slider() {
    var slider = $('.slider');
    var itemDisplay;
    var item = $('.item');
    var margin = 6;
    var counter = 0;
    var itemWidth;
    //To dsplay number of slides on different screen resolution
    if (screen.width < 768) {
        var itemDisplay = slider.attr('item-display-m')
    } else if (screen.width >=768 && screen.width <=1024) {
        var itemDisplay = slider.attr('item-display-t')
    } else {
        var itemDisplay = slider.attr('item-display-D')
    }
    //To set the item width
    for (var i = 0; i < item.length; i++) {
        itemWidth = item[i].style.maxWidth = (screen.width / itemDisplay) - margin + 'px';
        item[i].style.flexBasis = (itemWidth);
    }
    //To add the index number to data-index attribute
    item.each(function (index) {
        $(this).attr('data-index', index);
    });

    var slides = Math.ceil(itemDisplay); // To get non floating value
    var itemWithNum = parseInt(itemWidth);// To get number value and remove 'px'

    //Next Event
    $('.next').on('click', function () {
        $(this).css({ pointerEvents: 'none' });
        if (itemWithNum % 1 === 1) {
            counter = (itemWithNum / 2);
        } else if (itemDisplay % 1 === .5) {
            counter = ((itemWithNum / 2)+2);
        }
        counter += (screen.width - (slides));
        slider.animate({
            left: -(counter)
        }, 400);

        $('.item:lt(' + slides + ')').clone().appendTo('.slider');
        setTimeout(() => {
            counter = 0;
            slider.css({ left: counter, marginLeft: '5px' });
            slider.find('.item:lt(' + slides + ')').remove();
            $(this).css({ pointerEvents: '' });
        }, 600);
    });
    // Previous Event
    $('.prev').on('click', function () {
        $(this).css({ pointerEvents: 'none' });
        $('.item:nth-last-child(-n+' + slides + ')').clone().prependTo('.slider');
        slider.css({ marginLeft: -screen.width})
        counter -= (screen.width + (slides + 3));
        slider.animate({
            left: -(counter),
            justifyContent: 'flex-end'
        }, 400)
        slider.find('.item:nth-last-child(-n+' + slides + ')').remove();
        setTimeout(() => {
            counter = 0;
            slider.css({ left: counter, marginLeft: '7px' });
            $(this).css({ pointerEvents: '' });
        }, 600);
    });

}