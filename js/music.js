/*jslint vars:true, nomen: true, white: true, browser: true*/
/*global $*/
/*global Mustache*/

'use strict';

$(document).ready(function() {
    var lastfmURL = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=drepram&api_key=dcedd6c25e0a9aa92bdaf613cc113efe&limit=18&format=json';
    $.getJSON(lastfmURL, function(res) {
        var container = $("#gamesContainer");

        if (!res) {
            container.html('<font color="red">AJAX call to lastfm.com failed.</font>');
            return;
        }

        var items = res.recenttracks.track;

        var out;
        var template = $("#albumTemplate").html();
        Mustache.parse(template);

        var html = '<div class="row">';
        $.each(items, function(i, item) {
            if (i % 2 === 0 && i !== 0) {
                html = html.concat('</div><div class="row">');
            }

            item.cover = item.image[3]["#text"];

            out = Mustache.render(template, item);
            html = html.concat(out);
        });
        html = html.concat('</div>');

        container.html(html);
    });
});
