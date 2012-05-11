// JavaScript Document
(function($) {
    $.extend({
    	singleLogin: function(role, options){
			var options = options||"undefined";
    			switch(role){
					case "helper":
						//get options from query string
						$.singleLogin.options = $.parseJSON(decodeURI($.getQueryString('options')));
						//if role is helper read action from hash
						switch (window.location.hash){
							case "#set":
								document.domain = $.singleLogin.options.root;
								$.cookie($.singleLogin.options.cookie,'true',{expires:$.singleLogin.options.life,path:'/'});
								return null;
								break;
							case "#check":
								document.domain = $.singleLogin.options.root;
								if($.cookie($.singleLogin.options.cookie)){
									window.parent.$.singleLogin.loggedin=true;
									console.log();
									return null;
								} else {
									window.parent.$.singleLogin.loggedin=false;
									return null;
								}
								break;
							case "#logout":
								document.domain = $.singleLogin.options.root;
								$.cookie($.singleLogin.options.cookie,null,{expires:$.singleLogin.options.life,path:'/'});
								return null;
								break;
						}
						break;
					case "logout":
						build('logout',options);
						$('#singleLogin_frame').load(function(){
							$.singleLogin.options.logout();
							return null;
						});
						break;
					case "set":
						build('set',options);
						$('#singleLogin_frame').load(function(){
							$.singleLogin.options.set();
							return null;
						});
						break;
					case "check":
						build('check',options);
						$('#singleLogin_frame').load(function(){
							if($.singleLogin.loggedin == true){
								$.singleLogin.options.success();
								$('#singleLogin_frame').remove();
								
							} else {
								$.singleLogin.options.failure();
								$('#singleLogin_frame').remove();
								return null
							}
							$($.singleLogin.options.logoutClass).click(function(){
								$.singleLogin('logout');
								return null;
							});
							return null;
						});
				}
			function build(type,options){
				//check to see if singleLogin has already been initated if not build options 
						if(typeof $.singleLogin.options === "undefined"){
							setOptions(options);
							document.domain = $.singleLogin.options.root;
						}
						$('body').append('<iframe id="singleLogin_frame" src="http://'+$.singleLogin.options.rootport+$.singleLogin.options.helper+'?options='+encodeURI(JSON.stringify($.singleLogin.options))+'#'+type+'" style="display:none;"></iframe>');
			}
			//merge user options with defaults and construct root
			function setOptions(options){
    			var defaults = {
    				subdomain:'',
    				basePort:'',
    				loginPage:'login.html',
    				logoutClass:'.logout',
					helper:'helper.html',
					life:7,
    				success:function(){
    					return null;
    				},
    				failure:function(){
						if('http://'+$.singleLogin.options.rootport+$.singleLogin.options.loginPage != window.location){
    						window.location = 'http://'+$.singleLogin.options.rootport+$.singleLogin.options.loginPage;
						}
    				},
					set:function(){
						return null;
					},
					logout:function(){
						window.location = 'http://'+$.singleLogin.options.rootport+$.singleLogin.options.loginPage;
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
					root = ((options.subdomain == '')?'':('.'+options.subdomain))+root[root.length-2]+'.'+root[root.length-1];
				} else {
					root = window.location.hostname;
				}
				$.singleLogin.options.root = root;
				$.singleLogin.options.rootport = root+':'+options.basePort;
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
      },
	  getQueryString: function (name) {           
            function parseParams() {
                var params = {},
                    e,
                    a = /\+/g,  // Regex for replacing addition symbol with a space
                    r = /([^&=]+)=?([^&]*)/g,
                    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                    q = window.location.search.substring(1);

                while (e = r.exec(q))
                    params[d(e[1])] = d(e[2]);

                return params;
            }

            if (!this.queryStringParams)
                this.queryStringParams = parseParams(); 

            return this.queryStringParams[name];
        }
    });
})(jQuery);