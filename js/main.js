/*
problem: cannot delete item from local storage to iterate the values
*/

$(document).ready(function() {
  if (localStorage.getItem("noOfItems") > 0) {
    var localNoOfItems = localStorage.getItem("noOfItems");
    for (var i = 0; i < localNoOfItems; i++) {
      $("#itemsContainer")
        .append(
          '<div class="item">' +
            '<div class="grid">' +
            '<div class="sixty">' +
            '<div class="name">' +
            '<div class="itemIdentifier" style="font-size: 0">' +
            localNoOfItems +
            "</div>" +
            localStorage.getItem(localNoOfItems) +
            "</div>" +
            "</div>" +
            '<div class="twentyFive">' +
            '<div class="price">' +
            '<input type="text" name="priceInp" class="priceInp" value="' +
            newPrice +
            '"/>' +
            "</div>" +
            "</div>" +
            '<div class="fifteen">' +
            '<div class="del">' +
            "X" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        )
        .hide()
        .fadeIn("slow");
    }
  }
  //pull from local storage
  var keysAvailable = [];
  var noOfItems = 0;
  $("#quantity").text(noOfItems);

  //add
  $("#tick").on("click", function() {
    var newName = $("#newName").val();
    var newPrice = $("#newPrice").val();
    if (newName !== "" && newPrice !== "") {
      noOfItems++;
      $("#itemsContainer")
        .append(
          '<div class="item">' +
            '<div class="grid">' +
            '<div class="sixty">' +
            '<div class="name">' +
            '<div class="itemIdentifier" style="font-size: 0">' +
            noOfItems +
            "</div>" +
            newName +
            "</div>" +
            "</div>" +
            '<div class="twentyFive">' +
            '<div class="price">' +
            '<input type="text" name="priceInp" class="priceInp" value="' +
            newPrice +
            '"/>' +
            "</div>" +
            "</div>" +
            '<div class="fifteen">' +
            '<div class="del">' +
            "X" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        )
        .hide()
        .fadeIn("slow");
      localStorage.setItem("noOfItems", noOfItems);
      localStorage.setItem(noOfItems, newName + "$" + newPrice);
      keysAvailable.push(noOfItems);
      localStorage.setItem("keysAvailable", JSON.stringify(keysAvailable));
      /*names.push(newName);
      price.push(newPrice);
      localStorage.setItem("names", JSON.stringify(names));
      localStorage.setItem("price", JSON.stringify(price));*/
      $("#quantity").text(noOfItems);
      $("#dim").fadeOut("slow");
      $("#addItem").fadeOut("slow");
      $("#footer").fadeIn("fast");
      $("#newName").val("");
      $("#newPrice").val("");
    }
  });

  //delete
  $("#itemsContainer").on("click", ".del", function() {
    var localNoItems = localStorage.getItem("noOfItems");
    if (localNoItems > 0) {
      var that = this;
      var deleteItemIndex = $(this)
        .closest(".item")
        .find(".itemIdentifier")
        .text()
        .trim();

      //var removeItemIndex = keysAvailable.indexOf(deleteItemIndex);
      var deleteThis = deleteItemIndex - 1;
      keysAvailable.splice(deleteThis, 1);
      localStorage.setItem("keysAvailable", JSON.stringify(keysAvailable));
      localStorage.removeItem(deleteItemIndex);
      localStorage.setItem("noOfItems", localNoItems - 1);
      $(this.closest(".item"))
        .css("box-shadow", "none")
        .css("opacity", "0")
        .empty()
        .css("padding", "0")
        .css("height", "0")
        .css("margin", "0");
      /*.empty()
      .css("box-shadow", "none")
      .css("padding", "0")
      .height(0);*/
      setTimeout(function() {
        $(that)
          .closest(".item")
          .remove();
        noOfItems--;
        $("#quantity").text(noOfItems);
      }, 500);
    }
  });

  //interval
  setInterval(intervalCheck, 100);

  function intervalCheck() {
    if (noOfItems === 0 || noOfItems < 0) {
      $("#noItem").fadeIn("slow");
    } else {
      $("#noItem").fadeOut("slow");
    }
    var totalAmount = 0;
    if ($(".priceInp").length === 0) {
      $("#total").text("0");
    } else {
      $(".priceInp").each(function() {
        totalAmount += parseInt($(this).val());
        totalAmountGlobal = totalAmount;
        if (isNaN(totalAmount)) {
          $("#total").text("-");
        } else {
          $("#total").text(totalAmount);
        }
      });
    }
  }

  //dialog
  $("#openAddItemBox").on("click", function() {
    $("#footer").fadeOut(100);
    $("#addItem").fadeIn("slow");
    $("#dim").fadeIn("slow");
    $("#newName").focus();
    setTimeout(function() {}, 500);
  });

  $("#dim").on("click", function() {
    $("#dim").fadeOut("slow");
    $("#addItem").fadeOut("slow");
    $("#footer").fadeIn("fast");
  });
});
