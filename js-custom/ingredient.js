"use strict";

$(document).ready(function() {
  /* MATERIALIZE UTILITIES  *****************************************************************************************************************************************************/

  $(".button-collapse").sideNav({
    closeOnClick: true
  });
  $("select").material_select();
  // $( 'select' ).material_select( 'destroy' );
  $(".parallax").parallax();
  $(".chips-initial").material_chip("data");
});
