
'use strict';
// ( function ( $ ) {

    $( document ).ready( function () {



/* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

$( '.button-collapse' ).sideNav( {
    closeOnClick: true,
} );
$( 'select' ).material_select();
// $( 'select' ).material_select( 'destroy' );
$( '.parallax' ).parallax();
$('.chips-initial').material_chip('data');


/* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

    // add Recipe Page
    const $addRecipeForm = $( '#addRecipeForm' );
    const $addRecipeTitle = $( '#addRecipeTitle' );
    const $addRecipeName = $( '#addRecipeName' );
    const $addRecipeText = $( '#addRecipeText' );
    const $addRecipeFile = $( '#addRecipeFile' );
    const $addStepDiv =$('#addStepDiv');
    const $childrenAddStepDiv= $('#addStepDiv > .addEachStepDiv')
    const $addEachStepDiv = $('.addEachStepDiv');
    const $addRecipeIngBtn = $('#addRecipeIngBtn');
    const $addRecipeIngredient = $( '.addRecipeIngredient' );
    const $addIngredientDiv = $('#addIngredientDiv');
    const $addRecipeStep = $('#addRecipeStep');
    const $addRecipeStepInput =$('#addRecipeStepInput');
    const $addRecipeStepDiv = $('#addRecipeStepDiv');



    let createRecipeData = {};


/* FUNCTIONS  *****************************************************************************************************************************************************/







    // Add Recipe Form
    function getAllIngredients (){
        let $allIngredientElements =             $addRecipeStepIngQty.find('.addRecipeIngredient');

    let allIngredients = Array.prototype.map.call($allIngredientElements,(input)=>{
        // TODO CHANGE SO EACH ingredient has name, unit, amount
        return {ingredientName:input.value };

    });

        return allIngredients;
    }

    // HANDLEBAR
    function addRecipeIng () {

        //grab template
        const source   = $("#addRecipeTemplate").html();
        //ready handlebars...by loading source/template
        const template = Handlebars.compile(source);
        let idIncrNum = $addIngredientDiv.length;
        // console.log(idIncrNum)
        const data = {id: idIncrNum};
        const html = template(data);
        $addIngredientDiv.append(html);

    }

    // Create Step input group/row
    function createNewStep () {
        //BUG cannot get correct numb of elements with number below
        // TODO revise so ingredient name, qty, unit separate from step
        // TODO REFACTOR TO USE HANDLEBARS
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

    // Create object from form inputs to match DB RECIPE table columns
    function createRecipeDataObjForDB() {
        const addRecipeDataObj = {
            title : $addRecipeTitle.val(),
            recipeDescription: $addRecipeText.val(),
            // need to find the google service that will turn pic file uploads to urls
            file: $addRecipeFile.val(),
            personName : $addRecipeName.val(),
            ingredients: getAllIngredients(),
        };
    //TODO NEED to get quantites to match ingreidents..
    // { ingredient: 'beef',
        // quantity : {
        //     unit : lbs,
        //     amount: 2
        // }}
        // createRecipeData.quantities

        // TODO steps need order and description data

        let $allStepElements =  $addRecipeStepIngQty.find('.addRecipeIngredient');

        let allSteps = Array.prototype.map.call($allStepElements,(input)=>{
            return {steps: {
            	order: input.value,
            	stepDescription: 'get data',
                }
            };
        });
        createRecipeData.steps = allSteps;

        // console.log(createRecipeData);
        createRecipeData = JSON.stringify( createRecipeData );

    }



/* EVENT LISTENERS  *****************************************************************************************************************************************************/

$addRecipeForm.submit( ( event ) => {
    event.preventDefault();

    createRecipeDataObjForDB();

} );


$addRecipeIngBtn.click(()=>{
        addRecipeIng();
        //TODO cannot append the addRecipeIng html....tested using a string and still not working
        console.log($addIngredientDiv)
    $( 'select' ).material_select();

});

    /* DYNAMIC RENDERING *****************************************************************************************************************************************************/




    });
// });
