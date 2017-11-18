import * as modules from './modules.js';
"use strict";

$(document).ready(function() {


  /* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/
  // TODO  CAN these materialize utilities be called with a function in all js pages?
  $(".button-collapse").sideNav({
    closeOnClick: true
  });
  $("select").material_select();
  $(".parallax").parallax();
  $(".chips-initial").material_chip("data");

  /* GLOBAL VARIABLES   *****************************************************************************************************************************************************/
  let featuredRecipeData = {
    recipe: [
      {
        recipedId: 8,
        recipeImg: "img/beefRibs.jpeg",
        recipeName: "BBQ Rib Mania",
        recipeDescription:
          "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."
      },
      {
        recipedId: 9,
        recipeImg: "img/beefRibs.jpeg",
        recipeName: "BBQ Rib HooHa",
        recipeDescription:
          "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."
      }
    ]
  };

  let recipeData = {
    recipe: [
      {
        recipedId: 1,
        recipeImg: "img/beefRibs.jpeg",
        recipeName: "BBQ Rib Mania",
        starRating: 1,
        recipeDescription:
          "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."
      },
      {
        recipedId: 2,
        recipeImg: "img/beefRibs.jpeg",
        recipeName: "BBQ Rib HooHa",
        starRating: 3,
        recipeDescription:
          "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."
      },
      {
        recipeId: 5,
        recipeImg: "img/beefRibs.jpeg",
        recipeName: "BBQ Rib Jeepers",
        starRating: 4,
        recipeDescription:
          "This is the best recipe ever.  Great ribs and great life.  This is the best recipe ever.  Great ribs and great life."
      }
    ]
  };

  // recipes from DB TODO
  let recipes = [];

  //jQuery

  // Index/home Page
  const $index_section_recipes = $("#indexRecipes");
  const $featuredIndexRecipes = $("#featuredIndexRecipes");
  const $getRecipe = $(".getRecipe");

  /* FUNCTIONS  *****************************************************************************************************************************************************/
  function getRecipeData() {}

  // HANDLEBAR Helper Func**************
  function addRecipesToIndex(data) {
    // INDEX PAGE RECIPES TEMPLATE
    //grab template
    const source = $("#recipeIndexTemplate").html();
    //ready handlebars...by loading source/template
    const template = Handlebars.compile(source);

    // TODO change context to be recipes from database

    const html = template(data);
    $index_section_recipes.append(html);
  }

  function addFeaturedRecipesToIndex(data) {
    // INDEX PAGE RECIPES TEMPLATE
    //grab template
    const source = $("#featuredRecipeIndexTemplate").html();
    //ready handlebars...by loading source/template
    const template = Handlebars.compile(source);

    // TODO change context to be recipes from database

    const html = template(data);
    $featuredIndexRecipes.append(html);
  }

  /* AJAX  *****************************************************************************************************************************************************/



  /* EVENT LISTENERS  *****************************************************************************************************************************************************/
  $getRecipe.click(() => {
    getRecipeData();
  });

  /* FUNCTION CALLS *****************************************************************************************************************************************************/
  addRecipesToIndex(recipeData);
  addFeaturedRecipesToIndex(featuredRecipeData);
}); // end of document ready

/* SHARED FUNCTIONS/VARS *****************************************************************************************************************************************************/

// // heroku DB url
// const dbUrl = "https://shielded-oasis-62403.herokuapp.com/";
//
// const httpHeaders = { 'Content-Type' : 'application/json', 'Accept-Charset' : 'utf-8', 'Accept' : 'application/json' };
// let myHeaders = new Headers(httpHeaders);
//
//
// function fetchGetRequest (){
//     const fetchInit = { method: 'GET',
//                    headers: myHeaders,
//                    mode: 'cors',
//                    cache: 'default' };
//     const dataRequest = async () => {
//         const response = await fetch(dbUrl,fetchInit);
//         const json = await response.json();
//         return json;
//     };
//     return dataRequest();
// }
//
// function fetchPostRequest (data){
//     const fetchInit = { method: 'POST',
//            headers: myHeaders,
//            mode: 'cors',
//            cache: 'default',
//            body: data
//        };
//    const dataPost = async () => {
//        const response = await fetch(dbUrl,fetchInit);
//        const json = await response.json();
//        return json;
//    };
//    return dataPost();
// }
//
//
// Handlebars.registerHelper("compare", function(
//       lvalue,
//       operator,
//       rvalue,
//       options
//     ) {
//           if (arguments.length < 3)
//             throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
//
//           // var operator = options.hash ? option.hash.operator : ">=";
//
//           var operators = {
//             "==": function(l, r) {
//               return l == r;
//             },
//             "===": function(l, r) {
//               return l === r;
//             },
//             "!=": function(l, r) {
//               return l != r;
//             },
//             "<": function(l, r) {
//               return l < r;
//             },
//             ">": function(l, r) {
//               return l > r;
//             },
//             "<=": function(l, r) {
//               return l <= r;
//             },
//             ">=": function(l, r) {
//               return l >= r;
//             },
//             typeof: function(l, r) {
//               return typeof l == r;
//             }
//           };
//
//           if (!operators[operator])
//             throw new Error(
//               "Handlerbars Helper 'compare' doesn't know the operator " + operator
//             );
//
//           var result = operators[operator](lvalue, rvalue);
//
//           if (result) {
//             //true
//             return options.fn(this);
//           } else {
//             //false
//             return options.inverse(this);
//           }
// });
