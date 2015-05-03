/* lets set some variables to use in our stylesheets */
var num = "13px";
var pad = "14px";
var color = "purple";
var font = "40px";

/* All stylesheets follow this pattern */
var baseSheet = Style.sheet(function() {/**
    p {
        border: $num solid $color;
    }

    h1 {
        background-color: #333;
        font-family: sans-serif;
        color: #ffffff;
        padding:30px;
        text-align: center;
    }
    .boxA, .boxB, .boxC {
        padding:50px;
        display:inline-block;
        color: #fff;
        font-weight: 100;
        font-family: sans-serif;
        font-size: $font;
    }
    
**/});

/* It is posible to include previous stylesheets (only one level for now) */
var myStylesheet = Style.sheet(function() {/**
include>baseSheet
    body {
        background-color: #999;
        padding: $pad;
        width: 400px;
        margin: 0 auto;
    }
    .testing {
        background-color: #fff;
        padding: $pad;
        -webkit-border-radius: $num;
        -moz-border-radius: $num;
        border-radius: $num;
    }
    .testing > .test {
        color: $color;
    }
    .boxA {
        background-color:red;
    }
    .boxB {
        background-color:purple;
    }
    .boxC {
        background-color:blue;
    }
    
**/});

console.log(myStylesheet);
/* lets append the styles to the page and set */
Style.embed(myStylesheet, "oldsheet");
