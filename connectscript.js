$(document).ready(function() {
  var seat = "";
  var employees_arr = [];
  var svgfile ="https://stage.supportuw.org/connect/floorplan/1848-3.svg";

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  function makeEmployeeList() {
    var employees_arr = [];
    employees_arr.push({
      seat: employee_info["addressLine1"],
      name: employee_info["firstName"] + " " + employee_info["lastName"]
    });
  }

  function highlightSeat(seat) {
    $("rect#" + seat).css("fill", "#C5050C");
    $("text#num" + seat).css("fill", "#FFFFFF");
  }

  function hideSeat(seat) {
    $("rect#" + seat).css("fill", "#FFFFFF");
    $("text#num" + seat).css("fill", "#000");
  }

  //loads initial location based on query string
  var location = getQueryVariable("l");
  //console.log(location);

  if (location) {
    var building = location.split("-")[0];
    seat = location.split("-")[1];
    highlightSeat(seat);
  }

  $("#employees").change(function() {
    if (seat != "") {
      hideSeat(seat);
    }
    seat = $("select#employees option:selected").val();
    console.log(seat);
    highlightSeat(seat);
  });

  //determine if we've got the right floor loaded

  if ($("#floormap").html() != "") {
    console.log("Floor_Plan_1848_3 is loaded");
  } else {
    //console.log("Floorplan is empty");
    $("#floormap").load(svgfile, function() {
      //console.log(seat);
      $(".seat").hover(
        function() {
          seat = $(this).attr("id");
          //$("rect.seat").css("fill", "#FFFFFF");
          $("g.seat").css("fill", "#FFFFFF");
          $("text.seat_num").css("fill", "#000000");
          //$("rect#" + seat).css("fill", "#C5050C");
          $("g#" + seat).css("fill", "#C5050C");
          $("text#num" + seat).css("fill", "#FFFFFF");
          $("text#num" + seat).css("fill", "#FFFFFF");

          if ($("option[value='" + seat + "']").text()) {
            $("#employee_name").html(
              $("option[value='" + seat + "']").text() + " sits here."
            );
          } else {
            $("#employee_name").html("This seat is currently unoccupied.");
          }

          //console.log($("option[value='"+seat+"']").text());
          //$(seat).css("opacity",".5");
          //console.log($("#employees")).html();
          //var emp = getEmployee(employees_arr,seat);
          //console.log(emp);
        },
        function() {
          //$("rect#" + seat).css("fill", "#FFFFFF");
          $("g#" + seat).css("fill", "#FFFFFF");
          $("text#num" + seat).css("fill", "#000");
          $("#employee_name").html("");
        }
      );
    });
  }

  var token =
    "96C3CF52BEA2C736B8CB68CFF26EF77F0E476F151B93A91B13CC868C24B8F8E8A46A50CB6B8856813D8A3A1EC67A792F01ED822612B7030D6CFC62C155DBD4913606B3D2EBAE8061B5A29F392D9916D7A7E5D25BED8C0E349BFA662924B68338150B3EAD655344F0220BDA87A2F049368929CA00DAD1DAAB0A2384B1FD61FBE6";

  $.getJSON("https://connectdev.supportuw.org/api/users?token=", function(
    data
  ) {
    var floor = "";
    var seat = "";

    $.each(data, function(key, employee_info) {
      employees_arr.push(employee_info);

      if (employee_info["addressLine1"].match(/1848-[0-90-90-9]/)) {
        floor = employee_info["addressLine1"].split("-")[0];
        seat = employee_info["addressLine1"].split("-")[1];
        if (seat.charAt(0) == "3") {
          //$("#employees").append("<option value='"+seat+"'>"+employee_info['firstName']+" "+employee_info['lastName']+" "+seat+"</option>");
          $("#employees").append(
            "<option value='" +
              seat +
              "'>" +
              employee_info["firstName"] +
              " " +
              employee_info["lastName"] +
              "</option>"
          );
          //$("#employees").append("<option value='"+seat+"'>"+seat+"</option>");
        }
      }
    });
  });

  Object.size = function(obj) {
    var size = 0;
    key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
      return size;
    }
  };

  //console.log(employees_arr.length);
  //console.log(emp);
});
