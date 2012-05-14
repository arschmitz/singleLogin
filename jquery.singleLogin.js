// JavaScript Document
(function($) {
    $.extend({
    	singleLogin: function(role, options, userid){
				var options = options||null,
				userid = userid||null;
    			switch(role){
					case "logout":
						setOptions(options);
						$.cookie($.singleLogin.options.cookie,null,{expires:$.singleLogin.options.life,path:'/',domain:$.singleLogin.options.root});
						$.singleLogin.options.logout();
						return null;
						break;
					case "set":
						setOptions(options);
						$.cookie($.singleLogin.options.cookie,userid,{expires:$.singleLogin.options.life,path:'/',domain:$.singleLogin.options.root});
						$.singleLogin.options.set();
						return null;
						break;
					case "check":
						setOptions(options);
						$.cookie($.singleLogin.options.cookie)
						if($.cookie($.singleLogin.options.cookie) != null){
							$.singleLogin.userid = $.cookie($.singleLogin.options.cookie);
							$.singleLogin.options.success();
						} else {
							$.singleLogin.options.failure();
							return null
						}
						$($.singleLogin.options.logoutClass).click(function(){
							$.singleLogin('logout');
							return null;
						});
						return null;
				}
			//merge user options with defaults and construct root
			function setOptions(options){
				if(typeof $.singleLogin.options !== "undefined"){
					return false;
				}
    			var defaults = {
    				loginPage:'login.html',
    				logoutClass:'.logout',
					life:7,
    				success:function(){
    					return null;
    				},
    				failure:function(){
						if($.singleLogin.options.loginPage != window.location){
    						window.location = $.singleLogin.options.loginPage;
						}
    				},
					set:function(){
						return null;
					},
					logout:function(){
						if($.singleLogin.options.loginPage != window.location){
    						window.location = $.singleLogin.options.loginPage;
						}
					},
					cookie:'singleLogin',
					forcePort:''
    			};
    			options = $.extend({},defaults,options);
    			$.singleLogin.options=options;
				var domainTest = /[a-zA-Z]/;
				var root = "";
				if(domainTest.test(document.domain)){
					root = document.domain.split('.');
					root = '.'+root[root.length-2]+'.'+root[root.length-1];
				} else {
					root = window.location.hostname;
				}
				$.singleLogin.options.root = root;
				return true;
			}
    	},
		cookie: function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
      }
    });
})(jQuery);