(function(){
  var id = 0,
  StyleJs = {
    sheet: function(f) {
    var removeOuterComments = f.toString().split('\n').slice(1, -1);
    var current = Array.prototype.slice.call(removeOuterComments);
    var sheet = "";
        
    /* start */
    for (var line in current) {
        var currentElementName = current[line].substr(0, current[line].indexOf("{"));
        var styleStart = current[line].substr(current[line].indexOf("{"), current[line].length).trim();
        styleStart = styleStart == "{" ? "{":"";
        var styleEnd = current[line].substr(current[line].indexOf("}"), current[line].length).trim();
        styleEnd = styleEnd == "}" ? "}":"";
        var newLine = "\n";
        var endLine = ";";
                    
        /*include external styles*/
        if(current[line].indexOf("include>") != -1){
            externalStyleName = current[line].substr(current[line].indexOf("include>")+8, current[line].length)
                .replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
            /* global variable is defined */
            if (externalStyleName in window) {
        
                /* external stylsheet */
                var StyleSheet = eval(externalStyleName);
                if(!StyleSheet)
                    throw "Make sure to include correctly!";
        
                sheet += StyleSheet;
            } else {
               /* global variable is not defined */
                console.log("Cannot find style: " + externalStyleName);
            }
        }/* include external styles */
                    
        /* start to build sheet */
        sheet += currentElementName+styleStart;
                    
        /* if not @media query */
        if(currentElementName.search(/@/) == -1){
    
        /* get properties */
        if(current[line].search(/:/) != -1){
            var cssProperty = current[line].split(":");
            var attribute = "";
            var Value = "";
            var combined = "";
    
            if(cssProperty !== undefined) {
                Value = cssProperty[1].substr(0, cssProperty[1].indexOf(";"));
                attribute = cssProperty[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                Value = Value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                Value = " " + Value;
    
                /* if variables */
                if(Value.indexOf("$") != -1){
                    var checkValues = Value.replace(/^\s\s*/, '').split(" ");
                    var elm = "";
    
                    checkValues.forEach(function(elements){
                        if(elements.indexOf("$") != -1){
                            elm = elements.substr(elements.indexOf("$")+1, elements.length);
                            elm = eval(elm);
                        } else {
                            elm = elements;
                        }
                        combined += " " + elm;
                    });
    
                    sheet += " " + attribute + ":" + combined;
                } else {
                    sheet += " " + attribute + ":" + Value;
                }
    
                sheet = sheet + endLine;
            }
        }/* get properties end */
    
        /* attatch to main sheet */
        sheet += styleEnd + newLine;
    
        }/* not @media end */
    
    } /* forloop end */

    return sheet;
    },
    embed: function(styles, styleId){
            styleId || (styleId = "StyleJs-" + (id++));
            var el = document.createElement('style');
            el.type = "text/css";
            el.rel = "stylesheet";
            el.id = styleId;
            el.innerHTML = "\n" + styles;
            document.head.appendChild(el);
          
            /* remove */
            var thisfile = document.currentScript;
            thisfile.parentNode.removeChild(thisfile);
    }
    };
    if (typeof define !== "undefined") {
        define('StyleJs', function(){ return StyleJs; });
    }else if (typeof module !== "undefined" && module.exports){
        module.exports = StyleJs;
    }else{
        window.Style = StyleJs;
    }
})();
