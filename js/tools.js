var sliderPeriod    = 5000;
var sliderTimer     = null;

$(document).ready(function() {

    $('.slider').each(function() {
        var curSlider = $(this);
        curSlider.data('curIndex', 0);
        curSlider.data('disableAnimation', true);
        var curHTML = '';
        curSlider.find('.slider-item').each(function() {
            curHTML += '<a href="#"><span></span></a>';
        });
        $('.slider-ctrl').html(curHTML);
        $('.slider-ctrl a:first').addClass('active');
        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        curSlider.find('.slider-ctrl a:first').find('span').animate({'width': '100%'}, sliderPeriod, 'linear');

    });

    function sliderNext() {
        var curSlider = $('.slider');

        if (curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex >= curSlider.find('.slider-item').length) {
                newIndex = 0;
            }

            curSlider.data('curIndex', newIndex);
            curSlider.data('disableAnimation', false);

            curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
            curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

            curSlider.find('.slider-ctrl a.active').removeClass('active');
            curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');
            curSlider.find('.slider-ctrl a span').stop(true, true).css({'width': 0});

            curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                curSlider.find('.slider-ctrl a').eq(newIndex).find('span').animate({'width': '100%'}, sliderPeriod, 'linear');
                curSlider.data('disableAnimation', true);
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            });
        }
    }

    $('.slider').on('click', '.slider-ctrl a', function(e) {
        if (!$(this).hasClass('active')) {
            window.clearTimeout(sliderTimer);
            sliderTimer = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.slider-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');
                curSlider.find('.slider-ctrl a span').stop(true, true).css({'width': 0});

                curSlider.find('.slider-item').eq(curIndex).fadeOut(function() {
                    curSlider.find('.slider-ctrl a').eq(newIndex).find('span').animate({'width': '100%'}, sliderPeriod, 'linear');
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        e.preventDefault();
    });

    $('#changeDelivery').change(function(e) {
        var curValue = $(this).val();
        $('.order-delivery-item.active').removeClass('active');
        $('#delivery-' + curValue).addClass('active');
        recalcCart();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.top-cart-value').click(function(e) {
        $('.top-cart').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.top-cart').length == 0) {
            $('.top-cart').removeClass('open');
        }
    });

    $('.top-cart-window-close').click(function(e) {
        $('.top-cart').removeClass('open');
        e.preventDefault();
    });

    $('.menu-add-link').click(function(e) {
        $('.menu-add').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.menu-add').length == 0) {
            $('.menu-add').removeClass('open');
        }
    });

    $('.menu-mobile-link').click(function(e) {
        $('.menu-mobile').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.menu-mobile').length == 0) {
            $('.menu-mobile').removeClass('open');
        }
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').toggleClass('open');
        if ($('.header-search').hasClass('open')) {
            $('.header-search .form-input input').focus();
        } else {
            $('.header-search .form-input input').blur();
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
            $('.header-search .form-input input').blur();
        }
    });

    $('.order-comment-link a').click(function(e) {
        $('.order-comment-link').hide();
        $('.order-comment').css({'display': 'table'});
        e.preventDefault();
    });

    $('.basket-row-count input').on('spinstop', function(event, ui) {
        recalcCart();
    });

    $('.basket-delete a').click(function(e) {
        $(this).parents().filter('.basket-row').remove();
        recalcCart();
        e.preventDefault();
    });

    $('.product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-photo-big img').attr('src', curLink.attr('href'));
        }
        e.preventDefault();
    });

    $('.product-link-delivery').click(function(e) {
        var curLink = $(this);
        $.ajax({
            url: curLink.attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            if ($('.product-links-window').length > 0) {
                $('.product-links-window').remove();
            }
            $('.product-links').append('<div class="product-links-window">' + html + '<a href="#" class="product-links-window-close"></a></div>');
            $('.product-links-window-scroll').jScrollPane({
                autoReinitialise: true
            });

            $('.product-links-window-close').click(function(e) {
                $('.product-links-window').remove();
                e.preventDefault();
            });

        });
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.product-links').length == 0) {
            $('.product-links-window').remove();
        }
    });

    $('body').bind('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.product-links-window').remove();
        }
    });

    $('body').on('click', '.window-link', function(e) {
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            if ($('.window').length > 0) {
                windowClose();
            }
            windowOpen(html);
        });
        e.preventDefault();
    });

    $('.table-sortable').DataTable({
        'paging':       false,
        'info':         false,
        'searching':    false
    });

    $('.mobile-recommend').on('click', '.mobile-recommend-ctrl a', function(e) {
        var curList = $(this).parents().filter('.mobile-recommend');
        var curIndex = curList.find('.mobile-recommend-ctrl a').index($(this));
        curList.find('.catalogue-item:first').stop(true, true);
        curList.find('.mobile-recommend-ctrl a.active').removeClass('active');
        $(this).addClass('active');
        curList.find('.catalogue-item:first').animate({'margin-left': -curIndex * curList.find('.catalogue-item:first').outerWidth()});
        e.preventDefault();
    });

    $('.side-mobile-link a').click(function(e) {
        $('html').toggleClass('side-open');
        e.preventDefault();
    });

    $('.product-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-tabs-menu li').index(curLi);
            $('.product-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-tab-content.active').removeClass('active');
            $('.product-tab-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-tabs-menu-prev').click(function(e) {
        var curIndex = $('.product-tabs-menu li').index($('.product-tabs-menu li.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.product-tabs-menu li').length - 1;
        }
        $('.product-tabs-menu li').eq(curIndex).find('a').click();
        e.preventDefault();
    });

    $('.product-tabs-menu-next').click(function(e) {
        var curIndex = $('.product-tabs-menu li').index($('.product-tabs-menu li.active'));
        curIndex++;
        if (curIndex > $('.product-tabs-menu li').length - 1) {
            curIndex = 0;
        }
        $('.product-tabs-menu li').eq(curIndex).find('a').click();
        e.preventDefault();
    });

    $('.compare-headers-mobile').click(function(e) {
        $('.compare-list').toggleClass('open');
        e.preventDefault();
    });

    $('.bx_filter .bx_filter_input_checkbox input').change(function() {
        repositionFilterResults($(this).parents().filter('.bx_filter_param_label'));
    });

    $('.bx_filter_input_container input').change(function() {
        repositionFilterResults($(this).parent());
    });

    $('.section-search .form-input input').keyup(function(e) {
        var curSearch = $(this).val().toLowerCase();
        if (curSearch == '') {
            $('.docs').each(function() {
                $(this).show();
                $(this).prev().show();
            });
            $('.doc').show();
        } else {
            $('.doc').each(function() {
                var curDoc = $(this);
                var searchResult = false;
                var curTitle = curDoc.find('.doc-title a').text().toLowerCase();
                if (curTitle.indexOf(curSearch) != -1) {
                    searchResult = true;
                }
                var curDescr = curDoc.find('.doc-descr').text().toLowerCase();
                if (curDescr.indexOf(curSearch) != -1) {
                    searchResult = true;
                }
                if (searchResult) {
                    curDoc.show();
                    curDoc.parent().show();
                    curDoc.parent().prev().show();
                } else {
                    curDoc.hide();
                }
            });
            $('.docs').each(function() {
                var curDocs = $(this);
                if (curDocs.find('.doc:visible').length == 0) {
                    curDocs.hide();
                    curDocs.prev().hide();
                }
            });
        }
    });

});

function recalcCart() {
    var curSumm = 0;
    $('.checkout-cart .basket-row').each(function() {
        var curRow = $(this);
        curSumm += Number(curRow.find('.basket-row-count input').val()) * Number(curRow.find('.basket-row-price span').html().replace(' ', ''));
    });
    var curDeliveryPrice = 0;
    if ($('.order-delivery-item.active').length > 0) {
        if ($('.order-delivery-item.active .delivery-price').length > 0) {
            curDeliveryPrice = Number($('.order-delivery-item.active .delivery-price').html());
        }
        if ($('.order-delivery-item.active .delivery-free').length > 0) {
            var curDeliveryFree = Number($('.order-delivery-item.active .delivery-free').html());
            if (curSumm >= curDeliveryFree) {
                curDeliveryPrice = 0;
            }
        }
    }

    $('#basket-price').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('#basket-delivery').html(String(curDeliveryPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    var allSumm = curSumm + curDeliveryPrice + Number($('#basket-discount').html().replace(' ', ''));
    if (allSumm < 0) {
        allSumm = 0;
    }
    $('#basket-summ').html(String(allSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    if (curForm.hasClass('ajaxForm')) {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            },
            submitHandler: function(form, validatorcalc) {
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: $(form).serialize(),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    if ($('.window').length > 0) {
                        windowClose();
                    }
                    windowOpen(html);
                });
            }
        });
    } else {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            }
        });
    }
}

function checkErrors() {
    $('.form-checkbox, .form-input, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

$(window).on('load resize', function() {

    $('.catalogue-list').each(function() {
        var curList = $(this);
        curList.find('.catalogue-item-photo').css({'min-height': 0 + 'px'});

        curList.find('.catalogue-item-photo').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-photo').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px', 'line-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px', 'line-height': newHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.catalogue-item-text').css({'min-height': 0 + 'px'});

        curList.find('.catalogue-item-text').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-text').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.compare-list').each(function() {
        var curList = $(this);

        var api = $('.compare-list').find('.compare-list-scroll').data('jsp');
        if (api) {
            api.destroy();
        }

        var maxHeight = 0;
        curList.find('.compare-row-anonce').css({'min-height': '0px'});
        curList.find('.compare-row-anonce').each(function() {
            var curHeight = $(this).height();
            if (curHeight > maxHeight) {
                maxHeight = curHeight;
            }
        });
        curList.find('.compare-row-anonce').css({'min-height': maxHeight + 'px'});

        maxHeight = 0;
        curList.find('.compare-item-info-text').css({'min-height': '0px'});
        curList.find('.compare-item-info-text').each(function() {
            var curHeight = $(this).height();
            if (curHeight > maxHeight) {
                maxHeight = curHeight;
            }
        });
        curList.find('.compare-item-info-text').css({'min-height': maxHeight + 'px'});

        curList.find('.compare-row').css({'min-height': '0px'});
        curList.find('.compare-headers .compare-row').each(function() {
            var curRow = $(this);
            var curIndex = curList.find('.compare-headers .compare-row').index(curRow);
            maxHeight = curRow.height();
            curList.find('.compare-item').each(function() {
                var curHeight = $(this).find('.compare-row').eq(curIndex).height();
                if (curHeight > maxHeight) {
                    maxHeight = curHeight;
                }
            });
            curRow.css({'min-height': maxHeight + 'px'});
            curList.find('.compare-item').each(function() {
                $(this).find('.compare-row').eq(curIndex).css({'min-height': maxHeight + 'px'});
            });
        });

        $('.compare-list').find('.compare-list-scroll').jScrollPane({
            autoReinitialise: true
        });
    });

    $('.mobile-recommend').each(function() {
        var curList = $(this);

        var curPages = curList.find('.catalogue-item:visible').length;
        if (curPages > 1) {
            var curHTML = '';
            for (var i = 0; i < curPages; i++) {
                curHTML += '<a href="#"></a>';
            }
            curList.find('.mobile-recommend-ctrl').html(curHTML);
            curList.find('.mobile-recommend-ctrl a:first-child').addClass('active');
        } else {
            curList.find('.mobile-recommend-ctrl').html('');
        }
        curList.find('.catalogue-item:first').css({'margin-left': 0});
    });

});

function windowOpen(contentWindow) {
    var windowWidth     = $(window).width();
    var windowHeight    = $(window).height();
    var curScrollTop    = $(window).scrollTop();
    var curScrollLeft   = $(window).scrollLeft();

    var bodyWidth = $('body').width();
    $('body').css({'height': windowHeight, 'overflow': 'hidden'});
    var scrollWidth =  $('body').width() - bodyWidth;
    $('body').css({'padding-right': scrollWidth + 'px'});
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
    $('body').css({'margin-top': -curScrollTop});
    $('body').data('scrollTop', curScrollTop);
    $('body').css({'margin-left': -curScrollLeft});
    $('body').data('scrollLeft', curScrollLeft);

    $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close">Закрыть</a></div></div></div>')

    if ($('.window-container img').length > 0) {
        $('.window-container img').each(function() {
            $(this).attr('src', $(this).attr('src'));
        });
        $('.window-container').data('curImg', 0);
        $('.window-container img').load(function() {
            var curImg = $('.window-container').data('curImg');
            curImg++;
            $('.window-container').data('curImg', curImg);
            if ($('.window-container img').length == curImg) {
                $('.window-loading').remove();
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }
        });
    } else {
        $('.window-loading').remove();
        $('.window-container').removeClass('window-container-load');
        windowPosition();
    }

    $('.window-close').click(function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.window-overlay').click(function() {
        windowClose();
    });

    $('body').bind('keyup', keyUpBody);

    $('.window form').each(function() {
        initForm($(this));
    });

}

function windowPosition() {
    var dpr = 1;
    if (window.devicePixelRatio !== undefined) {
        dpr = window.devicePixelRatio;
    }

    var windowWidth     = $(window).width() * dpr;
    var windowHeight    = $(window).height() * dpr;

    if ($('.window-container').width() > windowWidth - 40) {
        $('.window-container').css({'left': 20, 'margin-left': 0});
        $('.window-overlay').width($('.window-container').width() + 40);
    } else {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});
        $('.window-overlay').width('100%');
    }

    if ($('.window-container').height() > windowHeight - 40) {
        $('.window-overlay').height($('.window-container').height() + 40);
        $('.window-container').css({'top': 20, 'margin-top': 0});
    } else {
        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
        $('.window-overlay').height('100%');
    }
}

function keyUpBody(e) {
    if (e.keyCode == 27) {
        windowClose();
    }
}

function windowClose() {
    $('body').unbind('keyup', keyUpBody);
    $('.window').remove();
    $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
    $(window).scrollTop($('body').data('scrollTop'));
    $(window).scrollLeft($('body').data('scrollLeft'));
}

$(window).resize(function() {
    if ($('.window').length > 0) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();
        var curScrollLeft   = $(window).scrollLeft();

        $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
        $('body').data('scrollTop', 0);
        $('body').data('scrollLeft', 0);

        windowPosition();
    }
});

function repositionFilterResults(el) {
    var curTop = el.offset().top - $('.bx_filter').offset().top;

    var curResult = $('.bx_filter_popup_result');
    curResult.css({'top': curTop + el.height() / 2 - curResult.outerHeight() / 2});
}