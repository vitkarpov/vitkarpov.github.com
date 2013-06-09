$(document).ready(function(){

    $('.i-expand__data').each(function(){
        $(this).closest('.i-expand').data("rel", $(this));
    });


    $('.i-expand__tick').click(function(){

        var expand = $(this).closest('.i-expand');

        if ($(expand).hasClass('i-expand_on')) {

            expand.data("rel").hide();

            $(expand).removeClass('i-expand_on');

        } else {

            expand.data("rel").show();

            $(expand).addClass('i-expand_on');

        }

    });


});

