#Style js

#Generate CSS with javascript

This is an early beta.
StyleJs is a javascript library that attempts to utilize Javascript as Css. The aim is to have a library with Sass like features in the browser without the compiling cycle.


## Usage
#### for simple usage:
    var baseSheet = Style.sheet(function() {/**
    
        p {
            border: 2px solid #999;
        }
        
        h1 {
            background-color: #333;
        }
    
    **/});
    
    Style.embed(baseSheet);
    
    Output:
        <style type="text/css" id="style-0">
            p {
             border: 13px solid #999;
            }
            
            h1 {
             background-color: #333;
            }
        </style>

#### include another style using include> then the name of the variable holding the style:
    var baseSheet = Style.sheet(function() {/**
    p {
        border: 1px solid red;
    }
    h1 {
        background-color: #333;
    }
    **/});

    var myStyle = Style.sheet(function() {/**
        include>baseSheet
        
        body {
            background-color: #999;
            padding: 3px;
        }
        .testing > .test {
            color: brown;
        }
    
    **/});
    
    Style.embed(myStyle);

    Output:
        <style type="text/css" id="style-0">
            p {
             border: 13px solid red;
            }
            
            h1 {
             background-color: #333;
            }
            
            body {
             background-color: #999;
             padding: 3px;
            }
            .testing > .test {
             color: brown;
            }
            
        </style>


#### using variables inside styles with $variableName:
    var num = "13px";
    var pad = "14px";
    var color = "purple";
    
    var baseSheet = Style.sheet(function() {/**
        .testing {
            background-color: $color;
            padding: $pad;
            -webkit-border-radius: $num;
            -moz-border-radius: $num;
            border-radius: $num;
        }
    **/});

    Style.embed(baseSheet);
    
    Output:
        <style type="text/css" id="style-0">
            .testing {
                background-color: purple;
                padding: 14px;
                -webkit-border-radius: 13px;
                -moz-border-radius: 13px;
                border-radius: 13px;
            }
        </style>
        
### This is an early beta and it is not recomemned for production use.
