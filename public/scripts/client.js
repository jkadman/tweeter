/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const db = require('./server/lib/in-memory-db')


$(document).ready(function () {
  // const db = require('tweeter/server/lib/in-memory-db')

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

    // either change newTweet name or newTweets below
  // pushes each tweet through the tweet formatting
  // want to prepend the posts to each other, not the tweet-container
  const renderTweets = function (array) {
    let newTweet;
    for (let item of array) {
      newTweet = createTweetElement(item);
    }
    
    $('#tweet-section').prepend(newTweet);

  }

  // Event listener for form submission
  const tweetSub = $("form").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log('data:', data)
    console.log($(this))
    console.log(data.length)

    // function to reset the counter to the correct number and color in all cases
    const counterReset = function() {
      const counter = document.querySelector('.counter')
      // const counter = $('.counter')
      let i = 140;
      counter.innerHTML = i;
      $(counter).css('color', '#545149');
    }

    // when to call error messages
    // $('#tweet-text').val('')
    if (data.length === 5) {
      $('#too-long').slideUp('slow');
      $('#no-text').slideDown('slow');
      return;
    } else if (data.length > 140) {
      $('#no-text').slideUp();
      $('#too-long').slideDown('slow');
      // $('#tweet-text').val('');
      // counterReset();
      return;
    } 
    
    $.post("/tweets", data)
    
    // remove error message
    $('#too-long').slideUp();
    $('#no-text').slideUp();

    $('#tweet-text').val('');
    counterReset();
    console.log('tweet posted')
    loadTweets();
    
  })

  // either change newTweets name or newTweet above
  // loads tweets when called
  const loadTweets = function () {
    const jsonTweet = '/tweets';
    $.ajax(jsonTweet, { method: 'GET' })
      .then(function (newTweets) {
        console.log('Success: ', newTweets);
        renderTweets(newTweets);
      });
      
  }

  // loadTweets();



});


// NEED TO FIX
// textarea contains text= and shows an input of 5
 
// if I refresh the page, all tweets but the new one are gone
// make sure the css styles correspond to the requirements of the project
// at seemingly random points instead of a new tweet posting, the tweet will repeat

// either change background color or change 'your name' color -- see requirements to decide

// FIXED
// make image in page go behind header on scroll - fixed
// remove text from text area when there are too many characters - fixed
// reset counter - fixed
// post a tweet after too many characters are entered
// error messages disappear when errors are done back to back
// posts every tweet again, just want the new one 
// tweets appear at the bottom not the top

/*
pseudo code for render issue
  with no info in the db the first post shows an error
  then the posts are place in the db
  when I post again, if it posts, it will post the previous tweet plus the new one
  Then I reload the page and the repeated tweets are gone, and only the ones from the database remain

  So it is posting what is in the database each time, instead of posting just my new tweet
*/