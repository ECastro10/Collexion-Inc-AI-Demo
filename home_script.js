/**
 * Created by emanuel on 5/1/17.
 */
var landingScreen = true;
var image_url;
var api_key = "your api key";
var watson_version = "2016-05-20";
var threshold = ".6";

var classifiers_list;
var best_player_match;
var ignoreThese = ["printer", "machine", "device", "typewriter", "green color", "portable typewriter", "magazine",
                   "newspaper", "tabloid", "medium", "person", "musician", "singer", "entertainer", "baseball player",
                   "athlete", "contestant"];

$(function () {

    $('#submit').on('click', function () {
        if (landingScreen == true) {
            image_url = $('#image_url').val();
            $('#app_name').fadeOut(700);
            $('#instructions').fadeOut(700);
            $('#input_section').fadeOut(700);
            $.ajax({
                type: 'GET',
                // To change back to IBM classifiers, owners=IBM%2Cme
                url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=' + api_key +
                '&url=' + image_url + '&owners=me&classifier_ids=["Typewriter_1686415410", "baseball_card_1648401150",' +
                '"VinylAlbumCover_1686257881", "default"]&threshold=' + threshold + '&version=' +
                watson_version,

                success: function (data) {
                    // console.log(data);
                    // console.log(data);

                    document.getElementById('app_name').className = 'hide-me';
                    document.getElementById('instructions').className = 'hide-me';
                    document.getElementById('input_section').className = 'hide-me';

                    $('#image_box').fadeIn(900);
                    $('#classifications').fadeIn(900);
                    $('#reset_section').fadeIn(900);

                    $('#nat_image_size').prepend('<img data-original=' + image_url + ' id="changing_image" src=' + image_url + '>');


                    var big_picture_classifier;

                    var current_highest_class;

                    classifiers_list = data.images[0].classifiers;
                    // console.log(classifiers_list);

                    for (var fier = 0; fier < classifiers_list.length; fier++){
                        // console.log(classifiers_list[fier]);

                        for (var sub = 0; sub < classifiers_list[fier].classes.length; sub++){

                            // console.log(String(classifiers_list[fier].classes[sub].class));
                            var tester = ignoreThese.indexOf(classifiers_list[fier].classes[sub].class);
                            // console.log(tester);

                            if (tester > -1 || classifiers_list[fier].classes[sub].class.slice(-5) == "color") {

                            } else {

                                // console.log(classifiers_list[fier].classes[sub].class + " " + classifiers_list[fier].classes[sub].score);

                                // console.log(classifiers_list[fier].classes[sub]);


                                if (fier == 0 && sub == 0) {
                                    big_picture_classifier = classifiers_list[fier].name;
                                    // console.log(current_highest_class = classifiers_list[fier].classes[sub]);
                                    current_highest_class = classifiers_list[fier].classes[sub];

                                } else if (current_highest_class.score < classifiers_list[fier].classes[sub].score) {
                                    big_picture_classifier = classifiers_list[fier].name;
                                    current_highest_class = classifiers_list[fier].classes[sub];

                                }
                            }

                        }
                    }
                    if (current_highest_class.score < .60) {
                        $('#classification_list').append('<li id="changing_li">' + "Could Not Classify" + '</li>');

                    } else if (current_highest_class.class == "sixtyeight" || current_highest_class.class == "sixtynine"){
                        $.ajax({
                            type: 'GET',
                            url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=' + api_key +
                                '&url=' + image_url + '&owners=me&classifier_ids=["SpecificPlayer_1891366419"]&threshold=' + threshold + '&version=' +
                                watson_version,
                            success: function(data) {
                                // console.log(data);


                                if ("undefined" === typeof data.images[0].classifiers[0]){


                                    if (current_highest_class.class == "sixtyeight") {
                                        $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1968" + '</li>');

                                    } else if (current_highest_class.class == "sixtynine") {
                                        $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1969" + '</li>');
                                    }
                                } else {
                                    var classes_list = data.images[0].classifiers[0].classes;

                                    for (var player = 0; player < classes_list.length; player++) {

                                        // console.log(classes_list[player].class + " " + classes_list[player].score);

                                        if (player == 0) {
                                            best_player_match = classes_list[player];

                                            // console.log(best_player_match);
                                        } else if (best_player_match.score < classes_list[player].score) {
                                            best_player_match = classes_list[player];

                                            // console.log(best_player_match);
                                        }
                                    }
                                    if (current_highest_class.class == "sixtyeight") {
                                        if (best_player_match.score < .60) {
                                            $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1968" + '</li>');
                                        }
                                        else {
                                            if (best_player_match.class == "MickeyMantle") {
                                                $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1968, Mickey Mantle" +
                                                    '</li>');
                                            } else {
                                                $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1968, Hank Aaron" + '</li>');
                                            }
                                        }
                                    } else if (current_highest_class.class == "sixtynine") {
                                        if (best_player_match.score < .60) {
                                            $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1969" + '</li>');
                                        } else {
                                            if (best_player_match.class == "MickeyMantle") {
                                                $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1969, Mickey Mantle" +
                                                    '</li>');
                                            } else {
                                                $('#classification_list').append('<li id="changing_li">' + "Baseball Card, 1969, Hank Aaron" + '</li>');
                                            }

                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        if (current_highest_class.class == "ElvisPresley"){
                            $('#classification_list').append('<li id="changing_li">' + big_picture_classifier + "," +
                                "Elvis Presley" + '</li>');
                        } else{
                            $('#classification_list').append('<li id="changing_li">' + big_picture_classifier + ", " +
                            current_highest_class.class + '</li>');
                        }
                    }
                    $('#image_url').val("");
                     landingScreen = false;


                }
            });
        }
    });
});

$('#reset_button').on('click', function() {
   if (landingScreen == false) {
       $('#reset_section').fadeOut(500);
       $('#image_box').fadeOut(500);
       $('#classifications').fadeOut(500);

       setTimeout(function() {
           $('#changing_image').remove();
           $('#changing_li').remove();
           $('#app_name').fadeIn(900);
           $('#instructions').fadeIn(900);
           $('#input_section').fadeIn(900);}, 1000);
       landingScreen = true;
   }
});

