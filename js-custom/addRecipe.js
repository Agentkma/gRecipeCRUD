$(document).ready(function() {
  "use strict";

  /* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/
  $(".button-collapse").sideNav({
    closeOnClick: true
  });
  $("select").material_select();
  $(".parallax").parallax();
  $(".chips-initial").material_chip("data");

  /* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

  // add Recipe Page
  const $addRecipeForm = $("#addRecipeForm");
  const $addRecipeTitle = $("#addRecipeTitle");
  const $addRecipeName = $("#addRecipeName");
  const $addRecipeText = $("#addRecipeText");
  const $addRecipeFile = $("#addRecipeFile");
  const $addIngredientDiv = $("#addIngredientDiv");
  const $addIngBtn = $("#addIngBtn");
  const $createNewIngredient = $(".createNewIngredient");
  const $addStepDiv = $("#addStepDiv");
  const $addStepBtn = $(".addStepBtn");
  const $childrenAddStepDiv = $("#addStepDiv > .addEachStepDiv");
  const $addEachStepDiv = $(".addEachStepDiv");
  const $addRecipeStep = $("#addRecipeStep");
  const $addRecipeStepInput = $("#addRecipeStepInput");
  const $addRecipeStepDiv = $("#addRecipeStepDiv");

  let $deleteItem = $(".close");
  let createRecipeData = {};

  /* FUNCTIONS  *****************************************************************************************************************************************************/
  function getAllIngredients() {
    let $allIngredientElements = $addIngredientDiv.find(".addEachIngDiv");
    let allIngredients = Array.prototype.map.call(
      $allIngredientElements,
      input => {
        return {
          ingredientName: $(input)
            .find(".addIngName")
            .val(),
          unit: $(input)
            .find(".addIngUnit :selected")
            .val(),
          amount: $(input)
            .find(".addIngQty")
            .val()
        };
      }
    );

    return allIngredients;
  }

  function getAllSteps() {
    let $allStepElements = $addStepDiv.find(".addEachStepDiv");
    let allSteps = Array.prototype.map.call($allStepElements, input => {
      return {
        steps: {
          order: $(input)
            .find(".addStepOrder")
            .val(),
          stepDescription: $(input)
            .find(".addStepDescription")
            .val()
        }
      };
    });
    return allSteps;
  }

  // add Ingredient Input to Form
  function createNewIng() {
    //grab template
    const source = $("#addIngTemplate").html();
    //ready handlebars...by loading source/template
    const template = Handlebars.compile(source);
    let idIncrNum = $addIngredientDiv.length;
    // console.log(idIncrNum)
    const data = { id: idIncrNum };
    const html = template(data);
    $addIngredientDiv.append(html);
    $deleteItem = $(".close");
    $("select").material_select();
  }

  // add Step Input to Form
  function createNewStep() {
    //grab template
    const source = $("#addStepTemplate").html();
    //ready handlebars...by loading source/template
    const template = Handlebars.compile(source);
    let idIncrNum = $addStepDiv.length;
    // console.log(idIncrNum)
    const data = { id: idIncrNum };
    const html = template(data);
    $addStepDiv.append(html);
    $deleteItem = $(".close");
    $("select").material_select();
  }

  // Create object from form inputs to match DB RECIPE table columns
  function createRecipeObject() {
    let addRecipeDataObj = {
      title: $addRecipeTitle.val(),
      recipeDescription: $addRecipeText.val(),
      // TODO need to find the google service that will turn pic file uploads to urls
      file: $addRecipeFile.val(),
      personName: $addRecipeName.val(),
      ingredient: getAllIngredients(),
      step: getAllSteps()
    };

    return (createRecipeData = JSON.stringify(addRecipeDataObj));
  }

  /* EVENT LISTENERS  *****************************************************************************************************************************************************/
  $addRecipeForm.submit(event => {
    event.preventDefault();
    createRecipeObject();
    //TODO create function to send recipe object to server....still need to fix POST route on server though
  });

  $addIngBtn.click(() => {
    createNewIng();
    $("select").material_select();
  });

  $addStepBtn.click(() => {
    createNewStep();
    $deleteItem = $(".close");
    $("select").material_select();
  });

  // Remove ingredients or steps on trash can icon click
  $(document).on("click", ".close", function(event) {
    $(event.target)
      .closest(".row")
      .remove();
  });

  /* FUNCTION CALLS *****************************************************************************************************************************************************/
});
// });
