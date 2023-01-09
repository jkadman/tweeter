/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // function to make sure only no malicious code can be transmitted through a tweet
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function that formats each tweet
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

  // pushes each tweet through the tweet formatting
  const renderTweets = function (array) {
    $('#tweet-section').empty();
    for (let item of array) {
      const formatTweet = createTweetElement(item);
      $('#tweet-section').prepend(formatTweet);
    }
  }

  // Event listener for form submission
  const tweetSub = $("form").submit(function (event) {
    event.preventDefault();
    const tweetInput = $('#tweet-text');

    // function to reset the counter to the correct number and color in all cases
    const counterReset = function() {
      const counter = document.querySelector('.counter')
      let i = 140;
      counter.innerHTML = i;
      $(counter).css('color', '#545149');
    }

    // when to call error messages
    if (tweetInput.val() === '') {
      $('#too-long').slideUp('slow');
      $('#no-text').slideDown('slow');
      return;
    } else if (tweetInput.val().length > 140) {
      $('#no-text').slideUp();
      $('#too-long').slideDown('slow');
      return;
    } 

    const data = $(this).serialize();

    // post tweet then remove error and reset counter
    $.post("/tweets", data)
      .then(() => {
        $('#too-long').slideUp();
        $('#no-text').slideUp();
        $('#tweet-text').val('');
        counterReset();
        loadTweets();
      })
  })

  const loadTweets = function () {
    $.get('/tweets')
      .then((tweetData) => {
        renderTweets(tweetData);
      });
  }

  loadTweets();

});
