$(document).ready(function () {
  console.log("ready!");

  var topics = ["Runescape", "Overwatch", "Call of duty", "Fallout", "Halo 3", "Borderlands", "League of Legends",
    "Fortnite", "PubG"
  ];

  function createButtons() {
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {



      var button = $("<button class='btn btn-outline-secondary topic' type='button'></button>");


      button.attr("value", topics[i]);

      button.text(topics[i]);

      $(".buttons").append(button);


    };
  };



  function gify(response, value) {

    $(".gifs").empty();

    var Count = 10;

    for (var i = 0; i < Count; i++) {

      var still = response.data[i].images.fixed_height_small_still.url;

      var animate = response.data[i].images.fixed_height_small.url;

      var img = $("<img src='" + still + "'>");

      img.attr("alt", value);

      img.attr("data-still", still);

      img.attr("data-animate", animate);

      img.attr("data-state", "still");

      img.attr("class", "gifImg");

      var p = $("<p>");

      p.text("Rating: " + response.data[i].rating);

      var div = $("<div>");

      div.attr("id", "img" + (i + 1));

      div.append(img);

      div.append(p);

      $(".gifs").append(div);
    }
  };


  createButtons();

  $(document).on("click", ".topic", function (event) {
    console.log($(this).attr("value"));

    var value = $(this).attr("value");

    $.get(
      "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + value +
      "&limit=10&offset=0&rating=R&lang=en"
    ).done(function (response) {

      console.log(response);

      gify(response, value);
    });
  });

  $(".submit").on("click", function (event) {

    event.preventDefault();

    var userName = $(".form-control").val();

    topics.push(userName);


    createButtons();
  });

  $(document).on("click", ".gifImg", function (e) {

    var state = $(this).attr("data-state");
    console.log(this);

    if (state === "still") {

      $(this).attr("src", $(this).attr("data-animate"));

      $(this).attr("data-state", "animate");
    } else {

      $(this).attr("src", $(this).attr("data-still"));

      $(this).attr("data-state", "still");
    };
  });

});