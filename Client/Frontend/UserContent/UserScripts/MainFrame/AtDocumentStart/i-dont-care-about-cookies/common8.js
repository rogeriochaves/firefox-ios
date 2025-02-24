module.exports = function () {
	function _sl(s, c) {
		return (c || document).querySelector(s);
	}

	function _id(s) {
		return document.getElementById(s);
	}


	var _i = setInterval(function () {
		var html = _sl('html');

		if (!html || /idc8_334/.test(html.className))
			return;

		clearInterval(_i);

		html.className += ' idc8_334';

		var c = 0, l = document.location, i = setInterval(function () {

			var e;

			if (l.hostname.split('.')[0] == 'consent') {
				if (l.pathname == '/m') {
					e = _sl('form[action*="//consent."][action$="/s"] button');

					if (e)
						e.click();
				}


				// Being displayed occasionally. A/B testing?
				// https://wap.google.com/search?q=test&gl=nl&hl=nl&gbv=2&ucbcb=1&ei=RGMPYdWdL_-F9u8Pg5a3mAI

				else if (l.pathname == '/ml') {
					e = _sl('form[action*="//consent."][action$="/s"] .button');

					if (e)
						e.click();
				}
			}
			else {
				// The latest cookie popup, desktop and mobile

				var container = _sl('div[aria-modal="true"][style*="block"]');

				if (container && _sl('a[href*="policies.google.com/technologies/cookies"]', container)) {
					_sl('button + button', container).click();

					// Autofocus on the search field
					e = _sl('form[role="search"][action="/search"]:not([id]) input[aria-autocomplete="both"]');
					if (e) e.focus();
				}

				// General privacy reminder
				e = _sl('form[action^="/signin/privacyreminder"] > div > span > div:not([role]) > div:not([tabindex]) span + div');
				if (e) e.click();

				// #cns=1
				if (l.hash == '#cns=1')
					l.hash = '#cns=0';
			}

			c++;

			if (c == 300)
				clearInterval(i);

		}, 500);
	}, 500);
}