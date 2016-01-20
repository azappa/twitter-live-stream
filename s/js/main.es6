/* eslint-env browser */
/* global io */
(() => {
  const parseHashtag = hash => {
    return hash.replace(/[#]+[A-Za-z0-9-_]+/g, t => {
      return `<span class="hashtag">${t}</span>`;
    });
  };

  const parseUsername = user => {
    return user.replace(/[@]+[A-Za-z0-9-_]+/g, u => {
      return `<a href="http://twitter.com/${u.replace('@', '')}" target="_blank" class="username">${u}</a>`;
    });
  };

  const parseURL = url => {
    return url.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, _url => {
      return `<a href="${_url}" target="_blank" class="link">${_url}</a>`;
    });
  };

  NodeList.prototype.forEach = Array.prototype.forEach;
  HTMLCollection.prototype.forEach = Array.prototype.forEach;

  NodeList.prototype.on = (event, listener) => {
    this.forEach(el => {
      el.addEventListener(event, listener);
    });
  };

  document.querySelectorAll('p.tweet-text').forEach(paragraph => {
    const _p = paragraph;
    _p.innerHTML = paragraph.innerHTML.parseHashtag().parseURL().parseUsername();
  });


  const parentElement = document.getElementById('tweets');
  const socket = io();

  socket.on('tweet', data => {
    const theFirstChild = parentElement.firstChild;
    const newElement = document.createElement('div');

    newElement.classList.add('tweet');
    newElement.classList.add('hidden');

    newElement.innerHTML = '' +
    `<p class="tweet-text">${parseUsername(parseURL(parseHashtag(data.text)))}</p>` +
    `<h2 class="tweet-author">@${data.user.screen_name}</h2>` +
    `<img class="tweet-avatar" src="${data.user.profile_image_url}" />`;

    parentElement.insertBefore(newElement, theFirstChild);

    setTimeout(() => { newElement.classList.remove('hidden'); }, 2000);

    const tweetSelector = document.querySelectorAll('.tweet');
    if (tweetSelector.length > 20) {
      const toRemove = tweetSelector[tweetSelector.length - 1];
      toRemove.parentNode.removeChild(toRemove);
    }
  });
})();
