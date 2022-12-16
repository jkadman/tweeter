/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const createTweetElement = function(tweet) {
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
        <h4>${tweet.content.text}</h4>
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

  const renderTweets = function(array) {
    for (let item of array) {
      const $newTweet = createTweetElement(item);
      $('.tweet-container').append($newTweet)
    }
  }

  $("form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data.length)
    if (data.length === 5) {
      alert('Please enter the correct length of tweet')
      return false;
    } else if (data.length > 140) {
      stopEvent(event)
      return alert('Please only 140 characters')
    } else {
      // $.post("/tweets", data)
    }
   
  
  })


  const loadTweets = function() {
    const $button = $('button');
    const jsonTweet = '/tweets'
    $button.on('click', function () {
     
    $.ajax(jsonTweet, { method: 'GET' })
    .then(function (newTweets) {
      console.log('Success: ', newTweets);
      renderTweets(newTweets);
    });
    

  });
  }

  loadTweets();



});

