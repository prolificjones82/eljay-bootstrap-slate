import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import { forceFocus, bindInPageLinks } from '@shopify/theme-a11y';
import { cookiesEnabled } from '@shopify/theme-cart';
import Cookies from 'js-cookie';
import { isMobile } from 'mobile-device-detect';

window.slate = window.slate || {};
window.theme = window.theme || {};
window.Shopify = window.Shopify || {};

slate.utils = {
    getParameterByName: function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    keyboardKeys: {
        TAB: 9,
        ENTER: 13,
        LEFTARROW: 37,
        RIGHTARROW: 39
    }
};

theme.selectors = {
    mainContent: '#mainContent'
};

theme.breakpoints = {
    'sm':     parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sm'), 10),
    'md':     parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md'), 10),
    'lg':     parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-lg'), 10),
    'xl':     parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xl'), 10),
    'xxl':     parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xxl'), 10)
}

$(window).on('load', () => {
    $('body').addClass('loaded');

    if ($('#LoginModal').hasClass('has-errors')) {
        $('#LoginModal').modal('show');
    }
});

$(function() {
    // catch for reviews not working on localhost during development
    if (window.Shopify.shop.includes("localhost")) {
        window.Shopify.shop = window.theme.shopUrl;
    }

    bindInPageLinks();

    $('.in-page-link').on('click', (evt) => {
        forceFocus($(evt.currentTarget.hash));
    });

    // Apply a specific class to the html element for browser support of cookies.
    if (navigator.cookieEnabled) {
        document.documentElement.className = document.documentElement.className.replace(
            'supports-no-cookies',
            'supports-cookies',
        );
    }

    $('.toggle-search').on('click tap', (evt) => {
        evt.preventDefault();
        $('body').toggleClass('search-open');
        $('.hero-search').find('input[type="text"]').focus();
    });

    $('.toggle-navigation').on('click tap', (evt) => {
        evt.preventDefault();
        $('body').toggleClass('menu-open');
    });

    $('.toggle-link').on('click tap', (evt) => {
        evt.preventDefault();
        var target = $(evt.currentTarget).data('target');
        $(target).toggleClass('hide');
    });

    $('.back-to-top').on('click tap', (evt) => {
        evt.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
});