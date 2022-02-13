var css = require("./i-dont-care-about-cookies/common-css.js");
var embeds = require("./i-dont-care-about-cookies/embeds.js");
var {commons, rules} = require("./i-dont-care-about-cookies/rules.js");

var common = {
    0: require("./i-dont-care-about-cookies/common.js"),
    2: require("./i-dont-care-about-cookies/common2.js"),
    3: require("./i-dont-care-about-cookies/common3.js"),
    4: require("./i-dont-care-about-cookies/common4.js"),
    5: require("./i-dont-care-about-cookies/common5.js"),
    6: require("./i-dont-care-about-cookies/common6.js"),
    7: require("./i-dont-care-about-cookies/common7.js"),
    8: require("./i-dont-care-about-cookies/common8.js"),
}

var cached_rules = {};

function addCSS(css) {
    document.head.appendChild(document.createElement("style")).innerHTML = css;
}

function activateDomain(hostname)
{
	if (!cached_rules[hostname])
		cached_rules[hostname] = rules[hostname] || {};

	if (!cached_rules[hostname])
		return false;

	let r = cached_rules[hostname],
		status = false;

	if (typeof r.s != 'undefined') {
        addCSS(r.s);
		status = true;
	}
	else if (typeof r.c != 'undefined') {
        addCSS(commons[r.c]);
		status = true;
	}

	if (typeof r.j != 'undefined' && r.j > 0) {
        common[r.j]();
		status = true;
	}

	if (!status)
		return false;

	return true;
}

function doTheMagic(anotherTry) {
    if (document.location.protocol.indexOf('http') != 0) {
        return;
    }

    try {
        addCSS(css);
    } catch {
        let currentTry = (anotherTry || 1);
        if (currentTry == 5) return;
        setTimeout(function() {
            doTheMagic(currentTry + 1)
        }, 300);
        return;
    }
    embeds();

    var hostname = document.location.hostname;
    if (activateDomain(hostname) || activateDomain(hostname.replace("www.", "")))
        return;

    common[0]();
}

doTheMagic();