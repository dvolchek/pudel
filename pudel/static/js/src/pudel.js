
/* Javascript for PudelXBlock. */
var glob
var suggest_count = 0;
var input_initial_value = '';
var suggest_selected = 0;
function PudelXBlock(runtime, element) {

// Из питона через json приходит лист, но значение не массив, а строка!!!!
    function updateCount(resul) {
        $('.count', element).text(resul.count); 
        $('.but', element).text(resul.but); 
        /* $('') - это обращение к библиотеке jqueru
        т.е. ==jQuery('')
	        .count - обращение к элементам класса count (есть такой в html)
	        .text - это функция которая присваивает элементу значения текст
	        result.count - это число, которое меняется*/
	}
    //функция для передачи в глобальную переменную массива в виде строки из Питона self.but
    function glob_value (result) {
        $('.but', element).text(result.but); 
        glob=result.but
    }



     function updateCount2(resul) {
        $('.count', element).text(resul.count); 
               
    }

  

    var handlerUrl = runtime.handlerUrl(element, 'sub_but');
    var handlerUrl2 = runtime.handlerUrl(element, 'increment_count');

    
    //_________Отсюда пошел LiveSearch________________
    



    $('#search_box',element).keyup(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"key": document.getElementById("search_box").value}),
            success: glob_value
        });
        switch(eventObject.keyCode) {
            // игнорируем нажатия на эти клавишы
            case 13:  // enter
            case 27:  // escape
            case 38:  // стрелка вверх
            case 40:  // стрелка вниз
            break;
 
            default:
                                                        
    
       // определяем какие действия нужно делать при нажатии на клавиатуру
        
                // производим поиск только при вводе более 1-го символа
                if($(this).val().length>1){
input_initial_value = $(this).val();
                        var list = eval("("+glob+")");
                        suggest_count = list.length;
                        if(suggest_count > 0){
                            // перед показом слоя подсказки, его обнуляем
                            $("#search_advice_wrapper").html("").show();
                            for(var i in list){
                                if(list[i] != ''){
                                    // добавляем слою позиции
                                    $('#search_advice_wrapper').append('<div class="advice_variant">'+list[i]+'</div>');
                                }
                            }
                        }
                }
            break;}}

                        )
    $("#search_box").keydown(function(I){
        switch(I.keyCode) {
            // по нажатию клавишь прячем подсказку
            case 13: // enter
            case 27: // escape
                $('#search_advice_wrapper').hide();
                return false;
            break;
            // делаем переход по подсказке стрелочками клавиатуры
            case 38: // стрелка вверх
            case 40: // стрелка вниз
                I.preventDefault();
                if(suggest_count){
                    //делаем выделение пунктов в слое, переход по стрелочкам
                    key_activate( I.keyCode-39 );
                }
            break;
        }
    });

    // делаем обработку клика по подсказке
    $('.advice_variant').live('click',function(){
        // ставим текст в input поиска
        $('#search_box').val($(this).text());
        // прячем слой подсказки
        $('#search_advice_wrapper').fadeOut(350).html('');
    });
 
    // если кликаем в любом месте сайта, нужно спрятать подсказку
    $('html').click(function(){
        $('#search_advice_wrapper').hide();
    });
    // если кликаем на поле input и есть пункты подсказки, то показываем скрытый слой
    $('#search_box').click(function(event){
        //alert(suggest_count);
        if(suggest_count)
            $('#search_advice_wrapper').show();
        event.stopPropagation();
    });

    function key_activate(n){
    $('#search_advice_wrapper div').eq(suggest_selected-1).removeClass('active');
 
    if(n == 1 && suggest_selected < suggest_count){
        suggest_selected++;
    }else if(n == -1 && suggest_selected > 0){
        suggest_selected--;
    }
 
    if( suggest_selected > 0){
        $('#search_advice_wrapper div').eq(suggest_selected-1).addClass('active');
        $("#search_box").val( $('#search_advice_wrapper div').eq(suggest_selected-1).text() );
    } else {
        $("#search_box").val( input_initial_value );
    }
                            }
            
    



    $('.butto', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"key": document.getElementById("search_box").value}),
            success: updateCount
        });
    });

     $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl2,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount2
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}


