$("document").ready(function() {
  var timeCount;
  var timeZero;
  var number;
  var number0;
  var number1;
  var number2;
  var myArray = [0, 1, 2];
  var time = 10;
  var condition = true;
  var count = 0;
  var win = 0;
  var loose = 0;
  var unanswered = 0;
  var stop = 0;
  var objects = [
    {
      q1: "Tell Me How Do You Clear A Floated Element?",
      answer: ["clear:before", "clear:both", "clear:after"],
      correct: "clear:both"
    },
    {
      q1: "How Do Browsers Read Css?",
      answer: ["From right to left", "From left ro right", "From top to bottom"],
      correct: "From right to left"
    },
    {
      q1: "What Is The Difference Between Json And Jsonp?",
      answer: ["JSONP is JSON with post", "JSONP is JSON with protocol", "JSONP is JSON with padding"],
      correct: "JSONP is JSON with padding"
    }
  ];

// timeup
  var searchURL=function(name){
    var queryURL=("https://api.giphy.com/v1/gifs/search?q="+name+"&api_key=qNUiyTFw5FDbggtIQ44CZO8gyNTgmI1R");

    $.ajax({
      url:queryURL,
      method:"GET"
    }).then(function(response){
      $("img").attr("src",response.data[0].images.preview_gif.url);

    });

  }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  function start() {
    number = shuffle(myArray);
    number0 = number[0];
    number1 = number[1];
    number2 = number[2];
    time = 10;

    timeCount = setInterval(function() {
      if (stop == 3) {
        condition = false;
        clearInterval(timeCount);
        $("#demo, ol").addClass("remove");
        
        $("#read").html(
          "You loose: " +
            loose +
            " times.<br> You wins: " +
            win +
            " times.<br>Unanswered: " +
            unanswered +
            ""
        );
        searchURL("theend");
        $("img").removeClass("remove");
        $("button").removeClass("hide");
        $("button").text("Over again!");
      }
      

      if (condition) {
        
        $("img").addClass("remove");
        $("#display, #demo, #read, ol").removeClass("hide remove");
        $("#read").text(objects[count].q1);
        $("#1").text(objects[count].answer[number0]);
        $("#2").text(objects[count].answer[number1]);
        $("#3").text(objects[count].answer[number2]);
        condition = false;
      }

      if (time === 0) {
        $("#demo").html("<p>Time Remaining: "+time+" seconds</p>");
        timeZero();
      }
      $("#demo").html("<p>Time Remaining: "+time+" seconds</p>");
      time--;
    }, 1000);
  }

  timeZero = function() {
    $("#read").html(
      "Loooooooser. The right answer is " + objects[count].correct
    );
    
    searchURL("timeup");
    $("img").removeClass("remove");
    clearInterval(timeCount);
    

    condition = true;
    $("ol").addClass("remove");

    stop++;
    count++;
    unanswered++;
    
    setTimeout(start, 2000);
  };

  $("button").click(function() {
    $("button").addClass("hide");
    time = 10;
    condition = true;
    count = 0;
    win = 0;
    loose = 0;
    unanswered = 0;
    stop = 0;

    start();
  });

  $("li").click(function() {
    var content = $(this).text();
    if (content == objects[count].correct) {
      clearInterval(timeCount);
      $("#read").html(
        "You are right. The answer is: " + objects[count].correct
      );
      searchURL("excelent");
      $("img").removeClass("remove");
      $("ol").addClass("remove");

      condition = true;
      stop++;
      win++;
      count++;
      setTimeout(start, 2000);
    } else {
      clearInterval(timeCount);

      $("#read").html(
        "You are wrong. The answer is: " + objects[count].correct
      );
      searchURL("badidea");
      $("img").removeClass("remove");
      $("ol").addClass("remove");

      stop++;
      loose++;
      condition = true;
      count++;
      setTimeout(start, 2000);
    }
  });
});
