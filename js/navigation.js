/**
 * Created by ashish on 4/26/17.
 */

class Navigation {

    HomePage(){

        $.ajax({
            type          : "POST",
            url           : localurl+'getHome.html',
            contentType   : "application/x-www-form-urlencoded;"
        }).done(function(response){

            $("#load-container").html(response);
        });
    }

    SearchPage(){
        $.ajax({
            type          : "POST",
            url           : localurl+'getSearch.html',
            contentType   : "application/x-www-form-urlencoded;"
        }).done(function(response){

            $("#load-container").html(response);
        });
    }

    ViewCart(){

    }

    OrderWithQuote(){

    }
    
    ContactUs(){
        $.ajax({
            type          : "POST",
            url           : localurl+'getContactUs.html',
            contentType   : "application/x-www-form-urlencoded;"
        }).done(function(response){

            $("#load-container").html(response);
        });
    }

}
