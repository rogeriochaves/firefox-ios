module.exports = function () {
	const classname = Math.random().toString(36).replace(/[^a-z]+/g, '');

	function _parent(e) {
		if (e && e.parentNode)
			return e.parentNode;

		return false;
	}

	function _id(s) {
		return document.getElementById(s);
	}

	function _sl(s, c) {
		if (s.startsWith('//'))
			return _ev(s, false, true);

		return (c || document).querySelector(s);
	}

	function _ev(selector, container, full) {
		return document.evaluate(
			(typeof full == 'undefined' ? '//' : '') + selector,
			container || document,
			null,
			XPathResult.ANY_TYPE, null
		).iterateNext();
	}


	let currentChainElement = 0;

	function _chain() {
		let e, l = arguments.length;
		let flagUnique = false, flagOptional = false;

		for (let i = currentChainElement; i < l; i++) {

			// An argument can be a list of flags valid for all the following arguments

			if (/^FLAG\:/.test(arguments[i])) {
				arguments[i].split(':')[1].split(',').forEach(function (flag) {
					if (flag == 'UNIQUE')
						flagUnique = true;
					else if (flag == 'OPTIONAL')
						flagOptional = true;
					else if (flag == 'REQUIRED')
						flagOptional = false;
				});

				continue;
			}

			if (flagUnique)
				arguments[i] += ':not(' + classname + ')';

			if (i == l - 1)
				return arguments[i];

			e = _sl(arguments[i]);

			if (!e) {
				if (flagOptional) {
					currentChainElement++;
					continue;
				}

				return false;
			}

			currentChainElement++;

			if (flagUnique)
				e.classList.add(classname);

			e.click();
		}

		return false;
	}


	function _if(condition, ...selectors) {
		return (_sl(condition) ? _chain(...selectors) : false);
	}


	function getSelector(host) {
		let e = false;


		// Network domain parts approach (min length: 4)

		if (host.long) {
			for (let i = 0; i < host.long.length; i++) {
				switch (host.long[i]) {
					case 'reebok':
					case 'adidas':
						return _chain('.gl-modal--active button[data-auto-id*="consent-manage"]', 'FLAG:OPTIONAL', 'div[data-auto-id*="group__option-2"] .gl-checkbox--checked input', 'div[data-auto-id*="group__option-1"] .gl-checkbox--checked input', 'FLAG:REQUIRED', 'button[data-auto-id*="consent-options-save"]');

					case 'fiveguys':
						e = _sl('.v-dialog--active');
						return (e && _ev("*[contains(., 'cookie')] | *[contains(., 'Cookie')]", e) ? _sl('.v-card__actions:last-child button', e) : false);

					case 'doppelherz': return (_sl('.bg-coolgray') ? _ev('footer/following-sibling::div/div[contains(@class, "fixed")]//button[contains(@aria-label, "Akzeptieren")]') : _sl('.cookie-inquiry-wrapper.show .cookie-inquiry--configuration .button'));
					case 'musik-produktiv': return '.mp-modal[style*="block"] .consent-save-settings';
					case 'intersport': return '.gdpr-modal-wrapper._show .allow-necessary, #cookies-modal-id[style*="block"] .save-cookies';
					case 'qastack': return '.modal[style*="block"] #cookies-accept';
					case 'douglas': return _chain('.uc-banner-modal .button__link', '.uc-list-button__deny-all');
					case 'easyname': return _chain('.overlay--cookie-modal .choose-settings', '.choose-settings:first-child');
					case 'lyst': return _chain('.ReactModal__Overlay--after-open img[src*="cookie-consent"] ~ div button + button', '.ReactModal__Overlay--after-open #finished-link');
					case 'derstandard': return '.message-component[title*="Einverstanden"], .privacywall-overlay .js-privacywall-agree';
					case 'bosch-home': return '.cookielaw-modal-layer.is-active .js-accept';
					case 'pricerunner': return '#consent button + button';
					case 'sellpy': return _chain('button[label*="cookies"][color="blue"] + button, button[label*="Cookies"][color="blue"] + button', 'div[role="dialog"] > button:last-child');
					case 'myrobotcenter': return '.ec-gtm-cookie-modal._show .decline';
					case 'samsonite': return '.overlay-wrapper--visible .cookie-consent-overlay__actions .btn--primary';
					case 'inwx': return '.consent-background[style*="block"] .reject-all';
					case 'cellbes': return _ev('p[./a[contains(@href, "cookie") or contains(@href, "kupsis") or contains(@href, "sikdatne")]]/parent::div/following-sibling::button');
					case 'nintendo': return '.plo-overlay--is-open .plo-cookie-overlay__reject-btn, .CookiePolicyModal .Modal:not([style*="none"]) .btn + .btn, .cookie-banner[style*="block"] .cookie-reject-button';
					case 'kyoceradocumentsolutions': return host.parts.indexOf('academy') != -1 ? '.modal[style*="block"] .cookiee-agree' : _chain('.-is-visible[data-gdpr-manage-cookies-popup] button[data-gdpr-review-cookies]', 'button[data-gdpr-accept-reviewed]');
				}
			}

			host.long = false;
		}


		switch (host.full) {
			case 'youtube.com': return '#lightbox[class*="ytd-consent-bump"] .buttons ytd-button-renderer:last-child, .consent-bump-v2-lightbox .button-renderer:last-child:not(.show-more-button) button';

			case 'm.facebook.com':
			case 'mapillary.com':
				return _chain('.hasCookieBanner [data-cookiebanner*="manage"]', 'button[data-cookiebanner*="accept"]');

			case 'whatsapp.com':
				return _chain('.hasCookieBanner [data-cookiebanner*="manage"]', 'button[data-cookiebanner*="agree"]');

			case 'facebook.com':
			case 'bulletin.com':

				if (/^\/user_cookie_prompt\//.test(document.location.pathname))
					return _chain('FLAG:UNIQUE', 'div:not(:only-child):first-child > div[role="button"]', 'div:not(:only-child):first-child > div[role="button"]');
				else if (/\/dialog\/cookie_consent\//.test(document.location.pathname))
					return 'button[name="__CONFIRM__"]';

				e = _sl('.__fb-light-mode div[role="dialog"] a[href*="/policies/cookies"], .__fb-dark-mode div[role="dialog"] a[href*="/policies/cookies"]');
				return (e ? _chain('div[role="dialog"] div[aria-hidden="true"] + [role="button"]', 'div[role="dialog"] [tabindex="-1"] > div > div:last-child [role="button"]') : _chain('.hasCookieBanner [data-cookiebanner*="manage"]', 'button[data-testid="cookie-policy-manage-dialog-accept-button"]'));

			case 'messenger.com':
				if (/^\/user_cookie_prompt\//.test(document.location.pathname))
					return _chain('FLAG:UNIQUE', 'div:not(:only-child):first-child > div[role="button"]', 'div:not(:only-child):first-child > div[role="button"]');

				e = _sl('.uiLayer:last-child button[data-cookiebanner*="accept"]');
				if (e) e.click();
				return _sl('.hasCookieBanner button[data-cookiebanner*="accept"], #accept-cookie-banner-label');

			case 'oversightboard.com':
				return _sl('.hasCookieBanner button[data-cookiebanner*="accept"], #accept-cookie-banner-label');

			case 'oculus.com': return _sl('div[data-testid="cookie-policy-dialog"] button[data-cookiebanner*="accept"]');
			case 'business.instagram.com': return _chain('.hasCookieBanner .uiLayer[style*="top"] button[data-cookiebanner*="accept"]', '.uiLayer:last-child button[data-cookiebanner*="accept"]');

			case 'instagram.com':
				e = _sl('#react-root ~ [role] a[href*="cookies"]');
				return (e ? _sl('#react-root ~ [role] button:first-of-type') : _sl('.hasCookieBanner button[data-cookiebanner*="accept"], #accept-cookie-banner-label'));

			case 'privacymanager.io': return _sl('#manageSettings ~ #save, .noDenyButton .accept-all'); // new and old button, just in case
			case 'sp-prod.net': return _sl('.cmp-cta-accept, .message-button:not(.cmp-cta-accept) + .message-button');

			case 'consent-pref.trustarc.com': return (_sl('.pdynamicbutton') ? _chain('.pdynamicbutton .shp', '.pdynamicbutton .submit') : '.iab_managePanel .rejectAll');

			case 'privacy-mgmt.com':
			case 'golem.de':
			case 'bike-bild.de':
			case 'cosmopolitan.de':
				return _sl('.sp_choice_type_11');

			case 'o2.pl':
			case 'money.pl':
			case 'open.fm':
			case 'gadzetomania.pl':
			case 'kafeteria.pl':
			case 'dobreprogramy.pl':
			case 'fotoblogia.pl':
			case 'pudelek.pl':
			case 'komorkomania.pl':
			case 'autokult.pl':
			case 'abczdrowie.pl':
			case 'parenting.pl':
			case 'so-magazyn.pl':
			case 'domodi.pl':
			case 'vibez.pl':
			case 'autocentrum.pl':
			case 'extradom.pl':
			case 'totalmoney.pl':
				return _ev("button[contains(., 'PRZECHODZ')]");

			case 'octapharma.com':
				e = _sl('#assistant-paper button');
				return (e && _ev("span[contains(., 'I agree')]", e) ? e : false);

			case 'rp.pl':
			case 'parkiet.com':
				return _sl('#rodo-popup button:last-child');

			case 'blick.ch':
				e = _sl('div[id^="sp_message"][class^="sp_message_container"]:not(.idcac)');
				if (e) e.className += " idcac";
				return e;

			case 'wacom.com':
				e = _sl('#consent_blackbar:not(.idcac)');
				if (e) e.className += " idcac";
				return e;

			case 'motocombo.pl':
				e = _sl('#topInfoContainer0:not(.idcac)');
				if (e) e.className += " idcac";
				return e;

			case 'wp.pl':
				document.cookie = 'WP-cookie-info=1'; // wiadomosci
				return _ev("button[contains(., 'PRZECHODZ')]");

			case 'blikopzeewolde.nl':
			case 'socialmediaacademie.nl':
			case 'petsie.nl':
				return _sl('.jBlockerAccept');

			case 'fifa.com':
				e = _sl('#root > div > div > svg');
				if (e) e.dispatchEvent(new Event("click", { bubbles: true }));
				return (e ? e : _sl('.mdl-overlay .close'));

			case 'tallsay.com':
			case 'plazilla.com':
				return _sl('.buttonblue[name="cookieok"]');

			case 'interspar.at':
			case 'spar.at':
				return _sl('.has-cookie-notification .cookie-notification__confirm');

			case 'spar.hu':
			case 'spar.hr':
				return _sl('.has-cookie-notification .cookie-notification__accept');

			case 'spar.si':
				return _sl('.has-cookie-notification .cookie-notification__accept, .has-cookie-notification .cookie-notification__select-all');

			case 'rain-alarm.com':
				e = _id('privacypolicyAnalyticsYes');
				if (e) e.click();
				return _id('dialogButtonNo');

			case 'watchadvisor.com':
				e = _sl('#wa-base-gdpr-consent-form #edit-consent-cookies');
				if (e) e.click();
				return _sl('#wa-base-gdpr-consent-form #edit-submit');

			case 'biorender.com':
				e = _sl('#___gatsby > div > div > div > div > div > div > div > a[href*="/privacy"]');
				return (e ? e.parentNode.nextSibling.firstChild : false);

			case 'puzzleyou.be':
			case 'fotondo.cz':
				return _id('cookies-consent-accept-all');

			case 'match.com':
				e = _parent(_sl('a[data-cookie-no-optin][href*="cookie"]'));
				return (e ? e.nextSibling : false);

			case 'neu.de':
				e = _parent(_sl('.js-cookie-no-optin'));
				return (e ? e.nextSibling : false);

			case 'kringloopapp.nl':
				e = _ev("h4[contains(., 'Cookies')]");
				return (e ? _id('modal-close') : false);

			case 'marokko.nl':
				e = _sl('.cookiealert .button');
				if (e) e.dispatchEvent(new Event("mousedown"));
				return false;

			case 'totum.com':
				e = _sl('.modal.active a[href*="cookie-policy"]');
				return (e ? _sl('a', e.parentNode.nextSibling) : false);

			case 'plt.nl':
			case 'amphion.nl':
				return _sl('.site-image .accept');

			case 'thelily.com':
				e = _sl('.gdpr-wall[style] .agree-checkmark');
				if (e) e.click();
				return _sl('.gdpr-wall[style] .continue-btn');

			case 'rocrivor.nl':
				e = _id('id_third_party_cookies_0');
				if (e) e.click();
				return _sl('.fancybox-is-open #cookiewall .button--blue');

			case 'maps.arcgis.com': // s-leipzig
				e = _sl('.jimu-widget-splash .jimu-checkbox');
				if (e) e.click();
				return _sl('.jimu-widget-splash .jimu-btn');

			case 'nederpix.nl':
			case 'birdpix.nl':
				return _sl('#cookieSettings[style*="block"] #cookieAccept');

			case 'track-trace.com':
			case 'pakkesporing.no':
			case 'forstasidorna.se':
			case 'forsidene.no':
				return _sl('.tingle-modal--visible .tingle-btn--primary');

			case 'portalsamorzadowy.pl':
			case 'infodent24.pl':
			case 'portalspozywczy.pl':
			case 'promocjada.pl':
			case 'farmer.pl':
				return _sl('.rodo.open .button');

			case 'shootingtimes.com':
			case 'gunsandammo.com':
				return _sl('.lity-opened #consent .lity-close');

			case 'wko.at':
			case 'gruenderservice.at':
				return _sl('#cookiehint .cookieagree');

			case 'cideon.de':
			case 'eplan.blog':
				return _sl('.modal[style*="block"] .m-content-cideon-cookie-consent__accept');

			case 'metro.de':
			case 'metro.fr':
			case 'metro.hu':
			case 'makro.nl':
				return _sl('#footer div[style*="block"] .field-accept-button-name, .cookie-banner-overlay.noscroll a[test-target="cookie-modal-accept"]');

			case 'metro.it': return _sl('.modal[style*="block"] #cookieLawAgreeBtn');
			case 'metro.co.uk': return _sl('body > div[class^="app"][data-project="mol-fe-cmp"] button + button');

			case 'footroll.pl': return _chain('div[class^="app_gdpr"] button[class*="manage"]', '#managePurposes + div [class*="switch_switch"]', 'div[class^="app_gdpr"] button[class*="save_changes"]:not([disabled])');

			case 'merckmanual.nl':
			case 'msdmanuals.nl':
				return _sl('.cookies + form .button');

			case 'steviaproducts.be':
			case 'pcdiscounter.eu':
			case 'shop4mama.nl':
				return _sl('.ui-dialog[style*="block"] #OneTimePopupDialog + .ui-dialog-buttonpane button:last-child');

			case 'welcomemrbaby.com':
				e = _sl('.mfp-ready .dont-show-me');
				if (e) e.click();
				return _sl(".mfp-ready .dont-show-label ~ a");

			case 'moderne-landwirtschaft.de':
			case 'thule.com':
				return _sl('#cookieModal.in .btn');

			case 'transip.nl':
			case 'transip.eu':
			case 'cloudvps.nl':
				return _sl("#consent-modal .one-btn, .consent-popup__button");

			case 'healthline.com':
			case 'greatist.com':
			case 'medicalnewstoday.com':
				e = _sl('#modal-host button:not(.backdrop)');
				return (e && _ev("span[contains(., 'ACCEPT')]", e) ? e : false);

			case 'reallygoodemails.com':
				e = _sl('#__next > div > .container');
				return (e ? _ev("button[contains(., 'Okay')]", e) : false);

			case 'mitsubishielectric.com':
			case 'mea.com':
				return _sl('.cookie_policy .btn-cookie-yes, .gs18-HasCookieAlert .gs18-CookieAlert .gs18-ButtonLink');

			case 'bienvenue-a-la-ferme.com':
			case 'normandiealaferme.com':
			case 'lagazettedemontpellier.fr':
			case 'sufilog.com':
			case 'igbce.de':
			case 'bibliotheque.toulouse.fr':
			case 'lagazettedenimes.fr':
			case 'pcsoft.fr':
				return _sl('.orejimeBody-WithModalOpen .orejime-Button--save, .orejime-Layer-show .orejime-Button--save');

			case 'bsh-group.com':
			case 'balay.es':
			case 'constructa.com':
			case 'home-connect.com':
				return '.cookielaw-modal-layer.is-active .js-accept';

			case 'wakelet.com': return _sl('#cookie-banner:not([hidden]) .close__icon', _sl('wk-ui-cookier-banner', _sl('my-app').shadowRoot).shadowRoot);
			case 'arcteryx.com': return _sl('.cookies-disclaimer-bar[style*="auto"] .cookies-disclaimer-bar-close', _id('header-host').shadowRoot);

			case 'badische-zeitung.de':
			case 'schweinske.de':
				e = _id('usercentrics-root');
				return (e && e.shadowRoot ? _sl('button[data-testid="uc-accept-all-button"]', e.shadowRoot) : e);

			case 'bobsys.com':
				e = _id('usercentrics-root');
				return (e && e.shadowRoot ? _sl('button[data-testid="uc-deny-all-button"]', e.shadowRoot) : e);


			case 'prosieben.de':
			case 'joyn.de':
			case 'esports.com':
				e = _sl('cmp-banner');
				e = e && e.shadowRoot ? _sl('.banner:not(.banner--hidden) cmp-dialog', e.shadowRoot) : false;
				e = e && e.shadowRoot ? _sl('cmp-button[variant="primary"]', e.shadowRoot) : false;
				return (e && e.shadowRoot ? _sl('.button--primary', e.shadowRoot) : false);

			case 'trusted.de':
				e = _sl('trd-cookie-note', _id('trd-app').shadowRoot);
				return (e ? _sl('.ok', e.shadowRoot) : false);

			case 'configure.bmw.co.uk':
			case 'configure.bmw.de':
			case 'configure.bmw.at':
			case 'configure.bmw.it':
			case 'configure.bmw.fr':
			case 'configure.bmw.lu':
			case 'configure.bmw.nl':
				return _sl('.cookie-button.button-primary', _sl('con-overlay-cookies', _sl('con-overlay-logic', _sl('con-app').shadowRoot).shadowRoot).shadowRoot);

			case 'configure.mini.co.uk':
				return _sl('.cookie-button.button-primary', _sl('con-overlay-cookies', _sl('con-app').shadowRoot).shadowRoot);

			case 'm.economictimes.com':
				e = _id('dut_agree');
				if (e) e.click();
				return e ? e.parentNode.nextSibling.nextSibling : false;

			case 'gezondheidsplein.nl':
			case 'ziekenhuis.nl':
				return _sl('#cookieModalIntro[style*="block"] .button');

			case 'mmafighting.com':
			case 'theverge.com':
				return _sl('#privacy-consent button');

			case 'yellowbrick.nl':
			case 'yellowbrick.de':
			case 'yellowbrick.be':
				return _sl('.cc-set-cookie.btn.btn-green');

			case 'techopital.com':
			case 'ticsante.com':
			case 'sandro-paris.com':
			case 'feuvert.fr':
				return '#cookieConsent[style*="block"] #consentRefuseAllCookies';

			case 'eschuhe.de':
			case 'chaussures.fr':
			case 'eobuwie.com.pl':
			case 'epantofi.ro':
			case 'ecipo.hu':
			case 'efootwear.eu':
				return _sl('.no-scroll .popup .button[data-testid="permission-popup-accept"]');

			case 'kerbalspaceprogram.com':
			case 'bs-ffb.de':
				return _sl('.wmpci-popup-close');

			case 'krakusik.pl':
			case 'toruniak.pl':
			case 'kaliszak.pl':
				return _sl('#js_rodo_window[style*="block"] .yes-to-all');

			case 'theawesomer.com':
				e = _ev("span[contains(., 'Sounds Good, Thanks')]");
				return (e ? e.parentNode : false);

			case 'sava-osiguranje.hr':
			case 'zav-sava.si':
				e = _sl('#frmAgree[style*="block"]');
				if (e) { _sl('input', e).click(); _sl('#btn-agree-go', e).click(); }
				return _sl('.modal[style*="block"] #btn-cookie-man-save');

			case 'smdv.de':
			case 'getgoods.com':
				return '.reveal-overlay[style*="block"] .btn-cookie-consent';

			case 'voelkner.de':
			case 'digitalo.de':
				return '.reveal-overlay[style*="block"] .btn-cookie-consent, .reveal__overlay[style*="block"] .js_button_cookie_consent';

			case 'teb.pl':
			case 'technikum.pl':
				return _sl('#cookieModal[style*="block"] #rodo_accept');

			case 'd2m-summit.de':
			case 'influencermarketingforum.de':
				return _sl('#dialogBox[style*="block"] #submitConsent');

			case 'jetcost.com':
			case 'jetcost.co.uk':
			case 'jetcost.de':
			case 'jetcost.pt':
			case 'voli-diretti.it':
				return _sl('#ck-modal-container .btn');

			case 'olesnica24.com':
			case 'korsokolbuszowskie.pl':
			case 'cooltura24.co.uk':
				return _sl('.modal[style*="block"] .btn[data-accept]');

			case 'lg-firmwares.com':
			case 'sfirmware.com':
				return _sl('.fancybox-is-open #gdpr-accept');

			case 'dsdollrobotics.com':
				e = _sl('.pum-active[data-popmake*="eu-cookie"] .pum-close');
				if (e) e.click();
				return _sl('.pum-active[data-popmake*="one-more-thing"] .pum-close');

			case 'danskemedier.dk':
				return _sl('#gdpr-cookie-message:not([style*="none"]) #gdpr-cookie-accept');

			case 'biotechusa.hu':
			case 'biotechusa.fr':
				return _sl('div[class*="modal-is-opened"] #accept-cookie-settings');

			case 'call-a-pizza.de':
			case 'telepizza.de':
				return _sl('.fancybox-overlay[style*="block"] .js_cookies_all');

			case 'montafon.at':
			case 'termeszetjaro.hu':
			case 'teutonavigator.com':
			case 'engadin.ch':
			case 'tourenplaner-rheinland-pfalz.de':
			case 'wanderservice-schwarzwald.de':
				return '.oax-cookie-consent-select-necessary';

			case 'outdooractive.com':
			case 'alpenvereinaktiv.com':
				return '.oax-cookie-consent-select-all';

			case 'kastner-oehler.at':
			case 'kastner-oehler.ch':
			case 'gigasport.at':
			case 'gigasport.ch':
				return _sl('#quickview_cookie_settings.en_is_active a.tao_button_cookie_settings');

			case 'pcmweb.nl':
			case 'techcafe.nl':
			case 'gamer.nl':
			case 'insidegamer.nl':
				return _sl('#cookie-wall:not([hidden]) .cookie-wall-accept');

			case 'moomoo.io':
			case 'krunker.io':
				return _sl('#consentBlock[style*="block"] .termsBtn[onclick*="1"]');

			case 'zee5.com':
				e = _sl('app-cookies-check-popup .AcceptButton');
				if (e) e.click();
				return _sl('app-cookies-check-popup .Accept');

			case 'idp.funktionstjanster.se':
				e = _sl('.cookieContainer #ccbx');
				return (e && !e.checked ? e : false);

			case 'betriebsrat.de':
			case 'snp-online.de':
			case 'verla.de':
			case 'brwahl.de':
				return _sl('.cookielayermodal[style*="block"] button');

			case 'alphr.com': return _sl('div[id^="sp_message"] div[class*="sp_choices"] button:nth-child(2)');

			case 'eurogamer.net':
			case 'eurogamer.pl':
			case 'eurogamer.cz':
			case 'eurogamer.de':
			case 'eurogamer.es':
			case 'eurogamer.it':
			case 'eurogamer.nl':
			case 'eurogamer.pt':
			case 'rtlxl.nl':
			case 'zdnet.com':
			case 'mensjournal.com':
			case 'crfashionbook.com':
			case 'autoweek.nl':
			case 'landsend.de':
			case 'gmx.com':
			case 'gmx.es':
			case 'gmx.fr':
			case 'gmx.co.uk':
			case 'mail.com':
			case 'cbsnews.com':
			case 'cbslocal.com':
			case 'cnet.com':
			case 'assetstore.unity.com':
			case 'kruidvat.nl':
			case 'kruidvat.be':
			case 'trekpleister.nl':
			case 'tvn24.pl':
			case 'popsugar.co.uk':
			case 'rte.ie':
			case 'sika.com':
			case 'merkurmarkt.at':
			case 'boomerang-tv.pl':
			case 'billa.at':
			case 'cnbc.com':
			case 'bethesda.net':
			case 'a10.com':
			case 'gry.pl':
			case 'sport.pl':
			case 'mtvuutiset.fi':
				return _sl('#onetrust-banner-sdk:not([style*="none"]) #onetrust-accept-btn-handler');

			case 'reisetopia.de': return _chain('#onetrust-banner-sdk:not([style*="none"]) #onetrust-pc-btn-handler', '.save-preference-btn-handler');
			case 'winfuture.de': return _chain('#onetrust-banner-sdk:not([style*="none"]) .cookie-setting-link', '.save-preference-btn-handler');
			case 'dhl.de': return _if('#onetrust-pc-sdk[style*="block"]', '#ot-group-id-C0002', '#confirm-choices-handler');
			case 'reuters.com': return '#onetrust-pc-sdk:not([style*="none"]) .ot-pc-refuse-all-handler';

			case 'tunein.com':
			case 'oe24.at':
				return '#onetrust-banner-sdk:not([style*="none"]) #onetrust-reject-all-handler';

			case '1001spiele.de': return _chain('#onetrust-banner-sdk:not([style*="none"]) .cookie-setting-link', '.ot-pc-refuse-all-handler');
			case 'aerztezeitung.de': return _if('a[href*="/Service/Datenschutzerklaerung-"] ~ a:not([href])', '//button[text()="Akzeptieren und weiter"]');

			case 'medirect.be':
			case 'medirect.com.mt':
				return _id('idCookiePolicy');

			case 'goetzmoriz.com':
			case 'moelders.de':
			case 'mahler.de':
			case 'gillet-baustoffe.de':
			case 'shop.bauwelt.eu':
			case 'kipp.shop':
			case 'stewes.de':
				return '.modal[style*="block"] .modal-cookie #submitSelected';

			case 'wiertz.com':
			case 'oney.pt':
				return _sl('.accept-cookies');

			case 'zwolen.pl':
				e = _sl('#g_toplayer[style*="block"] .close');
				if (e) e.click();
				return _sl('#cook:not([style*="none"]) > a');

			case 'studio.benq.com':
			case 'adameve.com':
			case 'poppen.de':
			case 'fetisch.de':
			case 'gay.de':
				return _sl('.modal[style*="block"] #btn-accept-cookies');

			case 'elring.com':
			case 'elring.ae':
			case 'elring.cn':
			case 'elring.com.tr':
			case 'elring.de':
			case 'elring.fr':
			case 'elring.it':
			case 'elring.pl':
			case 'elring.pt':
			case 'elring.ru':
				return _sl('#modal-cookie-info[style*="block"] .btn-accept');

			case 'aixfoam.com':
			case 'aixfoam.de':
			case 'aixfoam.dk':
			case 'aixfoam.fi':
			case 'aixfoam.fr':
			case 'aixfoam.nl':
			case 'aixfoam.se':
				return _sl('#cc-notification[style*="block"] .cc-button-enableall');

			case 'hscollective.org':
			case 'geefvoorzorgverleners.nl':
				return _sl('.cookie-consent__button--accept');

			case 'cexpr.es':
			case 'correosexpress.com':
			case 'correosexpress.pt':
				return _sl('.fullscreen-container[style*="block"] #cookieAceptar');

			case 'rodekruis.be':
			case 'vias.be':
			case 'umicore.com':
				return _sl('#cookies-banner[style*="block"] .btn-accept-all');

			case 'ffm.to':
			case 'orcd.co':
			case 'backl.ink':
			case 'ditto.fm':
				return _sl('.privacy-notice-gdpr .accept-cookies');

			case 'onecall.no':
			case 'mycall.no':
				return _sl('.modal--cookie-consent[style*="block"] [data-target="acceptCookies"]');

			case 'edimax.com':
				e = _sl('#world_lang_map[style*="block"] .cookies_close_btn span');
				if (e) _sl('#world_lang_map[style*="block"] .cookies_check').click();
				return e;

			case 'apiko.com':
				e = _sl('#gatsby-focus-wrapper > div:last-child a[href*="gdpr"]');
				return (e ? e.parentNode.nextSibling : false);

			case 'heiligenfeld.de':
			case 'fm-systeme.de':
				return _sl('.cookie-hint #tx_cookies input[type="submit"]');

			case 'alltube.tv':
			case 'alltube.pl':
				e = _sl('#cookies > span');
				if (e) e.click();
				return _sl('#rodo-popup[style*="block"] #rodo-accept');

			case 'skitenis.pl':
			case 'holdentalesklep.eu':
			case 'zmienolej.pl':
				return _sl('.fancybox-opened .acceptCondition');

			case 'ionos.de':
			case 'ionos.at':
			case 'ionos.fr':
				return _chain('.privacy-consent--active .privacy-consent--modal .footer-config-link', '#confirmSelection.privacy-consent--button');

			case 'peaks.com':
			case 'peaks.nl':
				return _sl('#cookie-modal.show .bubble');

			case 'mnisek.cz':
			case 'covid19awareness.sa':
			case 'ambiance.be':
			case 'figurelist.co':
				return _sl('.elementor-popup-modal:not([style*="none"]) .elementor-button[href*="close"]');

			case 'crowdlitoken.ch':
				e = _sl('#root > .shadow a[href*="privacy-policy"]');
				return (e ? e.previousSibling : false);

			case 'eigene-ip.de':
			case 'verifyemailaddress.org':
				return _sl('main > .flex > #accept');

			case 'toolstation.nl':
			case 'toolstation.fr':
				return _sl('.modal[style*="block"] #eu-cookies-notice-yes');

			case 'peek-cloppenburg.at':
			case 'peek-cloppenburg.de':
			case 'peek-cloppenburg.nl':
			case 'peek-cloppenburg.pl':
			case 'greenweez.com':
			case 'fashionid.de':
			case 'ansons.de':
				return _sl('.show #accept-all-cookies');

			case 'chartoo.de':
			case 'chartoo.fr':
			case 'chartoo.at':
			case 'chartoo.ch':
			case 'chartoo.co.uk':
			case 'chartoo.in':
			case 'chartoo.com':
				e = _sl('body > div > div:last-child a[href*="/privacy"]');
				return (e ? _sl('[id] + [class] + [id] + [class] + [id]', e.parentNode.nextSibling) : false);

			case 'cropp.com':
				return _sl('#pageHeader div[data-selen-group="cookies-bar"] button');

			case 'coolblue.nl':
			case 'coolblue.be':
			case 'coolblue.de':
				return _sl('.button[name="accept_cookie"]');

			case 'inwerk.de':
			case 'bioplanete.com':
			case 'brabus.com':
				return _sl('#modal-cookie[style*="block"] #saveCookies');

			case 'ab.gr':
			case 'delhaize.be':
			case 'mega-image.ro':
			case 'maxi.rs':
				return _sl('.js-cookies-modal:not(.hidden) .js-cookies-accept-all, button[data-testid="cookie-popup-accept"]');

			case 'isny.de':
			case 'oberstdorf.de':
			case 'alpinschule-oberstdorf.de':
			case 'hotel-mohren.de':
			case 'ok-bergbahnen.com':
			case 'tramino.de':
			case 'markt-oberstdorf.de':
			case 'deutschertourismuspreis.de':
			case 'oberstdorf2021.com':
				return _sl('.TraminoConsent.show .settings [value="acceptConsent"]');

			case 'system.t-mobilebankowe.pl':
				e = _ev("span[contains(., 'Zamknij')]");
				return (e ? e.parentNode.parentNode.parentNode : false);

			case 'bever.nl':
			case 'asadventure.com':
			case 'cotswoldoutdoor.com':
			case 'runnersneed.com':
			case 'snowandrock.com':
			case 'asadventure.fr':
			case 'asadventure.co.uk':
			case 'asadventure.nl':
				return _sl('#body-wrapper div[data-hypernova-key="AEMScenes_CookieMessage"] .as-a-btn--fill');

			case 'sachsen-fernsehen.de':
			case 'radio-trausnitz.de':
			case 'radioeins.com':
			case 'regio-tv.de':
			case 'radio-bamberg.de':
			case 'tvo.de':
			case 'frankenfernsehen.tv':
			case 'tvaktuell.com':
			case 'radio8.de':
			case 'otv.de':
			case 'rnf.de':
			case 'radio-plassenburg.de':
			case 'baden-tv.com':
			case 'muenchen.tv':
			case 'rfo.de':
				return _sl('.cmms_cookie_consent_manager.-active .-confirm-selection');

			case 'gongfm.de':
				return _sl('.cmms_cookie_consent_manager.-active .-confirm-all, #radioplayer-cookie-consent .cookie-consent-button');

			case 'l-bank.de':
			case 'l-bank.info':
				return _sl('#bmLayerCookies.AP_st-visible .AP_mdf-all');

			case 'wetransfer.com':
				e = _sl('.welcome--tandc .button.welcome__agree');
				if (e) e.click();

				return _sl('#tandcs[style*="block"] #accepting.enabled, .transfer__window.terms-conditions .transfer__button, .infobar--terms .button, .welcome__cookie-notice .welcome__button--accept');

			case 'gmx.net':
			case 'gmx.ch':
			case 'gmx.at':
			case 'web.de':
				return _sl('#cmp #save-all-conditionally');

			case 'music.yandex.ru':
			case 'music.yandex.com':
				return _sl('.gdpr-popup__button');

			case 'virginaustralia.com':
			case 'mediathekviewweb.de':
				return _id('cookieAcceptButton');

			case 'weltbild.de':
			case 'weltbild.at':
			case 'jokers.de':
				return _sl('.reveal-overlay[style*="block"] .dsgvoButton');

			case 'backstagepro.de':
			case 'regioactive.de':
				return _sl('#dialogconsent[style*="block"] #acceptall');

			case 'stoffe.de':
			case 'myfabrics.co.uk':
			case 'tyg.se':
				return _sl('body[style*="fixed"] #cookieOverlay .cookie-accept');

			case '12xl.de':
			case 'heilsteinwelt.de':
			case 'elektroversand-schmidt.de':
			case 'optikplus.de':
			case 'heldenlounge.de':
			case 'lignoshop.de':
			case 'wissenschaft-shop.de':
			case 'derkarton.net':
				return _sl('.modal[style*="block"] #saveCookieSelection');

			case 'tvmalbork.pl':
			case 'jelenia.tv':
				return _sl('#rodoModal[style*="block"] .btn-success');

			case 'catawiki.nl':
			case 'catawiki.de':
			case 'catawiki.eu':
			case 'catawiki.fr':
			case 'catawiki.es':
			case 'catawiki.pl':
			case 'catawiki.it':
			case 'catawiki.se':
			case 'catawiki.com':
				return _id('cookie_bar_agree_button');

			case '6play.fr':
				e = _sl('body[style*="hidden"] > div > aside .is-primary:first-child');
				if (e) setTimeout(function () { e.click(); }, 1000);
				return e;

			case 'canaldigital.se':
			case 'canaldigital.no':
				return _sl('.cookieconsentv2--visible .js-accept-cookies-btn');

			case 'tarifcheck.de':
			case 'check24.net':
				return '.modal--show .btn[data-cookie-save-settings]';

			case 'henschel-schauspiel.de':
				e = _sl('#approveform .arrlink');
				if (e) _id('cconsentcheck').click();
				return e;

			case 'gsk-gebro.at':
			case 'voltadol.at':
				return _sl('.cookie-banner--visible .cookie-banner__button--accept');

			case 'ris.at':
			case 'wipptal.org':
			case 'herrnbaumgarten.at':
			case 'steinbach-attersee.at':
			case 'gemeindebrenner.eu':
			case 'gmuend.at':
			case 'kuchl.net':
			case 'gramatneusiedl.at':
			case 'moedling.at':
			case 'salzburg.at':
			case 'zellamsee.eu':
			case 'waidhofen-thaya.at':
			case 'pressbaum.at':
			case 'kirchberg-pielach.at':
			case 'bz.it':
			case 'koenigstetten.at':
			case 'gemeindelengau.at':
			case 'thalgau.at':
			case 'st-georgen-bei-obernberg.at':
			case 'kirchberg-am-wechsel.at':
			case 'luftenberg.at':
			case 'loruens.at':
			case 'buers.at':
			case 'hohenau.at':
			case 'tarrenz.at':
			case 'laa.at':
			case 'rauris.net':
			case 'johann.at':
				return _sl('.bemCookieOverlay__btn--save');

			case 'restaurant-kitty-leo.de':
			case 'dieallianzdesguten.com':
				return _sl('main ~ div a[draggable]');

			case 'dpam.com':
			case 'sylvania-automotive.com':
				return _sl('#consent-tracking[style*="block"] .decline');

			case 'silentmaxx.de':
			case 'allfirewalls.de':
				return _sl('#trocookie-cookiebox[style*="block"] button:last-child');

			case 'auchan.hu':
			case 'auchan.pl':
				return _sl('.cookie-modal__button--accept');

			case 'inp-gruppe.de':
			case 'altoetting.de':
				return '#colorbox[style*="block"] .js_cm_consent_essentials_only';

			case 'alpin-chalets.com':
			case 'frischteigwaren-huber.de':
				return _sl('.overlay.active[data-overlay="privacy"] .overlay_close');

			case 'campusjaeger.de':
				e = _sl('.ReactModal__Overlay--after-open');
				return (e && _ev("h4[contains(., 'Cookies')]") ? _sl('button + button', e) : false);

			case 'oxxio.nl':
				e = _sl('.c-modal__content--after-open');
				return (e && _ev("span[contains(., 'cookiebeleid')]", e) ? _sl('button', e) : false);

			case 'monheim.de':
			case 'maengelmelder.de':
			case 'xn--mngelmelder-l8a.de':
				return _sl('.v--modal-overlay[data-modal="cookie-consent"] .btn-primary');

			case 'roompot.de':
			case 'roompot.nl':
			case 'roompot.fr':
			case 'roompot.be':
			case 'roompot.com':
				return _sl('.cookiebar:not([style*="none"]) .js-cookies-accept');

			case 'womex.com':
			case 'piranha.de':
				return _sl('.modal[style*="block"] #accept-cookies-all');

			case 'datenlogger-store.de':
			case 'kaminofen-shop.de':
			case 'nova-motors.de':
				return _sl('.amgdprcookie-modal-container._show .-save');

			case 'direct.de': return _chain('.amgdprcookie-bar-template .-settings', '.amgdprcookie-done');

			case 'sofatutor.ch':
			case 'sofatutor.at':
			case 'sofatutor.com':
				e = _sl('.reveal-overlay[style*="block"] .tracking-consent-popup .js-customize');
				if (e) e.click();
				return _sl('.reveal-overlay[style*="block"] .tracking-consent-customization-popup .js-accept-selected');

			case 'lumeo.chip.de':
			case 'dell-xps.chip.de':
			case 'puiklokaal.nl':
				return _sl('#cookie-wall .buttons-wrapper > div:last-child .im-button');

			case 'fiftysix.nl':
				e = _id('cookie_advertising--false');
				if (e) e.click();
				return _sl('.cookiePopup .bttn');

			case 'openjobmetis.it':
				e = _id('cookie_msg');
				if (e) e.className += " idcac";
				return e;

			case 'kinopolis.de':
			case 'mathaeser.de':
			case 'gloria-palast.de':
				return _sl('#consent[style*="block"] #accept-selected-button');

			case 'wittgas.com':
			case 'malighting.com':
			case 'stahlportal.com':
				return _sl('.cs-cookie__open .js-save-cookie-settings');

			case 'mazda-autohaus-schwenke-duisburg.de':
			case 'mazda-autohaus-schreier-biebergemuend-bieber.de':
			case 'mazda-autopark-rath-duesseldorf.de':
				return _sl('button[name="Akzeptieren"]');

			case 'famobi.com':
			case 'html5games.com':
				return _sl('.consent-box-holder:not([style*="none"]) .consent-box-button');

			case 'sourceforge.net':
			case 'sudoku-aktuell.de':
				return '#cmpbox[style*="block"] .cmpboxbtnsave';

			case 'webfail.com': return '#cmpbox[style*="block"] .cmpboxbtnno';

			case 'bafin.de':
			case 'onlinezugangsgesetz.de':
				return _sl('.mfp-ready #cookiebanner .js-close-banner');

			case 'alcar.at':
			case 'alcar.de':
				return _sl('.modal[style*="block"] .cookie-overlay-btn[aria-label*="accept"]');

			case 'elrongmbh.de':
			case 'esv-schwenger.de':
				return _id('cookie_opt_in_btn_basic');

			case 'vom-achterhof.de':
			case 'motorsportmarkt.de':
			case 'espadrij.com':
				return _sl('.cookie--popup[style*="block"] .cookie--agree-btn');

			case 'modellbau-metz.com':
			case 'huss-licht-ton.de':
			case 'd-power-modellbau.com':
				return _id('cookie_all_accept');

			case 'allelectronics.com':
			case 'dellrefurbished.com':
				return _sl('#simplemodal-container #cookie-consent-accept');

			case 'targeo.pl':
				e = _sl('body > div > div > span > a[href*="regulamin"]');
				return (e ? e.parentNode.nextSibling.firstChild : false);

			case 'centogene.com':
			case 'leica-microsystems.com':
				return _sl('.modal[style*="block"] #cookie-settings-btn-apply');

			case 'husqvarna-bicycles.com':
			case 'r-raymon-bikes.com':
				return _sl('universal-cookie-consent .ucc-button--primary');

			case 'strawpoll.me':
			case 'fandomauth.gamepedia.com':
				return _sl('body > div > [data-tracking-opt-in-overlay] [data-tracking-opt-in-accept]');

			case 'dlawas.info':
			case 'infostrow.pl':
			case 'halowawa.pl':
				return _sl('.modal[style*="block"] .btn-rodo-accept');

			case 'baer-schuhe.de':
			case 'baer-shoes.com':
				return _chain('.modal[style*="block"] #cookieConsentGroupHeader2 .switch-slider', '#cookieConsentGroupHeader3 .switch-slider', '#cookieConsentGroupHeader4 .switch-slider', '#cookieConsentAcceptButton');

			case 'swisse.nl':
				return _chain('.modal[style*="block"] #cookieConsentGroupHeader2 .switch-slider', '#cookieConsentGroupHeader3 .switch-slider', '#cookieConsentGroupHeader4 .switch-slider', '#cookieConsentGroupHeader5 .switch-slider', '#cookieConsentAcceptButton');

			case 'radonline.de':
				return _chain('.modal[style*="block"] #cookieConsentGroupHeader2 .switch-slider', '#cookieConsentGroupHeader3 .switch-slider', '#cookieConsentGroupHeader4 .switch-slider', '#cookieConsentGroupHeader5 .switch-slider', '#cookieConsentGroupHeader6 .switch-slider', '#cookieConsentAcceptButton');

			case 'keimling.de':
			case 'arctic.ac':
			case 'arctic.de':
			case 'skapetze.com':
			case 'migros-shop.de':
				return _sl('.modal[style*="block"] #cookieConsentAcceptButton');


			case 'meble-4you.pl':
			case 'roztoczanskipn.pl':
				return _sl('#rodo-modal[style*="block"] .btn-primary');

			case 'oneal.eu':
			case 'oneal-b2b.com':
				return _sl('#cookie_settings:not([style*="none"]) .button2');

			case 'binance.com':
				e = _sl('#__APP ~ div > div > a[href*="privacy"]');
				return (e ? e.parentNode.nextSibling : false);

			case 'volleybal.nl':
			case 'vitesse-waterontharder.com':
				return _sl('.show-cookie-overlay .js-save-all-cookies');

			case 'danskebank.dk':
			case 'danskebank.se':
			case 'danskebank.no':
			case 'danskebank.fi':
			case 'danskebank.co.uk':
			case 'danskeci.com':
			case 'danicapension.dk':
			case 'danica.no':
				return _sl('.cookie-consent-banner-modal:not([style*="none"]) #button-accept-necessary, .cookie-consent-banner-modal:not([style*="none"]) #button-accept-all');

			case 'webdamdb.com':
				e = _sl('.cookie-save-btn');
				if (e) { _id('cookie-cat-0').click(); _id('cookie-cat-1').click(); }
				return e;

			case 'quooker.de':
			case 'quooker.be':
				return _sl('#cookie_wrapper:not([style*="none"]) .cookie_close');

			case 'lepona.de':
			case 'foxxshirts.de':
			case 'textil-grosshandel.eu':
				return _sl('#gdpr[style*="block"] a[onclick*="gdprform"]');

			case 'hot.at':
			case 'ventocom.at':
				return _sl('.modal[style*="block"] .js-saveAllCookies');

			case 'fdp.de':
			case 'freiheit.org':
			case 'freie-demokraten.de':
			case 'fdp-rlp.de':
			case 'fdpbt.de':
				return _sl('#uv-gdpr-consent-necessary-form #edit-submit--2');

			case 'bing.com':
				e = _id('bnp_btn_preference');
				if (e) e.click();
				return _sl('#cookie_preference[style*="block"] .mcp_savesettings a');

			case 'urgibl.de':
			case 'bruns.de':
			case 'kunzbaumschulen.ch':
			case 'gartencenter-seebauer.de':
			case 'rammes-gruenland.com':
			case 'gartencenter-bergerhoff.de':
			case 'tomgarten.de':
			case 'mauk-gartenwelt.de':
			case 'pflanze2000.de':
			case 'floragard.de':
				return _sl('#CookieMessage[style*="block"] #SaveBtnnn');

			case 'clargesmayfair.com':
			case 'kingstoncentre.co.uk':
				return _sl('.gdpr-cookie-control-popup.fancybox-is-open .consent-required');

			case 'fichier-pdf.fr':
			case 'petit-fichier.fr':
			case 'pdf-archive.com':
				return _sl('#ModalCookies[style*="block"] .btn');

			case 'shirtlabor.de':
			case 'bit-electronix.eu':
			case 'berndes.com':
			case 'steingemachtes.de':
			case 'moebel-fundgrube.de':
			case 'wuerdinger.de':
			case 'fafit24.de':
				return _sl('.offcanvas.is-open .js-offcanvas-cookie-submit');

			case 'ep.de':
			case 'medimax.de':
				return _sl('.cookielayer-open .cookies-overlay-dialog__save-btn');

			case 'gva.be':
			case 'talktalk.co.uk':
				return _sl('.cookie-banner button');

			case 'jankarres.de':
			case 'devowl.io':
			case 'wp-ninjas.de':
			case 'der-windows-papst.de':
			case '4kfilme.de':
			case 'marketing-zauber.de':
			case 'tvfindr.com':
			case 'drweb.de':
			case 'cruisetricks.de':
			case 'maniac.de':
			case 'faminino.de':
			case 'resistance-mondiale.com':
			case 'mmo-sankar.de':
			case 'noobguides.de':
			case '56aktuell.de':
			case 'sbb-deutschland.de':
			case 'audiovision.de':
				e = _sl('body > div[style*="block"] div[id^="bnnr-body-rightSide"] > div:nth-of-type(3)');
				return (e ? e.previousSibling.firstChild : _sl('body > div[style*="block"] div[id^="bnnr-body-rightSide"] > div'));

			case 'karenmillen.com':
			case 'boohooman.com':
			case 'warehousefashion.com':
				return _sl('.cookie_hint_gdpr .visible .js-accept-all-button');

			case 'toni-maccaroni.de':
			case 'pizza-pepe-volkach.de':
				return _sl('.fancybox-opened .cookiemessage .button');

			case 'bundesanzeiger.de':
			case 'unternehmensregister.de':
				return _sl('#cc[style*="block"] #cc_banner > .cc_commands .btn');

			case 'leireg.de': return _sl('#cc[style*="block"] #cc_dialog_1 .btn-primary');
			case 'publikations-plattform.de': return _sl('#cc[style*="block"] #cc_banner > .cc_commands .button input');

			case 'gov.lv':
			case 'riga.lv':
				return _sl('#cookieConsent .cookie-accept');

			case 'fortune.com': return '#truste-consent-track[style*="block"] #truste-consent-required';

			case 'forbes.com':
			case 'formula1.com':
				return '#truste-consent-track[style*="block"] .trustarc-manage-btn';

			case 'sixt-neuwagen.de':
			case 'sixt-leasing.de':
				return _sl('.coo button:first-child, pl-button[data-e2e="cookie-agree-all"]');

			case 'badewanneneinstieg.at':
			case 'bgvbruck.at':
				return _sl('._brlbs-btn[data-borlabs-cookie-unblock]');

			case 'jk-sportvertrieb.de':
			case 'loebbeshop.de':
			case 'werkzeughandel-roeder.de':
			case 'trendmedic.de':
				return _sl('#cookie-manager-window[style*="block"] #accept-selected');

			case 'pasteleria-jr.es':
			case 'esquinarayuela.es':
			case 'electronieto.es':
			case 'asociacion-domitila.es':
			case 'tasaciones-rasal-perytec.com':
			case 'cafeszaidin.es':
				return _sl('.cookies-modal[style*="block"] .cookies-modal-config-button-save');

			case 'buchbinder.de':
			case 'draco.de':
				return _sl('.modal-open #cookieSettings .cookie-settings__submit');

			case 'hetwkz.nl':
			case 'umcutrecht.nl':
				return _sl('#cookieConsent .button[data-cookie*="yes"]');

			case 'campingwiesenbek.de':
			case 'festivo.de':
				return _sl('#cockieModal[style*="block"] .btn');

			case 'technomarket.bg': return _sl('tm-terms-settings button.mat-primary');
			case 'av-atlas.org': return _sl('gdpr-bottom-sheet .mat-primary');
			case 'akelius.com': return _sl('web-cookie-manager-dialog .mat-primary');


			case 'haix.de':
			case 'notebooksbilliger.de':
				return _id('uc-btn-accept-banner');

			case 'shop.mercedes-benz.com': return _id('uc-btn-deny-banner');
			case 'mercedes-benz.nl': return _sl('.missing-consent-placeholder .accept-consent');

			case 'eam.de':
			case 'eam-netz.de':
				return _sl('.om-cookie-panel.active .button_save');

			case 'jeugdbrandweer.nl':
			case 'solvo.nl':
				return _sl('.cookiewall .button');

			case 'boerse-stuttgart.de':
			case 'traderfox.com':
			case 'finanzen.net':
				return _id('tfcookie-accept-selected');

			case 'knative.dev':
			case 'porto.pt':
				return _sl('#cookieModal[style*="block"] .btn[onclick*="accept"]');

			case 'foodengineeringmag.com':
			case 'pcimag.com':
			case 'assemblymag.com':
			case 'securitymagazine.com':
				return _sl('.gdpr-policy ~ form[action*="gdpr-policy"] .button[value="Accept"]');

			case 'huber.de':
			case 'freudenberg.com':
				return _sl('.cookie-consent--present .cookie-consent:not(.cookie-consent--hidden) .jsCookieAccept');

			case 'xiaomiromania.com':
			case 'sabinastore.com':
				return _sl('.fancybox-opened .cp-accept');

			case 'dat.de':
			case 'daa.de':
				return _sl('#cookienotice_box.initialised #cookienotice_box_close');

			case 'vorteilshop.com':
			case 'personalshop.com':
				return _sl('.modal[style*="block"] .btn[onclick*="cookiebanner/speichern"]');

			case 'slagelse.info':
			case 'personalideal.de':
				return _sl('.hustle-show .hustle-optin-mask ~ .hustle-popup-content .hustle-button-close');

			case 'videoload.de':
			case 'magentatv.de':
				return _id('OVERLAY-CONFIRM');

			case 'traxmag.com':
			case 'generation-s.fr':
				return _sl('.popin-overlay--cookie.show .btn.accept');

			case 'altibox.no':
			case 'dvdoo.dk':
				return '#coiOverlay[style*="flex"] #coiPage-2 .coi-banner__accept';

			case 'babysam.dk':
			case 'minaftale.dk':
				return '#coiOverlay[style*="flex"] #declineButton';

			case 'modrykonik.sk':
				e = _sl('.redux-toastr + div a[href*="cookie-policy"]');
				return (e ? e.parentNode.nextSibling : false);

			case 'amway.it':
			case 'amway.es':
				return _sl('.amw-dialog-wrapper--visible button[class*="cookies-popup---saveAndClose"]');

			case 'eversports.de':
			case 'eversports.fr':
			case 'eversports.at':
			case 'exali.de':
				return _sl('.modal[style*="block"] #confirmSelection');

			case 'gp-tuning.at':
			case 'chiptuning-express-tirol.at':
				return _sl('#dsgvo-cookie-popup .accept');

			case 'dawonia.de':
				e = _sl('.cookie-overlay-open #necessaryCookies');
				if (e) e.click();
				return _sl('.cookie-overlay-open .btn-cookie');

			case 'e-wie-einfach.de':
			case 'e-wie-einfach.at':
				return _sl('.js_modal_cookie[style*="block"] .js_btn_set_specific');

			case 'quorn.co.uk':
			case 'quorn.ch':
			case 'quorn.se':
			case 'quorn.ie':
			case 'quorn.nl':
			case 'quorn.be':
			case 'quorn.dk':
			case 'quorn.no':
			case 'quorn.fi':
				return _sl('.cmp-btn[onclick*="save"]');

			case 'vsninfo.de':
			case 'stadtwerke-weilburg.de':
				return _sl('#cookiehinweis .deny');

			case 'akkushop.de':
			case 'akkushop-austria.at':
			case 'akkushop-schweiz.ch':
			case 'batterie-boutique.fr':
				return '.is--open .cookie-consent--save-button';

			case 'schulze-immobilien.de':
			case 'harry-gerlach.de':
				return _sl('#cookie-banner #level1');

			case 'provostvet.co.uk':
			case 'myfamilyvets.co.uk':
				return _sl('.consent-wrapper.show button[id*="accept"]');

			case 'sonofatailor.com':
				e = _sl('.ui-soat');
				return (e ? _ev("a[contains(., 'Accept and Continue')]", e) : false);

			case 'bricoman.fr':
			case 'bricomart.es':
				return _sl('.cookie-accept .q-btn[data-cy*="accept"]');

			case 'tme.eu':
			case 'tme.com':
				return _sl('.o-modal-wrapper--active .c-rodo-modal__footer-button');

			case 'ferchau.com':
			case 'able-group.de':
				return _sl('.modal .cookie__buttons button[type="submit"]');

			case 'masmovil.es':
			case 'masmovil.com':
				return _sl('.MuiDialog-root button[data-hook="cookies-modal-btn-accept-all"], .gmm-cookies.basic .gpb-accept-all');

			case 'lizak-partner.at':
			case 'z-immobilien.at':
				return _sl('.modal[style*="block"] .gdpr-accept-selected');

			case 'penny.hu':
			case 'penny.cz':
				return _sl('.modal[style*="block"] #cookie-consent-button');

			case 'pdfforge.org':
				e = _ev("span[contains(., 'Accept all')]");
				return (e ? e.parentNode : e);

			case 'mydealz.de':
			case 'dealabs.com':
			case 'hotukdeals.com':
			case 'preisjaeger.at':
			case 'chollometro.com':
			case 'pepper.com':
			case 'pepper.it':
			case 'pepper.pl':
				return '.popover--oreo-message.popover--visible button[data-t-a*="continueWithoutAccepting"]';

			case 'karriere-jet.de':
			case 'bewerbung-tipps.com':
				return _chain('.fancybox-is-open #cookie-permission--configure-button', '.fancybox-is-open #setcookiepermissions button');

			case 'compravo.de':
			case 'perpedale.de':
				return _sl('#newCookieJar:not([style*="none"]) .button_default');

			case 'kupbilecik.pl':
			case 'kupbilecik.de':
			case 'kupbilecik.com':
				return _chain('.remodal-is-opened #cookie-custom', '.remodal-is-opened #cookie-save');

			case 'uniroyal.pl':
			case 'uniroyal.de':
			case 'barum-reifen.de':
			case 'continental-reifen.de':
				return _chain('.is-cookiebanner-visible .ci-cookie-link', '.is-settings-view .js-cookie-accept');

			case 'c-dating.fr':
			case 'singles50.it':
			case 'be2.it':
				return _sl('.ipx_cookie_overlay:not([style*="none"]) button, #cookie-consent-overlayer-v2:not([style*="none"]) button');

			case 'rubberduckvba.com':
			case 'leaseweb.com':
				return _sl('.modal[style*="block"] #acceptCookies');

			case 'cashper.de':
			case 'money2gocard.de':
				return _sl('.cookie-modal[style*="block"] .btn-primary');

			case 'hagengrote.de':
			case 'hagengrote.at':
				return _sl('.modal[style*="block"] #cookieStart .btn-primary');

			case 'patreon.com':
				e = _sl('div[aria-live="polite"] a[href*="policy/cookies"]');
				return (e ? _parent(_parent(_parent(_parent(e)))).nextSibling.firstChild : e);

			case 'rtl.hr':
			case 'fernsehserien.de':
			case 'bbc.com':
				return '.fc-consent-root .fc-confirm-choices';

			case 'stooq.pl': return '.fc-consent-root .fc-cta-consent';

			case 'boomin.com':
			case 'royalmail.com':
				return _if('.MuiDialog-root a[href*="cookie"][href*="policy"]', '.MuiDialog-root button');

			case 'juhu.auto':
				e = _sl('#overlayOuter[style*="block"]');
				return (e ? _ev("button[contains(., 'Alle ablehnen')]", e) : false);

			case 'hoyavision.com':
			case 'kino.dk':
				return _id('CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

			case 'the-germanz.de':
			case 'iew.be':
			case 'quicktest.se':
				return _sl('.modal-cacsp-open .modal-cacsp-btn-save');

			case 'veiligverkeer.be':
			case 'vsv.be':
				return _sl('.cookieconsent-active .btn.accept-necessary');

			case 'gold.de':
			case 'goldpreis.de':
			case 'formel-sammlung.de':
			case 'silber.de':
			case 'materialeducativomk.com':
			case 'apksmods.com':
				return '.force--consent.show--consent #cs_save__btn, .force--consent.show--consent #s-sv-bn';

			case 'workwise.io':
				e = _sl('.ReactModal__Overlay--after-open');
				return (e && _ev("span[contains(., 'Alle akzeptieren')]", e) ? _chain('.ReactModal__Overlay--after-open button', '.ReactModal__Overlay--after-open button') : false);

			case 'rp-online.de':
			case 'volksfreund.de':
			case 'ga.de':
			case 'saarbruecker-zeitung.de':
				return _id('consentAccept');

			case 'moveyouroffice.io':
			case 'digital-affin.de':
			case 'chimpify.de':
				return _if('.chimpify-popup .content > a[href*="datenschutz"]', '.chimpify-popup .content > a[href^="jav"]');

			case 'heizoel24.de':
			case 'heizoel24.at':
				return _sl('.modal[style*="block"] button + a[href*="cookies"], #save-cc');

			case 'just-eat.co.uk':
			case 'just-eat.ie':
			case 'just-eat.es':
			case 'justeat.it':
				return _sl('.c-megaModal[data-cookie-consent-overlay] button[data-test-id*="accept-necessary-cookies"]');

			case 'yle.fi':
			case 'webscale.fi':
				return _chain('.ycd-consent-buttons__select-consents', '.ycd-consent-buttons__accept-selected');

			case 'backmarket.fr':
			case 'backmarket.de':
			case 'backmarket.it':
			case 'backmarket.es':
			case 'backmarket.be':
			case 'backmarket.at':
			case 'backmarket.co.uk':
			case 'thebackmarket.nl':
				return _if('div[aria-modal="true"] a[href*="/terms/cookies"]', 'div[aria-modal="true"] button:first-child');

			case 'backmarket.com': return _if('div[aria-modal="true"] a[href*="/terms/cookies"]', 'div[aria-modal="true"] button[data-qa*="accept"]');

			case 'rueducommerce.fr':
			case '3suisses.fr':
				return _chain('.modal.is-open #rgpd-btn-index-parameters', '#rgpd-frequentation-no', '#rgpd-marketing-no', '#rgpd-personnalization-no', '#rgpd-btn-parameters-choices');

			case 'senec.com':
			case 'taschenhirn.de':
				return _chain('.cookie-notice .cm-link', '.cm-btn-accept');

			case 'autopunkt.pl':
			case 'euromobil.com.pl':
			case 'euromotor.pl':
			case 'koreamotors.pl':
			case 'japanmotors.pl':
			case 'pgd.pl':
			case 'eforia.pl':
				return _chain('#modal-cookies[style*="block"] + #modal-cookies-settings input[name="cookie-analytics"]', 'input[name="cookie-remarketing"]', '.cookie-adv-save', '#modal-cookies[style*="block"] .cookie-save');

			case 'globaldata.pt':
			case 'noblechairs.de':
			case 'noblechairs.fr':
				return _sl('.ck-user-cookie-consent-modal #js-save-cookie-settings');

			case 'burton.co.uk':
			case 'dorothyperkins.com':
				return _sl('#consent-dialog.m-visible .b-notification_panel-step_second button');

			case 'nablawave.com':
			case 'mediaset.it':
				return _sl('.iubenda-cs-accept-btn');

			case 'mediakits.com':
			case 'investmentpunk.academy':
			case 'ptvtelecom.com':
			case 'vulkansauna.de':
				return _sl('.elementor-popup-modal:not([style*="none"]) .elementor-button[href*="settings"]');

			case 'tameteo.nl':
			case 'tameteo.com':
			case 'meteored.com.ec':
			case 'tempo.com':
			case 'tiempo.com':
				return _chain('#sendSetGdpr', '.consent-reject', '.save.enabled');

			case 'translit.ru':
			case 'translit.net':
				return _sl('.tPechenkiInfoblock input[onclick*="nocookies"]');

			case 'anacondastores.com':
			case 'spotlightstores.com':
				return '.modal[style*="block"] .cookie-notify-closeBtn';

			case 'adtipp.de':
			case 'handelsregister.de':
				return _sl('#cookie-popup button[onclick*="cookieOk"]');

			case 'mega.io':
			case 'mega.nz':
				return _sl('.cookie-dialog:not(.hidden) .save-settings');

			case 'benify.se':
			case 'benify.com':
				return _chain('.modal[style*="block"] a[onclick*="showAdvancedCookieSettings"]', '.modal[style*="block"] .btn[onclick*="saveCookieConsentSettings"]');

			case 'huk24.de':
			case 'huk.de':
				return _chain('.cookie-consent__button:first-child', '.cookie-consent__button[type="submit"]');

			case 'burgerme.de':
			case 'freddy-fresh.de':
				return _sl('.cookies-information-modal[style*="block"] ~ .modal .btn[data-rel="cookies-accept-choise"]');

			case 'group.rwe':
			case 'rwe.com':
				return _sl('.cb--active .cb__button--select-lvl');

			case 'moebel.de':
				e = _ev("button[contains(., 'Einstellungen')]");
				if (e) e.click();
				return (e ? _ev("button[contains(., 'speichern')]") : false);

			case 'barzahlen.de':
				return '.cookie-notice-visible #cn-refuse-cookie';

			case 'check24.de': return '.c24-cc-visible a[onclick*="giveMarketingConsent"], .c24m-cc-visible a[onclick*="getConfiguredConsent"], .c24m-cc-visible a[onclick*="giveMarketingConsent"]';
			case 'reifen.check24.de': return _chain('.c24-cookie-config', '.c24-cookie-config');

			case 'vetzoo.se':
			case 'animail.se':
			case 'mustijamirri.fi':
			case 'musti.no':
				return _chain('#cookie_consent[style*="block"] #cookie_settings', '#submit_privacy_consent');

			case 'de.vanguard':
				e = _ev('button[contains(text(), "Cookies zulassen")]/following::button');
				if (e) e.click();
				return _sl('div[data-cy="CookieConsentDialog"] button[data-cy*="Accept"] ~ button');

			case 'deutsches-sportabzeichen.de':
			case 'oekolandbau.de':
				return _chain('.modal.show button[aria-controls="cookieman-settings"]', '[data-cookieman-save]');

			case 'kvno.de':
			case 'xetra-gold.com':
				return '.csm.-open[data-module="cookie-manager-dialog"] button[data-cookie-settings-manager="selectSelected"]';

			case 'aok.de': return _sl('.js-cookie-consent-popup-visible .js-cookie-consent-button-accept-selection');
			case 'meine.aok.de': return _chain('.modal.d-block .cookie-popup-page .btn-select', '.cookie-button-group .btn-primary');

			case 'onleihe.de':
			case 'onleihe.com':
				return '.cookiePopup[style*="block"] .privacyAcceptChoice';

			case 'dvag.de':
			case 'allfinanz.ag':
				return _chain('.dva-state-active .dva-m-cookie-overlay__btn--more-info', '.dva-state-active .dva-m-cookie-settings-overlay__btn--save');

			case 'arbeitsagentur.de':
				e = _sl('bahf-cookie-disclaimer, bahf-cookie-disclaimer-dpl3');
				e = e && e.shadowRoot ? e.shadowRoot : e;
				return (e ? _sl('.modal.in .ba-btn-contrast, .modal-open .ba-btn-contrast', e) : _sl('#cookieDialog[style*="block"] .ba-btn-contrast'));

			case 'clark.de':
				e = _sl('cms-webpage');

				if (e && e.shadowRoot) {
					e = _sl('cookie-banner', e.shadowRoot);

					if (e && e.shadowRoot) {
						e = _sl('site-button', e.shadowRoot);
						e.dispatchEvent(new Event("buttonClick", { bubbles: true }));
					}
				}

				return e && e.nodeName == 'SITE-BUTTON' ? e : _sl('button[class*="cookie-banner-opt-in"]');

			case 'rugbyworldcup.com':
			case 'world.rugby':
				return _ev('div[contains(@class, "tcf-cmp")][string-length(@class) > 40]//button[contains(@class, "reject")]');

			case 'premierleague.com': return _ev('div[contains(@class, "tcf-cmp")][string-length(@class) > 40]//button[contains(@class, "save-and-close")]');

			case 'sparda.de':
			case 'sparda-n.de':
			case 'sparda-bw.de':
			case 'sparda-hessen.de':
				return '#cookieLayer:not([style*="none"]) #tmart-cookie-layer-choice';

			case 'wifi-ooe.at':
			case 'wifiwien.at':
			case 'wifi.at':
				return _chain('.modal[style*="block"] .js-cookie-overlay-trigger', '.modal[style*="block"] .js-cookie-finish:not([class*="dismiss"])');

			case 'video.corriere.it':
				e = _id('_cpmt-iframe');
				if (e) e.setAttribute('onclick', 'cpmt.accept();');
				return e;

			case 'seb.ee':
			case 'seb.lt':
				return '.seb-cookie-consent:not(.hidden) .accept-selected';

			case 'lalettrea.fr':
			case 'africaintelligence.fr':
				return '#modalCookieConsent[style*="block"] .btn-continue';

			case 'molcesko.cz':
			case 'slovnaft.sk':
				return _chain('.popup2-opened #gdpr1', '#gdprbtn');

			case 'bbva.it':
			case 'bbva.pt':
			case 'bbva.es':
				return '.cookiesgdpr:not(.cookiesgdpr--hidden) .cookiesgdpr__chooseallbtn--reject';

			case 'fello.se':
			case 'telia.se':
				return _chain('#cookie-preferences-make-choice-button', '#cookie-preferences__confirm-button');

			case 'vw-shop-zubehoer.de':
			case 'audi-ingolstadt-shop.de':
				return '#sf_cookie_button_select';

			case 'futurzwei.org':
				e = _sl('#cookie-consent:not([closed])', _sl('f2-app').shadowRoot);
				return (e && e.shadowRoot ? _sl('#disable', e.shadowRoot) : false);

			case 'portainer.io':
			case 'gitbook.io':
				return _if('#animatedComponent', '//div[@id="animatedComponent"]//span[text()="Reject all"]');

			case 'vergoelst.de':
			case 'dekkmann.no':
				return _chain('.ReactModalPortal div[class*="cookieConsent"] button:not([class*="accept"])', 'div[class*="cookieSettings"] button[class*="ghost"]');

			case 'autoglass.co.uk': return '#dialog[aria-hidden="false"] #button_confirm_advanced';
			case 'max-academy.de': return _if('.MuiDialog-root a[href*="privacy"]', '.MuiDialog-root button + button');
			case 'centauro.com.br': return _ev('div[./span[text()="Nós respeitamos sua privacidade"]]/following-sibling::button');
			case 'smallpdf.com': return _chain('//div[@id="app"]/div/div/div[./div[contains(text(), "cookies")]]/following-sibling::div/button[2]', '//div[@id="app"]/div/div/div[./div[contains(text(), "cookies")]]/following-sibling::div/button[1]');
			case 'revolut.com': return _chain('div[class*="Modal__OverlayBox"] [class*="CookiesBanner"] button[type="link"]', 'div[class*="Modal__OverlayBox"] div[class*="CookiesPreferences"] input:checked', 'div[class*="Modal__OverlayBox"] div[class*="CookiesPreferences"] a + button');
			case 'metapop.com': return '.modal-cookie-consent ui-button[ng-click*="accept"]';
			case 'telia.lt': return _chain('.modal[style*="block"] .js-cookie-modal-settings', '.js-cookie-modal-confirm');
			case 'burton.com': return '.gdpr-lightbox.opened .js-accept';
			case 'adrecord.com': return _chain('#cookie-disable a[data-target*="Modal"]', '.modal[style*="block"] #allCookies', '.modal[style*="block"] .btn-secondary');
			case 'bbvaapimarket.com': return '#cookieModal:not(.hidden) #saveConfigCookies';
			case 'dominospizza.pl': return '.cookies-visible .m-Cookies .closePopup';
			case 'visitmalta.com': return _if('.jet-popup--show-state a[href*="cookie-policy"]', '.jet-popup--show-state .jet-popup-action-button a');
			case 'xn--bafa-frderung-nmb.de': return '.modal[style*="block"] .MehrEinstellungenCC[onclick*="nein"]';
			case 'draeger.com': return _chain('.cookie-consent .settings', '.cookie-consent .button.secondary');
			case '2ip.io': return _chain('.consent__notice .notice__container__settings', '#app-item-googleAnalytics', '.cm-btn-accept');
			case 'mydpd.at': return _chain('#cookieModal[style*="block"] #cookies_settings', '#cookies_settings');
			case 'smule.com': return _chain('//button[text()="Manage Cookies"]', '//button[text()="Confirm My Choices"]');
			case 'gibgas.de': return '.modal[style*="block"] button[onclick="Cookies.save()"]';
			case 'host-unlimited.de': return _chain('div[class*="MuiPaper-root"] a[href*="/privacy"] + button', 'div[class*="MuiPaper-root"] li:last-child label', 'div[class*="MuiPaper-root"] a[href*="/privacy"] + button');
			case 'moncompteformation.gouv.fr': return _if('.cdk-overlay-container', '//button[./span[contains(text(), "Tout refuser et fermer")]]');
			case 'tommy.com': return _chain('.ReactModal__Overlay--after-open .cookie-notice button[data-testid="show-more-button"]', '.ReactModal__Overlay--after-open .cookie-notice .cookie-notice__more-button');
			case 'treasure.cloud': return '.cdk-overlay-container #manage-cookie-action + button';
			case 'wirtualnemedia.pl': return '#cookiebar:not([style*="none"]) #cookie_agree';
			case 'xing.com': return _chain('#consent-settings-button', '#checkbox-accept-button');
			case 'metro.pe': return _if('.swal2-shown', '//button[text()="Configuración de Cookies"]', '//button[text()="Solo las funcionales"]');
			case 'mobrog.com': return '#overlay[style*="block"] #cookiesubmit';
			case 'amazon.com': return '#stencil-modal-body[data-test-id*="consent"] button';
			case 'grile-rezidentiat.ro': return _chain('.cookie-popup-modal[style*="block"] .btn[ng-click*="show_config"]', '.cookie-popup-modal[style*="block"] .btn[ng-click*="cookie_save()"]');
			case 'smashurandompicker.web.app': return _if('.swal2-show', '//div[contains(@class, "swal2-show")][//div[contains(text(), "cookies")]]//button[contains(@class, "cancel")]');
			case 'caimmo.com': return '#supi__overlay:not(.hide) #supi__dismiss';
			case 'weddyplace.com': return '.core-modal.open .cookie-accept-close';
			case 'uktv.co.uk': return '.cookie-notice #cookie-accept-link, .cookie-consent #cookie-agree';
			case 'yopmail.com': return '#cons-pop:not([style*="none"]) #necesary';
			case 'mitid.dk': return '#button-accept-cookie-policy';
			case 'edukatico.org': return '.cookie:not(.cookie-hidden) .js-cookie-save';
			case 'stromnetz.berlin': return '.show-cookie-disclaimer .js-acceptcookie .js-acceptselection';
			case 'emmi-kaltbach.com': return '.state-o-overlay--open .js-m-gpr-settings__custom-button';
			case 'foussier.fr': return _chain('.ReactModal__Content--after-open div[data-modal="cookie-consent"] .modal-footer a', '.ReactModal__Content--after-open div[data-modal="cookie-configure"] .modal-footer .btn-outlined');
			case 'radiomuseum.org': return '#cm[aria-hidden="false"] ~ #s-cnt #s-rall-bn';
			case 'salto.fr': return 'body > div[tabindex] button + a + button';
			case 'aviva.fr': return '.ccb-popin:not([style*="none"]) .ccb-popin-button:not([id])';
			case 'polarstern-energie.de': return '#cookie-consent-submit-button';
			case 'regionalimmobilien24.de': return 'div[class*="ftbox_cmd_1"] button';
			case 'santediscount.com': return _chain('.modalOmniphar-open .cmpt_customer--cookie--customize', '.cmpt-btn.as-secondary.as-sm');
			case 'leeway.tech': return '.cookie-warning .btn-primary';
			case 'get-in-engineering.de': return '.cookie-consent-modal[style*="block"] .btn-save';
			case 'depop.com': return _chain('button[data-testid*="manageCookies"]', 'button[data-testid="cookieModal__acceptButton"]');
			case 'routex.com': return '.modal-cookies.is-active .btn-optin';
			case 'storececotec.com': return _ev('button[./span[text()="Aceptar cookies"]]');
			case 'ozeaneum.de': return '.data-consent[open] button[value="accept"]';
			case 'sunderland.gov.uk': return '#cookie-consent-prompt.dialog--active .btn--cancel';
			case 'cualesmiip.com': return '.dc-cmp-ui-showing #dc-cmp-cancel';
			case '2ip.ru': return _chain('.notice__container__settings', '#app-item-googleAnalytics', '.cm-btn-accept');
			case 'handyhuellen.de': return _chain('#consent a[href*="preferences"]', '#consent a[href*="save"]');
			case 'sex.com': return '.sx-consent-to-cookies button';
			case 'linztourismus.at': return '#f__privacy-cookie-manager a[class*="accept-selection"]';
			case 'wasakredit.se': return '#integrity-modal[style*="block"] .btn[onclick*="acceptCustomized"]';
			case 'notaire.be': return '.c-bar--cookie[style*="block"] .js-cookie-button';
			case 'frp.no': return '.gdpr.active .gdpr__click--grey';
			case 'iol.im': return '.modal[style*="block"] #btnAcceptCookieLaw';
			case 'extract.pics': return _if('.fixed a[href*="privacy"]', '//button[./span[text()="Accept selected"]]');
			case 'modepark.de': return _if('.vex', '.vex .modal-dialog[data-init*="cookienotenotification"] .kmt-btn[href="#open"]', '.vex .modal-dialog[data-init*="cookienoteform"] .kmt-btn[href="#save"]');
			case 'ft.com': return '.mba-position-bottom-left[class*="show"] a[href*="cookies"] ~ div .mba-button-success';
			case 'quantifycrypto.com': return _if('.v-dialog--active', '//div[contains(@class, "v-dialog--active")][//a[contains(text(), "Cookies")]]//button');
			case 'kevag-telekom.de': return '#fullScreenLockBlockOverlayKp .notConfirmKp';
			case 'canva.com': return _if('body > div:not([id]) a[href*="cookie"]', '//button[//span[contains(text(), "cookie")]]/following-sibling::button', '//div[@role="dialog"]//h3/following-sibling::button[last()] | //div[@role="dialog"]//h3/following-sibling::node()[last()]/button');
			case 'avcesar.com': return '.rgpdWarning[style*="block"] .rgpdAccept';
			case 'shopee.pl': return _ev('div[./h4[contains(text(), "cookie")]]//button');
			case 'anadibank.com': return _chain('#eu_cookie_comp_popup[style*="block"] .find-more-button', '.save-preferences-cookies');
			case 'sbk.org': return _chain('.cookie-layer--main.is-open #mmsCookieLayerSettingsButton', '.cookie-layer--settings.is-open #saveCookieSettings');
			case 'codeeurope.pl': return _chain('button[class*="noticeAccept"] + button[class*="noticeConfigure"]', 'button[class*="saveSettings"]');
			case 'i-motion.de': return '#cookieEinstellungen[style*="block"] span[name="selection"]';
			case 'dbschenker.com': return '.dialog--open button[data-reject-all-privacy-settings], es-privacy-modal button.secondary';
			case 'mirells.se': return _if('.v-dialog--active', '//div[contains(@class, "v-dialog--active")][//div[contains(text(), "tredjepartcookies")]]//button');
			case 'findamasters.com': return '#cookieModal[style*="block"] .btn';
			case 'lci.fr': return '#popin_tc_privacy_button_2';
			case 'skd.museum': return '.skd_cookie__dialog--open button[data-cookie-settings-manager="selectSelected"]';
			case 'buildup.group': return _ev('ngb-modal-window[contains(@class, "show")][//a[contains(@href, "privacypolicy")]]//div[@class="modal-body"]//button');
			case 'volleyball.nrw': return '.cookie-consent-wrap.fancybox-opened .btn[data-action*="save"]';
			case 'eperearstikeskus.ee': return '#page_privacy_footer.ui-page-active #page_privacy_footer_accept';
			case 'oscaro.com': return '.popin-cookie button[data-qa="cookie-block-refuse-btn"]';
			case 'domstol.se': return _ev('button[./span[text()="Acceptera nödvändiga cookies"]]');
			case 'versicherungsjournal.de': return '.btn[name="euCookieAccept"]';
			case 'lcp.fr': return _chain('.cookiesjsr-settings', '.cookiesjsr-service.group-video input', '.cookiesjsr-layer--actions .cookiesjsr-btn:nth-child(2)');
			case 'shop4nl.com': return '#xbcc_modal.uk-open ~ #xbcc_modal_customise .cookie-consent-submit';
			case 'phase-6.de': return '#acceptAllCookies';
			case 'ima.it': return _chain('#cookieBanner[style*="block"] .showPrefs', '.acceptCookie');
			case 'statik.be': return '#cookiebanner[style*="block"] ~ div .js-modal-close';
			case 'pcorcloud.com': return '#rcc-decline-button';
			case 'communityfibre.co.uk': return '#rcc-confirm-button';
			case 'finanzchef24.de': return _if('aside[role="dialog"] img[alt*="cookies"]', 'aside[role="dialog"] a[href="#"]', 'aside[role="dialog"] div + button');
			case 'veikkaus.fi': return '.cookies-modal-overlay .necessary-cookies';
			case 'myunidays.com': return _chain('.js-cookie-banner-active .button.tertiary', '#Page_CookieSettings .js-save-preferences');
			case 'lush.com': return _chain('#portal-cookie-banner button:first-child', '#portal-cookie-banner ~ div[id^="portal"] footer button');
			case 'hl.co.uk': return _chain('.-cb-open #AOCookieToggle', '#TPCookieToggle', '#updateCookieButton');
			case 'liveagent.com': return '.Kolaciky.show .Kolaciky__button--yes';
			case 'polsatboxgo.pl': return _ev('span[text()="Nie, przejdź do serwisu"]/parent::node()');
			case 'ankerkraut.de': return '.cookies-banner[style*="flex"] button[onclick*="Decline"]';
			case 'porterbuddy.com': return _ev('div[contains(text(), "Vi benytter informasjonskapsler")]/following::node()/button[last()]');
			case 'qa-stack.pl': return '.modal[style*="block"] #cookies-accept';
			case 'prisma.de': return _ev('button[text()="Akzeptieren und weiter"]');
			case 'canto.com': return '.cc-notice .btn-light + .btn-light';
			case 'wu.ac.at': return '.cookie-notice-modal.in .save-cookie-settings';
			case 'animaute.fr': return _if('#cookie-modal1[style*="block"]', '#cookie-stats-refuse', '#cookie-ads-refuse', '#cookie-mesure-refuse', '#cookie-device-refuse', '#cookie-modal1');
			case 'simstime.net': return '#popup #accept_cookies';
			case 'frag.jetzt': return 'app-cookies .primary-confirm-button';
			case 'unitedutilities.com': return '.c-cookie-preferences.is-active .js-manage-panel .c-button-primary';
			case 'answear.ua': return _chain('span[class*="cookiesInfoBtnWrapperButton"]', 'span[class*="CookiesSettings__closePopUp"]');
			case 'robinhood.com': return _if('#__next > div a[href*="privacy"]', '#__next > div button');
			case 'chipsaway.co.uk': return '.cookie-modal-shown #disallowAllCookies';
			case 'tavex.dk': return _if('.modaal-wrapper[data-source*="cookie-initial"]', '.js-cookie-save-preferences');
			case 'scapino.nl': return '#cookies-component.is-active .button';
			case 'unicajabanco.es': return '.iframe-page .aceptarCookiesPrivada';
			case 'polsatgo.pl': return _ev('span[contains(text(), "Nie, przejdź do serwisu")]/parent::node()');
			case 'autohero.com': return _chain('button[data-qa-selector="cookie-consent-configure"]', 'button[data-qa-selector="cookie-consent-configure"]');
			case 'asfinag.at': return '#cookieOverlayModal.is-open .btn[data-no-cookies], #modalCookieInfo[style*="block"] button + button';
			case 'hondoscenter.com': return '#cookies-modal-id[style*="block"] .js-accept';
			case 'stec.es': return '#cookieModal[style*="block"] ~ div .aceptar_cookies_personalizadas';
			case 'dagvandewetenschap.be': return _chain('#cookiebanner:not(.hidden) .js-cookie-settings', '#cookieModal form ~ div .btn');
			case 'nerdstar.tv': return '.cookies #cookieok';
			case 'dwd.de': return '#cookiebanner .close';
			case 'premierinn.com': return '#manageCookieModal[style*="block"] #save-settings-button';
			case 'turn-on.de': return '#default-cookie-consent-banner[style*="block"] #cf-ccm-save-btn';
			case 'romeo.com': return _chain('.ReactModal__Content--after-open button[title="Cookie Settings"]', 'button[title="Save Settings"]');
			case 'mammut.com': return 'aside[class*="CookiePopup"][class*="visible"] div > button';
			case 'starlingbank.com': return _chain('button[data-testid="manageButton"][class*="CookieModal"]', 'button[class*="CookieModal"]:only-of-type');
			case 'direct-assurance.fr': return '._cc_bannerActive ._cc_banner_buttons ._cc_close:first-child';
			case 'diesiedleronline.de': return '#consentNotification .dark + button';
			case 'continental.com': return '.c-cookiebanner__visible .c-cookiebanner__settings-actions-submit';
			case 'mol.hu': return _chain('#modalCookie.is-visible .btn + .btn', '#modalCookie button:only-of-type');
			case 'benq.eu': return '.benq_cookiebar_modal._show .close-button';
			case 'apothekerkammer.at': return '.modal[style*="block"] .btn[data-gdcc-select="-"]';
			case 'poettinger.at': return '.mfp-ready a[onclick*="RejectCookie"]';
			case 'aion.eu': return '.cookies-notification.active #recommended-cookies';
			case 'onatera.com': return '#rgpd:not([class*="hidden"]) form .rgpd-button--green';
			case 'fulhamfc.com': return _if('.popup a[href*="cookie-policy"]', '.popup__button--decline');
			case 'biblioteka.wroc.pl': return '.cookies-gutter #cn-accept-cookie';
			case 'g-star.com': return '.blur-cookiewall-bg .js-cookieAccept';
			case 'mym.fans': return '.cookie.is-open #cookie-accept';
			case 'manutd.com': return '.cookie-policy-message[style*="block"] ~ .cookie-setting-message #cancel-btn';
			case 'softzone.es': return '.cl-consent-visible ~ div a[data-role="b_save"]';
			case 'vcu.edu': return '#notification-done-link';
			case 'schloss-gluecksburg.de': return '.consent-popup--dismiss';
			case 'paysend.com': return '.js__cookie_close_button';
			case 'armedangels.com': return _chain('.modal[style*="block"] .cookie-permission-configure-btn', '.js-offcanvas-cookie-submit');
			case 'idoctors.it': return '#modal-cookies[style*="block"] + .modal .btn[href*="conferma"]';
			case 'deadbydaylight.com': return '.full-privacy-popup[style*="block"] #refuse-full-gdpr-button';
			case 'ajax.nl': return _chain('#a_gebruikerservaring_refuse', '#b_e-mail_refuse', '#c_advertising_refuse', '#dySubmitConsent');
			case 'rackstore.be': return '.cdk-overlay-container app-dialog-cookie button';
			case 'festo.com': return _chain('div[class*="cookie-flyout-modal"] button[class*="open"]', 'div[class*="settings-open"] button[class*="save"]');
			case 'cilgro.nl': return '.framework-lock .framework-cookies-bottom [onclick="framework_cookie.save()"]';
			case 'voordeeluitjes.nl': return '.new-ck-disclaimer a[ng-click*="reject"]';
			case 'bernau-bei-berlin.de': return '.vcModalSwitch:checked + .vcModalTarget .vcModal #vcPrivacySetupSubmit';
			case 'retroplace.com': return '.modal[style*="block"] #cookies-selected';
			case 'hek.de': return '#colorbox[style*="block"] .js_cm_consent_submit + .js_cm_consent_submit';
			case 'elevensports.pl': return '.rodo-button--cancel';
			case 'incibeauty.com': return '.modal[style*="block"] #consent-save';
			case 'futterhaus.de': return '.cookiebox.active .js-cookiebox-just-close-button';
			case 'inselradio.com': return '.modal[style*="block"] .cookie-consent-none';
			case 'bund.de': return '.mfp-wrap.mfp-ready #cookiebanner .button-row > :not(.consentToAll)';
			case 'ratbacher.de': return '.modal[style*="block"] [data-cookieman-custom-settings]';
			case 'jku.at': return _sl('#cookieman-modal > div[style*="block"] .cookie_save');
			case 'pepeenergy.com': return '.gmm-cookies.basic .gpb-accept-all';
			case 'erkul.games': return '.cdk-overlay-container app-policy .mat-accent:not(.mat-button-disabled)';
			case 'ovh.com': return '.modal[style*="block"] .cookie-policy-modal oui-button[data-ng-click*="deny"]';
			case 'fruugo.fr': return '.consent-modal .modal[style*="block"] .js-consent-btn-decline';
			case 'gettr.com': return _ev("button[contains(., 'Accept Cookies')]");
			case 'drawabox.com': return '.notification[style*="block"] .agree-c';
			case 'kontrast.dk': return _ev("button[contains(., 'Kun nødvendige')]");
			case 'ebike-connect.com': return '#cookieConsent-button';
			case 'ringana.com': return '.ccn-preferences-footer__button.ccn-button--tertiary';
			case 'pu.nl': return _if('div[class*="dialog_box"] a[href*="privacy"]', 'div[class*="dialog_box"] button');
			case 'valdemarne.fr': return _chain('.modal[style*="block"] #consent_fs-1', '#consent_rs-1', '#consent_ga-2', '.btn.consentcookies:not(.disabled)');
			case 'waggel.co.uk': return '.button[data-test="closeCookieBanner"]';
			case 'ford-weege-bad-salzuflen.de': return _chain('#gdpr-bar[style*="block"] .btn-customize', '#gdpr-performance', '#gdpr-functional', '.gdpr-save');
			case 'lass-tanzen.de': return '.reveal-modal[style*="block"] .btnRestOk-js';
			case 'awwwards.com': return '#lightbox-cookies.open .js-save-cookies';
			case 'deutsche-diabetes-gesellschaft.de': return '.cn-banner__opt-out__accept';
			case 'stern.de': return _sl('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection, .message-component[title*="Zustimmen"]');
			case 'barcelonaled.fr': return '#cookieConsentModal[style*="block"] .btn';
			case 'ivaucher.pt': return '#cookieConsentModal[style*="block"] .btn';
			case 'telenor.se': return '.cookie-consent-modal .cookie-consent-modal__footer button';
			case 'touslesprix.com': return '.tlp-modal[style*="block"] #consent-accept';
			case 'karriere.at': return '.k-blockingCookieModal__button';
			case 'jobs.at': return '.c-cookie-modal__button';
			case 'jobs.ch': return _chain('.ModalPortal--open button[data-cy="cookie-consent-settings"]', '.XpModalPortal:not(:nth-child(2)) div[data-cy="cookie-consent-options-modal"] button[data-cy="cookie-consent-accept-selected"]');
			case 'kvk.nl': return '.ReactModal__Overlay--after-open #cookie-consent button[name="Opslaan"]';
			case 'pocketbook.de': return _sl('.message.show .notice-consents-block-allow-necessary');
			case 'teikeicoffee.org': return _sl('#ar-cookie-modal[style*="block"] .btn[onclick*="confirm_selection"]');
			case 'boschbad.nl': return _chain('.colorboxCookies #ChkOptCookies', '.cookieAgree');
			case 'schwalbe.com': return _sl('#mndCookieModal[style*="block"] ~ #mndSettingsModal .mnd-btn-save-settings');
			case 'tweakers.net': return _sl('#cookieAcceptForm button');
			case 'cykelgear.dk': return _sl('#cookieDisclaimer:not(.ninja) #cgDenyOrAccept');
			case 'stihl.de': return _chain('cookie-layer-component .btn_standard', '.cookie-settings__btn--confirm');
			case 'stihl.com': return _sl('.modal[style*="block"] app-cookie-modal .button-grey');
			case 'dailymotion.com': return _sl('button[class*="TCF2ContinueWithoutAccepting"]');
			case 'euplf.eu': return _chain('#cookieConsentSettingsBtn', '#cookieConsentSettingsSaveBtn');
			case 'pensjonistforbundet.no': return _chain('div[class*="cookieConsent"] button + button', 'div[class*="cookieConsent"] form button');
			case 'login.nos.pt': return _sl('#cookiebanner[style*="block"] .btn[onclick*="acceptLevelPreferences"]');
			case 'thsrc.com.tw': return _sl('#dialogCookieInfo:not([style*="none"]) #btn-confirm');
			case 'events.google.com': return _ev("button[contains(., 'Ok, got it')]");
			case 'miltenyibiotec.com': return _sl('.modal[style*="block"] .cookie--actions .acceptSelection');
			case 'tuttitalia.it': return _id('cookieChoiceDismiss');
			case 'oead.at': return _sl('#cookie-notice[style*="block"] a[data-dismiss]:not([data-allowall])');
			case 'designmynight.com': return _sl('dmn-cookies .btn[ng-click*="deny"]');
			case 'vermieterverein.de': return _sl('.dialog-area:not([style*="none"]) .btn-info[onclick*="cookie_loader"]');
			case 'leboncoin.info': return _sl('.modal.active .cookie-consent .negative');
			case 'terveyskirjasto.fi': return _chain('#general-cookies-modal[style*="block"] .btn-secondary', '#edit-cookies-modal[style*="block"] .btn-tk-blue');
			case 'calendly.com': return _if('#gdpr-region ~ div[aria-modal] a[href*="privacy"]', '#gdpr-region ~ div[aria-modal] button');
			case 'pnrtscr.com': return _sl('#overlay #accept-button');
			case 'oekt.de': return _sl('#modalPrivacy[style*="block"] .btn[data-yes]');
			case 'homecine-compare.com': return _sl('.modal[style*="block"] #cmp-noconsent');
			case 'techbone.de': return _sl('#cookie_banner[style*="block"] .btn-light');
			case 'fok.nl': return _sl('.cookieRequired .cookieButton');
			case 'daad.de': return _sl('.qa-cookie-consent-accept-required');
			case 'mifcom.de': return _chain('#js-cookienotice #detailExpand', '#cookieSaveChoice');
			case 'salomon.com': return _sl('.-active .cookie-decline-all');
			case 'allekringloopwinkels.nl': return _sl('.cbar[style*="block"] button');
			case 'maiia.com': return _chain('.MuiDialog-root [data-cy*="cookies-manage"]', '.MuiDialog-root [data-cy*="cookie-manage-validation"]');
			case 'mit-dem-rad-zur-arbeit.de': return _sl('.modal[style*="block"] #btn_auswahl_uebernehmen');
			case 'taxfix.de': return _sl('.cookie-consent-banner button[id*="accept"]');
			case 'twitch.tv': return _if('.ReactModal__Overlay--after-open a[href*="cookie-policy"]', '.ReactModal__Overlay--after-open button');
			case 'corona-impfung.nrw': return _sl('.modal.show app-confirm-cookies-dialog button');
			case 'pr0gramm.com': return '#overlay[style*="block"] #save-consent';
			case 'debenhams.com': return _sl('button[data-test-id="cookie-accept-all"]');
			case 'ikarus.de': return _sl('#amgdpr-cookie-block:not([style*="none"]) .amgdpr-button--secondary');
			case 'bv-activebanking.de': return _sl('#root-modal [aria-label="Meldung"] button');
			case 'withings.com': return _sl('.cookie_consent_withings:not(.hidden) #cookieBtnSelected');
			case 'nike.com': return _sl('.is-active #hf_cookie_label_done');
			case 'gamersgate.com': return _id('accept_gdpr_button');
			case 'studyspace.eu': return _sl('#CookiePolicyBanner button');
			case 'stepstone.se': return _sl('#ufti_modal[style*="block"] .btn-primary');
			case 'mimibabytielt.be': return _sl('#cookieModal[style*="block"] #ok-close-button');
			case 'claras-apotheke.de': return _sl('.wacg-modal__container:not(.hidden) .cc-config-save');
			case 'xeev.net': return _sl('#privacyModalCenter[style*="block"] .btn-success');
			case 'elavon.pl': return _sl('.cookiePopupOpen .acceptCookieButton');
			case 'backmomente.de': return _chain('.ReactModal__Overlay--after-open img[src*="custom-options"] ~ button', '.ConsentOverlay--option-reject-all');
			case 'werkenbijlidl.nl': return _sl('body[style*="hidden"] #CybotCookiebotDialog.opened .cookie-alert-extended-button-secondary');
			case 'jumingo.com': return _id('acceptCookiesBtn');
			case 'sportsbikeshop.co.uk': return _sl('#cookie_policy[style*="block"] #save');
			case 'clem.mobi': return _sl('.cdk-overlay-container app-cookie button');
			case 'kaufland.de': return _sl('#consentOverlay #consentSubmit');
			case 'auszug.at': return _sl('#cookieConsent[style*="block"] button + button');
			case 'pngimg.com': return _sl('.modal[style*="block"] .decline_cookie');
			case '3gimmobilier.com': return _sl('.modal[style*="block"] .buttonCookies[onclick*="refusAll"]');
			case 'allocine.fr': return _sl('.jad_cmp_paywall_button-cookies');
			case 'markilux.com': return _chain('.MuiDialog-root #COOKIES ~ div .MuiButton-containedSecondary', '.MuiDialog-root .MuiButton-containedPrimary');
			case 'green-24.de': return _sl('.uk-open .uk-button[onclick*="eu_cookie_remoteaccept"]');
			case 'impericon.com': return _if('.modal a[href*="service-imprint"]', '.modal button + button');
			case 'otelo.de': return _if('.GlobalDialogs a[href*="datenschutz?set-consent"]', '.GlobalDialogs .TextLink--buttonFilled');
			case 'live.com': return _if('.ms-Layer--fixed a[href*="privacy.microsoft"]', '.ms-Layer--fixed .ms-Button--primary');
			case 'ikbenfrits.nl': return _if('.ant-modal-root a[href*="cookiestatement"]', '.ant-modal-root .btn.green');
			case 'diefabrik-sundern.de': return _if('#POPUPS_ROOT a[href*="datenschutz"]', '#POPUPS_ROOT div[role="button"]');
			case 'jetbluevacations.com': return _if('.cdk-overlay-container a[href*="/legal/privacy"]', '.cdk-overlay-container button[mat-dialog-close]');
			case 'centrumtenisa.pl': return _if('.modal .policy', '.modal .close');
			case 'zoom.nl': return _if('div[class*="dialog-cookie-consent"]', 'div[class*="dialog_box"] button');
			case 'lcd-compare.com': return _sl('.modal[style*="block"] #cmp-save');
			case 'courrierinternational.com': return _sl('.cmp-ban-nocookie-media-button-read');
			case 'ticket.io': return _sl('.modal-cookie[style*="block"] .btn-text');
			case 'preplounge.com': return _sl('.modal-cookie-privacy-settings.active .js-accept');
			case 'singleboersen-vergleich.de': return _sl('.consentbanner-displaynone .consentbanner-button-extern a');
			case 'urzadzamy.pl': return _sl('.filter-modal-background[id*="consent"] .slide-modal-top > div[style*="none"] > div + button');
			case 'conso.ro': return _chain('.modal[style*="block"] #gdprCookieOptions', '.modal[style*="block"] #gdpr-analytics', '#gdprCookieAcceptCustom');
			case 'forum.brasil-web.de': return _sl('.js-privacy-consent-banner__button');
			case 'flightradar24.com': return _sl('.important-banner--is-open .btn[data-testid*="cookie-consent"]');
			case 'emons.de': return _chain('cookie-alert-dialog-component .button-outline', 'cookie-detail-dialog-component button');
			case 'free.fr': return _chain('.cookiesMgmt.is-active button:first-child', '.cookiesMgmt.is-active footer button');
			case 'blockchain.com': return _sl('#__next > div:last-child button[aria-label="OK"]');
			case 'tomorrow.one': return _chain('footer ~ .fadingIn button + button', '#consent-item-video', '#consent-item-podcast', '.settings-visible button + button');
			case 'kh.hu': return _sl('.cookie-dialog .save-cookie-settings-button');
			case 'bricomarche.com': return _chain('.Body-lockedScroll .CookieParameters-btn', '#cookieAudience', '.CookieParameters-validation button');
			case 'researchaffiliates.com': return _sl('#cookieDialog.dialog-visible .disclaimer-accept-button');
			case 'hallhuber.com': return _chain('.modal--visible .cookie-box__button-settings', '.cookie-box__button-accept-some');
			case 'deichmann.com': return '#consent-layer-modal.show button[data-key*="notagree"]';
			case 'paris.fr': return _sl('.has-cookies-message .paris-cookies-button');
			case 'idagio.com': return _sl('.ReactModal__Overlay--after-open [class*="consent-manager"] button:first-child');
			case 'lansberg.de': return _sl('#cookieNotice[style*="block"] .btn-success');
			case 'mifas.cat': return _sl('.cookienator--visible button[data-btn-accept-all]');
			case 'aldi-sued.de': return _sl('.google-maps-tooltip .google-maps-cookie-enabled');
			case 'wit.edu.pl': return _sl('.modal[style*="block"] #rodoModalConsent');
			case 'bankelf.de': return _sl('.cdk-global-scrollblock app-cookie .btn-akzept');
			case 'navigium.de': return _sl('.modal[style*="block"] .hidden .btn[onclick*="akzeptieren"]');
			case 'cocktails.de': return _sl('.modal[style*="block"] .cookie-buttons .confirm-selection');
			case 'ridersguide.nl': return _sl('.ci-sticky-bar .agree-button');
			case 'zoopla.co.uk': return _sl('#ui-cookie-consent-overlay-wrap:not([hidden]) button[data-responsibility="save"]');
			case 'energiewonen.nl': return _sl('.modal[style*="block"] #cookie-statement-accept-cookies-default');
			case 'skfbearingselect.com': return _sl('.privacy-notice button');
			case 'bandainamcoent.eu': return _sl('.modal[style*="block"] #closeCookiesObligatoriesPopUpBtn');
			case 'case-score.de': return _sl('.modal[style*="block"] #implement-cookie-settings');
			case 'reiff-zuschnitt-konfigurator.de': return _sl('.privacy-policy-dialog[style*="flex"] #prot-note-btn-sec');
			case 'cdu-fraktion.berlin.de': return _sl('#cookie-disclaimer[style*="block"] #cookiesel');
			case 'vr.fi': return _chain('div[data-testid="cookie-consent-modal"] button[data-testid="settings"]', 'button[data-testid="CookieConsentSettings__updateButton"]');
			case 'esv.info': return _sl('#cookieBannerModal[style*="block"] #select_bare_minimum');
			case 'teamtailor.com': return _chain('.modal[class*="CookieConsent"] .modal-window--open div[class*="CookieConsent__buttonsRow"] button:first-child', '.modal[class*="CookieConsent"] div[class*="CookieConsent__buttonWithWarning"] button');
			case 'studienwahl.de': return _sl('#mrm_gdpr .__buttons_accept_partial');
			case 'mcdelivery.de': return _sl('.optanon-alert-box-wrapper:not([style*="none"]) .accept-cookies-button');
			case 'gesundheit-nordhessen.de': return _sl('.tarteaucitron-modal-open #tarteaucitronSave');
			case 'learnattack.de': return _sl('.ccmodal:not([style*="none"]) .ui-dialog-buttonset button');
			case 'lifevantage.com': return _sl('.terms-of-use-modal.show button');
			case 'lufthansagroup.careers': return _sl('.modal[style*="block"] .btn[data-hook="cc-ccc-btn-confirm-selection"], .modal.show .btn-confirm-selected');
			case 'mein-wohndesign24.de': return _sl('.v-dialog__content--active .ui-cookie-consent button.primary');
			case 'tibber.com': return _chain('#__next .Consent .save', '#__next .Consent .save');
			case 'vorteile.net': return _sl('.consent-modal--show .js-accept');
			case 'generali.at': return _sl('.cookies-container ~ div #cookieSettingsSaveButton');
			case 'poolebaypharmacy.co.uk': return _sl('div[data-sort="0000000"][data-static-id="0"][data-visible="1"] div[class*="cross"]');
			case 'psg.fr': return _sl('.modal.is-showing .btn[data-accept-cookies]');
			case 'lmt.lv': return _sl('.lmt-cookies.show .btn[data-cookie-approve="checked"]');
			case 'costomovil.es': return _sl('.aio-gdpr #accept-button');
			case 'answear.ro': return _sl('.modal--cookies .btn[class*="btn"]');
			case 'tu-darmstadt.de': return _sl('#cookie-modal[style*="block"] .btn[aria-label*="Speichern"], .fancybox-opened #cookie-modal button[onclick="acceptCookies(false)"]');
			case 'racing-planet.de': return _sl('.modal[style*="block"] #consent_frm .btn-default');
			case 'info.pl': return _sl('#privacy_info_content .btn-primary');
			case 'latam.com': return _sl('.cookie-terms-overlay:not([class*="closed"]) .cookie-terms-modal__button');
			case 'palazzogroep.nl': return _sl('.cookie__wall.visible .cookie__inner__btn--accept');
			case 'takarekbank.hu': return _sl('.cookie-accept-visible .cookie-accept .c-button');
			case 'leparfait.fr': return _sl('.modal[style*="block"] .btn[onclick*="tarteaucitron.userInterface.respondAll(true)"]');
			case 'pff.se': return _sl('#cookieModal:not(.c-cookieModal-hide) button');
			case 'stoxenergy.com': return _sl('#___gatsby div[class*="ConsentManagerDisplay"] button + button');
			case 'penny.at': return _sl('.v-dialog--active #btnOK');
			case 'paybyphone.fr': return _sl('div[data-testid="agreeAndContinue-button"] button');
			case 'banknorwegian.dk': return _id('approveAllCookies');
			case 'smythstoys.com': return _sl('#cookieLoad[style*="block"] ~ .modal .savePreference, #colorbox.cookie-popup[style*="block"] .cookie-btn-yes');
			case 'easyswimportal.com': return _sl('.btn_accept_cookies');
			case 'darmstadt.de': return _sl('#wdw-cookie-consent .btn-primary');
			case 'learndutch.org': return _sl('.videoWrapper .wpca-btn-accept');
			case 'bi-polska.pl': return _sl('.modal-opened[data-control="cookieinfo"] .btn[data-accept]');
			case 'yoigo.com': return _sl('.thor-modal--open .thor-cookies-popup__button, .cookies-info-modal .cookie-accept');
			case 'oktawave.com': return _sl('#gdprbox .secondary');
			case 'apothekia.de': return _sl('.ant-modal-root button');
			case 'ebonline.be': return _sl('.modal[aria-labelledby*="cookie-warning"][style*="block"] .btn-primary');
			case 'camping.info': return _sl('.v--modal-overlay[data-modal="CiCookieLayer"] .order-2 + .order-2');
			case 'amsterdamlightfestival.com': return _sl('#cookie-consent-app .cookie-consent__btn');
			case 'wirtschaftsagentur.at': return _id('LSCookieConsent_btn_ok');
			case 'kiusys.net': return _sl('#dialogCookies.in .btn-primary');
			case 'kohlhammer.de': return _sl('.show-cookienotice #cookienotice_box_close');
			case 'kinocheck.de': return _sl('.video-gdpr-consent button');
			case 'zappn.tv': return _sl('#fd-cookies.show .accept-partly');
			case 'went.at': return _sl('#cookiebar[style*="block"] .save');
			case 'constantcontact.com': return _sl('.cookie-wall.open .accept-all-cookies');
			case 'billiger.de': return _sl('#cookie-banner-overlay .accept, #cookie-banner-orange-overlay:not([style*="none"]) .accept');
			case 'twl.de': return _sl('.modal[class*="gdpr-consent"][style*="block"] .btn.true');
			case 'nzbindex.com': return _sl('.form-horizontal[action*="/disclaimer?"] .btn-primary');
			case 'astra-bier.de': return _sl('.agecheck[style*="block"] #accept_cookies');
			case 'realme.com': return _sl('.r-cookie:not([style*="none"]) .r-btn--primary');
			case 'airam.fi': return _sl('.cookie-consent .scylla-btn--primary');
			case 'prestaexpert.com': return _sl('.modal:not(.d-none) .btn[onclick*="btnRgpdClose"]');
			case 'droptica.com': return _sl('.d-gtm-scripts-modal-wrapper--is-open #d-gtm-scripts-save-settings');
			case 'bitbrain.com': return _sl('.eu-cookie-compliance-banner-wrapper[style*="block"] .accept-cookies');
			case 'pelix-media.de': return _sl('#cookie-modal[style*="block"] .opt-in');
			case 'bienmanger.com': return _sl('.modal[style*="block"] .bm-ok');
			case 'wesendit.com': return _sl('.cc-visible .cc-dismiss');
			case 'urbanista.de': return _sl('#cookie-bar[style*="block"] #cookie-bar-button');
			case 'okazii.ro': return _sl('#cookie-bar[style*="block"] .js-cookie-bar-close');
			case 'alexanderhall.co.uk': return _sl('#cookie_consent[style*="block"] .cookie_option');
			case 'bancaditalia.it': return _sl('#banner-privacy button');
			case 'what3words.com': return _sl('.CookieNotice-Button');
			case 'imagelinenetwork.com': return _sl('.modal[style*="block"] .accept-selected-cookies');
			case 'teutoburger-muenzauktion.de': return _sl('.reveal-overlay[style*="block"] #phila-cookie-modal .button.clear');
			case 'noodweer.be': return _sl('#cookie-notice-modal.modal[style*="block"] .btn--light');
			case 'ace-ace.com': return _sl('.cookie-select-popup-view #cookie-form-submit');
			case 'ccoo.es': return _sl('.snigel-cmp-framework #sn-b-save');
			case 'file2send.eu': return _sl('#consent-dialog-title ~ div button');
			case '5miles.com': return _sl('#cookie-remind .close');
			case 'evarazdin.hr': return _sl('.cookie-warning-active .gdpr_submit_all_button');
			case 'pickup.de': return _sl('.modal[style*="block"] .btn[cookie-submit]');
			case 'my.mroom.com': return _sl('#consent-popup-container .main-cta-btn');
			case 'emb-gmbh.de': return _sl('css-modal-cookie .btn');
			case 'mietz.app': return _sl('.cookie-dialog__accept-button');
			case 'ratemyprofessors.com': return _sl('.ReactModal__Overlay--after-open button[class*="CCPA"]');
			case 'framer.com': return _sl('div[class*="CookiesBanner"] .button.variant-primary');
			case 'keldoc.com': return _sl('.nehs-cookie-button');
			case 'aukcije.hr': return _sl('.reveal-overlay[style*="block"] #cookieAccept');
			case 'lhv.ee': return _sl('.mfp-ready #acceptPirukas');
			case 'freeontour.com': return _sl('.fancybox-opened .btn[dusk="reject-button-cookie-consent"]');
			case 'pfeffi.com': return _sl('.consent-widget #consentSaveButton');
			case 'dnbeiendom.no': return _chain('#gtm-cookie-velg-selv', '.dnb-checkbox__input[title*="Marked"]', '.dnb-checkbox__input[title*="Intern"]', '#gtm-cookie-godkjenne-valg');
			case 'newpharma.be': return _sl('#js-cookie-policy-popup .js-cookie-policy-ok-btn');
			case 'entsoe.eu': return _sl('.ui-dialog[style*="block"] #welcome-popup .ui-button');
			case 'tredy-fashion.de': return _sl('.ui-dialog[style*="block"] #cookieFlyout button[onclick*="submit"]');
			case 'openfoodnetwork.org.uk': return _sl('.cookies-banner[style*="block"] button[ng-click*="accept"]');
			case 'kurzurlaub.de': return _sl('.modal[style*="block"] .accept-gdpr');
			case 'wearetennis.bnpparibas': return _sl('.modal-wat-cookie .js-confirm-cookie');
			case 'weople.space': return _sl('.fix > form .btn[name="accept"]');
			case 'theheinekencompany.com': return _sl('.cookies[state="active"] button');
			case 'boohoo.com': return _sl('.privacy-policy.visible .js-accept-all-button');
			case 'readly.com': return _sl('.cookie-consent #cookie-accept-all, .cookie-option-large ~ div > button');
			case 'computerbase.de': return _sl('.consent[open] .js-consent-accept-button');
			case 'dish.co': return _sl('.modal[style*="block"] .cookie-info__accept');
			case 'particify.de': return 'app-cookies button';
			case 'ose.gov.pl': return _sl('.cookies-modal[style*="block"] .btn.secondary');
			case 'monespaceclient.immo': return _sl('.modal[style*="block"] .close[onclick*="CloseCookie"]');
			case 'teamaretuza.com': return _sl('.modal[style*="block"] #giveCookieConsentButton');
			case 'vivawest.de': return _sl('.modal[style*="block"] #cookie-consent-accept-selected');
			case 'friedrich-maik.com': return _sl('#incms-dpbanner .dp_accept');
			case '99app.com': return _sl('.cookies-license .license-allow');
			case 'stadtenergie.de': return _sl('button[data-cypress-id="acceptCookies"]');
			case 'hemnet.se': return _sl('.ReactModal__Overlay--after-open [class*="ConsentNotification__Buttons"] > button');
			case 'veygo.com': return _sl('#cookie-banner .confirm');
			case 'sherwin-williams.com.br': return _sl('.mensagem-cookie .fechar');
			case 'eon-highspeed.com': return _sl('.dmc-cc-overlay--open .dmc-cc-btns > a');
			case 'faberkabel.de': return _sl('.fancybox-opened #modalCookie .button-red, #ModalUmCookiehandling[style*="block"] .btn');
			case 'matthys.net': return _sl('.modal-popup._show .btn-cookie-allow');
			case 'swatch.com': return _sl('.m-show .btn[data-event-click="acceptCookies"]');
			case 'fotopuzzle.de': return _sl('.cookie-policy-widget #cookies-consent-save');
			case 'argutus.de': return _sl('#ag-consentmanager-wrapper[style*="block"] #btn-consent-save');
			case 'sport2000.fr': return _sl('.modal[style*="block"] #customer-consent-modal-confirm');
			case 'ihtsdotools.org': return _sl('.modal[style*="block"] #accept-license-button-modal');
			case 'humboldtforum.org': return _sl('#cookieConsent.loaded .naked');
			case 'jobruf.de': return _sl('.open ~ .cookie-consent-settings .btn[data-action="save"]');
			case 'senmotic-shoes.eu': return _sl('.swal2-popup[class*="optin"] .swal2-cancel');
			case 'abconcerts.be': return _sl('.cookie-consent button[value="yes"]');
			case 'aiways-u5.nl': return _sl('#overlay-cookie[style*="block"] .button');
			case 'ponal.de': return _sl('.epp-overflow .epp-modal .epp-secondary');
			case 'parkster.com': return _sl('.modal[style*="block"] .js-cookie-dismiss');
			case 'lemonade.com': return _sl('#root div[class*="PrivacyBanner"] button');
			case 'change.org': return _sl('button[data-testid="cookie-wall-accept"]');
			case 'nickles.de': return _id('consent_ok');
			case 'islandfreund.de': return _sl('.becc-ol[style*="block"] .becc-ok');
			case 'aral.de': return _sl('.ap-cookies--open #ap-cookie-wall .ap-btn');
			case 'tele2.de': return _sl('#esssential_cookie_popup[style*="block"] .setCookies');
			case 'crew-united.com': return _sl('#colorbox[style*="block"] form[data-handler-url*="CookieSettings"] .icon-save');
			case 'viennahouse.com': return _sl('#cookie-box.open #cookies-close-notification');
			case 'puratos.pl': return _sl('.modal[style*="block"] #cookieAcceptBtn');
			case 'tantris.de': return _sl('#--cg-modal-overlay[style*="block"] #--cg-button-cookie-confirm');
			case 'carrefour.it': return _sl('.consent-tracking-modal.active .btn-primary');
			case 'norres.com': return _sl('#cookieWelcomeModal[style*="block"] #acceptOnlyEssential');
			case 'aquaristic.net': return _sl('.modal[style*="block"] #rs_cookie_manager_accept');
			case 'aptoide.com': return _sl('.no-scroll div[class*="cookie-notice__Options"] > div:last-child');
			case 'bhw.de': return _sl('.cookie-disclaimer[style*="block"] .js-notification-agree');
			case 'native-instruments.com': return _sl('#ni-cookie-consent[style*="block"] [data-cookie-consent-accept]');
			case 'ubereats.com': return _id('cookie-banner-close');
			case 'ittweak.de': return _sl('#sgpb-popup-dialog-main-div-wrapper > div > img');
			case 'bike-components.de': return _sl('.has-cookie-banner .cookie-banner button');
			case 'lindenberg-bringts.de': return _sl('.modal[style*="block"] .btn[ng-click*="ok"]');
			case 'iq.com': return _sl('.accept-all[data-pb*="cookie_ask"]');
			case 'stockmann.com': return _sl('.cookie-dialog-screen.open .cookie-consent-accept');
			case 'oxinst.com': return _id('mcc-button-accept');
			case 'wienenergie.at': return _sl('.__reakit-portal [class*="CookieConsent-module__actions"] button');
			case 'amzpecty.com': return _sl('#gpdrConsentModal[style*="block"] button');
			case 'anhinternational.org': return _sl('.in #consent-options .btn');
			case 'fil-luge.org': return _sl('.cookieBar-Overlay-open .CookieBar__Button-accept');
			case 'arteradio.com': return _sl('.cookies-modal button + button');
			case 'lemonde.fr': return _sl('.article__video-deny button');
			case 'merrell.pl': return _sl('#gdpr-cookie-block #btn-cookie-allow');
			case 'fass.se': return _sl('#cookie-dialog-sidebar .acceptButton');
			case 'ruegenwalder.de': return _sl('.ytcs:not([style*="none"]) .btn[id*="youtubeconsent"]');
			case 'romshub.com': return _sl('#kuk.modal[style*="block"] .btn');
			case 'oventrop.com': return _sl('.modal[style*="block"] #ConsentModalControl_lbtnSaveSelection');
			case 'thincast.com': return _sl('.uk-open #AcceptCookies');
			case 'truste.com': return _sl('.pdynamicbutton .call, #gwt-debug-close_id');
			case 'pronovabkk.de': return _sl('.reveal[style*="block"] button[data-accept-cookie-disclaimer]');
			case 'osehero.pl': return _sl('.ReactModal__Overlay--after-open button[accept]');
			case 'regione.lombardia.it': return _sl('#cookiePrl:not(.hidden) .accetta');
			case 'invk.nl': return _sl('.modal[style*="block"] .cookieConsentOK');
			case 'norddeutsch-gesund.de': return _sl('#consent_manager:not([style*="none"]) #consent_settings_save_button');
			case 'mitgas.de': return _sl('.modal--CLB #CLB_level_2');
			case 'duvel.com': return _sl('#cookiebanner[style*="block"] .js-cookie-accept');
			case 'pitstop.de': return _sl('.modal[style*="block"] #btn-cookie-terms-selection');
			case 'lifepointspanel.com': return _sl('.modal[style*="block"] #accept_only_website_cookies');
			case 'mathem.se': return _sl('.cookie-details[style*="block"] .btn');
			case 'resultsbase.net': return _sl('.bootbox.modal[style*="block"] #btnCookiesAcceptSelected');
			case 'hot.si': return _sl('.bootbox.modal[style*="block"] .btn[data-bb-handler="allow"]');
			case 'ogladajanime.pl': return _sl('.bootbox.modal[style*="block"] .bootbox-accept');
			case 'computerprofi.com': return _sl('.button[value*="akzeptieren"][onclick*="redirect"]');
			case 'stwbs.de': return _sl('.cookie-advice[style*="block"] input[value="needed"]');
			case 'geolive.org': return _sl('.rispondi-commento-link[href*="accetta-cookies"]');
			case 'wanted.law': return _sl('.cdk-overlay-container .dtx-cookie-voorkeuren-modal-buttons .btn');
			case 'tipser.com': return _sl('.submit-consent-button');
			case 'die-medienanstalten.de': return _sl('.modal[style*="block"] .matomo-btn-agree');
			case 'france24.com': return _sl('.m-em-video__cmp__disclaimer p:first-child + button');
			case 'wwz.ch': return _sl('.cookie--open .cookie__accept-all');
			case 'yoko.de': return _sl('.modal[style*="block"] .btn[data-rel="cookies-accept-all"]');
			case 'cheapenergy24.de': return _sl('.btn[cookie-consent-dialog--accept-selection]');
			case 'chargemyhyundai.com': return _sl('.privacy-information-modal.show button[onclick*="accept"]');
			case 'brightstar.com': return _sl('.modal[style*="block"] .btn[id*="cookieAccept"]');
			case 'freeyou.ag': return _sl('.cookies .btn-primary');
			case 'la7.it': return _sl('#_evh-ric #AcceptButton');
			case 'schullv.de': return _sl('.MuiDialog-root button[class*="CookieBar__Accept"]');
			case 'natuurmonumenten.nl': return _sl('#modal .cookies-button-optimal');
			case 'second-hand-ikea.com': return _sl('#cookie_melding .link_button2');
			case 'foursquare.com': return _sl('.cookieBannerClose');
			case 'leirovins.be': return _id('cookie-accept');
			case 'psiquiatria.com': return _sl('.modal[style*="block"] .btn[onclick*="acept"]');
			case 'innsbruck-airport.com': return _id('header-notification-toggle-decline');
			case 'germany.travel': return _sl('.consent:not([style*="none"]) .button-save');
			case 'basenio.de': return _sl('#cookie_consent .btn');
			case 'job-impulse.com': return _sl('.cookie-alert.checkedClass .btn[ng-click*="agree"]');
			case 'solcom.de': return _sl('.cookie-consent-banner.notaccepted .acceptall');
			case 'bausep.de': return _sl('.notice-cookie-block .button[onclick*="save"]');
			case 'uelzener.de': return _sl('.mfp-ready #acceptAllButton');
			case 'feuertrutz-katalog.de': return _sl('.ngn-cookie-consent.ngn-modal--active .ngn-primary-button');
			case 'breitbandmessung.de': return _sl('.dsvo-overlay[style*="block"] #dsvooverlay-close');
			case 'celeraone.com': return _sl('#cis-gdpr-footer[style*="display"] #cis-gdpr-footer-accept');
			case 'verpackungsregister.org': return _sl('#cookieConsentModal[style*="block"] .cookie-close-btn');
			case 'dresdner-fachanwaelte.de': return _sl('.mfp-ready .btn-consent-allow');
			case 'keb.de': return _sl('#privacy-statement[style*="block"] #close-statement-save');
			case 'dangenentertainment.com': return _sl('.gdpr-confirm-button');
			case 'shadowofwar.com': return _id('consent-close');
			case 'ankerbrot.at': return _sl('.anker2020cd__speichern');
			case 'radio886.at': return _sl('.r886cd__speichern');
			case 'telesec.de': return _sl('#cookie-consent[style*="block"] .btn-primary');
			case 'bremerhaven.de': return _sl('.cookie-banner.in .btn[data-dismiss]');
			case 'promondo.de': return _sl('.modal[style*="block"] .btn[onclick*="agreementcookies_set"]');
			case 'konzerthaus-dortmund.de': return _sl('.modal[style*="block"] #cookieClose');
			case 'kissnofrog.com': return _sl('.mdl-cookie-disclaimer-layer .yes-button');
			case 'schellenberg.de': return _sl('.modal.show #c1x1_gdprcookie-modal-btnsave');
			case '112groningen.nl': return _sl('.modal button[value*="cookies"]');
			case 'actionsport-rainbowdivers.de': return _sl('#CookieModal.in .btn[type="submit"]');
			case 'o2.fr': return _sl('#cookie-consent .modal[style*="block"] .btn-secondary');
			case 'hotelsbarriere.com': return _sl('#cookie-banner.show .JS_accept_cookies');
			case 'ing.jobs': return _sl('.fancybox-opened label[for="cl_basic_com"] a');
			case 'mega.be': return _sl('.modal[style*="block"] #cookieAcceptationButton');
			case 'hidrive.com': return _sl('button[data-qa="privacy_consent_approve_all"]');
			case 'ktr.com': return _sl('.modal[style*="block"] .btn[onclick*="setCookieBannerAccepted"]');
			case 'itaa.be': return _sl('#cookieConsent .accept-policy');
			case 'sheego.de': return _sl('.modal[style*="block"] .btn.privacy-settings__ok-cta');
			case 'nobilia.de': return _sl('#cookieLayer[style*="block"] #btn-DSGVO-saveselected');
			case 'etsy.com': return _sl('#gdpr-single-choice-overlay.wt-overlay--will-animate button[data-gdpr-single-choice-accept]');
			case 'buchcopenhagen.dk': return _id('dataprotection-form-submit');
			case 'makeproaudio.com': return _sl('.modal.is-open .js-set-all-cookies');
			case 'ffr.fr': return _sl('.modal.visible .cookie .btn:first-child');
			case 'kwyk.fr': return _sl('#youtube-video .btn');
			case 'bonami.pl': return _sl('body > .rcic > div > div > p:first-child + a:last-child');
			case 'gamingonlinux.com': return _sl('.hidden_video_content .accept_video');
			case 'haus-des-meeres.at': return _sl('.fxCookieWindowAllLink');
			case 'sharewise.com': return _sl('.modal[style*="block"] .btn[onclick*="cookiesAgreed"]');
			case 'lokaleportalen.dk': return _sl('.modal-wrapper.shown form[action*="CookiesAgreement"] .button[name="UpdateSelected"]');
			case 'standardlifeaberdeenshares.com': return _sl('.modal[style*="block"] [type="submit"][name="agreeCookies"]');
			case 'cognex.com': return '#GDPRModal[style*="block"] .agree';
			case 'getraenke-news.de': return _sl('.modal[style*="block"] .btn[onclick*="requestAccessToSite"]');
			case 'keltican-forte.de': return _sl('.layerActive #cookie-form #confirmChoices');
			case 'dehn.at': return _sl('#cookieConsent[style*="block"] .button.hollow');
			case 'gamestar.de': return _sl('.modal[style*="block"] .cmp-accept, .modal[style*="block"] .btn[href*="acceptCmp"]');
			case 'neuseeland-haus.de': return _sl('#notice-cookie-block[style*="block"] #btn-cookie-allow');
			case 'manpowergroup.at': return _sl('.c-modal.is-visible .js-cookie-consent__accept-all');
			case 'samengezond.nl': return _sl('#modal-cookiemodal[style*="visible"] button');
			case 'gv.at': return _sl('#cookieman-modal[style*="block"] [data-cookieman-save], .bemCookieOverlay__btn--save');
			case 'plein.nl': return _sl('.modal[style*="block"] .btn[href*="cookies/approve"]');
			case 'juitnow.com': return _sl('.modal[style*="block"] .btn[data-cy="cookies-save-settings"]');
			case 'passport.service.gov.uk': return _id('cookie-banner-accept');
			case 'mcrent.de': return _sl('.cookieAcceptance.active .acceptAll');
			case 'freiwald.com': return _sl('.right_content .but[onclick*="Continue"]');
			case 'onlinedepartment.nl': return _sl('.has-ccwindow .cookie-banner .cc-allow');
			case 'grander.com': return _sl('.no-cc .cc-dismiss');
			case 'dkms.pl': return _sl('.cc-window-active .cc-dismiss');
			case 'foto-lambertin.de': return _sl('.modal[style*="block"] #btnCCTSaveB');
			case 'jsitor.com': return _sl('.cookie-consent .primary');
			case 'mag.dbna.com': return _sl('.cookieconsent.visible .positive');
			case 'celonis.com': return _sl('div[data-cookie="gdpr"] [data-cookie-set="accept"]');
			case 'autohaus24.de': return _sl('.coo__button[data-button="setAllCookies"]');
			case 'swrag.de': return _sl('#cookie-layer[style*="block"] .btn-secondary');
			case 'ab-m.de': return _sl('.wd-consent .buttonFrontend');
			case 'real.de': return _id('consentSubmit');
			case 'nibcdirect.de': return _sl('.dbh-cookie-consent-visible .dbh-cookie-consent-save');
			case 'tarnobrzeg.info': return _sl('.modal[style*="block"] .btn[href*="closeRodo"]');
			case 'mazury24.eu': return _sl('#privModal[style*="block"] .privacybtn');
			case 'begroting-2021.nl': return _sl('.ls-cookie_bar .ls-cookie_button');
			case 'combi.de': return _sl('.modal--cookie-notice.open #accept-consent');
			case 'proman-emploi.fr': return _sl('#root button[class*="cookieNotice-accept"]');
			case 'bang-olufsen.com': return _sl('#ppms-modal[style*="block"] #reject-all');
			case 'foxtons.co.uk': return _sl('.fancybox-overlay[style*="block"] .cookie_option[data-choice*="Yes"]');
			case 'ilmarinen.fi': return _sl('.modal[style*="block"] #ilmGdprCooModOk');
			case 'qwic.de': return _sl('#cookie-consent[style*="block"] .js-cookie-accept');
			case 'qinetiq.com': return _sl('#cookiePolicyBanner .button');
			case 'otpbanka.hr': return _sl('#perpetuum-cookie-bar.visible .perpetuum-button-allow a');
			case 'aarsfjv.dk': return _sl('dff-cookie-consent-dialog button[data-cookiescanner*="accept"]');
			case 'langeland.nl': return _sl('#cookieWallOverlay[style*="block"] .ok-cookies');
			case 'magentagaming.com': return _sl('button[data-test="cookie-accept"]');
			case 'vu.nl': return _sl('#cookie-consent:not([hidden]) button[data-all]');
			case 'bestdrive.fr': return _sl('.m-cookie:not(.m-cookie--hidden) .m-cookie__button-accept');
			case 'elekta.com': return _sl('#cookie-banner[style*="block"] #cookie-accept');
			case 'c24.de': return _sl('app-cookie app-button');
			case 'vitalsource.com': return _sl('div[id^="dialog"] [data-testid*="CookiesDialog"] + div + div button');
			case 'wohnen-im-alter.de': return _sl('.modal[style*="block"] .btn[onclick*="CookieConsent.apply"]');
			case 'wohnmobilforum.de': return _sl('#consentbox input.knopf');
			case 'diebayerische.de': return _sl('#cookie-consent-layer[style*="block"] .js_cc-accept-all');
			case 'blocket.se': return _sl('aside[aria-label*="cookie"] #close-modal');
			case 'healthinsight.ca': return _sl('.modal[style*="block"] .vicky-cookie-yes');
			case 'studiobookr.com': return _sl('#cookie-hint-display:not([style*="none"]) .sb-primary');
			case 'boehringer.net': return _sl('.cookie-consent .submit-selected');
			case 'wegedetektiv.de': return _sl('.modal[style*="block"] #cookieok');
			case 'engelvoelkers.com': return _sl('.ev-disable-scrolling .cookie-consent-dialog-container button[onclick*="accept"], .cookie-consent-dialog-container:not([style*="none"]) button[onclick*="accept"], #cookieConsentDialog.in button[onclick*="accept"]');
			case 'reviewmeta.com': return _sl('.modal[style*="block"] #terms_accepted');
			case 'justjoin.it': return _sl('#root > div > a[href*="privacy"] ~ button');
			case 'ferienchecker.at': return _sl('.el-dialog__wrapper:not([style*="none"]) .cookie__button');
			case 'leoprinting.fr': return _sl('#cookieConsentModal[style*="block"] #saveButton');
			case 'truepartnercapital.com': return _sl('.mfp-ready #close-cookie-disclaimer-btn');
			case 'envoituresimone.com': return _sl('.modal[style*="block"] #accept_cookies');
			case 'abo24.de': return _sl('.featherlight[style*="block"] #consent-all');
			case 'edeka-foodservice.de': return _sl('.dialog button[onclick*="accept"]');
			case 'nacex.es': return _sl('.ui-dialog[style*="block"] #accept');
			case 'targoversicherung.de': return _sl('.modal[style*="block"] .dsgvo.accept');
			case 'unedtenerife.es': return _sl('#uploadedImagePopup[style*="block"] .close');
			case 'quiziniere.com': return _sl('.modal[style*="block"] .qz-alert-cookie button');
			case 'itis.swiss': return _sl('#cookie_blocker:not([style*="none"]) #cookie_ok');
			case 'prosa.dk': return _sl('.t3cms-cookies-overlay:not([style*="none"]) .t3cms-cookies-select-all');
			case 'googlewatchblog.de': return _sl('.embed-youtube .cmplz-blocked-content-notice');
			case 'adventurespiele.net': return _sl('.data-protection-info[style*="block"] .ok');
			case 'fastforwardscience.de': return _sl('#coookieOverlay.open #coookieOverlayButtonSave');
			case 'tumblr.com': return _sl('.l-container [data-view="guce-gdpr"] .btn.yes, .qc-cmp2-container button[mode="primary"]');
			case 'mantel.com': return _sl('#modal-ck[style*="block"] .btn-primary');
			case 'svenskakyrkan.se': return _sl('.cookies__bar.is-active .js-cookies-accept-all');
			case 'k15t.com': return _sl('.reveal[style*="block"] .cookiesAccepted');
			case 'tieranwalt.at': return _sl('.fxCookiesWindowsBodyClass .fxCookieWindowAllLink');
			case 'monese.com': return _sl('.cookie-banner__wrapper button[data-testid*="accept"]');
			case 'secondsol.com': return _sl('.modal[style*="block"] .btn-success-cookie');
			case 'kasuwa.de': return _sl('#ccModal[style*="block"] .btn-primary');
			case 'ihreapotheken.de': return _sl('.modal[style*="block"] #AcceptCookies');
			case 'ns.nl': return _sl('.cookie-notice button + button');
			case 'adler-farbenmeister.com': return _sl('.page-wrap--cookie-permission:not(.is--hidden) .cookie-permission--accept-button');
			case 'notaris.be': return _sl('.c-bar[style*="block"] .c-btn');
			case 'legia.com': return _sl('#main ~ div .button[href*="cookies"] ~ button');
			case 'schwaebisch-hall.de': return _sl('.cookie-note[style*="block"] .js-cookie-accept-ok');
			case 'ls-tc.de': return _sl('.modal[style*="block"] .accept');
			case 'spielexikon.de': return _sl('input[name="edit-property-cookie-accept"]');
			case 'etepetete-bio.de': return _sl('.modal[style*="block"] .accept-all-button');
			case 'neliosoftware.com': return _sl('.nelio-cookie-modal:not([style*="none"]) button');
			case 'uvex-safety.com': return _sl('.modal-cookie .btn + .btn');
			case 'cocktaildatenbank.de': return _sl('.show #d-cc--confirm');
			case 'jobware.de': return _sl('.cc-blackout:not(.cc-invisible) .cc-dismiss');
			case 'bo.de': return _sl('#footer-consent[style*="block"] #reiff-consent-accept');
			case 'rittal.com': return _sl('.swal-overlay--show-modal .--primary');
			case 'idoc.eu': return _sl('.is--active .cookie-permission--accept-button');
			case 'ufz.de': return _sl('#cookie-banner[style*="block"] .btn-success');
			case 'imoradar24.ro': return _sl('#modal-cookies[style*="block"] .accept');
			case 'uniqa.at': return _sl('.tingle-modal--visible .cc_buttons-accept_all_cookies');
			case 'handy-deutschland.de': return _sl('#privacy-settings .button-primary');
			case 'police-auction.org.uk': return _sl('.modal[style*="block"] .btn[onclick*="cookie_agree"]');
			case 'hemdenbox.de': return _sl('#s-cookie-consent[style*="block"] #s-cookie-consent-accept-all');
			case 'sendgb.com': return _sl('.cookie_checker[style*="block"] ~ .sendgb_cookiewarning .cookiebutton');
			case 'realm667.com': return _id('cookiehintsubmit');
			case 'gezond.nl': return _sl('#cookie-dialog[style*="block"] #cookie-submit');
			case 'nmhh.hu': return _sl('#cookie-dialog[style*="block"] button[type="submit"]');
			case 'montanacolors.com': return _sl('.mfp-ready .cookies .bot');
			case 'lbbw.de': return _sl('.component-data-protection-consent.show .action-save-settings');
			case 'deka.de': return _sl('.mfp-ready .js-accept-selected-cookies');
			case 'litebit.eu': return _sl('.cookie-consent button');
			case 'aboalarm.de': return _sl('.c-cmp--modal-show .gdpr-accept-custom');
			case 'shpock.com': return _sl('#__next ~ div[id*="modal"] div[class*="PrivacyConsent"] button');
			case 'indiearenabooth.com': return _sl('#cookie-consent:not([style*="none"]) #btn-cookie-consent-positive');
			case 'besteproduct.nl': return _sl('.modals.active .cookieWall-btn');
			case 'wetter.com': return _sl('.cmp-prevent-scroll #cmp-btn-save');
			case 'stabila.com': return _sl('.mod_cms_accept_tags.block #cms_close_button');
			case 'pibank.es': return _sl('#cookies-block:not([style*="none"]) .aceptar');
			case 'verksamhetslokaler.se': return _sl('.modal-wrapper.shown #cookies_agreement_panel .green');
			case 'interfriendship.de': return _sl('#cookies-dlg:not([style*="none"]) .cdlg-accept-all');
			case 'heinz.st': return _sl('#cookiebar[style*="block"] .accept');
			case 'aptekagemini.pl': return _sl('.vue-privacy-policy__button[style*="none"], .modal[style*="block"] .privacy-policy-advanced-settings-save');
			case 'alternate.de': return _sl('.cookie-acceptance-media-consent-accept');
			case 'betway.se': return _sl('.fixed-body .bwCookiePolicy .bwButton');
			case 'dark.netflix.io': return _sl('.abs-fill[class*="cookie-policy"] button');
			case 'mycare.de': return _sl('#cookie-settings-content[style*="block"] #btn-cookie-accept');
			case 'erdbeerprofi.de': return _sl('#gdpr-cookie-container #btn-cookie-allow');
			case 'pharmazeutische-zeitung.de': return _sl('#ccm .ccm_button_green');
			case 'dotomi.com': return _sl('.btn-continue[onclick^="cjil"]');
			case 'komplettbank.se': return _sl('.kb-cc[style*="block"] .kb-cc-btn_main');
			case 'novado.de': return _sl('#cookie-block[style*="block"] #btn-allow');
			case 'onwebchange.com': return _sl('.cookie_banner .btn-primary');
			case 'vodafone.nl': return _sl('.cookiewall___wrapper:not([style*="none"]) .cookiewall__accept');
			case 'strato.de': return _sl('body > .consent:not(.hidden) #consentSubmit, #cookie_overlay:not(.hidden) .consent:not(.hidden) #consentAgree');
			case 'texels.nl': return _sl('.show-cookie-notice .cookie-closer');
			case 'coperion.com': return _sl('.is-visible .button[data-cookie-close="accept"]');
			case 'lotto.pl': return _sl('.privacy-popup.active .orange-btn, #baseModal[style*="block"] #modalButtonAccept');
			case 'mehilainen.fi': return _sl('.MuiDialog-root[class*="Consent"] button + button');
			case 'llamaya.com': return _sl('.MuiDialog-root.cookies-modal .set-all');
			case 'tre.se': return _sl('.MuiDialog-root .MuiButton-containedPrimary, #react-aria-modal-dialog[aria-label*="Cookie"] button:first-child');
			case 'openx.com': return _sl('.ox-localization.active .ox-confirm');
			case 'evileg.com': return _sl('#privacy_policy_dialog[style*="block"] .btn[data-dismiss]');
			case 'testzentrale.de': return _sl('.cookie-settings[style*="block"] .secondary');
			case 'medis.pt': return _sl('#cookiedismiss .btn');
			case 'gramatica-alemana.es': return _id('cookiewarning_a');
			case 'ageas.co.uk': return _sl('#cookie[style*="block"] .cookie__btn');
			case 'audemarspiguet.com': return _sl('.odo-dialog--visible .js_cookie-policy-popup__accept-all');
			case 'vejdirektoratet.dk': return _sl('.ng-scope[ng-show="cookieDialogActive"]:not(.ng-hide) .cookie_button[ng-click*="accept"]');
			case 'norwegian.com': return _sl('.nas-element-cookie-consent__accept-all-button');
			case 'wapex.pl': return _sl('.modal[style*="block"] .btn[onclick*="CookieAccept"]');
			case 'sunny.co.uk': return _sl('.cookie-acceptance-modal button[name="accept-cookies-button"]');
			case 'pacma.es': return _id('panel_cookies_todas');
			case 'impulse.de': return _sl('.button[data-cc-accept]');
			case 'dailyfx.com': return _sl('.dfx-cookiesNotification--visible .jsdfx-cookiesNotification__close');
			case 'cinkciarz.pl': return _sl('#cookies-modal[style*="block"] .btn-primary');
			case 'joingoodcompany.nl': return _sl('#cookie-accept:not(.hide) .cookie-btn');
			case 'fanfiktion.de': return _sl('#colorbox[style*="block"] #ff-consent-close');
			case 'flex-tools.com': return _sl('.cookieBar--active .js-accept-cookie-bar');
			case 'taschen.com': return _sl('#ConsentManagerModal[style*="block"] #cookie_accept_all');
			case 'stationsdeski.net': return _id('accept_rgpd');
			case 'laboratoire-cellmade.fr': return _sl('#cookies:not([style*="none"]) #btnAcceptCookie');
			case 'stiftung-managerohnegrenzen.de': return _sl('.v--modal-overlay[data-modal="cookie-modal"] .btn');
			case 'v.calameo.com': return _sl('.consent.cookies .btn');
			case 'blasmusik-burgenland.at': return _sl('#appendto:not([style*="none"]) #showCookieserlauben');
			case 'ooma.com': return _sl('.gdpr_cookie_overlay:not(.d-none) #accept_cookie');
			case 'takko.com': return _sl('.cookie-policy-box .set-all-cookies');
			case 'singaporeair.com': return _sl('.modal-mask:not([style*="none"]) .confirm .popup__explicit__cookie, .popup--cookie-handling:not(.hidden) .btn-full');
			case 'hundeschmuck.store': return _sl('#myModal[style*="block"] form[action*="analytics"] .btn');
			case '118.lt': return _sl('#privacy-page-body #modal-btn-accept');
			case 'mini.de': return _sl('.md-if-frame:not([style*="none"]) .md-iframe-consent-message--fallback-teaser .btn');
			case 'one-insurance.com': return _sl('one-cookies-dialog one-theme-button');
			case 'yoyogames.com': return _sl('#cookie.is-showing #yoyo-cookie-accept');
			case 'cancercentrum.se': return _sl('#cookie-modal[style*="block"] .cookie-modal-consent-btn');
			case 'zlm.nl': return _sl('#cookie-modal.in .btn-primary');
			case 'wienholding.at': return _sl('#modalCookieGeneral[style*="block"] .btn-accept-all');
			case 'niko.eu': return _sl('.c-cookie.is-active .c-cookie__accept button');
			case 'billiger-aufladen.de': return _sl('#dsModal[style*="block"] .btn');
			case 'lebara.com': return _sl('#cookiesConsentModal[style*="block"] .btn[onclick*="accept"]');
			case 'malcoded.com': return _sl('.MuiDialog-root button');
			case 'polska6.pl': return _sl('.modal[style*="block"] .btn[data-pole="akceptuje"]');
			case 'warsztat.pl': return _sl('.modal[style*="block"] #akceptuje');
			case 'freenet-energy.de': return _sl('.modal[style*="block"] #cookie_ok');
			case 'norwegian.no': return _sl('nas-element-cookie-consent[style*="block"] .nas-button[class*="accept"]');
			case 'amewi.com': return _sl('.ck-hinweis[style*="block"] .save-cookie-options');
			case 'fysikoaerioellados.gr': return _sl('.cookies-consent-overlay:not(.hidden) .btn-cookies-accepted');
			case 'dubplate.be': return _sl('#gdpr-banner[style*="block"] .js-gdpr-accept');
			case 'sportiva.com': return _sl('#popup-privacy-policy:not([style*="none"]) .btn-cookie');
			case 'tk.de': return _sl('.is-display-consentmanager .g-consentmanager__confirm-selection');
			case 'redbook.com.au': return _sl('.csn-gdpr-modal button');
			case 'burgerking.pl': return _sl('.modal.visible .cookies-modal .button');
			case 't-mobile.nl': return _sl('#cookiePopup.show .button-primary');
			case 'tele2.nl': return _sl('#cookiePopup.show .button-green');
			case 'altomdinhelse.no': return _sl('.modal[style*="block"] .vicky-cookie-yes');
			case 'westfalen.igbce.de': return _sl('#first_confirmation_button.eupopup-button');
			case 'axa-im.fr': return _sl('.gh-accept-cookie-disclaimer');
			case 'gruener-punkt.de': return _sl('#cookie-modal[style*="block"] input[data-cookie="all"]');
			case 'coolmath.com': return _sl('.gdpr-overlay-container[style*="visible"] .accept-all-cookies');
			case 'hosteurope.de': return _sl('.ReactModal__Overlay--after-open .UPM__PrivacyModal span + span button');
			case 'zeit.de': return _sl('#main[data-ct-area="decision-main"] .box__accbtn button');
			case 'm.bancopopular.com': return _sl('#popup-cookieinfo:not(.hide) #btn-dmp-continue');
			case 'stat.si': return _sl('.surs-cookies-wrapper[style*="block"] .surs-cookie-button-yes');
			case 'faidatehobby.it': return _sl('#cl_modal .btn_main_yes');
			case 'smplayer.info': return _sl('.well .lead.text-center > .btn.active[href*="forum"]');
			case 'ipaddress.com': return _sl('#cc-wrapper[style*="block"] #cc-accept-btn');
			case 'ugenr.dk': return _sl('#gdpr-consent:not([style*="none"]) .accept');
			case 'ipc.be': return _sl('.cookiebox.show .btn-primary');
			case 'gezondeideetjes.nl': return _sl('.cookie-modal[style*="block"] button[onclick*="doCookie"]');
			case 'hagerzplan.de': return _sl('#modalCookies.in .btn-hager');
			case 'sunday.dk': return _sl('button[data-test-id="CookieBanner-CloseButton-Button"]');
			case 'freo.nl': return _sl('.popover-frame--visible #CookieAcceptMain');
			case 'saperesalute.it': return _sl('#cookieban .cookie');
			case 'archimag.com': return _sl('.eupopup-button_1');
			case 'rotterdammersvoorelkaar.nl': return _sl('.cookie-notice-wrapper.mfp-ready .button-confirm');
			case 'bcc.nl': return _sl('#cookiewallmodal.in .btn-primary');
			case 'wuestenrot.cz': return _sl('#cookie-modal.is-active .js-cookie-law-aggre');
			case 'fabrykacukiernika.pl': return _sl('.rodo-popup[style*="block"] button');
			case 'ostrzegamy.online': return _sl('.rodo-popup[style*="block"] button[data-cookie-name]');
			case 'bauder.de': return _sl('#cookieWarningText .privacy ~ a');
			case 'beamtic.com': return _sl('#_data_consent button');
			case 'dclaw.co.uk': return _sl('#dialog-cookies .btn-primary');
			case 'cookiewall.vice.com': return _id('i-agree');
			case 'emerce.nl': return _sl('.cc-container a#btn');
			case 'fr12.nl': return _id('cookies');
			case 'latagliatellayyo.es': return _sl('#AcceptCookies ~ #Buttonholder > input');
			case 'mdsrl.it': return _sl('.cookie-modal .ui-button');
			case 'medtronic.nl': return _sl('.acceptcookies');
			case 'online-store.mercedes-benz.de': return _sl('.cookie-layer__close');
			case 'toc.mercedes-benz.com': return _sl('.modal-cookie-warning [data-modal-close="accept"]');
			case 'sogeti.nl': return _sl('input[name="cookiewall_answer"] + .button');
			case 'blog.daimler.de': return _sl('.modal-close[title*="Akzeptieren"]');
			case 'zomoto.nl': return _sl('#lnkAccept span');
			case 'runtervomgas.de': return _sl('#cookie-bar a');
			case 'teesbusinesscompass.co.uk': return _sl('#cookiepanel + .ui-dialog-buttonpane button');
			case 'qlstats.net': return _sl('#accept button[onclick*="acceptCookiePolicy"]');
			case 'openlibra.com': return _sl('#ol-cookie-policy button');
			case 'zilverenkruis.nl': return _id('cookiedrie');
			case 'weeronline.nl': return _sl('img[src*="storage.weeronline.cloud/cookies"] ~ .btn-accept, button[class*="wol-cookies-module__btn_acceptAll"]');
			case 'wampirki.com': return _sl('#NavigationBar1 a');
			case 'tradukka.com': return _sl('#cookies_consent button');
			case 'radioveronica.nl': return _sl('.button[onclick*="allowCookies"]');
			case 'zorgverzekeringhema.nl': return _sl('#cookiemelder button');
			case 'meandermc.nl': return _sl('#meanderCookieDialog button');
			case 'longines.it': return _sl('.widget-cookie .allow');
			case 'alternativa.fr': return _id('sub_cookie');
			case 'groepsaccomodaties.org': return _sl('input[name="cookie_answer"] + .button_yes');
			case 'paskoluklubas.lt': return _sl('.cookies-buttons .button');
			case 'etransport.pl': return _sl('.NovemediaCookiePolicy .approve');
			case 'skyradio.nl': return _sl('.cookie-wall .button');
			case 'payback.it': return _sl('#modal_CookieConsentOverlay .pb-button[data-dismiss]');
			case 'privacy.sbs.nl': return _sl('#settings-form .submit-button-small');
			case 'telegraafvandaag.nl': return _sl('.ott-bottom #button-agree');
			case 'outlet.mediamarkt.nl': return _id('cookie-consent');
			case 'monnikenwerk.pzc.wegenerwordpress.nl': return _sl('.pronamic_accept_button');
			case 'rd.nl': return _sl('#myModal.in input[onclick="cookieInfo.setLevel(1)"]');
			case 'fashionlab.nl': return _sl('#cookiewarning button[onclick*="close_cookie_agreement"]');
			case 'opencaching.de': return _sl('.cookie-notice--body #js--cookie-notice--close-button');
			case 'tube.nl': return _sl('button.js-cookie-consent');
			case 'rechtopgeld.nl': return _sl('#cookiewet .btn-success');
			case 'reindicium.com': return _sl('#myModal .btn[onclick*="setCookie"]');
			case 'm.leroymerlin.pl': return _sl('.popup-close-button');
			case 'fristadskansas.com': return _sl('label[for="UserAcceptedCookies2"]');
			case 'ikgastarten.nl': return _sl('.cookie-processed .agree-button a');
			case 'cookiesv2.publiekeomroep.nl': return _sl('.btn[onclick*="submit"]');
			case 'tripplite.com': return _sl('#cookieMsg a[onclick="tl.setEUcookie();"]');
			case 'relaischateaux.com': return _sl('.cnil-isvisible .close-cnil');
			case 'tournamentsoftware.com': return _sl('#cookies__modal .btn--secondary');
			case 'polskifrontend.pl': return _ev("a[contains(., 'Rozumiem')]");
			case 'matspar.se': return _ev("button[contains(., 'Jag godkänner')]");
			case 'fnatic.com': return _ev("button[contains(., 'Accept Essential Cookies Only')]");
			case 'granice.pl': return _ev("button[contains(., 'Akceptuję')]");
			case 'beautywelt.de': return _ev("button[contains(., 'Alle akzeptieren')]");
			case '24kitchen.nl': return _sl('.cookie-container .submit-button');
			case 'henkel-reiniger.de': return _sl('.js-close-cookielayer');
			case 'gerritveldman.nl': return _sl('.gvca_ok_link');
			case 'hampshire.spydus.co.uk': return _sl('form[action*="ALLOWCOOKIES"] input[name="ACSUBMIT"]');
			case 'dulcogas.it': return _sl('.standalonelink[title="chiudere"]');
			case 'britishairways.com': return _sl('.cookieModalButton, .fancybox-overlay[style*="block"] #accept_ba_cookies');
			case 'weather-gb.com': return _sl('#privacy_consent_Modal[style*="block"] .btn[onclick*="Save"]');
			case 'bjuvsbostader.se': return _sl('#cookiecheck .btn');
			case 'zwangerschapspagina.nl': return _sl('.accept[href*="setcookie"]');
			case 'subaru.de': return _sl('.CookieLayer__button');
			case 'autovisie.nl': return _id('akkoord_text');
			case 'tradeplace.com': return _id('UIAcceptCookies_UIHyperLinkAccept');
			case 'team-rauscher.at': return _sl('.cookie.header .enable');
			case 'muddymatches.co.uk': return _id('cookie_permission_submit');
			case 'nebulacodex.com': return _sl('#capa .verde');
			case 'parliamentlive.tv': return _id('cookiesAccept');
			case 'ragepluginhook.net': return _sl('form[action*="CookieGate.aspx"] #acceptButton');
			case 'ravenblack.net': return _sl('input[type="submit"][value="I consent to this use of cookies"], input[onclick="eu_consent();"]');
			case 'scorito.com': return _sl('.cookieWallPreviewShutter + div #btnReturn');
			case 'sep.gr': return _id('apodoxiBtnCookies');
			case 'withgoogle.com': return _sl('a[href="http://www.cookiechoices.org"] + button');
			case 'lebar.sncf.com': return _sl('div[class*="CookieModal"] button + button');
			case 'suchdichgruen.de': return _sl('.important-notice .close-it');
			case 'smgcookies.nl': return _sl('.accept_box a.iaccept');
			case 'ratebeer.com': return _sl('input[type="button"][value="OK"]:not([id]):not([class])');
			case 'livep2000.nl': return _sl('.messagediv > a[href*="cookies"] ~ button[name="ok"]'); // livep2000.nl/monitor/cookieChoice.html
			case 'secureworks.co.uk': return _sl('.dsw-cookie-disclaimer .dsw-button');
			case 'my.moneypolo.com': return _sl('#cookie-strip .close-cookie');
			case 'choice.npr.org': return _sl('.user-actions #accept');
			case 'imhd.sk': return _sl('#cookieNotice a[href="#"]');
			case 'euroclix.nl': return _sl('#cookiesPreferencesForm button.press');
			case '9gag.com': return _sl('.gdpr.modal .blue');
			case 'mendrulandia.es': return _sl('#ventana #v_btAceptar');
			case 'cookiewall.finnik.nl': return _sl('.box form button[name="button"][type="submit"]');
			case 'hm.com': return _sl('#gdpr-modal .js-read-gdpr');
			case 'dokterdokter.nl': return _sl('.reveal-overlay[style*="block"] .button[name="acceptAllCookies"]');
			case 'motodesguacehnosgonzalez.com': return _sl('#cookies_policy.fade.in .btn-primary');
			case 'i-say.com': return _sl('.critical-modal.in .btn-primary');
			case 'purevpn.com': return _id('CTA_gdbrcontinue_analytic');
			case 'ivoox.com': return _sl('#gdpr-modal .btn-default');
			case 'discordbots.org': return _sl('.button[onclick*="HasSeenAnnoyingPopup"]');
			case 'slate.com': return _sl('.gdpr-form__consent');
			case 'wizaserwis.pl': return _sl('#promoinfo.open .modal-close');
			case 'mtc-it4.be': return _sl('.modal.fade.in .panel-warning .btn-warning');
			case 'time.com': return _sl('.gdpr-form .btn');
			case 'playtv.fr': return _sl('.grdp-button');
			case 'vanpartner.com': return _sl('.cookieslaw .closeBtn');
			case 'guce.oath.com': return _sl('.consent-form .agree-button-group .btn, .consent-container .btn[name="agree"]');
			case 'pathe.nl': return _sl('.btn[onclick*="CookieNotification.Accept"]');
			case 'allyouneedfresh.de': return _sl('#frmNoCookiesModal > a');
			case 'shmoop.com': return _sl('.btn.eu-opt-in, .privacy-notice .privacy-agree');
			case 'theforestmap.com': return _sl('.modal.fade.in #acceptcookies');
			case 'commentreparer.com': return _sl('.modal[style*="block"] #rgpd .btn.btn-danger');
			case 'societe.com': return _sl('#cookiesmodale .Button[name="cookiesall-oui"]');
			case 'gnkdinamo.hr': return _sl('#privacyPolicyModal.in .btn-confirm');
			case 'voyageforum.com': return _id('consent_button');
			case 'windguru.cz': return _id('butt_consent_psads_ok');
			case 'jobbird.com': return _id('gdpraccept');
			case 'toestemming.ndcmediagroep.nl': return _sl('form[action*="consent"] .buttons input');
			case 'alarmeringen.nl': return _sl('#modal #msg #accept');
			case 'ticketea.com': return _sl('#cookies-acceptance');
			case 'aoib.dk': return _id('consent-module-text-button');
			case 'hajduk.hr': return _sl('.cookie-popup__close');
			case 'overdrive.com': return _sl('.featherlight[style*="block"] .set-cookie__form input[type="submit"], #gdpr-modal[style*="block"] .cookie-popup__save, .cookieSettingsModal.open .confirm.button');
			case 'tappedout.net': return _sl('#gdpr-modal.in #tos-accept');
			case 'soccerstats.com': return _sl('.button[onclick*="cookiesok"]');
			case 'hanos.nl': return _sl('.banner_message[data-hanos-cookie-disclaimer][style*="block"] .btn[data-hanos-cookie-disclaimer-agree]');
			case 'brooksrunning.com': return _sl('.consent-form .consent-form__button.a-btn--primary');
			case 'hindustantimes.com': return _sl('.cookieswindow #agree');
			case 'avid.com': return _id('siteAlertAccept');
			case 'shop.avid.com': return _ev("button[contains(., 'Accept')]");
			case 'otpbank.hu': return _sl('.gdpr-btn-container .btn.btn-primary');
			case 'logicsupply.com': return _sl('.primary-button[href*="opt-in/?response=agree"]');
			case 'maa.nl': return _sl('.btn.accept-cookies');
			case 'chomikuj.pl': return _sl('#AcceptChomikujTermsForm .greenButtonCSS');
			case 'immobilien.net': return _sl('#root > div > div > section > p + .button.button--primary');
			case 'monsterhunterworld.com': return _sl('#gdpr.active #accept a');
			case 'imvu.com': return _sl('.privacy-policy-adult-dialog .accept-cookies');
			case 'postimees.ee': return _sl('.cookie-paywall__button');
			case 'livvin.com': return _sl('#welcome-message button[class*="Button__StyledButton"]');
			case 'werksite.nl': return _sl('.modal.show .btn[href*="allow"]');
			case 'allbinos.com': return _sl('.w3-modal[style*="block"] .w3-button[onclick*="polityka"]');
			case 'max.se': return _sl('.infoBanner .button');
			case 'newstalk.com': return _sl('#consent_modal.in .btn:not(.show-manage-settings)');
			case 'online.no': return _sl('.close-disclaimer .autofocus-el');
			case 'openpli.org': return _sl('div[onclick^="euCreateCookie"]');
			case 'privacy.vakmedianet.nl': return _sl('.general-cta-btn');
			case 'evaair.com': return _sl('.modal-box .cookie-close');
			case 'bluelagoon.com': return _sl('#app > div > p ~ button');
			case 'zekur.nl': return _sl('.modal[style*="block"] .tmakkoord');
			case 'elevensports.it': return _sl('#elevensports-privacy .close');
			case 'findaphd.com': return _sl('.cookieNoticeA .closeTab');
			case 'akamai.com': return _sl('.accept[data-module^="cookies"]');
			case 'mtmad.es': return _sl('button[class*="cookiesAlert__accept_button"]');
			case 'deondernemer.nl': return _sl('.cookiewall #cookiewall .button, button[name="acceptCookies"]');
			case 'todopvr.com': return _sl('#Button1[onclick*="cookiesOK"]');
			case 'clusterr.io': return _sl('cl-cookies-message .cl-btn');
			case 'schneider-umformen.de': return _sl('.cookie .button');
			case 'diabeter.nl': return _sl('#cookies button[name="cookies"]');
			case 'logistik-express.com': return _sl('#dsgvo[style*="block"] #cookies.lebutton-farbe');
			case 'kramp.com': return _sl('.cookie-message .button');
			case 'oskolaf.pl': return _sl('#modal-info.in .btn-podstawowy');
			case 'prvikvadrat.hr': return _sl('.modal.in .button--brand');
			case 'carglass.it': return _sl('#gdpr_compliance .button');
			case 'mapy.geoportal.gov.pl': return _sl('.appWelcome:not(.hide) .tos-button[onclick*="yes"]');
			case 'mkidn.gov.pl': return _sl('#myModal.in .btn-default');
			case 'gdansk.wios.gov.pl': return _sl('.sbox-content-adopt[style$="1;"] + #sbox-btn-close');
			case 'purepla.net': return _sl('.gdpr-cookies .agree-btn');
			case 'paypal-community.com': return _sl('.ui-dialog[style*="block"] #disclaimer #firstvisitbtn');
			case 'malmo.se': return _sl('#gdprConsent[style*="block"] .gdprConsent__btn');
			case 'wavesplatform.com': return _ev("span[contains(., 'ALLOW ALL')]");
			case 'ad.win.nl': return _sl('#cookieConsentBox[style*="block"] #cookieConsent');
			case 'kiplinger.com': return _sl('.kip-gdpr button');
			case 'rabobank.com': return _id('allowcookies');
			case 'robens-dn.de': return _sl('.grpelem > .Button');
			case 'retailtrends.nl': return _sl('.alert #accept');
			case 'nytimes.com': return _sl('.js-cookie-banner-link-optin, .shown.expanded button:first-child, #modal_gdpr[style*="block"] .accept_btn, .GDPRcta-btn, #cta-link-expanded-small.anchor_accept_cta, #accept_cta[class*="banner"]');
			case 'rofl-nerd.net': return _sl('input[name="consent"] + .btn');
			case 'jordans3d.planningwiz.com': return _sl('#policyModule .button');
			case 'chess24.com': return _sl('.dataConsentPopup[style*="block"] #data-consent-opt-in-all');
			case 'ing.com': return _sl('.cookie_consent[style*="block"] .btn, #cookiesDialog paper-button.ing-orange-tpp-cookies-dialog, .fancybox-wrap[style*="block"] #bcpm-altnotification-ok'); // think, developer ...
			case 'n26.com': return _sl('#gdpr-notice > div > div > div > button:first-child');
			case 'boligsiden.dk': return _sl('.modal.in .cookie-modal .o-btn');
			case 'royalenfield.com': return _sl('.re-cookie[style*="block"] .re-cookie-rht a');
			case 'teenmegaworld.net': return _sl('.cookie button');
			case 'belsat.eu': return _sl('.pum-active[data-popmake*="polityka"] .pum-close, .pum-active[data-popmake*="politika"] .pum-close, .pum-active[data-popmake*="policy"] .pum-close, .pum-active[data-popmake*="palityka"] .pum-close');
			case 'gazetabilgoraj.pl': return _sl('.pum-active[data-popmake*="komunikat"] .pum-close');
			case 'wschowa.info': return _sl('.pum-active[data-popmake*="uwaga"] .pum-close');
			case 'paks-bayern.weebly.com': return _sl('.banner .wsite-button[href*="willkommen"]');
			case 'hey.car': return _sl('#app button[data-testid*="cookieBanner-accept"], #app button[data-test-id*="cookieBannerAccept"]');
			case 'orliman.pl': return _sl('.policy .button--accept');
			case 'iradio.ie': return _sl('#myPrivacy.in .consentt');
			case 'chordify.net': return _sl('.consent-accept-all');
			case 'dnb.no': return _sl('#consent-modal[style*="block"] .consent-accept');
			case 'beardbrand.com': return _sl('.fancybox-opened .js-cookie-accept');
			case 'atal.pl': return _sl('.fancybox-opened .button-goInvest');
			case 'jointcommission.org': return _sl('.ui-dialog[style*="block"][aria-labelledby*="Cookies"] .ui-state-default:first-child');
			case 'pharmindex-online.hu': return _sl('#cookie_modal.in .btn[onclick*="cookieHide"]');
			case 'autotrader.nl': return _sl('button[aria-label="cookie-agreement"]');
			case 'aurubis.com': return _sl('.cookiepopup-close:not([style*="none"])');
			case 'tvasta.pl': return _sl('#infoModal.in .btn[data-dismiss]');
			case 'powiatslubicki.pl': return _sl('#myModal.in .btn[data-dismiss]');
			case 'agar.io': return _sl('#cc-notification[style*="block"] .cc-approve-button-thissite-ads');
			case 'f1racing.pl': return _sl('#box > #text + ul a[href*="x-set-cookie"]');
			case 'vivaldi.com': return _sl('#comments a[onclick*="AcceptCookies"]');
			case 'infosecurity.nl': return _sl('.btn[value="Akkoord"][onclick^="Send"]');
			case 'zurzeit.eu': return _sl('body > p > strong > a[href*="boxen/zur-zeit-aktuell"]');
			case 'webstaurantstore.com': return _sl('#user-data-policy-modal.show .btn[data-dismiss]');
			case 'stockhouse.com': return _sl('input[name="privacy-acceptance"] + .button');
			case 'meldpuntwegen.be': return _sl('.step-page.visible .cookie-melding.volledig + .button');
			case 'crowdestate.eu': return _sl('.modal.in .btn[ng-click*="gdprSave"]');
			case 'fctwente.nl': return _sl('.js-modal-cookie.is-visible .js-modal-accept');
			case 'ipla.tv': return _sl('app-rodo-rules-modal button + button');
			case 'tcroomburg.nl': return _sl('.cookiewall .btn-primary');
			case 'hepster.com': return _sl('.tingle-modal--visible .btn-cookie-primary');
			case 'okpal.com': return _sl('#js-hook-cookie .btn');
			case 'martinus.cz': return _sl('#gdpr.is-active .mj-gdpr-accept');
			case 'vox.pl': return _sl('#pgwModal #rodo_accept');
			case 'consent.talpanetwork.com': return _sl('meer-accept-cookie-policy meer-button, .package-choice-page button');
			case 'donneespersonnelles.rdvconso.org': return _sl('.ui-cookies .accept');
			case 'tipsyelves.com': return _id('cookie-consent-accept');
			case 'codra.net': return _sl('.cookie-consent.cookie--visible .btn');
			case 'kidioui.fr': return _sl('.blockingCookieAck .cookieACK .btn'); // voiture
			case 'milliman.com': return _sl('#cookieSection[style=""] .fillBtn');
			case 'goldenline.pl': return _sl('.gl-modal--visible .cookie-modal__form button');
			case 'ben.nl': return _sl('.cookie-wall-container .button--green');
			case 'wylecz.to': return _id('accept-targeting-disclaimer-button');
			case 'morrisonsislistening.co.uk': return _sl('#AcceptCookies ~ #Buttonholder #NextButton');
			case 'replika.ai': return _sl('a[href*="privacy"] + button');
			case 'investors.com': return _id('gdpr-accept-button');
			case 'e-sochaczew.pl': return _sl('#RODOCOOKIE.in .btn[onclick]');
			case 'norgips.pl': return _sl('#cookiemodal.in #accept-cookies-checkbox');
			case 'shoppable.com': return _sl('#cookiesModal.in .btn[data-dismiss]');
			case 'kaliber.pl': return _sl('#cookieModal.in .btn[onclick]');
			case 'travelchannel.co.uk': return _sl('#cppd .accept');
			case 'sites.google.com': return _sl('a[href^="https://www.google.com/policies/technologies/cookies/"] + div');
			case 'totalcasino.pl': return _sl('.popup-container[style*="block"] .gdpr-popup .accept_gdpr');
			case 'trubendorffer.nl': return _sl('#cookie_notice_popup.show .cta_button.primary');
			case 'jobserve.com': return _sl('#CookiePolicyPanel #PolicyOptInLink');
			case 'unive.nl': return _sl('#consent-wrapper .close-modal');
			case 'guce.yahoo.com': return _sl('#gucRefreshPage .loader-text a[href*="guccounter=2"]');
			case 'consent.yahoo.com': return _sl('.consent-wizard .btn.agree, .consent-form .btn[name="agree"], .error-wizard .btn.try-again-link');
			case 'eneco.nl': return _sl('.ReactModal__Overlay--after-open #AcceptCookiesButton');
			case 'pieseauto.ro': return _sl('.cookie-wall .js-submit');
			case 'dhbbank.nl': return _sl('#cookieModalCenter.show #cookieModalAcceptButtonFunctionaly');
			case 'wurth.es': return _sl('.lity-opened #grpd-fancy #cookie-success');
			case 'midas.co.za': return _sl('.cookiemodal.in .btn[data-dismiss]');
			case 'asnbank.nl': return _sl('.cookie-preference-modal .modal-visible .cookie-accept'); // hypotheken
			case 'voidu.com': return _id('eu-cookie-ok');
			case 'lavalleedestortues.fr': return _sl('.reveal-overlay[style*="block"] #modalCookies .button[href*="accept"]');
			case 'smartshop.hu': return _sl('.c-gdpr button');
			case 'fimfiction.net': return _sl('.cookie-consent-popup button[type="submit"]');
			case 'keepersecurity.com': return _sl('.cookie-consent-popup[style*="block"] .cookie_accept');
			case 'bakken.nl': return _sl('.cookie-info__button button');
			case 'quizme.pl': return _sl('#modal-consent[style*="block"] #give-consent-btn');
			case 'k-mag.pl': return _sl('.v--modal-rodo .btn-agree');
			case 'doka.com': return _sl('#cookie-modal--info.uk-open .uk-modal-close');
			case 'nieuwspoort.nl': return _sl('.reveal-overlay[style*="block"] #cookie-consent .button[href*="accept"]');
			case 'flybe.com': return _sl('#cookie-policy-modal.in #accept-cookies');
			case 'cookies-accept-nl.weeronline.cloud': return _sl('.content > .btn-accept');
			case 'cashconverters.be': return _sl('#dialogRGPD.in .btn[onclick*="accept"]');
			case 'buzz.ie': return _sl('#gdpr-consent-notice[style=""] .gdpr-button-consent');
			case 'rjwatches.com': return _sl('app-gdpr-modal .agree-wrapper button');
			case 'contractix.de': return _sl('.b7cConsent .b7cButton button');
			case 'startsmarthome.de': return _sl('#dws01-modal:not(.hidden) .close-modal'); // service
			case 'hech.be': return _sl('.bootbox-alert.in .btn-primary');
			case 'forever21.com': return _sl('#cookiesPopup[style*="block"] button[onclick*="AcceptCookie"]');
			case 'hondanews.eu': return _sl('#cookiesPolicyBanner[style*="block"] .caption-anchor[onclick*="createCookieConsent"]');
			case 'cameo.com': return _id('cookie-policy-banner-close-btn');
			case 'vandebron.nl': return _sl('.cookiebar-container .cookiebar-button');
			case 'zorgdirect.nl': return _sl('.c-modal.is-cookie.is-active #submitCookie');
			case 'bosch-mobility-solutions.com': return _sl('.disableCookieScroll .btn-coockie');
			case 'studio-eight.com': return _id('cookieAgreementSubmit');
			case 'tmdn.org': return _sl('#content #buttonBox ._button');
			case 'rituals.com': return _sl('.js-accept-cookies');
			case 'mysuzuki.hu': return _sl('.reveal-overlay[style*="block"] .js-accept-cookies');
			case 'gosh.no': return _sl('.modal.in #agreed_privacy_policy');
			case 'bokadirekt.se': return _sl('#cookie-modal .cookie-modal-button.primary');
			case 'hrblock.com': return _sl('.show-cookie-banner-eu #cookie-banner-eu .cbe__yes');
			case 'analog.com': return _sl('#cookie-consent-container.in .btn-success');
			case 'aldi-blumen.de': return _sl('.message_overlay[style*="block"] .button.center');
			case 'giz.berlin': return _id('privacyInformationClose');
			case 'msn.com': return _sl('#cacpageoverlay .accept, .optanon-allow-all-button, #onetrust-banner-sdk:not([style*="none"]) #onetrust-accept-btn-handler');
			case 'bk.com': return _sl('#cookie-popup[style*="block"] .btn-primary');
			case 'paravol.org': return _sl('.cookie-modal.in .btn[onclick*="agreeAndContinue"]');
			case 'lyricstraining.com': return _sl('#privacy-update-dialog[style*="block"] .accept');
			case 'pizzafan.gr': return _sl('#accept_cook.in #accept_cook_1 .button');
			case 'kiddle.co': return _sl('.warning_message .cookie_btn');
			case 'mcdonalds.be': return _sl('.c-languages-page__button[href*="languages-page-accepted"]');
			case 'zorg-en-ict.nl': return _sl('.cookiewall-body .btn');
			case 'taimweser.com': return _chain('.modal[style*="block"] #verAjustesCookies', '#cookiesFuncionalesNo', '#cookiesPersonalizacionNo', '#guardarAjustesCookies');
			case 'hanos.be': return _sl('.banner_message[data-hanos-cookie-disclaimer][style*="block"] .btn[data-hanos-cookie-disclaimer-agree]');
			case 'surplus-lemarsouin.com': return _sl('#modal.show .btn[onclick*="Accept"]');
			case 'worldarchitecture.org': return _sl('#prvcsetModal.in #aggr');
			case 'bynco.com': return _sl('.cookie-accept-button .btn');
			case 'walmart.ca': return _sl('.privacy-open #accept-privacy-policies');
			case 'holmesplace.com': return _sl('.disableScroll .cookie-footer button');
			case 'klickmal.at': return _sl('#cookiemodal[style*="block"] .btn');
			case 'thewirecutter.com': return _sl('span[data-gtm-trigger="cookie_banner_dismiss"]'); // e
			case 'zemskidki.ru': return _sl('.warning-top--cookies:not([style*="none"])');
			case 'audi.co.uk': return _sl('.welcome-modal-content_after-open[aria-label*="Cookie"] .welcome-modal-content__close-button');
			case 'mtglotusvalley.com': return _sl('.v-dialog--active.v-dialog--persistent button + button');
			case 'canyon.com': return _sl('.modal.is-open #js-data-privacy-save-button');
			case 'talparadio.nl': return _sl('div[class*="CookieDialog__cookies__button"] > a');
			case 'bigbigchannel.com.hk': return _sl('.cookie_banner_padding #accept_cookie_policy');
			case 'brugge.be': return _sl('.cookie-preferences.in .js-btn-accept-all');
			case 'ps.be': return _sl('#CookieAlert.in .btn-primary');
			case 'soesterberg.nu': return _sl('.c-accept .wdpu-close');
			case 'sportmaniac.ro': return _sl('#gdprModal:not([style*="hidden"]) #accept-all-2');
			case 'fluidui.com': return _sl('#gdprModal.in .gdprModalBtn');
			case 'fotowien.at': return _sl('.js-cookie-consent.overlay--visible .js-cookie-consent-ok');
			case 'usefyi.com': return _sl('.marketing__modalContainer .GDPR-saveButton');
			case 'saxion.edu': return _sl('.cookie-wall-open .js-allow-cookies');
			case 'patient.info': return _sl('#cookie-policy-overlay[style*="block"] .alert__close');
			case 'imobiliare.ro': return _sl('#modalCookies.in .btn-actiune');
			case 'azoresgetaways.com': return _sl('#cookie-alert-popup.in #cookie-ok');
			case 'muzyczneradio.pl': return _sl('#modal-rodo.in .btn-success');
			case 'rynek-turystyczny.pl': return _sl('#modal-rodo[style*="block"] #saveCookiesAccept');
			case 'axa-corporatesolutions.com': return _sl('.js-root > div > div > div > div > div > div > div > a:first-child + a');
			case 'gofundme.com': return _sl('.hd_alert a[href*="privacy"] ~ a.js-close-button');
			case 'drjacobs-shop.de': return _sl('.cookieModal #acceptCookies');
			case 'tixr.com': return _sl('.overlay-active #overlay .button[action="confirm"]');
			case 'puydufou.com': return _sl('#rgpd-cookie-block.cookiergpd-actif .accept-cookie');
			case 'kokoroe.fr': return _sl('#rgpdmodal.in #closeRgpd');
			case 'vijfhart.nl': return _sl('.cookie-alert[style*="display"] .cookie__accept');
			case 'tapperuse.nl': return _sl('.cookie-notice-popup__close.btn');
			case 'fideliti.co.uk': return _sl('.ui-dialog[style*="block"] #ctl00_CookieControl1_AcceptCookieButton');
			case 'dellmont.com': return _sl('#privacyModal.in .btn-success');
			case 'gelmar.co.za': return _ev("button[contains(., 'I consent')]");
			case 'godbolt.org': return _sl('#alert.modal.show .close');
			case 'gefran.com': return _sl('.fancybox-opened #cookie-policy .btn-primary');
			case 'weforum.org': return _ev("button[contains(., 'I accept')]"); // intelligence
			case 'instock.nl': return _sl(".has-consent-popup .b-consent-popup .js-close-consent-popup");
			case 'aia.gr': return _sl("#pcmsCookieDialog .agreeCookie");
			case 'converse.com': return _sl("#modal-cookiePolicy.modal-active .accept-button");
			case 'tnt-click.it': return _sl(".mfp-ready .mfp-close");
			case 'tiger.nl': return _sl('.reveal-overlay[style*="block"] #cookieMessage .ConsentButton');
			case 'cookieservice.aginsurance.be': return _sl('.ag-CookieConsentWrapper button[ng-click*="allowAllCookies"]');
			case 'vietnamairlines.com': return _sl('.cookie-accept-box:not([style*="none"]) #cookie-agree');
			case 'bauermedia.co.uk': return _sl('#cookies-modal.in .c-btn[data-ref="cookies-agree"]');
			case 'inrs.fr': return _sl('#GDPRCookiesConsentBanner .accept');
			case 'veloenfrance.fr': return _sl('#conditions.in #oui');
			case 'xn--nringslivnorge-0ib.no': return _sl('#vicky-cookiebox[style*="block"] .vicky-cookie-yes'); // næringslivnorge.no
			case 'flikflak.com': return _sl('.reveal-overlay[style*="block"] .js-modal-cookie-accept');
			case 'rpgrealm.nl': return _sl('.button[href*="cookies/accept"]');
			case 'renaultfinanciacion.es': return _sl('.active .cssnk_modal__button--accept_and_continue');
			case 'meurthe-et-moselle.fr': return _sl('.modal.in .btn[onclick*="CookiesOk"]'); // rando
			case 'e3expo.com': return _sl('body > div > div[class^="view__Background"] button[class^="view__SubmitButton"]'); // live
			case 'saudia.com': return _sl('.ui--popup[style*="block"] .approve-website-cookies #travelContinue');
			case 'binance.je': return _sl('#__next > .layout > main ~ div a[href*="support.binance.je"] + div');
			case 'casadellibro.com': return _sl('.header ~ div > button');
			case 'hirado.hu': return _sl('#cookie:not([style]) .hms_cookeBbc_activate');
			case 'checkvenlo.nl': return _sl('.cc-grower .cc-banner:not(.cc-invisible) .cc-btn[aria-label="allow cookies"]');
			case 'gulbenkian.pt': return _sl('.cookie-modal.display-block .btn-primary');
			case 'saa.nl': return _sl('.GDPR-popup.show .btn[ng-click*="savePrivacy"]');
			case 'mltracker.co.uk': return _sl('#cookieModal.show .close');
			case 'otpportalok.hu': return _sl('.pop_up_bg .cookie_button_col_btn button');
			case 'arte.tv': return _sl('.popup_cookies.active .button.active, .modal[style*="block"] #acceptAllCookiesBtn');
			case 'cip.nl': return _sl('.container > .justify-content-center #accept');
			case 'jm.se': return _sl('.cookie-accept-modal .button--main-cta');
			case 'motofaktor.pl': return _sl('.rodo[style*="flex"] .rodo-accept');
			case 'pactcoffee.com': return _sl('#app > div > div > a[href*="cookies"] + button');
			case 'danishfamilysearch.com': return _sl('.cookie-notice #btn_cookieok');
			case 'medicijnnodig.nu': return _sl('.ui-dialog[style*="block"] #cw_message_ok');
			case 'rodoviariadooeste.pt': return _sl('.pea_cook_wrapper #pea_cook_btn');
			case 'argenta.be': return _sl('#cookieConsentModal:not([aria-hidden]) #acceptAllCookiesBtn');
			case 'elsate.com': return _sl('#cookies_types + div > .button[onclick*="setCookie"]');
			case 'noriel.ro': return _sl('.agreementMessage[style*="table"] .daAgree');
			case 'vinbanken.se': return _sl('.fancybox-overlay[style*="block"] .cookie-takeover-inner > a');
			case 'mobilevikings.be': return _sl('.cookieWall.isVisible #btn-accept-cookies, .cookieWall.isVisible .button[data-jest-id="accept"]');
			case 'qioz.fr': return _sl('#cookies-popup[style*="block"] #acceptCookies');
			case 'union.nl': return _sl('.c-cookie-bar[data-redirect] .cookie-bar__button[js-hook-cookies-accept]');
			case 'melcloud.com': return _sl('#divCookie[style*="block"] .cookie-link a + a');
			case 'dane.gov.pl': return _sl('.modal.show #footer-close');
			case 'vakantieveilingen.nl': return _sl('.tingle-modal--visible .btn[data-click="cookies/accept"]');
			case 'ivolta.pl': return '.modal[style*="block"] #cookiebar-accept-btn';
			case 'krefting.de': return _sl('#cookieNote.in .close');
			case 'usercontrol.co.uk': return _sl('#cookieconfirm:not([style*="none"]) button'); // e
			case 'viberate.io': return _sl('#modal-cookies[style*="block"] #btn-cookies-accept');
			case 'spatiicomerciale.ro': return _sl('#modalCookies[style*="block"] .btn-actiune--principal');
			case 'snyk.io': return _sl('#cookie-disclaimer #cookie-link');
			case 'resources.techcommunity.microsoft.com': return _sl('.has-cookie-bar #catapultCookie');
			case 'tikkio.com': return _sl('.mfp-ready #gdpr-accept');
			case 'mozio.com': return _ev("span[contains(., 'Agree, hide this')]");
			case 'materialdistrict.com': return _sl('.md-modal-cookie #accept');
			case 'alan.com': return _sl('#root > div > button');
			case 'elsevier.com': return _sl('#cookie-modal[style*="block"] #accept-cookies'); // journalinsights
			case 'viva.gr': return _sl('.cc-bar .cc-btn');
			case 'corbby.com.pl': return _sl('.termspopupcontainer .termsagree');
			case 'membersuite.com': return _sl('.cc-window .cc-btn'); // e
			case 'songsterr.com': return _sl('header ~ section #accept');
			case 'cfos.de': return _sl('.modal[style*="block"] .btn[onclick*="accept_cookies"]');
			case 'lego.com': return _sl('#___gatsby ~ [role="dialog"] a[href*="cookies"] ~ button, button[data-test="cookie-necessary-button"]');
			case 'live.globalplayer.com': return _sl('.gdpr-modal .gp-btn');
			case 'webmd.com': return _sl('.eugdpr-consent-button');
			case 'conseil-national.medecin.fr': return _sl('#rgpd-popin:not(.hide) .save-preference');
			case 'bunq.com': return _sl('.cookie-consent-modal-displayed .button-action-save-cookie-settings');
			case 'eon.de': return _sl('.cookie.in[style*="block"] #cookieLayerAcceptButton');
			case 'cloudvps.com': return _sl('.js-generic-module[action*="cookie-consent"] button');
			case 'kitsound.co.uk': return _sl('#cookie_consent_container .accept');
			case 'skip-me.top': return _sl('.sweet-alert[style*="block"] .got-cookie');
			case 'bosch-heroes.com': return _sl('.BoschPrivacySettingsV2.is-open .BoschPrivacySettingsV2__button');
			case 'paradoxplaza.com': return _sl('#cookies-info:not(.cookie-info-disabled) .accept-cookie-policy');
			case 'yello.de': return _sl('#cookieconsent[open] .js-cookie-consent-action, .modal-stage--open .js_cookie-accept');
			case 'rambus.com': return _sl('.consent-modal[style*="block"] #consent_agree');
			case 'kayak.pl': return _sl('.cdk-overlay-container .ok-button');
			case 'fenb.be': return _sl('.cdk-overlay-container #acceptBtn');
			case 'bien-zenker.de': return _sl('.cookie-settings-submitall');
			case 'enbw.com': return _sl('.dialog.opt-in-dialog .eventelement-trackingOptIn, #cookie-overlay-modal.modal-stage--open .js_cookie-accept, .overlay-agreement .button--primary, .modal .cookie-agreement__confirm button');
			case 'soliver.de': return _sl('.jsPrivacyBarSubmit');
			case 'otwarteklatki.pl': return _sl('#popup-gdpr.visible .button-gdpr-agree');
			case 'erdinger.de': return _sl('.overlay.s-is-open .cp-confirmSelected');
			case 'luxortheater.nl': return _sl('.cookiewallBox #acceptCookies');
			case 'stadt-kuehlungsborn.de': return _sl('#cookieModal[style*="block"] .fixed-cookie-button');
			case 'sklep.regmot.com.pl': return _sl('.mfp-ready #RodoPopup .mfp-close');
			case 'engie-energie.nl': return _sl('#cookieModal[style*="block"] .button.close-modal');
			case 'adac-shop.de': return _sl('.has--cookiebot .cookiebot--close + button');
			case 'resume.se': return _sl('#__next > header ~ div > p ~ a[color]');
			case 'signatur.frontlab.com': return _id('ctl00_cookieDisclaimerAcceptedBtn');
			case 'mymuesli.com': return _sl('.popup-instance.show[data-identifier="cookies-consent"] .tm-cookies-consent-accept');
			case 'springlane.de': return _sl('#cookieLayer:not(.hidden) .js-btn-cookie-allow');
			case 'trans-missions.eu': return _sl('.cookie-modal.show a[onclick*="agreeAndContinue"]');
			case 'chainethermale.fr': return _sl('.modal__overlay--opened .cookie-notice__actions .primary');
			case 'lunii.fr': return _sl('.cookies-main-container .submit-button');
			case 'blitzhangar.com': return _sl('.cookie-consent-banner__accept');
			case 'cinemaxx.de': return _chain('.modalCookies.active .modalCookies_button-chosen', '.modalCookies.active .modalCookies_button-chosen');
			case 'amministrazionicomunali.it': return _sl('#cp-container:not([style*="none"]) #cookie-policy-agree-onlynecessary a');
			case 'healthsoul.com': return _sl('#GDPRModal[style*="block"] #GDPR-button');
			case 'telekom.com': return _sl('.cookie-optin-layer .btn-brand');
			case 'iberiaexpress.com': return _sl('#cookiesTermsModal[style*="block"] #acceptCookiesTerms');
			case 'kieskeurig.nl': return _sl('.js-consent-accept');
			case 'hogrefe.de': return _sl('.fancybox-is-open #fancybox-cookie-consent-settings .set-setting');
			case 'colors-effects.eu': return _sl('.ce-cookieSettings .ce-btn-light');
			case 'piw.pl': return _sl('.fancybox-is-open #rodo-modal .btn');
			case 'bbcchildreninneed.co.uk': return _sl('#modal-cookieConsent.is-active #cincpt_cookie_accept');
			case 'mulders-opel.nl': return _sl('.modal[style*="block"] #legal-cookie-accept');
			case 'parfuemerie.de': return _sl('.fancy-box-containerCookiemanager.fancybox-opened #accept-cookies-all');
			case 'filmboxlive.com': return _sl('.mobox-wrapper[style*="block"] #cookiePolicyOK');
			case 'olimerca.com': return _sl('#modalCookies.in .btn[onclick*="Accept"]');
			case 'howardrecords.com': return _sl('#root > div > div > button');
			case 'global.commerce-connector.com': return _sl('.cookie-notice > a');
			case 'fitx.de': return _sl('.cookie_overlay--shown .cookie_overlay__button--all');
			case 'nerim.com': return _sl('#cookies-box[style*="block"] .accept-cookies');
			case 'energyavenue.com': return _sl('.fancybox-overlay[style*="block"] .green-btn[href*="acceptcookies"]');
			case 'contasconnosco.pt': return _sl('.modal-mask--cookies button');
			case 'stoffenshop.eu': return _sl('#cookiePoppup[style*="block"] .btn-success');
			case 'vodafonetvonline.es': return _sl('.ngdialog .link[ng-click*="cookies.accept"]');
			case 'win2day.at': return _sl('.cookie-notification[style*="block"] .commitSelection');
			case 'careers.yardi.com': return _sl('#cmw-confirm-cookies[style*="block"] #cookieCheckAcceptAll');
			case 'hardware.info': return _sl('.cookie-wall__body .cookie-wall__cookie-container #decision[name="accept"]');
			case 'swindi.de': return _sl('#privacy-modal[style*="block"] .btn-success');
			case 'raiffeisen-immobilien.at': return _sl('#privacy-modal[style*="block"] .btn-primary');
			case 'lifecell.net': return _sl('#cookie-modal[style*="block"] #cookie-agree');
			case 'infineon.com': return _sl('#cookie-modal[style*="block"] .btn-submit');
			case 'philasearch.com': return _sl('#cookie-modal[style*="block"] .button.primary');
			case 'devdocs.io': return _sl('._notif._in ._notif-link[data-behavior="accept-analytics"]');
			case 'naekranie.pl': return _sl('#modal-rodo-info[style*="block"] .accept-rodo');
			case 'we-worldwide.com': return _sl('#cookieNotification[style*="block"] .js-cookie-allow');
			case 'conradconnect.com': return _sl('.eu-cookie-compliance-banner .agree-button');
			case 'iriedaily.de': return _sl('#cc-modal[style*="block"] .cc-save');
			case 'apartmenttherapy.com': return _sl('.jw-popup-cookies .jw-button');
			case 'ganinex.com.pl': return _sl('body > div[id^="sil-global-vue"] .popup .footer a');
			case 'konbini.com': return _sl('.modal .cookies-consent-content .button.primary');
			case 'lescommis.com': return _sl('.modal.in[aria-labelledby="confirm-modal-label"] .btn-default');
			case 'hasura.io': return _sl('#content > div > div > div > a[href*="privacy"] ~ img[alt*="Close"]');
			case 'tirerack.com': return _sl('.modalContainer[style*="block"] button[onclick*="acceptTerms"]');
			case 'itsnicethat.com': return _sl('.fixed > .bg-mineshaft button.bg-sun');
			case 'pewdiepie.store': return _sl('#gatsby-focus-wrapper div[class*="CookiesNotification"] button');
			case 'blackboard.com': return _sl('.CookieConsent #agree_button');
			case 'ae.com': return '.qa-modal-ccpa.ember-view .qa-reject-cookie-modal-ccpa, .qa-modal-gdpr.ember-view .qa-block-cookie-modal-gdpr';
			case 'bytbil.com': return _sl('.uk-modal[style*="block"] #privacyModalAcceptBtn');
			case 'inshared.nl': return _sl('.modal[style*="block"] .cookie-settings__button-left');
			case 'pointblankmusicschool.com': return _sl('.fancybox-overlay[style*="block"] .accept[onclick*="cookieControl"]');
			case 'werkenbijpathe.nl': return _sl('.cookie-notification__button:last-child');
			case 'kempen.com': return _sl('.cookie-bar--is-visible .button[data-js-hook="accept-button"]:not([disabled])');
			case 'wuestenrot.at': return _sl('.fancybox-overlay[style*="block"] .cookiePopup .button');
			case 'officiallondontheatre.com': return _sl('#cookie-consent > .open .mt3 > div:last-child a');
			case 'ferienwohnungen-ferienhaeuser-weltweit.de': return _sl('#Modal_Cookie_Hinweis[style*="block"] .btn[data-dismiss]');

			case 'technischesmuseum.at': return _sl('.modal[style*="block"] .btnAcceptAll');
			case 'atlasobscura.com': return '.modal[style*="block"] .js-cookie-consent-accept';
			case 'klett.de': return _sl('.modal[style*="block"] footer[id*="cookie-consent"] .btn-primary');
			case 'elearningindustry.com': return _sl('.modal[style*="block"] form[action*="cookie-preferences"] .btn-success');

			case 'tvplayer.com': return _sl('.modal.show #cookie-consent-modal .btn, #cookie-consent-modal.in .btn'); // e
			case 'zolecka.pl': return _sl('#fancybox-wrap[style*="block"] #cookiePrivacyButton');
			case 'telekom-dienste.de': return _sl('.cookie-conf ~ .btn-primary');
			case 'mcdonalds.at': return _sl('.cc-bg .cc-allow');
			case 'jobnet.dk': return _sl('#StatCookieConsentDialog[style*="block"] #AcceptStatCookie');
			case 'allround-pc.com': return _sl('.open [trigger-id="apcTrackingSavePreferences"]');
			case 'netze-bw.de': return _sl('#ndCookieConsent[style*="block"] #btnAcceptAllCookies');
			case 'meteo-parapente.com': return _sl('.rules-acceptation .prefered');
			case 'marktomarket.io': return _sl('#js-privacy-consent:not([style*="none"]) .btn--accept');
			case 'vvebelang.nl': return _sl('#cookieModal[style*="block"] #cookie-approve');
			case 'eboo.lu': return _id('cookie-authorize-btn');
			case 'opngo.com': return _sl('.cookie-banner-modal[style*="block"] .cookie-accept-all > div');
			case 'moteurnature.com': return _sl('.consentcontainer[style*="block"] #dw_accept_all');
			case 'nuxeo.com': return _sl('#cookie-inform-message:not([style*="none"]) .button');
			case 'campagne.krant.nl': return _sl('#CookieWall .wall .ButtonCta');
			case 'zappi.io': return _sl('.legal-wrapper .btn');
			case 'econt.com': return _sl('.gdpr-modal .btn[ng-click*="accept"]');
			case 'thomas-krenn.com': return _sl('#xtxNavigationOffCookiePolicy[aria-hidden="false"] [data-cookie-overlay-save]');
			case 'jostchemical.com': return _sl('.privacy-banner button');
			case 'falter.at': return _sl('#cookieconsent:not(.hidden) .btn-default');
			case 'mcdirect.com': return _sl('#privacy-policy-root[style*="block"] .btn');
			case 'blackstonefootwear.com': return _sl('#cookiewall.is-open .cookiewall__accept');
			case 'eko-motorwear.com': return _sl('.featherlight[style*="block"] #accept_all_cookies');
			case 'smartloop.be': return _sl('#cookie_modal[style*="block"] .btn');
			case 'fleetyards.net': return _sl('.modal.show .panel-btn[data-test="accept-cookies"]');
			case 'ing.lu': return _sl('.cookieBar .btn-primary');
			case '180grader.dk': return _sl('.modal.show modal-cookie .btn-success');
			case 'mysimpleshow.com': return _sl('#overlay:not([style*="none"]) .slug-cookie-consent .ok');
			case 'credit-suisse.com': return _sl('.m-consent-manager-open .consent-cookie-accept-all');
			case 'neff-home.com': return _sl('.o-cookielaw[style*="block"] .js-accept');
			case 'the12volt.com': return _sl('#consent_form input[type="submit"][name="Accept"]');
			case 'e-shelter.de': return _sl('#sliding-popup .agree-button');
			case 'universiteitleiden.nl': return _sl('.cookies-overlay ~ .cookies .accept');
			case 'icould.com': return _sl('#cookie-blackout-curtain:not(.hide) .gdpr-submit');
			case 'stryker.com': return _sl('.modal[style*="block"] .btn-yes-hcp-modal');
			case 'kivra.se': return _sl('#___gatsby div[class*="CookieSplash"] button[class*="accept"]');
			case 'skb.si': return _sl('.cookiesSplash.open .cookiesSplashSaveAll');
			case '1blu.de': return _sl('.glightbox-open .mycookie-ok-btn');
			case 'refoweb.nl': return _sl('#cookieconsent button');
			case 'studienstiftung.de': return _sl('.modal[style*="block"] #CookieForm .btn-primary');
			case 'bol.com': return _sl('.modal[open] .consent-modal .js-confirm-button, #__next button[class*="CookieModal"]:first-child, div[data-componentid*="cookie-popup"] button:first-child');
			case 'lektury.gov.pl': return _sl('.modal[style*="block"] .cookies-accept-btn');
			case 'hawle.de': return _sl('#cookie-notice[style*="block"] .btn[data-dismiss]');
			case 'pruadviser.co.uk': return _sl('#cookie-notice[style*="block"] .cookie--accept');
			case 'omictools.com': return _sl('#cookie-policy-intro-dialog[style*="block"] .js-accept-all-intro');
			case 'vier-pfoten.de': return _sl('.modal[style*="block"] .module-privacy__accept');
			case 'mcl.de': return _sl('.js--mcl-accept-all-cookies');
			case 'etos.nl': return _sl('#cookie-modal.modal--is-showing .c-button--primary');
			case 'aucoffre.com': return _sl('.cookiesModal .btn-primary');
			case 'bazzar.hr': return _sl('.modal[style*="block"] .js-cookies-eu-ok');
			case 'player.fm': return _sl('.top-promo.legal-disclaimer .promo-accept');
			case 'hettalentenhuis.nl': return _sl('#cookie_bar .cookie-buttons button + button');
			case 'future-x.de': return _sl('#cookieBar[style*="block"] .buttonFTX');
			case 'cottonon.com': return _sl('#gdpr-policy-container #accept-cookies');
			case 'vodafone.de': return _sl('#dip-consent[style*="block"] .red-btn');
			case 'fega-schmitt.de': return _sl('.cookieWarning-container[style*="block"] .btn-accept');
			case 'astro.hr': return _sl('#privacy a[href*="gdpr_consent=accept"]');
			case 'audioboom.com': return _sl('div[id^="cookie-modal"] .modal[style*="block"] .btn.mrs');
			case 'wins.pl': return _sl('#cookies-modal[style*="block"] .close');
			case 'revistainforetail.com': return _sl('.modalCookies.in .btn');
			case 'arbeiterkammer.at': return _sl('.modal[style*="block"] .btn-accept-cookies');
			case 'swietawdomu.pl': return _sl('#cf-root.cookiefirst-root button[data-cookiefirst-button="primary"]');
			case 'hanover.com': return _sl('#cookieSettingsModal[style*="block"] .btnAccept');
			case 'xsports.lv': return _sl('.notice-cookie #cookie_allow_button');
			case 'pvcvoordeel.nl': return _sl('.js-cookie-popup.visible .js-popup-close');
			case '511tactical.com': return _sl('#cookieModal[style*="block"] .accept-settings');
			case 'certideal.com': return _sl('.cookie-preferences-on #cookie-go');
			case 'patronite.pl': return _sl('.modal--container .modal__action > div');
			case 'weblager.dk': return _sl('.modal[style*="block"] .btn');
			case 'billomat.com': return _sl('.remodal-is-opened #privacy-save');
			case 'pazarluk.com': return _sl('.remodal-is-opened .cookies-consent-btn');
			case 'antiquite-neuvillefranck.fr': return _id('sdgdpr_modal_buttons-agree');
			case 'thewinecellarinsider.com': return _sl('#tzPrivacyPolicyModal[style*="block"] #popup-close');
			case 'sparkassen-direkt.de': return _sl('#consent #sConsent');
			case 'zst-tarnow.pl': return _sl('#modal:not([style*="none"]) #agree');
			case 'kognitio.com': return _sl('.cookie-popup:not([style*="none"]) .cookie-close');
			case 'test-achats.be': return _sl('.mfp-ready #acceptAllCookiesTop');
			case 'der-farang.com': return _sl('.consent_accept');
			case 'norwegianreward.com': return _sl('#modalDataConsent[style*="block"] .re-button--success');
			case 'superdrug.com': return _sl('#privacy[style*="block"] .privacy-policy-popup__ok-btn');
			case 'doleasingu.com': return _sl('.modal[style*="block"] .btn[onclick*="WHClosePrivacyWindow"]');
			case 'yoump3.app': return _sl('.notice-container[style*="block"] .accept');
			case 'zeoob.com': return _sl('#cookies_modal[style*="block"] .btn-success');
			case 'pocztapolska24.pl': return _sl('#terms-drop[style*="block"] #close-me');
			case 'budapestbank.hu': return _sl('#gdpr-consent-modal .btn--primary');
			case 'werkenbijcalco.nl': return _sl('#cookie-modal-container .modal[style*="block"] .btn-submit');
			case 'cupsell.pl': return _sl('.tingle-enabled .tingle-modal-box__footer .btn');
			case 'cloudhealthtech.com': return _sl('.gdpr-container .btn');
			case 'puressentiel.com': return _sl('.mfp-ready .popup-form-rgpd #btn-accepter');
			case 'roms-download.com': return _sl('.modal[style*="block"] .btn[onclick*="kuk"]');
			case 'sg-zertifikate.de': return _sl('.cookie-preferences .button-focus');
			case 'bienwaldfitness.de': return _sl('#cookie_banner_modal[style*="block"] .btn-success');
			case 'store.leica-camera.com': return _sl('.js--modal.cookie--permission[style*="block"] .cc-dismiss');
			case 'matines.com': return _sl('.modal[style*="block"] .cookies .okbtn');
			case 'premiumkino.de': return _sl('.in .cookie-alert-modal-component .btn.center');
			case 'reidl.de': return _sl('.reveal-overlay[style*="block"] .bookies-zustimmen');
			case 'ocs.fr': return _sl('#rgpd-notice[style*="block"] #rgpd-notice-accept');
			case 'lm.be': return _sl('#cookiesmodal[style*="block"] #cookies-submit-all');
			case 'swipbox.com': return _sl('.modal[style*="block"] #coi-banner-wrapper #acceptAll');
			case '4gamers.be': return _sl('.popup #accept');
			case 'themisbar.com': return _sl('.modal[style*="block"] .btn[onclick*="cookieConsent"]');
			case 'acerta.be': return _sl('#modal-cookie.active .btn[data-modal-all]');
			case 'contofacto.it': return _sl('.privacypp.open .confirm');
			case 'kawasaki.de': return _id('LinkButton_Agree');
			case 'halebop.se': return _sl('.cookie-banner-modal:not([style*="none"]) #btncookieconsent');
			case 'packback.co': return _sl('.cdk-overlay-container .cta-large-button');
			case 'markets.com': return _sl('.cookie-modal:not(.d-none) .cookies-accept-all');
			case 'bstbk.de': return _sl('#privacy.fx_layer-visible button[onclick*="confirm"]');
			case 'unikrn.com': return _sl('.cookie-notice-visible #cookie-notice button');
			case 'technikmuseum.berlin': return _sl('.close-cookiebanner');
			case 'telekom.hu': return _sl('#cookie_consent:not([style*="none"]) #accept_all_cookies');
			case 'rku-it.de': return _sl('#cookienotice:not([style*="none"]) #accept-cookie');
			case 'nouvelobs.com': return _sl('.video-wall__button');
			case 'surveytandem.com': return _sl('.popup[ng-show="consentPopup"] .btn');
			case 'stapler.de': return _sl('.modal-dialog[style*="block"] #cookies-accept-all');
		}

		if (host.parts.length > 2) {
			host.parts.shift();
			host.full = host.parts.join('.');
			return getSelector(host);
		}

		return false;
	}


	// Search loop function

	var timeoutDuration = 500;

	function searchLoop(counter, host) {
		setTimeout(function () {
			var response = getSelector(host);

			if (response) {
				var clickCounter = 0, clickLoop = setInterval(function () {
					var e = typeof response == 'string' ? _sl(response) : response;

					if (e && e.click && !e.classList.contains(classname)) {
						e.classList.add(classname);

						// Give some more time for the DOM to setup properly
						setTimeout(function () { e.click(); }, 500);

						clearInterval(clickLoop);
					}
					else {
						clickCounter++;

						if (clickCounter > 50)
							clearInterval(clickLoop);
					}
				}, 200);
			} else if (counter < 200)
				searchLoop(counter + 1, host);
		}, timeoutDuration);

		timeoutDuration += 20;
	}


	// Initial timeout

	(function () {
		var start = setInterval(function () {
			var html = document.querySelector('html');

			if (!html || html.className.indexOf(classname) !== -1)
				return;

			html.className += ' ' + classname;

			let host = { full: document.location.hostname.replace(/^w{2,3}\d*\./i, '') };
			host.parts = host.full.split('.');

			if (host.parts.length > 1) {
				// Network domain parts - minimal length can be decreased if needed
				host.long = host.parts.filter(function (value) { return value.length >= 4 });

				host.top = host.parts[host.parts.length - 1];
				searchLoop(0, host);
			}

			clearInterval(start);
		}, 500);
	})();
}