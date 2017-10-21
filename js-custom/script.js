(function($) {
	"use strict";
	$(document).ready(function() {
		/* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/
		// TODO  CAN these materialize utilities be called with a function in all js pages?
		$(".button-collapse").sideNav({
			closeOnClick: true
		});
		$("select").material_select();
		// $( 'select' ).material_select( 'destroy' );
		$(".parallax").parallax();
		$(".chips-initial").material_chip("data");

		/* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

		// heroku DB url
		// const dbUrl = 'https://shielded-oasis-62403.herokuapp.com/';
		// recipes from DB TODO
		let recipes = [];

		//jQuery

		// Index/home Page
		const $index_section_recipes = $("#indexRecipes");
		/* FUNCTIONS  *****************************************************************************************************************************************************/

		// HANDLEBAR Helper Func**************

		Handlebars.registerHelper("compare", function(
			lvalue,
			operator,
			rvalue,
			options
		) {
			if (arguments.length < 3)
				throw new Error(
					"Handlerbars Helper 'compare' needs 2 parameters"
				);

			// var operator = options.hash ? option.hash.operator : ">=";

			var operators = {
				"==": function(l, r) {
					return l == r;
				},
				"===": function(l, r) {
					return l === r;
				},
				"!=": function(l, r) {
					return l != r;
				},
				"<": function(l, r) {
					return l < r;
				},
				">": function(l, r) {
					return l > r;
				},
				"<=": function(l, r) {
					return l <= r;
				},
				">=": function(l, r) {
					return l >= r;
				},
				typeof: function(l, r) {
					return typeof l == r;
				}
			};

			if (!operators[operator])
				throw new Error(
					"Handlerbars Helper 'compare' doesn't know the operator " +
						operator
				);

			var result = operators[operator](lvalue, rvalue);

			if (result) {
				//true
				return options.fn(this);
			} else {
				//false
				return options.inverse(this);
			}
		});

		function addRecipesToIndex(data) {
			// INDEX PAGE RECIPES TEMPLATE
			//grab template
			const source = $("#recipeIndexTemplate").html();
			//ready handlebars...by loading source/template
			const template = Handlebars.compile(source);

			// TODO change context to be recipes from database
			var data = {
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
			const html = template(data);
			$index_section_recipes.append(html);
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

		//
		// $.ajax(settings).done(function (response) {
		//   console.log(response);
		// });

		/* EVENT LISTENERS  *****************************************************************************************************************************************************/

		/* FUNCTION CALLS *****************************************************************************************************************************************************/
		addRecipesToIndex();
	}); // end of document ready
})(jQuery); // end of jQuery name space

/* SHARED FUNCTIONS/VARS *****************************************************************************************************************************************************/

// heroku DB url
const dbUrl = "https://shielded-oasis-62403.herokuapp.com/";
