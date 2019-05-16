// Twitter-specific listeners and icons
(function() {
    // console.log('FIRE');
    var addIcons = function() {
            var addIcon = function(item, icon, screenName) {
                if (item) {
                    item.addClass('fs-processed-icon');
                    item.append(icon);
                    icon.click(function(evt) {
                        var redirectWindow = window.open('http://firesauce.net/'+screenName, '_blank');
                        redirectWindow.location;

                        evt.stopPropagation();
                        return false;
                    });
                }
            };

            var userId = window.location.pathname.split('/')[1] || '';
            var appendEl = $("a[href='/"+userId+"/header_photo']").parent().children().eq(1).children().eq(1);
            var iconEl = $('<span><span class="fs-icon fs-icon-logo"></span></span>');

            try {
                var nameEl = appendEl[0].children[0].children[0].children[0];
                appendEl = $(nameEl);
            } catch(e) {}

            if (!appendEl.hasClass('fs-processed-icon') && !appendEl.find('.fs-processed-icon').length) {
                addIcon(appendEl, iconEl, userId);
            }

            //legacy twitter
            $('#stream-items-id').find('> li:not(.fs-processed-icon)').addClass('fs-processed-icon').find('.js-user-profile-link').each(function() {
                var link = $(this),
                    userId = link.attr('data-user-id'),
                    href = link.attr('href'),
                    screenName = (href) ? href.replace('/', '') : '',
                    icon = $('<span><span class="fs-icon fs-icon-logo"></span></span>'),
                    avatar = link.find('.avatar:not(.size24,.size32)');

                addIcon(avatar, icon, userId, screenName);
            });

            $('.ProfileHeaderCard').each(function() {
                var card = $(this),
                    appendEl = card.find('.ProfileHeaderCard-name'),
                    iconEl = $('<span><span class="fs-icon fs-icon-logo"></span></span>');

                if (!appendEl.hasClass('fs-processed-icon')) {
                    addIcon(appendEl, iconEl, userId, userId, true);
                }
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
    // setListeners();

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