"use strict";
// (function($) {
$(document).ready(function() {
  /* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

  $(".button-collapse").sideNav({
    closeOnClick: true
  });
  $("select").material_select();
  // $( 'select' ).material_select( 'destroy' );
  $(".parallax").parallax();
  $(".chips-initial").material_chip("data");

  /* GLOBAL VARIABLES  *****************************************************************************************************************************************************/

  // Add Review Page
  const $createReviewForm = $("#createReviewForm");
  const $recipePageRecipe = $("#recipePageRecipe");
  const $createReviewName = $("#createReviewName");
  const $createReviewText = $("#createReviewText");
  const $reviewResponse = $("#reviewResponse");
  const $reviewSubmited = $(".reviewSubmited");
  const $reviewsDiv = $("#reviewsDiv");

  // Creat Review Form
  // let  = {};

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
    let reviewObject = {
      rating: $("input[name=rating]:checked").val(),
      text: $createReviewText.val(),
      user_name: $createReviewName.val(),
      recipe_id: $recipePageRecipe.attr("data-recipeId")
    };
    return reviewObject;
  }

  function sendCreateReviewData(daTa) {
    // copy postman ajax  settings & update url and check for other types get, put
    $.ajax({
      type: "POST",
      url: `${dbUrl}review/createReview`,
      data: daTa,
      async: true,
      crossDomain: true,
      success: function(response) {
        $createReviewForm.hide();
        $reviewSubmited.show();
        $reviewResponse.text(response);
        // TODO Set up a "success" response on the back end
      }
    });
  }

  function addReview(data) {
    // INDEX PAGE RECIPES TEMPLATE
    //grab template
    const source = $("#reviewRecipeTemplate").html();
    //ready handlebars...by loading source/template
    const template = Handlebars.compile(source);

    // TODO change context to be recipes from database
    var data = {
      review: [
        {
          reviewId: 1,
          rating: 2,
          text:
            "This is the best recipe ever.  Great ribs and great life. This is the best recipe ever.  Great ribs and great life. This is the best recipe ever.  Great ribs and great life.",
          user_name: "Review Name",
          recipe_id: 1
        },
        {
          reviewId: 2,
          rating: 4,
          text:
            "This is the best recipe ever.  Great ribs and great life. This is the best recipe ever.  Great ribs and great life. This is the best recipe ever.  Great ribs and great life.",
          user_name: "Tom",
          recipe_id: 1
        },
        {
          reviewId: 3,
          rating: 1,
          text:
            "This is the best recipe ever.  Great ribs and great life. This is the best recipe ever.  Great ribs and great life. This is the best recipe ever.  Great ribs and great life.",
          user_name: "Jerry",
          recipe_id: 1
        }
      ]
    };
    const html = template(data);
    $reviewsDiv.append(html);
  }

  /* EVENT LISTENERS  *****************************************************************************************************************************************************/

  $createReviewForm.submit(event => {
    event.preventDefault();
    console.log(createReviewDataObjForDB());
    sendCreateReviewData(createReviewDataObjForDB);
  });

  /* FUNCTION/ AJAX  *****************************************************************************************************************************************************/
  // TODO create AJAX call to get reviews
  addReview();
});
