( function ( $ ) {
    $( document ).ready( function () {


        'use strict';

        //Materialize Utilities    *****************
        //******************************

        $( '.button-collapse' ).sideNav( {
            closeOnClick: true
        } );
        $( 'select' ).material_select();
        $( '.parallax' ).parallax();



    } ); // end of document ready
} )( jQuery ); // end of jQuery name space
