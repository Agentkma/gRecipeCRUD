
'use strict';
( function ( $ ) {

    $( document ).ready( function () {



/* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

    $( '.button-collapse' ).sideNav( {
        closeOnClick: true,
    } );
    $( 'select' ).material_select();
    // $( 'select' ).material_select( 'destroy' );
    $( '.parallax' ).parallax();
    $('.chips-initial').material_chip('data');


/* GLOBAL VARIABLES  *****************************************************************************************************************************************************/

    // Add Review Page
    const $createReviewForm = $( '#createReviewForm' );
    const $recipePageRecipe = $( '#recipePageRecipe' );
    const $createReviewName = $( '#createReviewName' );
    const $createReviewText = $( '#createReviewText' );


    // Creat Review Form
    let createReviewData = {};




/* FUNCTIONS  *****************************************************************************************************************************************************/




    // settings
    //
        // var settings = {
        //   "async": true,
        //   "crossDomain": true,
        //   "url": "https://shielded-oasis-62403.herokuapp.com/",
        //   "method": "POST",
        //   "headers": {
        //     "content-type": "application/json",
        //     "cache-control": "no-cache",
        //     "postman-token": "f5a6b99f-9ebc-4b78-8a5a-6cdd06815a73"
        //   },
        //   "processData": false,
        //   "data": `${daTa}`
        // }
    // Create object from form inputs to match DB Review table columns
    function createReviewDataObjForDB() {
        createReviewData.rating = $( 'input[name=rating]:checked' ).val();
        createReviewData.text = $createReviewText.val();
        createReviewData.user_name = $createReviewName.val();
        createReviewData.recipe_id = $recipePageRecipe.attr( 'data-recipeId' );
        }
    function sendCreateReviewData( daTa) {

        // copy postman ajax  settings & update url and check for other types get, put
        $.ajax( {
            type: "POST",
            url: `${dbUrl}review/createReview`,
            data: daTa,
            async: true,
            crossDomain: true,
            success: function ( response ) {
                ///show thank you message div & hide order form
                response( alert( response ) );
            }
        } );

    }



/* EVENT LISTENERS  *****************************************************************************************************************************************************/

    $createReviewForm.submit( ( event ) => {
        event.preventDefault();

        createReviewDataObjForDB();
        sendCreateReviewData(createReviewData);

        // add a pop up that gives the success response
        // when pop up closed redirect to home page
    } );

/* AJAX  *****************************************************************************************************************************************************/


    });
});
