/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const db = require('./server/lib/in-memory-db')


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
    console.log('tweetInput:', tweetInput)
    console.log('tweetInputLength:', tweetInput.length)
    console.log('tweetInputValue:', tweetInput.val())
    

    // function to reset the counter to the correct number and color in all cases
    const counterReset = function() {
      const counter = document.querySelector('.counter')
      // const counter = $('.counter')
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
        console.log('post completed')
        $('#too-long').slideUp();
        $('#no-text').slideUp();
        $('#tweet-text').val('');
        counterReset();
        console.log('tweet posted')
        loadTweets();
      })
  })

  const loadTweets = function () {
    $.get('/tweets')
      .then((tweetData) => {
        console.log('data:', tweetData)
        renderTweets(tweetData);
      });
  }

  loadTweets();

});


// NEED TO FIX

// make sure the css styles correspond to the requirements of the project
// either change background color or change 'your name' color -- see requirements to decide
// on enter, tweeter should submit

// FIXED
// make image in page go behind header on scroll - fixed
// remove text from text area when there are too many characters - fixed
// reset counter - fixed
// post a tweet after too many characters are entered
// error messages disappear when errors are done back to back
// posts every tweet again, just want the new one 
// tweets appear at the bottom not the top
// if I refresh the page, all tweets but the new one are gone
// at seemingly random points instead of a new tweet posting, the tweet will repeat or not post at all
// textarea contains length of 1

/*
pseudo code for render issue
  with no info in the db the first post shows an error
  then the posts are place in the db
  when I post again, if it posts, it will post the previous tweet plus the new one
  Then I reload the page and the repeated tweets are gone, and only the ones from the database remain

  So it is posting what is in the database each time, instead of posting just my new tweet
*/