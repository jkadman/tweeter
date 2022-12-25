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
    if (data.length === 5) {
      $('#no-text').slideDown('slow');
      return;
    } else if (data.length > 140) {
      $('#too-long').slideDown('slow');
      return;
    } 
    $.post("/tweets", data)

    $('#too-long').slideUp();
    $('#no-text').slideUp();


    // if ($('#too-long').slideDown()) {
    //   $('#too-long').slideToggle();
    //   return;
    // } else {
    //   $('#no-text').slideToggle();
    //   return;
    // } 

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
// tweets appear at the bottom not the top
// make image in page go behind header on scroll
// remove text from text area
// reset counter
// posts every tweet again, just want the new one