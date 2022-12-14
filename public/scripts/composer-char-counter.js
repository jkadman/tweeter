// const { text } = require("body-parser");

$(document).ready(function() {

  // tweeter = document.getElementsByTagName('textarea')
// console.log(tweeter)
// const textarea = document.getElementsByTagName('textarea')
// console.log(tweeter)

  // const textarea = document.querySelector('textarea')
// console.log(tweeter2)


  $('#tweet-text').on('input', function () {
    let count = $(this).val().length;
    let totalLength = 140 - count;
    console.log(count)
    console.log(totalLength)
    $('.counter').text(totalLength)
    
    if (totalLength < 0) {
      $('.counter').css("color", "red")
    } else {
      $('.counter').css("color", "#545149")
    }

  })

});

