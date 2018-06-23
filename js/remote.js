//Assignment: BSc Mobile Web Applications, Digital Skills Academy
//Student ID: johannes.botha@digitalskillsacademy.me
//File created: 2018/06/11
//Reference Sources: 
//code reuse: http://jsfiddle.net/Gajotres/frSsS/

//@author: John Botha
//@version: v8.0

$(document).on('pagecreate', '#routeRequest', function () {
    //remove auto hide from the modals.
    //code reuse: http://jsfiddle.net/Gajotres/frSsS/
    $(document).on('pagehide', '#welcomeModal', function () {
        $(this).remove();
    });
    //show the modal
    $(":mobile-pagecontainer").pagecontainer("change", "#welcomeModal", {
        role: "dialog",
        reverse: "false",
        changeHash: "false"
    });
});

$(document).on('pagebeforecreate', '#routeslist', function () {
    //remove auto hide from the modals.
    //code reuse: http://jsfiddle.net/Gajotres/frSsS/
    $(document).on('pagehide', '#routeslist', function () {
        $(this).remove();
    });
});
        
$(document).on('pagecreate', '#routeRequest', function () {
    $(document).on('click', '#submit', function () { // catch the form's submit event
        var theStop = $('#stopnum').val();
        var requestData = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=' + theStop + '&format=json';
        // Send data to server after checking to see if it contains data or error.
        if ($('#stopnum').val().length > 0) {
            $.getJSON(requestData, function (data) {
                //assign data
                var err_code = data.errorcode;
                var err_text = data.errormessage;
                var route_data = data.results; //assign the route results into an unsorted array
                if (err_code === '0') {
                    $.each(route_data, function (key, value) {
                         $("#busses").append(//add the list items
                                '<li><a href="#' + value.direction + value.duetime
                                + '" data-rel="dialog" data-transition="pop" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'
                                + value.destination + " departing " + value.departuredatetime + " " 
                                + value.direction + '</a></li>');

                        //building of virtual pages for href ul on main page
                        $("#pageBody").append(//virtual pages with the information
                                //pageheader
                                '<div data-role="page" id="' + value.direction  + value.duetime + '">' +
                                '<div data-role="header">' +
                                '<h6>' + value.route +
                                " to " + value.destination +
                                '</h6>' +
                                '</div>' +
                                //page content
                                '<div data-role="content">' +
                                '<p>' + value.direction +
                                ' due in ' + value.duetime + ' minutes at ' + value.arrivaldatetime +
                                ' Departure time ' + value.departuredatetime +
                                ' in ' + value.departureduetime + ' minutes' +
                                ', originating from ' + value.origin + ' locally known as ' +
                                '<br><strong>"' + value.originlocalized + '"</strong><br>' +
                                '<br>The destination is <strong>' + value.destination + '</strong>, locally known as ' +
                                '<strong> "' + value.destinationlocalized + '" </strong>' +
                                '<br> The bus listed schedule is for arrival at ' + value.scheduledarrivaldatetime +
                                ' and departing at ' + value.scheduleddeparturedatetime +
                                ', operated by <strong>' + value.operator + '<strong></p>' +
                                '</div>' +
                                //page footer
                                '<div data-role="footer">' +
                                '<a href="index.html" data-role="button" data-rel="close" data-theme="c">Back to list</a>' +
                                '</div>' +
                                '</div>'
                                );
                        //refresh the listview after adding
                        $('#busses').listview().listview('refresh');
                        //change page to the routes list page created and refreshed above 
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#routeslist", { } );
                    });
                } else { //the json request had an error captured in err_code
                    $("#errormessages").append(err_text);
                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_err", { role: "dialog" } );
                }
            }); //getjson

        } else {
            $("#errormessages").append('It looks like you did not enter a stop number! Please add your closest bus stop number as a number digit, not longer than four numbers.');
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page_err", { role: "dialog" } );
        }
        return false; // cancel original event to prevent form submitting
    });

});