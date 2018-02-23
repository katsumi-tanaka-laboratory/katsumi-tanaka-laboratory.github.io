/**
 * Sets a Cookie with the given name and value.
 */
function chgFontSize_setCookie(name, value, expires, path, domain, secure) {
	document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}

/**
 * Gets the value of the specified cookie.
 */
function chgFontSize_getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

/**
 * Deletes a Cookie with the given name.
 */
function chgFontSize_deleteCookie(name, path, domain) {
	if (chgFontSize_getCookie(name)) {
		document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/*
 * This is needed for the cookie functions.
 *
 * @see http://www.webreference.com/js/column8/functions.html
 */
function chgFontSize_fixDate(date) {
	var base = new Date(0);
	var skew = base.getTime();
	if (skew > 0)
		date.setTime(date.getTime() - skew);
}

/**
 * Displays the font size options.
 */
function chgFontSize_display(display_text, display_image, display_steps, display_restore) {
	if (display_text == 'on' || display_image == 'on' || display_steps == 'on') {
		document.write('<form id="chgfontsizeoptions">');
		if (display_text == 'on') {
			document.write('<label for="t">Text Size: </label>');
			document.write('<select id="chgfontsizeselection" onChange="chgFontSize_change(this.options[selectedIndex].value);">');
			for (var size = chgfontsize_min_font_size; size <= chgfontsize_max_font_size; size = Math.round((size + chgfontsize_interval_font_size) * 100) / 100) {
				if (Number(size) == Number(chgfontsize_font_size)) {
					document.write('<option value="' + size + '" selected="selected">' + size + ' ' + chgfontsize_units_font_size + '<\/option>');
				} else {
					document.write('<option value="' + size + '">' + size + ' ' + chgfontsize_units_font_size + '<\/option>');
				}
			}
			document.write('<\/select>');
		}
		if (display_image == 'on') {
			if (chgfontsize_font_size > chgfontsize_min_font_size) {
				document.write('&nbsp;<a href="javascript:void(0);" onclick="chgFontSize_decrease();"><img src="' + chgfontsize_imgdecact.src + '" title="Decrease Font Size" alt="a-" id="chgfontsizeimgdec" /></a>&nbsp;');
			} else {
				document.write('&nbsp;<a href="javascript:void(0);" onclick="chgFontSize_decrease();"><img src="' + chgfontsize_imgdecdea.src + '" title="Decrease Font Size" alt="a-" id="chgfontsizeimgdec" /></a>&nbsp;');
			}
			if (chgfontsize_font_size < chgfontsize_max_font_size) {
				document.write('&nbsp;<a href="javascript:void(0);" onclick="chgFontSize_increase();"><img src="' + chgfontsize_imgincact.src + '" title="Increase Font Size" alt="A+" id="chgfontsizeimginc" /></a>&nbsp;');
			} else {
				document.write('&nbsp;<a href="javascript:void(0);" onclick="chgFontSize_increase();"><img src="' + chgfontsize_imgincdea.src + '" title="Increase Font Size" alt="A+" id="chgfontsizeimginc" /></a>&nbsp;');
			}
		}
		if (display_steps == 'on') {
			for (var size = chgfontsize_min_font_size; size <= chgfontsize_max_font_size; size = Math.round((size + chgfontsize_interval_font_size) * 100) / 100) {
				document.write('<a href="javascript:chgFontSize_change('+size+')" style="font-size:' + size + chgfontsize_units_font_size + '">A</a> ');
			}
		}
		if (display_restore == 'on') {
			document.write('&nbsp;<a href="javascript:void(0);" onclick="chgFontSize_change(chgfontsize_default_font_size);" title="Restore Default Font Size" >Default</a>&nbsp;');
		}
		document.write('<\/form>');
	}
}


/**
 * Change the font size with the given  value.
 */
function chgFontSize_change(fontsize) {
	chgfontsize_font_size = Number(fontsize);
	chgFontSize();
}

/**
 * Decrease the font size.
 */
function chgFontSize_decrease() {
	if (chgfontsize_font_size > chgfontsize_min_font_size) {
		chgfontsize_font_size = Math.round((chgfontsize_font_size - chgfontsize_interval_font_size) * 100) / 100;
		chgFontSize();
	}
}

/**
 * Increase the font size.
 */
function chgFontSize_increase() {
	if (chgfontsize_font_size < chgfontsize_max_font_size) {
		chgfontsize_font_size = Math.round((chgfontsize_font_size + chgfontsize_interval_font_size) * 100) / 100;
		chgFontSize();
	}
}

/**
 * Changes the font size and sets the cookie.
 */
function chgFontSize() {
	var now = new Date();
	chgFontSize_fixDate(now);
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000); //expire in a year
	chgFontSize_setCookie('wp-chgfontsize', chgfontsize_font_size, now, '/', '', '');
	chgFontSize_setCookie('wp-chgfontsize-units', chgfontsize_units_font_size, now, '/', '', '');
	var divArray = document.getElementsByTagName("div");
	for (var i = 0; i < divArray.length; i++) {
		if (divArray.item(i).getAttribute("id") == chgfontsize_element) { 
			divArray.item(i).style.fontSize = Number(chgfontsize_font_size) + chgfontsize_units_font_size;
		}
		if (divArray.item(i).className == chgfontsize_element) { 
			divArray.item(i).style.fontSize = Number(chgfontsize_font_size) + chgfontsize_units_font_size;
		}
	}
	var fsselection = document.getElementById('chgfontsizeselection');
	if (fsselection != null) {
		selectionIndex = Math.round(((chgfontsize_font_size - chgfontsize_min_font_size) / chgfontsize_interval_font_size) * 100) / 100;
		fsselection.selectedIndex = selectionIndex;
	}
	var imgdec = document.getElementById('chgfontsizeimgdec');
	if (imgdec != null) {
		if (chgfontsize_font_size > chgfontsize_min_font_size) {
			imgdec.src = chgfontsize_imgdecact.src;
		} else {
			imgdec.src = chgfontsize_imgdecdea.src;
		}
	}
	var imginc = document.getElementById('chgfontsizeimginc');
	if (imginc != null) {
		if (chgfontsize_font_size < chgfontsize_max_font_size) {
			imginc.src = chgfontsize_imgincact.src;
		} else {
			imginc.src = chgfontsize_imgincdea.src;
		}
	}
}

var chgfontsize_element = null;
var chgfontsize_min_font_size = null;
var chgfontsize_max_font_size = null;
var chgfontsize_interval_font_size = null;
var chgfontsize_units_font_size = null;
var chgfontsize_default_font_size = null;
var chgfontsize_font_size = null;
