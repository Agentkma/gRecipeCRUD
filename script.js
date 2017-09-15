( function ( $ ) {
    $( document ).ready( function () {


        // 'use strict';

        /* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

        $( '.button-collapse' ).sideNav( {
            closeOnClick: true
        } );
        $( 'select' ).material_select();
        $( 'select' ).material_select( 'destroy' );
        $( '.parallax' ).parallax();

        /* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

        // heroku DB url
        const dbUrl = 'https://shielded-oasis-62403.herokuapp.com/';

        //jQuery
        // Add Review Page
        $createReviewForm = $( '#createReviewForm' );
        $recipePageRecipe = $( '#recipePageRecipe' );
        $createReviewName = $( '#createReviewName' );
        $createReviewText = $( '#createReviewText' );
        // add Recipe Page
        $addRecipeForm = $( '#addRecipeForm' );
        $addRecipeTitle = $( '#addRecipeTitle' );
        $addRecipeName = $( '#addRecipeName' );
        $addRecipeText = $( '#addRecipeText' );
        $addRecipeFile = $( '#addRecipeFile' );
        $addRecipeIngredient = $( '.addRecipeIngredient' );
        $addRecipeIngredientInput = $('#addRecipeIngredientInput');
        $addRecipeIngredDiv = $('#addRecipeIngredDiv');
        $addRecipeStep = $('#addRecipeStep');
        $addRecipeStepInput =$('#addRecipeStepInput');
        $addRecipeStepDiv = $('#addRecipeStepDiv');



        // Creat Review Form

        let createReviewData = {};

        let createRecipeData = {};


        /* FUNCTIONS  *****************************************************************************************************************************************************/

        // Creat object from form inputs to match DB Review table columns
        function createReviewDataObjForDB() {
            createReviewData.rating = $( 'input[name=rating]:checked' ).val();
            createReviewData.text = $createReviewText.val();
            createReviewData.user_name = $createReviewName.val();
            createReviewData.recipe_id = $recipePageRecipe.attr( 'data-recipeId' );
            createReviewData = JSON.stringify( createReviewData );
        }

        // Creat object from form inputs to match DB RECIPE table columns
        function createRecipeDataObjForDB() {
            createRecipeData.name = $addRecipeTitle.val();
            createRecipeData.person = $addRecipeName.val();
            createRecipeData.text = $addRecipeText.val();
            createRecipeData.image = $addRecipeFile.val();
            createRecipeData.ingredients = $addRecipeIngredient;
            createRecipeData.steps = $
            createRecipeData = JSON.stringify( createRecipeData );
        }


        // Create Ingredient input items
        function createIngredientInput () {
            let number = Number($addRecipeIngredDiv.length) + 1;
            let newIngredientInput = `<div class="input-field col s12">
                <input id="addRecipeIngredient${number}" placeholder="add ingredient" type="text" class="validate addRecipeIngredient">
                <label for="addRecipeIngredient${number}">Ingredient</label>
            </div>`;
            return newIngredientInput;
        }

        // Create Step input items
        function createStepInput () {
            let number = Number($addRecipeStepDiv.length) + 1;
            let newStepInput = `<div class="input-field col s12">
                <input id="addRecipeStep${number}" placeholder="add ingredient" type="text" class="validate addRecipeStep">
                <label for="addRecipeStep${number}">Step</label>
            </div>`;
            return newStepInput;
        }


        /* AJAX  *****************************************************************************************************************************************************/

        function sendCreateReviewData() {


            $.ajax( {
                type: "POST",
                url: `${dbUrl}review/createReview`,
                data: createReviewData,
                crossDomain: true,
                success: function ( response ) {
                    ///show thank you message div & hide order form
                    response( alert( 'success' ) );
                }
            } );

        }

        /* EVENT LISTENERS  *****************************************************************************************************************************************************/

        $createReviewForm.submit( ( event ) => {
            event.preventDefault();

            createReviewDataObjForDB();
            sendCreateReviewData();
        } );

        $addRecipeForm.submit( ( event ) => {
            event.preventDefault();

            createRecipeDataObjForDB();

        } );


        $addRecipeIngredientInput.click(()=>{

            $addRecipeIngredDiv.append(createIngredientInput);

        });

        $addRecipeStepInput.click(()=>{

            $addRecipeStepDiv.append(createStepInput);

        });





        /* FUNCTION CALLS *****************************************************************************************************************************************************/




    } ); // end of document ready
} )( jQuery ); // end of jQuery name space
