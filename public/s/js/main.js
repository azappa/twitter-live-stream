/*jshint eqnull:true, laxcomma:true, undef:true, indent:2, camelcase:false, unused:true */
/*globals NodeList, HTMLCollection, io*/

'use strict';

(function () {

  String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
      return '<span class="hashtag">' + t + '</span>';
    });
  };

  String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
      return '<a href="http://twitter.com/' + u.replace('@', '') + '" target="_blank" class="username">' + u + '</a>';
    });
  };

  String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
      return '<a href="' + url + '" target="_blank" class="link">' + url + '</a>';
    });
  };

  NodeList.prototype.forEach = Array.prototype.forEach;
  HTMLCollection.prototype.forEach = Array.prototype.forEach;

  NodeList.prototype.on = function (event, listener) {
    this.forEach(function (el) {
      el.addEventListener(event, listener);
    });
  };

  document.querySelectorAll('p.tweet-text').forEach(function (paragraph) {
    paragraph.innerHTML = paragraph.innerHTML.parseHashtag().parseURL().parseUsername();
  });


  var parentElement = document.getElementById('tweets');
  var socket = io();

  socket.on('tweet', function (data) {

    var theFirstChild = parentElement.firstChild;
    var newElement = document.createElement('div');

    newElement.classList.add('tweet');
    newElement.classList.add('hidden');

    newElement.innerHTML = '<p class="tweet-text">' + data.text.parseHashtag().parseURL().parseUsername() + '</p>' +
                            '<h2 class="tweet-author">@' + data.user.screen_name + '</h2>' +
                            '<img class="tweet-avatar" src="' + data.user.profile_image_url + '" />';

    parentElement.insertBefore(newElement, theFirstChild);

    setTimeout(function () {
      newElement.classList.remove('hidden');
    }, 2000);

    var tweetSelector = document.querySelectorAll('.tweet');
    if (tweetSelector.length > 20) {
      var toRemove = tweetSelector[tweetSelector.length - 1];
      toRemove.parentNode.removeChild(toRemove);
    }

  });

})();