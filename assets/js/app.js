const apiKey = "zE8tEnhTQbLJaTKmcUjDX0tFS1WJc7pP";
var topics = ["grinning", " winking", "kissing"];
let emojiData;

function displayButtons() {
    $('#topicButtons').empty();
    if(localStorage.getItem('topics')!=null){
        topics = JSON.parse(localStorage.getItem('topics'));
    }
    console.log(topics);
    for (var i = 0; i < topics.length; i++) {
        let topic = topics[i];
        createButton(topic);
    }
}
function getTheGiphy(topic, url) {
    $('#giphys').empty();
    $.ajax({
        method: "GET",
        url: url,
    }).then(function (results) {
        console.log(results);
        if (results == null) {
            $('#giphys').append('<p style="text-align:center">No Result Found</p>')
        } else {
            for (var i = 0; i < results.data.length; i++) {
                let image = $('<img>');
                let staticSrc = results.data[i].images.fixed_height_still.url;
                image.attr("src", staticSrc);
                image.attr("data-status", "still");
                image.attr("data-still", results.data[i].images.fixed_height_still.url); // still image
                image.attr("data-animate", results.data[i].images.fixed_height.url);
                newDiv = $(`<div class="giphy">`);
                newDiv.append(`<p id='rating'>rating: ${results.data[i].rating}</p>`, image);

                $('#giphys').append(newDiv);
            }
        }
    });
}


function createButton(title) {
    let btn = $('<button>');
    btn.addClass('topics');
    btn.attr('data-topic', title);
    btn.text(title);
    $('#topicButtons').append(btn);
}



$(document).on('click', '.topics', function () {
    let topic = $(this).attr('data-topic');
    let mainUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=" + apiKey;
    getTheGiphy(topic, mainUrl);
});


$('#submitEmojiBtn').click(function () {
    event.preventDefault();

    if ($('#addEmoji').val().trim() != '') {
        emojiData = $('#addEmoji').val().trim();
        topics.push(emojiData);
        localStorage.setItem("topics", JSON.stringify(topics));
        displayButtons();
    }
});

$(document).on('mouseover', 'img', function () {
    dataStatus = $(this).attr('data-status');
    if (dataStatus === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-status', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-status', 'still');
    }
});
$(document).on('mouseout', 'img', function () {
    dataStatus = $(this).attr('data-status');
    if (dataStatus === 'animate') {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-status', 'still');
    } 
});

displayButtons();
