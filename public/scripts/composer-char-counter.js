// const { text } = require("body-parser");

$(document).ready(function() {

  $('#tweet-text').on('input', function () {
    let count = $(this).val().length;
    let totalLength = 140 - count;
    $('.counter').text(totalLength)
    
    if (totalLength < 0) {
      $('.counter').css("color", "red")
    } else {
      $('.counter').css("color", "#545149")
    }
    
  })
});

