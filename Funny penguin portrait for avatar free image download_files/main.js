$('.search, .top_search_input').autocomplete({
    source: function(request, response){
        $.ajax({
            url: '/json.php',
            type: "POST",
            data:{
                maxRows: 10,
                nameStartsWith: request.term // поисковая фраза
            },
            success: function(data){
                response($.map(JSON.parse(data), function(item){
                    return {
                        plink: item.plink, // ссылка на страницу поиска
                        label: item.title // title
                    }
                }));
            }
        });
    },
    select: function( event, ui ) {
        location.href = ui.item.plink;
        return false;
    },
    minLength: 3 // начинать поиск с трех символов
});


function sendlike(like,tag){
    var num= +$("."+tag).text()+like;
    $.ajax({
            url: '/like.php',
            type: "POST",
            data:{
                uid: $.cookie("uid"),
                page_id: window.location.pathname,
                like:like
            },
            success: function(data){
              if (data.indexOf('ERROR')!==-1){

              console.log("error");

              }else if (data.indexOf('SUCCESS')!==-1){

               //  изменения css при успешном голосовании
               $("."+tag).text(num);
               $(".voting__done").css("display","block");
               $(".voting__buttons").css("display","none");

              }
            }
        });
}

$('.voting__button--like').on('click', function(e) {
     e.preventDefault();
     sendlike(1,'voting__like');
});

$('.voting__button--dislike').on('click', function(e) {
     e.preventDefault();
     sendlike(-1,'voting__dislike');
});


// Placeholder manual shown
$('.show-manual-btn').on('click', function(e) {
    e.preventDefault();

    var $manualBlock    = $(document).find('.manual-section:visible'),
        manualOffsetTop = $manualBlock.offset().top,
        $manualContent  = $manualBlock.find('.manual-hidden');

    if ($manualContent.is(':hidden')) {
        $manualContent.css('display', 'block');
        $('html, body').animate({scrollTop: manualOffsetTop - 20}, 600);
    }
    else {
        $manualContent.css('display', 'none');
        $('html, body').animate({scrollTop: 0}, 600);
    }
});

$('.manual-top').on('click', function(e) {
    e.preventDefault();

    var $manualBlock    = $(document).find('.placeholder-manual:visible'),
        manualOffsetTop = $manualBlock.offset().top;

    $('html, body').animate({scrollTop: manualOffsetTop - 20}, 600);
});

$('.placeholder-tooltip').tooltip();


// Dropdown download menu
$('.purchase_s .dropdown .dropdown-toggle').on('click', function (event) {
    $(this).parent().toggleClass('open');
});

$('body').on('click', function (e) {
    if (!$('.purchase_s .dropdown').is(e.target) 
        && $('.purchase_s .dropdown').has(e.target).length === 0 
        && $('.open').has(e.target).length === 0
    ) {
        $('.purchase_s .dropdown').removeClass('open');
    }
});


// Licence tooltips
$('.tooltip-link').each(function(index, tooltipTarget) {
    var tooltipId = $(tooltipTarget).attr('id');
    var popupId = tooltipId ? 'content_' + tooltipId : undefined;
    
    if (popupId) {
        var popupElem = $('#'+popupId);
        var popupTitleHtml = $('.hd', popupElem).html();
        var popupBodyHtml = $('.bd', popupElem).html();

        $(tooltipTarget).popover({
            placement: 'auto top',
            viewport: '#cc-license',
            trigger: 'focus',
            title: popupTitleHtml ? popupTitleHtml : undefined,
            content: popupBodyHtml ? popupBodyHtml : undefined,
            html: true
        });
    }
});

$('.tooltip-link').on('click', function(e) {
    e.preventDefault();
});