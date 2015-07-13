// Twitter-specific listeners and icons
(function() {
    // console.log('FIRE');
    var addIcons = function() {
            var addIcon = function(item, icon, userId, screenName, before) {
                if (item) {
                    if (before) item.before(icon);
                    else item.after(icon);

                    icon.click(function(evt) {
                        // if (userId) {
                        //     // __cr.sendMessage({
                        //     //     method: 'userId',
                        //     //     id: userId,
                        //     //     action: 'click-arrow'
                        //     // });
                        //     console.log({
                        //         method: 'userId',
                        //         id: userId,
                        //         screenName: screenName,
                        //         action: 'click-arrow'
                        //     });
                        // } else if (screenName) {
                        //     // __cr.sendMessage({
                        //     //     method: 'screenName',
                        //     //     id: screenName,
                        //     //     action: 'click-arrow'
                        //     // });
                        //     console.log({
                        //         method: 'screenName',
                        //         id: screenName,
                        //         screenName: screenName,
                        //         action: 'click-arrow'
                        //     });
                        // }

                        var redirectWindow = window.open('http://firesauce.tv/'+screenName, '_blank');
                        redirectWindow.location;

                        evt.stopPropagation();
                        return false;
                    });
                }
            };
            $('#stream-items-id').find('> li:not(.fs-processed-icon)').addClass('fs-processed-icon').find('.js-user-profile-link').each(function() {
                var link = $(this),
                    userId = link.attr('data-user-id'),
                    href = link.attr('href'),
                    screenName = (href) ? href.replace('/', '') : '',
                    icon = $('<span><span class="fs-icon fs-icon-logo"></span></span>'),
                    avatar = link.find('.avatar:not(.size24,.size32)');

                addIcon(avatar, icon, userId, screenName);
            });

            // new twitter home page
            $('.ProfileTweet:not(.fs-processed-icon)').addClass('fs-processed-icon').each(function() {
                var tweet = $(this),
                    link = tweet.find('a.ProfileTweet-originalAuthorLink'),
                    userId = link.attr('data-user-id'),
                    href = link.attr('href'),
                    screenName = (href) ? href.replace('/', '') : '',
                    icon = $('<span class="fs-left"><span class="fs-icon fs-icon-logo"></span></span>'),
                    avatar = link.find('img.ProfileTweet-avatar');

                addIcon(avatar, icon, userId, screenName);
            });

            $('.ProfileCard:not(.fs-processed-icon)').addClass('fs-processed-icon').each(function() {
                var card = $(this),
                    userId = card.attr('data-user-id'),
                    link = card.find('.ProfileNameTruncated-link'),
                    screenName = link.attr('href').replace('/', ''),
                    icon = $('<span class="fs-left"><span class="fs-icon fs-icon-logo"></span></span>');

                addIcon(link, icon, userId, screenName, true);
            });

            setTimeout(function() {
                addIcons();
            }, 1000);
        },
        setListeners = function() {
            $('a.js-action-reply:not(.fs-processed-reply)')
                .addClass('fs-processed-reply')
                .click(function(evt) {

                var findUserId = function(obj) {
                    var parent = obj.parent();
                    if (obj.hasClass('tweet')) {
                        return obj.attr('data-user-id');
                    } else if (parent) {
                        return findUserId(parent);
                    } else {
                        return false;
                    }
                };
                var userId = findUserId($(this));
                if (userId) {
                    console.log({
                        method: 'userId',
                        id: userId,
                        action: 'click-reply'
                    });
                }
            });

            setTimeout(function() {
                setListeners();
            }, 1000);
        };

    // add icons and set listeners
    addIcons();
    setListeners();

    $('.js-user-profile-link').on('click', function(evt) {
        var el = $(this),
            userId = el.attr('data-user-id') || el.parent().attr('data-user-id'),
            href = el.attr('href'),
            parts,
            screenName;

        if (!userId && href) {
            parts = href.split('/');
            screenName = parts[parts.length - 1];

            console.log({
                method: 'screenName',
                id: screenName,
                screenName: screenName,
                action: 'click-user'
            });
        } else {
            console.log({
                method: 'userId',
                id: userId,
                screenName: screenName,
                action: 'click-user'
            });
        }
    });

    $('.twitter-atreply').on('click', function(evt) {
        var screenName = $(this).attr('href').replace('/', '');

        console.log({
            method: 'screenName',
            id: screenName,
            action: 'click-reply'
        });
    });
})();