(function(window, undefined){
    window.Request = {};

    Request.get = function(url, data, callback, type){

    }

    Request.post = function(){

    }

    Request.head = function(){

    }

    Request.ajax = function(url, settings){
        var xhr = new XMLHttpRequest();
        
        var settings = (typeof settings) === undefined ? {} : settings;
        settings.async       = settings.async || true;
        settings.cache       = settings.cache || true;
        settings.context     = settings.context || settings;
        settings.data        = settings.data || null;
        settings.processData = settings.processData || true;
        settings.type        = settings.type || "GET";
        settings.beforeSend  = settings.beforeSend || null;
        settings.complete    = settings.complete || null;
        settings.error       = settings.error || null;
        settings.success     = settings.success || null;

        if(settings.processData && typeof settings.data == "object"){
            settings.data = this._processData(settings.data);
        }

        if(settings.type === "GET"){
            url += "?" + settings.data;
            settings.data = "";
        }

        if(settings.cache === false){
            var now = +new Date();
            if(url.indexOf("?") >= 0){
                url += "&_=" + now;
            }
            else{
                url += "?_=" + now;
            }
        }

        
        if(settings.beforeSend && typeof settings.beforeSend == "function"){
            settings.beforeSend(xhr);
        }
        
        try{
            xhr.open(settings.type, url, settings.async);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 3){
                    var header = xhr.getAllResponseHeaders();
                    console.log(header);

                    
                }

                if(xhr.readyState == 4){
                    if(settings.complete && typeof settings.complete == "function"){
                        settings.complete.call(settings.context, xhr, xhr.statusText);
                    }

                    if(xhr.status == 200 && settings.success && typeof settings.success == "function"){
                        
                        settings.success.call(settings.context, xhr.responseText, xhr.statusText, xhr)
                    }

                    if(xhr.status == 500 && settings.error && typeof settings.error == "function"){
                        settings.error.call(settings.context, xhr, xhr.statusText);
                    }
                }
            }
            xhr.send(settings.data);
        }
        catch(e){
            if(settings.error && typeof settings.error == "function"){
                settings.error.call(settings.context, xhr, e);
            }
            else{
                throw e;
            }
        }
        
    }

    Request._processData = function(data){
        var format = "";
        for(key in data){
            format += "&" + key + "=" + data[key];
        }
        return format;
    }
    
})(window, undefined)