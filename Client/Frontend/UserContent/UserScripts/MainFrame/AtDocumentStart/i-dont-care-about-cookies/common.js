module.exports = function () {
    (function () {

        let searchPairs = {
            '.message-container': [
                '.sp_choice_type_12',
                '.sp_choice_type_SAVE_AND_EXIT',
                'div:only-of-type > .sp_choice_type_ACCEPT_ALL',
                '.privacy-manager-tcfv2 + div > .sp_choice_type_ACCEPT_ALL'
            ],

            '.mfp-wrap.mfp-ready': [
                '.cookieselection-confirm-selection',
                '#gdpr_understandBtn',
                '#cookiebanner .button-row > :not(.consentToAll)',
                '#cookiebanner .confirmSelection',
                '#cookieConsent .btn[data-cookie="accepted"]',
                '.avia-cookie-close-bar'
            ],

            '.reveal-overlay[style*="block"]': [
                '[data-cookieman-save]:not([data-cookieman-accept-all]):not(.hide)',
                '#CookieModalStrictOnlyLink',
                '#dsgvoLayer[style*="block"] #dsgvo_deny'
            ],

            '.fancybox-opened': [
                '.bcGDPR .bcOpenPrivacySettings',
                '.bcGDPR .bcRadioRefuse',
                '.bcGDPR #bcSubmitConsent',
                '.bcGDPR .bcpConsentCancelButton'
            ],

            '.fancybox-is-open': [
                '#cookieModal .btn[data-type="required"]'
            ],

            '.pum-open': [
                '.pum-active[data-popmake*="slug\\":\\"cookie"] .pum-close',
                '.pum-active[data-popmake*="rodo"] .pum-close',
                '.pum-active[data-popmake*="cookie-policy"] .pum-close',
                '.pum-active[data-popmake*="cookie-zustimmung"] .pum-close',
                '.pum-active[data-popmake*="cookie-consent"] .pum-close',
                '.pum-active[data-popmake*="uso-cookie"] .pum-close',
                '.pum-active[data-popmake*="cookie-notice"] .pum-close',
                '.pum-active[data-popmake*="cookie-banner"] .pum-close',
                '.pum-active[data-popmake*="cookie-pop"] .pum-close',
                '.pum-active[data-popmake*="cookies-pop"] .pum-close',
                '.pum-active[data-popmake*="informativa-cookie"] .pum-close',
                '.pum-active[data-popmake*="assenso-cookie"] .pum-close',
                '.pum-active[data-popmake*="pryvatnast"] .pum-close'
            ],

            '.modal-open': [
                '#PrivacyCategoryAlert[style*="block"] .btn[data-id="ConfirmSettings"]',
                '#cookie-control-modal[style*="block"] .js-toggle-cookie-control',
                '.kmt-ckextmodal[style*="block"] .btn[href*="accept"]',
                '.cookie-alert[style*="block"] .btn-info[data-dismiss]',
                '#cookiesplus-bas[style*="block"] .btn[name="save-basic"]'
            ],

            '.modal[style*="block"]': [
                '#btn-cookie-config',
                '#btn-save-config',

                '#btn-configure-cookies',
                '#user_cookies_form_save + #refuse-all-cookies',

                '#cookieConsentAcceptOnlyFunctional',
                '.cookie_actions .btn[onclick*="saveBasic"]',
                '#btnCookieSettingsSaveSettings',
                '#cookie-setselected',
                '#rodo_form .btn',
                '#cookieNoticeForm #saveCookies',
                '.btn[onclick*="saveCookieSettings"]',
                '.btn.set_essential_cookies',
                '.btn.js-offcanvas-cookie-submit',
                '.btn#cookie-save-selected',
                '.bcee-cookies-manager-deny-all',
                '.consent-banner-confirmation-button.btn-default',
                'a[onclick="setConsentSelect()"]',
                '.container_acceptcookies .btn[name="save"]',
                '#cookieSelectForm .btn[type="submit"]',
                'button[data-tracking="ACCEPT_REQUIRED_COOKIES"]',
                '#aceptarCookiesObligatorias',
                '.btn[href="#cookieman-settings"]',
                '[data-cookieman-save]:not([data-cookieman-accept-all]):not([style*="none"])',
                '.cookie-manager-save',
                '.adapt-cookies .js-save-preferences',
                '#btnDeny.js-gdpr-submit',
                '#manageCookies ~ #confirmCookies',
                'a[href*="acceptOnlyEssentinal"]',
                '.modal-cookie #submitSelected',
                '#btn_cookie_save'
            ]
        };

        let searchGroups = [
            '.qc-cmp2-summary-buttons button[mode="secondary"],\
		.qc-cmp2-buttons-desktop > button:first-child,\
		#accept_consent_box a[onclick*="_sp_.loadPrivacyManagerModal"],\
		.OffsetContainer div[data-component="ConsentLayer"] a[href="#sp_privacy_manager"],\
		#didomi-host .didomi-button-highlight:not([class*="paywall"]),\
		#CookieModal.in .btn[data-dismiss],\
		#rgpd_video .rgpd-mask a[data-rgpd-consent],\
		.js--modal[style*="block"] .cookie-permission--accept-button,\
		.gdpr-modal-rider .btn-cookieaccept,\
		.js-cookiewall #sel-test-accept-cookies-button,\
		#mpo[style*="block"] .submit.modal-privacy__btn[onclick*="privacyframe.accept"],\
		.lightbox--cookie-consent .btn-cta,\
		.lightbox.cookie-consent .cookie-consent-button-decline,\
		.js-modal-gdpr.is-active .btn[data-level="2"],\
		#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection,\
		#cookieNotificationModal.in .btn.accept-cookie,\
		.cc-grower .cc-banner:not(.cc-invisible) .cc-dismiss,\
		.has-ccwindow .cc-compliance .cc-dismiss,\
		.ds2-cookie-disclaimer--slidedown .ds2-cookie-disclaimer-js--submit,\
		#mdlCookieCompliance.in .cookieClose,\
		#cookieModal.in .js-acceptDefaultCookie,\
		.c-cookiebutton .c-cookiebutton__close,\
		#normativa_cookies.in .btn,\
		#cookiewall.in .btn-primary,\
		.outerCookieBar .EuCookieBar__cookieButton,\
		#TOS-POPUP .rhododendron-popup__button--agree,\
		#cookie-wall #accept-cookies,\
		#popup-wrapper .button[href*="/cookies.consent.php"],\
		.body-wrapper[style*="faktor-fingerprint"] #acceptAll,\
		.reveal.cookies[style*="block"] button[click*="aceptaCookies"],\
		.mnd-cookie-modal[style*="block"] .btn.is--primary,\
		.cookieHandler.cookieHandler--modalOpen #acceptAllCookies,\
		.gdpr-modal--active .btn--primary,\
		#dpi-banner:not(.hidden) #btn-agree-cookie,\
		.gh-banner.gh-banner-active #gh-cookiebanner-close,\
		#mrktpref.notification-bar .btn-success,\
		#PopinGDPRCookie[style*="block"] .jsbd-popin-ok,\
		#modal-rodo.in .btn-primary,\
		.cookie-compliance-modal.in .btn-primary,\
		.cookieconsent.show .btn[data-dm*="accept"],\
		.cookie-wall-modal.in .btn.ja,\
		.cc-window.cc-banner:not(.cc-invisible) .cc-allow,\
		#ccm_notification .ccm_col_content_cookieitem-radiowrap .ccm_col_content_cookieitem-radio:first-child input,\
		#ccm_notification .ccm_btn,\
		#modal-consent.in .modal-consent-accept,\
		.rodo #cookies.in .btn-primary,\
		.js-cookie-alert.in .js-cookie-alert-accept,\
		#modal_gdpr_intro_popup.in #gdpr-modal-btn-ok-agree,\
		#consentButtonContainer > button[onclick*="sendAndRedirect"],\
		#eu-consent[style*="block"] .btn.yes,\
		.modal--gdpr.is-open .js-gdpr-consent,\
		#cookiePopupModal.in .cookiepopup-agreed,\
		.polityka-cookie-rodo[style*="block"] .button-zgoda,\
		.ui-dialog.consent-modal[style*="block"] .js-btn-agree,\
		#up-cookie.active .button[onclick*="setCookiePreference"],\
		.RodoModal.in .close,\
		.consent-popup form[action*="cookie-consent"] .consent-popup__button,\
		#consent form[action*="cookie-consent"] .one-btn,\
		#cookiewall-wrapper .button[href*="accept"],\
		#cookieChoiceButtonAccept,\
		.mod-cookie-consent[style*="block"] .btn-all-cookies,\
		.c-layer--consent .layer-button--accept,\
		.button.button-ok[onclick*="acceptAVG"],\
		#meredithGdprConsentFormButton,\
		#advanced-cookie-modal.in .cookie-accept,\
		.show-modal .cookie-settings-manager-container .initial-dialog .js-accept-button,\
		.cookie-settings-manager-container .initial-dialog[style*="block"] .js-accept-button,\
		.gdprLightbox[data-module="gdprLightbox"] ._type_gdpr_agree,\
		.cookie.showa #Row1_Column1_Cell1_CookieSettings_AdvancedSaveAccept,\
		#core-cookie-container[style*="block"] .btn--agree,\
		.cookie-consent-modal._show .action-primary,\
		#dsgvoModal.show #dsvgo-banner__button,\
		.basicLightbox--visible #accept-all-gdpr,\
		#gdpr-modal.in .gdpr-modal__btn--accept,\
		.cookiehint .btn.cookieagree,\
		#cookiealert .modal.in .btn[href*="accept"],\
		#lml-data-consent-accept,\
		#privacymodal.in #accall,\
		#CBCookieMsg.in .btn[onclick*="approveCookies"],\
		#cookiewall-container .button[name="submit"],\
		#cookie_disclaimer.in .cookie_disclaimer_button,\
		.m-cookie.iziModal[style*="block"] .m-cookie__save2.button,\
		kamino-cookie-policy .mat-raised-button,\
		#surbma-gpga-modal[style*="block"] button,\
		#GDPR.overlayBox .menuButton,\
		#cookiebar .cookie-selection-button.accept,\
		.modal.in .btn.close-modal-cookie,\
		.gdprModal--visible #accept-all-gdpr,\
		#consent-module[style*="block"] #consent-module-text-button,\
		.modal #consentButton,\
		#consent-modal[style*="block"] .lm_modal__modal__content__body__buttons__ok,\
		.cookiesOverlay3Box #cookiesConsentOK,\
		#cookieNoticeModal.vrm-reveal[style*="block"] .vrm-reveal__icon--close',

            '#cookie-modal.in .btn[onclick*="setCookie"],\
		div[class^="sp_veil"] + div[id^="sp_message"] > div[class^="sp_message"] > div[id^="sp_message_panel"]:first-child div[class^="sp_choices"] button:not([aria-label]):first-child,\
		div[class^="sp_veil"] + div[id^="sp_message"] #sp-tabindex-focus + div div[class^="sp_choices"] button[aria-label]:first-child + button,\
		#privacyPolicyInfo.active #acceptPrivacyPolicy,\
		.fade.in .btn.cookie-yes,\
		#cookie-disclaimer[style*="block"] .cc_btn_accept_all,\
		.reveal-overlay[style*="block"] #dsgvo .cc_btn_accept_all,\
		.reveal-overlay[style*="block"] #reveal-cookies .btn[data-save],\
		#manageCookieConsentDialog.in #btn-cookie-agreed,\
		.fancybox-opened #gdpr-yes,\
		#cookie_form #accepted,\
		#PrivacySettings.in .bootstrap-switch-id-PrivacySettingsAgreeToAll .bootstrap-switch-default,\
		#PrivacySettings.in .btn-privacy-settings--save,\
		#ccc[open] #ccc-recommended-settings,\
		form[action*="cookiewall"] .button-accept-cookies,\
		#dtcookie-container.is-on .dtcookie__accept,\
		.approve-btn[href*="setCookieAndRedirect"],\
		button[data-qa-entity="cookies.button"],\
		#_evidon_banner[style*="flex"] #_evidon-accept-button,\
		#_evidon_banner[style*="block"] #_evidon-accept-button,\
		#_evidon-banner[style*="block"] #_evidon-banner-acceptbutton,\
		.cookiewall .cookiewallBody .btn-approve,\
		#cookiewallModal.in .btn-approve,\
		.js-gdpr-consent-container .js-gdpr-consent-agree,\
		.qc-cmp-showing .qc-cmp-button[onclick],\
		.page-cookie-wall .cookie-wall__form .btn,\
		form[action*="cookieconsent"] #SubmitButton,\
		.md-content.show .tm-cookies-consent-accept,\
		.md-show.cookies-consent .tm-cookies-consent-accept,\
		.modal-window #gdpr-modal-agree,\
		.privacy-overlay.ui-dialog .button.confirm-button,\
		.wrapper.show-plack .top-view .button-wrapper .btn,\
		.cookie_btn_accept_all,\
		button#cookies-accept-button,\
		#cmp-message .cmp-button[onclick*="cookieAccept"],\
		#ppms_cm_agree-to-all,\
		.ccc-notify-buttons .ccc-notify-button[onclick*="Accept"],\
		.template-gdpr .gdpr[data-api*="onetrust.com"] .gdpr-form .btn,\
		.dialog .cookie-banner__btn-accept,\
		button#btn-accept-consent,\
		button#gdpr-consent-accept,\
		#modal-ley-cookies.in .button-text-ley-cookies,\
		.remodal-wrapper[style*="block"] .cookie-notice .remodal-close,\
		#cookie-wall:not([hidden]) #cookie-wall-accept,\
		#gdpr.modal.active #gdprNotice #accept,\
		.btn-accecpt-cookie,\
		#js-gdpr-accept:not(.cta),\
		.ck-modal--cookieModalMain .ck-Button__primary,\
		.ReactModal__Overlay--after-open .cookie-notice button + button,\
		.ReactModal__Overlay--after-open .UPM__PrivacyModal button[type="submit"],\
		.privacyInformationDiv .cookie-agree,\
		#__tealiumGDPRecModal #privacy_pref_optin,\
		#__tealiumGDPRecModal #consent_prompt_submit,\
		#__tealiumGDPRcpPrefs #selectAllCheckboxes,\
		.modal.fade.in #acceptCookie,\
		.button[value="accept-all"][data-gtm="basic-consent/accept-all/button"],\
		#js-modal-consent .js-consent-accept,\
		#cookie-warning.show #cookie-accept,\
		.html-consent .cc-overlay-submit,\
		.c-cookie-consent-button-wrapper .c-cookie-consent__button,\
		#accept-cookie-policy.btn,\
		.privacywall-overview .js-privacywall-agree,\
		.privacywall-overlay .js-privacywall-agree,\
		#cookie_consent_layer .btn[onclick*="acceptAllCookies"],\
		#gdprModal #restaccept,\
		#gdprModal .primary[onclick*="Accept"],\
		.gdrpbox.in .btn[onclick*="gdrpSetCookie"],\
		#cookie-notification .modal-footer .btn,\
		#cookieManagerFooter #anwbrGiveConsent,\
		#cookie-wall-modal .btn-primary,\
		#cookie.popup .button.accept,\
		.dot-cc-wrapper .dot-heading ~ .dot-button-container .dot-btn-1,\
		.dot-cc-wrapper .dot-hide-cc-wrapper,\
		#my-content-cookielaw .cookie-btn,\
		#modalCookie .accept-cookie,\
		#modalCookie.shown .button[data-action="accept-cookies"],\
		.modal.cookie .btn[onclick*="setCookie"],\
		#cookiesbanner #hidecookiesbanner,\
		#cookiewall-buttons .accept-cookies,\
		form[action*="cookieservice.rtl.nl/consent"] .accept-button,\
		.buttonComp.cookieAccept,\
		.c-cookie-info .c-button.cookieAccept,\
		#btnAcceptCookies,\
		form[name="cookieconsent"] input[name="consent"],\
		.cookie-consent .box__button,\
		.modal #cookiewarning .button--accept,\
		.modal-cookie .btn[onclick*="setCookiepopup"],\
		.cookie-wall__button button,\
		#notification-allowCookies button,\
		#sanoma-consent-accept-button',

            '#rodo.in .button[href*="accept"],\
		#gdpr_popin[style*="block"] .gdpr-agree,\
		form[action*="cookieservice"] #acceptButton,\
		#cookiescript_injected #cookiescript_accept,\
		#js-cookie-wall[style*="block"] #js-cookie-wall-accept,\
		#termsandconds.in #acceptterms,\
		.ui-dialog.open #CookiePopup form .btn,\
		.cc-window.cc-type-opt-in:not(.cc-invisible) .cc-allow,\
		#modalCookie.show .cookie-accept,\
		#cookieform input.modal__submit,\
		#accept_koe.btn,\
		form[action*="cookie"] .melding #btnYes,\
		#cookie-consent-form input[type="submit"],\
		.cookiebar-actions #grantPermissionButton,\
		.cookiewall #TOL_link1,\
		.cookie-wrap[style] #TOL_link1,\
		#cookieConsentPopup[style*="block"] .btn,\
		#cadre_alert_cookies .popup-modal-dismiss,\
		#cookieConsentModal .success,\
		#privacy_statement_pop.in .btn[onclick*="close"],\
		.cookie-accept-block .cookie-accept-block-button .btn,\
		#cookieConsent.remodal-is-opened #acceptAllCookies,\
		.template--cookiewall .js-accept-cookies.btn,\
		.modal-cookie.show .js-accept-cookies.btn,\
		.state-visible .js-accept-cookies.btn,\
		#btn-allow-cookie,\
		.modal-cookie-warning .modal-close,\
		.cookiemessage__button--accept,\
		.cookieWallContent .ok-cookies,\
		#cookie-master #acceptCookies,\
		.cookie-wall .cookie-button,\
		#cookiebar_wrapper .accept-button:not(.sanoma-consent-change-settings-button),\
		.cookieallowbutton,\
		#js-cookie-message #js-accept-cookie,\
		.popup-cookie--buttons .popup-cookie--save,\
		.cookie-box #cookie-button,\
		#cookie-acceptance .btn.allow,\
		#acceptcookies.btn,\
		#cookiewet_NL .btn[href*="acceptcookie"],\
		.cadre_inner_texte_alert_cookies .popup-modal-dismiss,\
		.cookiewall button.allow_cookies,\
		#agree_with_cookie_terms,\
		.cookie-compliance-ok-btn,\
		a.cookieControlAccept,\
		button#cookie_accept,\
		.close.uiDismissCookiePolicy,\
		.fancybox-opened #cookiePolicy .info-close,\
		input[name="bw-cookie-consent-agree"] + input[type="submit"],\
		.js-cookie-info-accept-button,\
		#cookiePopup .btn-primary,\
		.modal .button[href*="accepteer-cookies"],\
		#cookie-modal .accept-cookies,\
		.popupframe input[name="cookieconsent_agreed"],\
		#ucCookiePolicy_btnCookiePolicyDismiss,\
		.alternetCookieMessage .alternetCookieAnswerLink,\
		#cookie-modal #cookie-consent-btn,\
		#cookies .button.CookiesOK,\
		.m-cookie-disclaimer .s-btn-close,\
		.consenso a[href*="accept-cookies"],\
		.button_submit[title="I accept the cookies"],\
		.accept-cookies a[onclick*="acceptCookies"],\
		.as_cookies_block_buttons a,\
		#btn-give-cookie-consent,\
		.cookie-info .btn-primary.cookie-accept,\
		.modal-open #cookie-modal .cookie-accept,\
		#js-cookie-popup.magnificPopup .btnSave,\
		#melding .ja,\
		.cookie_banner[data-module="cookie_banner"]:not(.xs-hide) .btn-close,\
		.cookie-notification-wrapper[style*="block"] .btn-primary,\
		.window-cookiewall .cookie-button,\
		#cookieModal .btn-icon-primary,\
		.wall #form_save,\
		.consent #button_yes,\
		.CookieSplashPage #NextButton,\
		#cookieconsent1.accept,\
		#jakoekies,\
		.btn-accept[href*="coockie"],\
		.btn-accept[href*="cookie"],\
		.btn-accept[href*="Cookie"],\
		.page--cookiewall .button[href*="acceptcookies"],\
		.layout--cookiewall .fjs-accept,\
		#cookies__modal .btn[href*="AcceptCookie"],\
		.btnAccept[href*="Cookies"],\
		#cookie-wall .btn-accept-cookies,\
		#cookiebox-nieuw .btn-cookie,\
		.cookiecontainer button[name="accept"],\
		.btn--accept[href*="cookiewall"],\
		.button--accept[href*="cookiewall"],\
		form[name="cookieconsent"] .consent.btn,\
		body.background .footer button#form_save.button[name="form[save]"],\
		.cookie-modal .btn.accept-cookies-button[href^="/Cookie/HasConsent"],\
		.view-cookie .js-cta-accept-cookie,\
		.main-header [data-module="cookie-notice"] .buttons[class*="primary"],\
		.c-cookie-consent form[name="cookie-consent"] input[type="submit"],\
		.c-cookie-consent .c-cookie-consent__button',

            '.fancybox-overlay[style*="block"] #cookie-consent-simple .cookie__btn--primary,\
		ab-cookie-wall modal-footer .btn,\
		.cookie-policy-popup[style*="block"] .button[data-cookie-policy-accept],\
		.cookie-consent-modal.ui-modal_open .cookie-consent-modal__accept-button,\
		#cookiewizard[style*="block"] #accept-all-cookies,\
		.AST-banner > div[style*="block"] .AST-accept,\
		#cookie_constent_submit,\
		.cookielayer[style*="block"] .cookielayer__optinbtn .btn--primary,\
		.modal.in .btn[onclick*="accept"][onclick*="gdpr"],\
		.Dialog--gdprCookieConsent.Dialog--open .GDPRCookieConsent__button,\
		#consentContainer .raised-btn[href*="granted"],\
		.reveal-overlay[style*="block"] #phg_cookies_modal .phgcookies_label_okay,\
		#cookielaw.in #cookie-accept,\
		.module.consent > .ok[type="button"],\
		body[class*="tiki"] #cookie_consent_div:not([style*="display: none"]) #cookie_consent_button,\
		body[class*="tiki"] #cookie_consent_div:not([style*="display: none"]) #cookie_consent_checkbox,\
		body[class*="tiki"] #cookie_consent_div:not([style*="display: none"]) input[name="cookie_consent_checkbox"],\
		.cookiesOverlay2Box #cookiesConsentOK,\
		#myCookieModal.in .cookie-button,\
		div[data-cookie-path] a[href*="technologies/cookies"] + div'
        ];


        // Search loop function

        let searchGroupsLength = searchGroups.length,
            searchPairsKeys = Object.keys(searchPairs),
            searchPairsJoinedKeys = searchPairsKeys.join(','),
            timeoutDuration = 300;

        function searchLoop(counter) {
            setTimeout(function () {

                document.querySelectorAll(searchPairsJoinedKeys).forEach(function (box) {
                    searchPairsKeys.forEach(function (selector) {
                        if (box.matches(selector)) {
                            box.querySelectorAll(searchPairs[selector].join(',')).forEach(function (button) {
                                if (button.click && !button.classList.contains('idcac')) {
                                    button.classList.add('idcac');

                                    if (typeof chrome == 'object' && chrome.runtime)
                                        chrome.runtime.sendMessage({ command: "cookie_warning_dismissed", url: document.location.href });

                                    button.click();
                                    timeoutDuration += 500;
                                }
                            });
                        }
                    });
                });

                document.querySelectorAll(searchGroups[counter % searchGroupsLength]).forEach(function (e) {
                    if (e.click && !e.classList.contains('idcac')) {
                        e.classList.add('idcac');

                        if (typeof chrome == 'object' && chrome.runtime)
                            chrome.runtime.sendMessage({ command: "cookie_warning_dismissed", url: document.location.href });

                        e.click();
                        timeoutDuration += 500;
                    }
                });

                if (counter < 100 * searchGroupsLength)
                    searchLoop(counter + 1);

            }, timeoutDuration);

            timeoutDuration += 20;
        }

        var start = setInterval(function () {
            var html = document.querySelector('html');

            if (!html || /idc0_334/.test(html.className))
                return;

            html.className += ' idc0_334';
            searchLoop(0);
            clearInterval(start);
        }, 500);
    })();
}