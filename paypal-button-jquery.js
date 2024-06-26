/**
 * This script dynamically generates a PayPal donation button for your website.
 * Copyright oxmc. <https://oxmc.is-a.dev/>
 * Licensed under the GNU General Public License v3.0.
 **/
console.log("PaypalDonateButton initialization");
if (window.jQuery) {
    //jQuery is loaded:
    var jquery_version = jQuery.fn.jquery || jQuery().jquery;
    console.log("Jquery loaded, version: ", jquery_version);
    if (jquery_version < "3.3.1") {
        console.warn("This version of jquery is not tested for this script, if you experience errors use jquery 3.3.1 or greater, or use a different donatebutton script here: https://oxmc.is-a.dev/link.html?id=ppdb");
    };

    //dynamically add button css:
    var stylesheet = $("<style>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://projassets.oxmc.is-a.dev/ppdb/paypal.css"
    });
    stylesheet.appendTo("head");
} else {
    throw new Error("jQuery not loaded, this script requires jquery 3.3.1 or greater, or use a different donatebutton script here: https://oxmc.is-a.dev/link.html?id=ppdb");
};

const PaypalDonateButton = {
    // Get url variables:
    helpfunc: {
        urlprotocol: function () {
            return window.location.protocol.startsWith("https") ? "https" : "http";
        },
        url: function () {
            return `${this.urlprotocol}://${window.location.hostname}`;
        }
    },
    create: function (elmid, options) {
        if (typeof elmid === "undefined" || elmid === "") {
            throw new Error("No element id was passed to this function, not creating button.");
        }

        // Options:
        var defopts = {
            debug: false,
            username: "oxmc7769",
            bid: "MQ8P2E8953BRL",
            disable_recurring: 0,
            acceptcurrency: "USD",
        };

        var opts, debug;
        // Handle options:
        if (typeof options !== "undefined") {
            // Debug Mode:
            if (typeof options.debug !== "undefined") {
                if (typeof options.debug !== "boolean") {
                    throw new Error("The debug option must be a boolean.");
                }
                debug = options.debug;
            }
            opts = options;
        } else {
            console.warn(
                "No options object was passed to the PaypalDonateButton create function, using default options, this means all donations will go to oxmc."
            );
            opts = defopts;
            debug = defopts.debug;
        }

        // Check for required options
        if (typeof opts.username === "undefined" || typeof opts.bid === "undefined") {
            throw new Error("Required options (username and bid) are missing.");
        }

        // Validate the element ID
        if (!document.getElementById(elmid)) {
            throw new Error("The element with the specified ID does not exist.");
        }

        //Paypal logo:
        var paypallogob64 = "data:image/png;base64,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";

        //Button options:
        var forcebootstrap = opts.bs || false;

        var bootstrap_enabled = (typeof $().emulateTransitionEnd == 'function');
        var styledetect = bootstrap_enabled || (forcebootstrap && !bootstrap_enabled);

        if (debug == true) {
            console.log("BootstrapJS loaded?", bootstrap_enabled);
            console.log("Force use bootstrap css?", styledetect);
        }

        //Set button styling:
        var btnstyle, btncss, imgcss;
        if (styledetect === true) {
            if (opts.size === "small") {
                btnstyle = "btn-bsdb sm rb-4";
            } else if (opts.size === "large") {
                btnstyle = "btn-bsdb lg rb-4";
            } else {
                btnstyle = "btn-bsdb rb-4";
            }
        } else {
            if (opts.size === "small") {
                btnstyle = "btn-db sm rb-4";
            } else if (opts.size === "large") {
                btnstyle = "btn-db lg rb-4";
            } else {
                btnstyle = "btn-db rb-4";
            }
        };

        //Create button:
        var donate_btn = $('<button>', {
            class: btnstyle,
            id: `donate_btn_${opts.username}`,
            click: function () {
                $(`#donate_button_form_${opts.username}`).submit();
            }
        }).append($('<div/>').append(
            $('<p/>', { class: 'icon-wrapper', style: imgcss }).append(
                $('<img/>', { src: paypallogob64, class: 'icon', width: '45px', height: '45px' })
            ), $('<p/>', { html: `Donate to ${opts.username}`, class: 'donate-text', style: btncss })
        ));

        //Create form for POST to paypal:
        var donate_form = $(`<form action='https://www.paypal.com/donate' method='post' target="_blank" id='donate_button_form_${opts.username}'></form>`);
        donate_form.append(`<input type='hidden' name='business' value='${opts.bid}' />`);
        donate_form.append(`<input type='hidden' name='no_recurring' value='${opts.disable_recurring}' />`);
        donate_form.append(`<input type='hidden' name='currency_code' value='${opts.acceptcurrency}' />`);

        //Append button to html container:
        $(`#${elmid}`).append(donate_btn);
        $(`#donate_btn_${opts.username}`).append(donate_form);

        console.log("Create PaypalDonateButton in:", elmid);
    }
};
