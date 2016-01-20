(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

  String.prototype.parseHashtag = function () {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function (t) {
      return '<span class="hashtag">' + t + '</span>';
    });
  };

  String.prototype.parseUsername = function () {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
      return '<a href="http://twitter.com/' + u.replace('@', '') + '" target="_blank" class="username">' + u + '</a>';
    });
  };

  String.prototype.parseURL = function () {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function (url) {
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

  const parentElement = document.getElementById('tweets');
  const socket = io();

  socket.on('tweet', function (data) {

    const theFirstChild = parentElement.firstChild;
    const newElement = document.createElement('div');

    newElement.classList.add('tweet');
    newElement.classList.add('hidden');

    newElement.innerHTML = '<p class="tweet-text">' + data.text.parseHashtag().parseURL().parseUsername() + '</p>' + '<h2 class="tweet-author">@' + data.user.screen_name + '</h2>' + '<img class="tweet-avatar" src="' + data.user.profile_image_url + '" />';

    parentElement.insertBefore(newElement, theFirstChild);

    setTimeout(function () {
      newElement.classList.remove('hidden');
    }, 2000);

    const tweetSelector = document.querySelectorAll('.tweet');
    if (tweetSelector.length > 20) {
      const toRemove = tweetSelector[tweetSelector.length - 1];
      toRemove.parentNode.removeChild(toRemove);
    }
  });
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvcy9qcy9tYWluLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLENBQUMsWUFBWTs7QUFFWCxRQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxZQUFXO0FBQ3pDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNyRCxhQUFPLHdCQUF3QixHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7S0FDakQsQ0FBQyxDQUFDO0dBQ0osQ0FBQzs7QUFFRixRQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxZQUFXO0FBQzFDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUNyRCxhQUFPLDhCQUE4QixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLHFDQUFxQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7S0FDakgsQ0FBQyxDQUFDO0dBQ0osQ0FBQzs7QUFFRixRQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxZQUFXO0FBQ3JDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyx5REFBeUQsRUFBRSxVQUFTLEdBQUcsRUFBRTtBQUMzRixhQUFPLFdBQVcsR0FBRyxHQUFHLEdBQUcsaUNBQWlDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUM3RSxDQUFDLENBQUM7R0FDSixDQUFDOztBQUVGLFVBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0FBQ3JELGdCQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7QUFFM0QsVUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2pELFFBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUU7QUFDekIsUUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN0QyxDQUFDLENBQUM7R0FDSixDQUFDOztBQUVGLFVBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFTLEVBQUU7QUFDckUsYUFBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0dBQ3JGLENBQUMsQ0FBQzs7QUFHSCxRQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hELFFBQU0sTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDOztBQUVwQixRQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRTs7QUFFakMsVUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUMvQyxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVqRCxjQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsQyxjQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFbkMsY0FBVSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLE1BQU0sR0FDdEYsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxHQUM5RCxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQzs7QUFFakcsaUJBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDOztBQUV0RCxjQUFVLENBQUMsWUFBWTtBQUNyQixnQkFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdkMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFVCxVQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUQsUUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtBQUM3QixZQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxjQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMzQztHQUVGLENBQUMsQ0FBQztDQUVKLENBQUEsRUFBRyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgU3RyaW5nLnByb3RvdHlwZS5wYXJzZUhhc2h0YWcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9bI10rW0EtWmEtejAtOS1fXSsvZywgZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cImhhc2h0YWdcIj4nICsgdCArICc8L3NwYW4+JztcbiAgICB9KTtcbiAgfTtcblxuICBTdHJpbmcucHJvdG90eXBlLnBhcnNlVXNlcm5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9bQF0rW0EtWmEtejAtOS1fXSsvZywgZnVuY3Rpb24odSkge1xuICAgICAgcmV0dXJuICc8YSBocmVmPVwiaHR0cDovL3R3aXR0ZXIuY29tLycgKyB1LnJlcGxhY2UoJ0AnLCAnJykgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJ1c2VybmFtZVwiPicgKyB1ICsgJzwvYT4nO1xuICAgIH0pO1xuICB9O1xuXG4gIFN0cmluZy5wcm90b3R5cGUucGFyc2VVUkwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9bQS1aYS16XSs6XFwvXFwvW0EtWmEtejAtOS1fXStcXC5bQS1aYS16MC05LV86JSZ+XFw/XFwvLj1dKy9nLCBmdW5jdGlvbih1cmwpIHtcbiAgICAgIHJldHVybiAnPGEgaHJlZj1cIicgKyB1cmwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJsaW5rXCI+JyArIHVybCArICc8L2E+JztcbiAgICB9KTtcbiAgfTtcblxuICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICBIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG4gIE5vZGVMaXN0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH07XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncC50d2VldC10ZXh0JykuZm9yRWFjaChmdW5jdGlvbiAocGFyYWdyYXBoKSB7XG4gICAgcGFyYWdyYXBoLmlubmVySFRNTCA9IHBhcmFncmFwaC5pbm5lckhUTUwucGFyc2VIYXNodGFnKCkucGFyc2VVUkwoKS5wYXJzZVVzZXJuYW1lKCk7XG4gIH0pO1xuXG5cbiAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0d2VldHMnKTtcbiAgY29uc3Qgc29ja2V0ID0gaW8oKTtcblxuICBzb2NrZXQub24oJ3R3ZWV0JywgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgIGNvbnN0IHRoZUZpcnN0Q2hpbGQgPSBwYXJlbnRFbGVtZW50LmZpcnN0Q2hpbGQ7XG4gICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbmV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0d2VldCcpO1xuICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICBuZXdFbGVtZW50LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cInR3ZWV0LXRleHRcIj4nICsgZGF0YS50ZXh0LnBhcnNlSGFzaHRhZygpLnBhcnNlVVJMKCkucGFyc2VVc2VybmFtZSgpICsgJzwvcD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGgyIGNsYXNzPVwidHdlZXQtYXV0aG9yXCI+QCcgKyBkYXRhLnVzZXIuc2NyZWVuX25hbWUgKyAnPC9oMj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cInR3ZWV0LWF2YXRhclwiIHNyYz1cIicgKyBkYXRhLnVzZXIucHJvZmlsZV9pbWFnZV91cmwgKyAnXCIgLz4nO1xuXG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUobmV3RWxlbWVudCwgdGhlRmlyc3RDaGlsZCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSwgMjAwMCk7XG5cbiAgICBjb25zdCB0d2VldFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR3ZWV0Jyk7XG4gICAgaWYgKHR3ZWV0U2VsZWN0b3IubGVuZ3RoID4gMjApIHtcbiAgICAgIGNvbnN0IHRvUmVtb3ZlID0gdHdlZXRTZWxlY3Rvclt0d2VldFNlbGVjdG9yLmxlbmd0aCAtIDFdO1xuICAgICAgdG9SZW1vdmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0b1JlbW92ZSk7XG4gICAgfVxuXG4gIH0pO1xuXG59KSgpO1xuIl19
