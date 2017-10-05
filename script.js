( function ( $ ) {
    $( document ).ready( function () {


        // 'use strict';

        /* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

        $( '.button-collapse' ).sideNav( {
            closeOnClick: true
        } );
        $( 'select' ).material_select();
        // $( 'select' ).material_select( 'destroy' );
        $( '.parallax' ).parallax();
        $('.chips-initial').material_chip('data')

        /* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

        // heroku DB url
        const dbUrl = 'https://shielded-oasis-62403.herokuapp.com/';
        // recipes from DB TODO
        const recipes=[];



    // HANDLEBAR Helper Func**************
Handlebars.registerHelper('compare', function(lvalue,operator, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    // var operator = options.hash ? option.hash.operator : ">=";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        //true
        return options.fn(this);
    } else {
        //false
        return options.inverse(this);
    }
});

function addRecipesToIndex (data) {
    // INDEX PAGE RECIPES TEMPLATE
    //grab template
    const source   = $("#recipeIndexTemplate").html();
    //ready handlebars...by loading source/template
    const template = Handlebars.compile(source);
    // TODO change context to be recipes from database
    var data = { recipe: [
            {recipedId: 1, recipeImg: "img/beefRibs.jpeg",recipeName: "BBQ Rib Mania", starRating: 1,
            recipeDescription: "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."},
            {recipedId: 2, recipeImg: "img/beefRibs.jpeg",recipeName: "BBQ Rib Mania", starRating: 3,
            recipeDescription: "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."},
            {recipeId:5,recipeImg: "img/beefRibs.jpeg",recipeName: "BBQ Rib Mania", starRating: 4,
            recipeDescription: "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."}]}
    const html = template(data);
    $index_section_recipes.append(html);

    // loop over recipe data
            //access the recipe id's
            // then grab the dom element with id that matches recipe id
            // append <i>stars</i> based on the star value...1,2,3..etc

}

        //jQuery

        // Index/home Page
        $index_section_recipes = $('#indexRecipes');
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
        $addStepDiv =$('#addStepDiv');
        $childrenAddStepDiv= $('#addStepDiv > .addEachStepDiv')
        $addEachStepDiv = $('.addEachStepDiv');
        $addRecipeIngredientInput = $('#addRecipeIngredientInput');
        $addRecipeIngredient = $( '.addRecipeIngredient' );

        $addRecipeStep = $('#addRecipeStep');
        $addRecipeStepInput =$('#addRecipeStepInput');
        $addRecipeStepDiv = $('#addRecipeStepDiv');


        // Creat Review Form
        let createReviewData = {};

        let createRecipeData = {};


        /* FUNCTIONS  *****************************************************************************************************************************************************/

        // Create object from form inputs to match DB Review table columns
        function createReviewDataObjForDB() {
            createReviewData.rating = $( 'input[name=rating]:checked' ).val();
            createReviewData.text = $createReviewText.val();
            createReviewData.user_name = $createReviewName.val();
            createReviewData.recipe_id = $recipePageRecipe.attr( 'data-recipeId' );
        }

        // Create object from form inputs to match DB RECIPE table columns
        function createRecipeDataObjForDB() {
            createRecipeData.name = $addRecipeTitle.val();
            createRecipeData.person = $addRecipeName.val();
            createRecipeData.description = $addRecipeText.val();
            createRecipeData.file = $addRecipeFile.val();

            // need to get each step and save the ing,Qty,Step number
            let $ingQtyStep ;
            let $step;

            let $allIngredientElements =  $addRecipeStepIngQty.find('.addRecipeIngredient');

            let allIngredients = Array.prototype.map.call($allIngredientElements,(input)=>{
                return input.value;
            });
            createRecipeData.ingredients = allIngredients;

            // TODO get ingredient qty unit & qty amount
            // createRecipeData.quantities =

            // TODO ingredient_quantity_step



            let $allStepElements =  $addRecipeStepIngQty.find('.addRecipeIngredient');

            let allSteps = Array.prototype.map.call($allStepElements,(input)=>{
                return input.value;
            });
            createRecipeData.steps = allSteps;

            console.log(createRecipeData);
            createRecipeData = JSON.stringify( createRecipeData );

        }


        // Create Step input group/row
        function createNewStep () {
            //BUG cannot get correct numb of elements with number below
            let number = Number($addStepDiv.length);
            console.log($addStepDiv, $addStepDiv.length);
            let newStepInput =
            `<div class="row addEachStepDiv">
                    <div class="stepTags">
                        <div class="chip light-blue">
                            <i class="close">${number}</i>
                        </div>
                        <div class="chip red">
                            <i class="close material-icons">delete</i>
                        </div>
                    </div>

                    <div class="input-field col s12">
                        <input placeholder="add step" id="addRecipeStep${number}" type="text" class="validate addRecipeStep">
                        <label for="addRecipeStep${number}">Step</label>
                    </div>

                    <div class="input-field col s12 m6">
                        <input id="addRecipeIngredient${number}" placeholder="add ingredient" type="text" class="validate addRecipeIngredient">
                        <label for="addRecipeIngredient${number}">Ingredient</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input id="addRecipeQuanity${number}" placeholder="add quantity" type="number" class="validate addRecipeQuantity">
                        <label for="addRecipeQuanity${number}">Quantity</label>
                    </div>
                    <div class="input-field col s12 m4">
                        <select id="addRecipeUnit${number}">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Ounces</option>
                    <option value="2">Lbs</option>
                    <option value="3">Ts</option>
                    <option value="4">Tbls</option>
                    <option value="5">Cups</option>
                    <option value="6">Quarts</option>
                  </select>
                        <label>Select Unit</label>
                    </div>
                </div>`;

            return newStepInput;
        }



        /* AJAX  *****************************************************************************************************************************************************/


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


//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

        /* EVENT LISTENERS  *****************************************************************************************************************************************************/

        $createReviewForm.submit( ( event ) => {
            event.preventDefault();

            createReviewDataObjForDB();
            sendCreateReviewData(createReviewData);

            // add a pop up that gives the success response
            // when pop up closed redirect to home page
        } );

        $addRecipeForm.submit( ( event ) => {
            event.preventDefault();

            createRecipeDataObjForDB();

        } );


        $addRecipeIngredientInput.click(()=>{

            $addStepDiv.append(createNewStep);
            $( 'select' ).material_select();

        });

        /* DYNAMIC RENDERING *****************************************************************************************************************************************************/





        /* FUNCTION CALLS *****************************************************************************************************************************************************/

addRecipesToIndex();


    } ); // end of document ready
} )( jQuery ); // end of jQuery name space
