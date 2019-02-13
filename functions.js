$( ".menu" ).click(function() {
    //This following code perfoems functions that are called when a menu item is clicked. In short, it reads values from the div that store the menu item clicked to toggle a corresponding container as well as store a string that will be appended to the end of the tab url. This is important because it both trackes where you're at in the page visually (by changing the url) as well as being the way you'd copy that state to share with others so that the url splitting and opening code can be ran.
    var ext = $(this).attr('app');
    //var that houses the strong to be added to the url when a menu item is clicked ('intro', for example, or 'design')
    var tog = $(this).attr('sel');
    //this houses the menu item (sel)ector value. Each menu item has a open/close content box that matches its ID number (each menu item has a corresponding content box because I named them that way)
    var exc = ("#c" + tog +"");
    //this var stores a valid #id for a content div. it's got 'c' added so it will only affect a content box as all content boxes ids start with a 'c'
    
    $('.content:not(' + exc + ')').slideUp();
    //all the content containrs that are not matching the id of the menu item clicked will recieve a close command to ensure that only the menu item clicked will have its content interacted with. This is here to prevent someone from opening and closing multiple categories at once.
    $('#c' + tog ).slideToggle();
    //this toggles only the matching content box that corresponds to the menu item that was clicked. This way I don't have to read open/close states prior to animation. You only TOGGLE what you click. The rest have auto shut or stayed shut already.
    
    //the following block of code updates the end of the url with the ext value defined on the menu item. This means the the url will match the category clicked
    var current_location = window.location.href; 
    //gets the url
    
    var newrl = current_location.substr( 0, current_location.indexOf("#") );
    //this removes any appended url stuff since this will only run on the top level menu items (.menu) || stuff in lower levels will fire on different event listeners. The above substrings (only keeps the part of the string from) the url from index pos 0 until index pos (value of the spot where '#' is used. This will not include '#" itself). Basically it cleans up the url so that we can reappend a new value without it added more and more and more adddons to the url each click.
    
    newrl += "#" + ext ; //then we add on the append value from the menu item
    window.location.href = newrl; //we then overwrite the url with the new value BAM
});


//following below: this copies the url, removes the normal bit and then spilts it based on the specified # character. This works in that it has a simple in-out logic that then appends a new # to the beginning of each resulting substring. These variables are then used in order to open up the section of the site that are in the url. This means the url is a save state for the site so that specific content can be linked without needing a whole bunch of different pages. 
$(document).ready(function(){
    var urlInput = window.location.href; //creates a variable and copies url into it
    var urlExt01 = urlInput.substr( urlInput.indexOf("#") + 1);
    //this takes the urlInput string and removes everything before and including the # 
    var urlExt02 = urlExt01.substr( urlExt01.indexOf("#") + 1 );
    //this removes another layer of any values after a # character
    var urlExt03 = urlExt02.substr( urlExt02.indexOf("#") + 1 );
    //this removes another layer of any values after a # character

    
    if ( urlExt01.includes('#') ) {
        urlExt01 = urlExt01.substr( 0, urlExt01.indexOf("#") );
    }    //IF there's another #
    urlExt01 = ("." + urlExt01); //add id tag to val
    $( urlExt01 ).slideDown();
    //removes everything after the # then stores in variable 1
    
    if ( urlExt02.includes('#') ) {
        urlExt02 = urlExt02.substr( 0, urlExt02.indexOf("#") );
    }    //IF there's another #
    urlExt02 = ("." + urlExt02); //add id tag to val    
    $( urlExt02 ).slideDown();
    //removes everything after the # then stores in variable 2
    
    if ( urlExt03.includes('#') ) {
        urlExt03 = urlExt03.substr( 0, urlExt03.indexOf("#") );
    }    //IF there's another #
    urlExt03 = ("." + urlExt03); //add id tag to val    
    $( urlExt03 ).slideDown();
    //removes everything after the # then stores in variable 3
    
    
});

var rdmImg = (function() {
    var images = ["bg_01.jpg","bg_02.jpg","bg_03.jpg"];
    return images[Math.floor(Math.random() * images.length)];
})(); //this returns a random selection from the above array and replaces the bg image
$('#bgWrapper').css("background-image", "url('/images/background/" + rdmImg + "')" );
//this then changes the image out by editing the css values, using the random image value as a return that selects the img to be loaded. Since this is simply editing the value, the image will not reload if the random image is the same as the default image to load.
