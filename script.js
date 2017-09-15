( function ( $ ) {
    $( document ).ready( function () {


        // 'use strict';

/* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

    $( '.button-collapse' ).sideNav( {
        closeOnClick: true
    } );
    $( 'select' ).material_select();
    $('select').material_select('destroy');
    $( '.parallax' ).parallax();

/* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

    // heroku DB url
    const dbUrl = 'https://shielded-oasis-62403.herokuapp.com/';

    //jQuery
    $createReviewForm = $('#createReviewForm');
    $recipePageRecipe = $('#recipePageRecipe');
    $createReviewName= $('#createReviewName');
    $createReviewText= $('#createReviewText');


    // Creat Review Form

    let createReviewData= {};


/* FUNCTIONS  *****************************************************************************************************************************************************/

    // Creat object from form inputs to match DB Review table columns
    function createReviewDataObjForDB () {
            createReviewData.rating =$('input[name=rating]:checked').val();
            createReviewData.text= $createReviewText.val();
            createReviewData.userName= $createReviewName.val();
            createReviewData.recipeId = $recipePageRecipe.attr('data-recipeId');
            createReviewData = JSON.stringify(createReviewData);
            console.log(createReviewData);
        }



/* AJAX  *****************************************************************************************************************************************************/

    function sendCreateReviewData () {


        $.ajax( {
            type: "POST",
            url: `${dbUrl}review/createReview`,
            data: createReviewData,
            success: function ( response ) {
                ///show thank you message div & hide order form
                response(alert('success'));
            }
        } );

    }

/* EVENT LISTENERS  *****************************************************************************************************************************************************/

    $createReviewForm.submit((event)=>{
        event.preventDefault();

        createReviewDataObjForDB();
        sendCreateReviewData ();
    });





/* FUNCTION CALLS *****************************************************************************************************************************************************/




    } ); // end of document ready
} )( jQuery ); // end of jQuery name space
