/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let htmlData;

    htmlData = $(`
    <container id="input-text">
      <article class="tweet-post">
        <header>
          <div>
            <h4><img src=${tweet.user.avatars}>
            ${tweet.user.name} 
            </h4>
          </div> 
          <h5>${tweet.user.handle} </h5>
        </header>
        <h4>${escape(tweet.content.text)}</h4>
        <footer>
          ${timeago.format(tweet.created_at)}
          <container class="link-tags">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </footer>
    </container>`);

    return htmlData;
  }

  const renderTweets = function (array) {
    for (let item of array) {
      const $newTweet = createTweetElement(item);
      $('.tweet-container').append($newTweet);
    }
  }

  // Event listener for form submission
  const tweetSub = $("form").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data.length)
    // function to reset the counter
    const counterReset = function() {
      const counter = document.querySelector('.counter')
      let i = 140;
      counter.innerHTML = i;
      $(counter).css('color', '#545149');
    }
    if (data.length === 5) {
      $('#no-text').slideDown('slow');
      return;
    } else if (data.length > 140) {
      $('#too-long').slideDown('slow');
      $('#tweet-text').val('');
      counterReset();
      return;
    } 
    $.post("/tweets", data)
    
    // $textarea.parent().find('.counter').text('140');
    $('#too-long').slideUp();
    $('#no-text').slideUp();
    
    


    $('#tweet-text').val('');
    counterReset();
    console.log('tweet posted')
    loadTweets();
    
  })


  const loadTweets = function () {
    const jsonTweet = '/tweets'
    $.ajax(jsonTweet, { method: 'GET' })
      .then(function (newTweets) {
        console.log('Success: ', newTweets);
        renderTweets(newTweets);

      });
  }

  loadTweets();



});



// Tweeter issues to work on :
// text box starts at 5, ie 5 === 0
// tweets appear at the bottom not the top -- part of project base code
// make image in page go behind header on scroll - fixed
// remove text from text area when there are too many characters
// reset counter - fixed
// posts every tweet again, just want the new one -- part of project base code I think
// sometimes the tweet button doesn't work and tweets don't load