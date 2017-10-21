"use strict";
// ( function ( $ ) {

$(document).ready(function() {
	/* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

	$(".button-collapse").sideNav({
		closeOnClick: true
	});
	$("select").material_select();
	// $( 'select' ).material_select( 'destroy' );
	$(".parallax").parallax();
	$(".chips-initial").material_chip("data");

	/* GLOBAL VARIABLES   *****************************************************************************************************************************************************/

	// add Recipe Page
	const $addRecipeForm = $("#addRecipeForm");
	const $addRecipeTitle = $("#addRecipeTitle");
	const $addRecipeName = $("#addRecipeName");
	const $addRecipeText = $("#addRecipeText");
	const $addRecipeFile = $("#addRecipeFile");
	const $addStepDiv = $("#addStepDiv");
	const $childrenAddStepDiv = $("#addStepDiv > .addEachStepDiv");
	const $addEachStepDiv = $(".addEachStepDiv");
	const $addRecipeIngBtn = $("#addRecipeIngBtn");
	const $addRecipeIngredient = $(".addRecipeIngredient");
	const $addStepBtn = $(".addStepBtn");
	const $addIngredientDiv = $("#addIngredientDiv");
	const $addRecipeStep = $("#addRecipeStep");
	const $addRecipeStepInput = $("#addRecipeStepInput");
	const $addRecipeStepDiv = $("#addRecipeStepDiv");
	let $deleteItem = $(".close");

	const addRecipeDataObj = {
		title: $addRecipeTitle.val(),
		recipeDescription: $addRecipeText.val(),
		// TODO need to find the google service that will turn pic file uploads to urls
		file: $addRecipeFile.val(),
		personName: $addRecipeName.val(),
		ingredients: getAllIngredients()
	};

	let createRecipeData = {};

	/* FUNCTIONS  *****************************************************************************************************************************************************/

	function getAllIngredients() {
		let $allIngredientElements = $addIngredientDiv.find(
			".addRecipeIngredient"
		);

		let allIngredients = Array.prototype.map.call(
			$allIngredientElements,
			input => {
				// TODO CHANGE SO EACH ingredient has name, unit, amount
				return {
					ingredientName: input.value,
					unit: "",
					amount: ""
				};
			}
		);
		return allIngredients;
	}

	// HANDLEBAR
	function addRecipeIng() {
		//grab template
		const source = $("#addIngTemplate").html();
		//ready handlebars...by loading source/template
		const template = Handlebars.compile(source);
		let idIncrNum = $addIngredientDiv.length;
		// console.log(idIncrNum)
		const data = { id: idIncrNum };
		const html = template(data);
		$addIngredientDiv.append( html);
		$deleteItem = $(".close");
		$("select").material_select();
	}

	// Create Step input group/row
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
		//TODO NEED to get quantites to match ingreidents..
		// { ingredient: 'beef',
		// quantity : {
		//     unit : lbs,
		//     amount: 2
		// }}
		// createRecipeData.quantities

		let $allStepElements = $addRecipeStepIngQty.find(
			".addRecipeIngredient"
		);
		// TODO steps need order and description data
		let allSteps = Array.prototype.map.call($allStepElements, input => {
			return {
				steps: {
					order: input.value,
					stepDescription: "get data"
				}
			};
		});
		createRecipeData.steps = allSteps;

		// console.log(createRecipeData);
		createRecipeData = JSON.stringify(createRecipeData);
	}

	function deleteItem() {

	}

	/* EVENT LISTENERS  *****************************************************************************************************************************************************/

	$addRecipeForm.submit(event => {
		event.preventDefault();
		createRecipeObject();
	});

	$addRecipeIngBtn.click(() => {
		addRecipeIng();
		$("select").material_select();
	});

	$addStepBtn.click(() => {
		createNewStep();
			$deleteItem = $(".close");
		$("select").material_select();
	});


	$(document).on('click','.close',function(event) {
		console.log('Test Click');
	 $(event.target).closest(".row").remove()
	});




	/* FUNCTION CALLS *****************************************************************************************************************************************************/
});
// });
