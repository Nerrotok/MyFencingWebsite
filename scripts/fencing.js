$(document).ready(function () {
  // Functions
  // Function to make comments
  function commentMaker(textToComment) {
    let dt = new Date();
    let dayToUse =
      dt.getDate() + " : " + (dt.getMonth() + 1) + " : " + dt.getFullYear();
    let comment =
      "<p class='form__comment'>" +
      dayToUse +
      "<br>" +
      "<b> Commentor said: </b> </br>" +
      textToComment +
      "</p>";

    return comment;
  }

  // function to make like objects
  function likeObjectConstructor(id, liked) {
    this.id = id;
    this.liked = false;
  }

  // Function to assign likes or unlikes
  function likeChanger(idToCheck) {
    likeArray = JSON.parse(localStorage.getItem("likeStorage"));

    for (i = 0; i < likeArray.length; i++) {
      if (likeArray[i].id === idToCheck) {
        if (likeArray[i].liked === false) {
          likeArray[i].liked = true;
        } else if (likeArray[i].liked === true) {
          likeArray[i].liked = false;
        }
      }
    }

    localStorage.setItem("likeStorage", JSON.stringify(likeArray));
  }

  // Conditions for website intialisation
  // Set savedContentArray for local storage
  if (localStorage.getItem("savedContentStorage") === null) {
    let savedContentArray = [];
    localStorage.setItem(
      "savedContentStorage",
      JSON.stringify(savedContentArray)
    );
  }

  // Set commentArray for local storage and append comments to commentsContainer element
  if (localStorage.getItem("commentStorage") === null) {
    let commentArray = [];
    localStorage.setItem("commentStorage", JSON.stringify(commentArray));
  } else {
    commentArray = JSON.parse(localStorage.getItem("commentStorage"));

    for (let i = 0; i < commentArray.length; i++) {
      let commentToMake = commentArray[i];
      let commentToAppend = commentMaker(commentToMake);
      $("#commentsContainer").append(commentToAppend);
    }
  }

  // Set likeObject for local storage
  if (localStorage.getItem("likeStorage") === null) {
    let introLike = new likeObjectConstructor("intro__likeButton", false);
    let weaponsLike = new likeObjectConstructor("weapons__likeButton", false);
    let historyLike = new likeObjectConstructor("history__likeButton", false);
    let requirementsLike = new likeObjectConstructor(
      "requirements__likeButton",
      false
    );
    let learnLike = new likeObjectConstructor("learn__likeButton", false);
    let winningLike = new likeObjectConstructor("winning__likeButton", false);
    let gameLike = new likeObjectConstructor("game__likeButton", false);
    let riskRewardLike = new likeObjectConstructor(
      "riskReward__likeButton",
      false
    );
    let winLike = new likeObjectConstructor("win__likeButton", false);
    let examplesLike = new likeObjectConstructor("examples__likeButton", false);
    let federationLike = new likeObjectConstructor(
      "federation__likeButton",
      false
    );
    let popularLike = new likeObjectConstructor("popular__likeButton", false);
    let expensiveLike = new likeObjectConstructor(
      "expensive__likeButton",
      false
    );
    let competingLike = new likeObjectConstructor(
      "competing__likeButton",
      false
    );

    let likeArray = [
      introLike,
      weaponsLike,
      historyLike,
      requirementsLike,
      learnLike,
      winningLike,
      gameLike,
      riskRewardLike,
      winLike,
      examplesLike,
      federationLike,
      popularLike,
      expensiveLike,
      competingLike,
    ];

    localStorage.setItem("likeStorage", JSON.stringify(likeArray));
  } else {
    // Continue here
    likeArray = JSON.parse(localStorage.getItem("likeStorage"));
    for (i = 0; i < likeArray.length; i++) {
      if (likeArray[i].liked === true) {
        $("#" + likeArray[i].id).empty();
        $("#" + likeArray[i].id).append(
          "<svg xmlns='http://www.w3.org/2000/svg' class='likedHeart' width='24' height='24' viewBox='0 0 24 24'><path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z'/></svg>"
        );
      }
    }
  }

  // Hide clearCommentButton if no comments
  if ($("#commentsContainer").children().length === 0) {
    $("#clearCommentButton").hide();
  }

  // initialise stepArray for animation
  let stepArray = [
    "50px",
    "100px",
    "150px",
    "200px",
    "250px",
    "300px",
    "280px",
    "350px",
    "300px",
    "280px",
    "220px",
    "170px",
    "150px",
    "120px",
    "130px",
    "100px",
    "50px",
    "0px",
  ];

  $(".nav").hide();
  $(".subHeader__header--navHide").hide();
  $(".rps__image").hide();

  // Set underlines when hovering navigation dropdown
  $(".subHeader__header--navReveal").hover(function () {
    $(this).css("text-decoration", "underline").css("cursor", "pointer");
  });

  $(".subHeader__header--navReveal").on("mouseleave", function () {
    $(this).css("text-decoration", "none");
  });

  $(".subHeader__header--navHide").hover(function () {
    $(this).css("text-decoration", "underline").css("cursor", "pointer");
  });

  $(".subHeader__header--navHide").on("mouseleave", function () {
    $(this).css("text-decoration", "none");
  });

  // Drop down menu for navigation menu functions
  $(".subHeader__header--navReveal").click(function () {
    $(".nav").slideDown();
    $(".subHeader__header--navReveal").hide();
    $(".subHeader__header--navHide").show();

    $(".subHeader__header--navHide").click(function () {
      $(this).hide();
      $(".subHeader__header--navReveal").show();
      $(".nav").slideUp();
    });
  });

  // Comment function for index page
  $("#commentButton").click(function (e) {
    let textToCheck = $("#makeComment").val();
    e.preventDefault();
    if (textToCheck.trim() === "") {
      alert("Please write a comment first");
    } else {
      commentArray = JSON.parse(localStorage.getItem("commentStorage"));
      commentArray.push(textToCheck);
      localStorage.setItem("commentStorage", JSON.stringify(commentArray));
      newComment = commentMaker(textToCheck);

      $("#commentsContainer").append(newComment);
      $("#makeComment").val("");
      $("#clearCommentButton").slideDown().show();
    }
  });

  // Clear comments button function
  $("#clearCommentButton").click(function (e) {
    e.preventDefault();
    let userDecision = prompt("Are you sure? (y/n)").toLowerCase();
    switch (userDecision) {
      case "y":
        commentArray = [];
        $("#commentsContainer").empty();
        localStorage.setItem("commentStorage", JSON.stringify(commentArray));
        $("#clearCommentButton").slideUp().hide();
        break;
      case "n":
        alert("The comments will not be deleted.");
        break;
      default:
        alert("We will assume you meant no, the comments will not be deleted.");
    }
  });

  // Save for later function for new page
  $(".saveButton").click(function () {
    let savedTextToEdit = $(this).parent("p").text();
    savedTextToEdit = savedTextToEdit.replace("Save", "");
    savedContentArray = JSON.parse(localStorage.getItem("savedContentStorage"));

    if (savedContentArray.includes(savedTextToEdit)) {
      alert("You have already saved this item.");
    } else {
      savedContentArray.push(savedTextToEdit);
      alert(
        `You have saved ${savedContentArray.length} items from the website.`
      );
      localStorage.setItem(
        "savedContentStorage",
        JSON.stringify(savedContentArray)
      );
    }
  });

  // Command to display content on the saved content page
  savedContentArray = JSON.parse(localStorage.getItem("savedContentStorage"));
  for (let i = 0; i < savedContentArray.length; i++) {
    let contentToAppend =
      "<p class='text'>" +
      savedContentArray[i] +
      "<button class='deleteButton'>Delete</button></p>";
    $("#savedContentContainer").append(contentToAppend);
  }

  // Delete saved text function
  $(".deleteButton").click(function () {
    let textToDelete = $(this).parent("p").text();
    textToDelete = textToDelete.replace("Delete", "");
    textToDelete = textToDelete.replace(" ", "");
    savedContentArray = JSON.parse(localStorage.getItem("savedContentStorage"));

    for (let i = 0; i < savedContentArray.length; i++) {
      let textToCompare = savedContentArray[i];
      textToCompare = textToCompare.replace(" ", "");
      if (textToCompare === textToDelete) {
        savedContentArray.splice(i, 1);
      }
    }
    localStorage.setItem(
      "savedContentStorage",
      JSON.stringify(savedContentArray)
    );
    $(this).parent("p").remove();
  });

  // Like option for H2 headers
  $(".likeButton").click(function () {
    if ($(this).find("svg.likeHeart").length > 0) {
      $(this).empty();
      $(this).append(
        "<svg xmlns='http://www.w3.org/2000/svg' class='likedHeart' width='24' height='24' viewBox='0 0 24 24'><path d='M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z'/></svg>"
      );
      likeChanger($(this).attr("id"));
    } else if ($(this).find("svg.likedHeart").length > 0) {
      $(this).empty();
      $(this).append(
        "<svg xmlns='http://www.w3.org/2000/svg' class='likeHeart' width='24' height='24' viewBox='0 0 24 24'><path d='M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z'/></svg>"
      );
      likeChanger($(this).attr("id"));
    }
  });

  // Rock paper scissors game
  $("#rps__form").click(function () {
    if ($("#rockButton").is(":checked")) {
      $("#rockHand").slideDown().show();
      $("#paperHand").hide();
      $("#scissorsHand").hide();
      $("#drawImage").hide();
      $("#winImage").hide();
      $("#loseImage").hide();
      $("#bartEyes").show();
    } else if ($("#paperButton").is(":checked")) {
      $("#rockHand").hide();
      $("#paperHand").slideDown().show();
      $("#scissorsHand").hide();
      $("#drawImage").hide();
      $("#winImage").hide();
      $("#loseImage").hide();
      $("#bartEyes").show();
    } else if ($("#scissorsButton").is(":checked")) {
      $("#rockHand").hide();
      $("#paperHand").hide();
      $("#scissorsHand").slideDown().show();
      $("#drawImage").hide();
      $("#winImage").hide();
      $("#loseImage").hide();
      $("#bartEyes").show();
    }
  });

  // for the result of the game
  $("#rockPaperScissors__commitButton").click(function (e) {
    e.preventDefault();
    if ($("#rockButton").is(":checked")) {
      $("#rockHand").hide();
      $("#bartEyes").hide();
      $("#drawImage").show();
      $("#winImage").hide();
      $("#loseImage").hide();
    } else if ($("#paperButton").is(":checked")) {
      $("#paperHand").hide();
      $("#bartEyes").hide();
      $("#drawImage").hide();
      $("#winImage").show();
      $("#loseImage").hide();
    } else if ($("#scissorsButton").is(":checked")) {
      $("#scissorsHand").hide();
      $("#bartEyes").hide();
      $("#drawImage").hide();
      $("#winImage").hide();
      $("#loseImage").show();
    }
    $(".form__radio").attr("checked", false);
  });

  // animation of fencers moving left and right
  // define function for fencers steppingright
  function step(pixels) {
    $("#facingLeftFencer")
      .animate({ top: "-10px" })
      .animate({ left: pixels })
      .animate({ top: "0px" })
      .delay(300);
    $("#facingRightFencer")
      .delay(300)
      .animate({ top: "-10px" })
      .animate({ left: pixels })
      .animate({ top: "0px" });
  }

  // play the animation
  $(".animation__button").click(function () {
    for (i = 0; i < stepArray.length; i++) {
      step(stepArray[i]);
    }
  });
});
