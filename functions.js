$("#optIcon").click(function(){
    //this icon interaction allows the options panel to be opened and closed.   
    $("#optMenu").fadeToggle();
});

$(".palette").click(function(){
    //This swaps the color palette in the site. Colors are given by a class so that they can be changed throughout the entire document without having to do extensive checks by jquery to every div's color settings. 
    var primary =$(this).attr('pri');
    var secondary =$(this).attr('sec');
    var detail =$(this).attr('det');
    var background =$(this).attr('bak');
    var base =$(this).attr('bas');
    var link =$(this).attr('lnk');
    //alert("palette clicked");
    $(".PrimaryColor").css("color" , primary);
    $(".SecondaryColor").css("color" , secondary);
    $(".SecondaryColor").css("border-color" , secondary);
    $(".DetailColor").css("color" , detail);
    $(".DetailColor").css("border-color" , detail);
    $(".BackgroundColor").css("background-color" , background);
    $(".BaseColor").css("color" , base);
    $(".LinkColor").css("color" , link);
});

$(".material-icons").hover(function(){
    $(this).toggleClass("LinkColor");
});

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
    $( exc ).slideToggle();
    //this toggles only the matching content box that corresponds to the menu item that was clicked. This way I don't have to read open/close states prior to animation. You only TOGGLE what you click. The rest have auto shut or stayed shut already.
    $(".hide").slideUp();
    $(".more").slideDown(); //those two reset the sub menu options so each opening is clean and doesn't show any previous interaction
    
    //the following block of code updates the end of the url with the ext value defined on the menu item. This means the the url will match the category clicked
    var current_location = window.location.href; 
    //gets the url
    
    var newrl = current_location.substr( 0, current_location.indexOf("#") );
    //this removes any appended url stuff since this will only run on the top level menu items (.menu) || stuff in lower levels will fire on different event listeners. The above substrings (only keeps the part of the string from) the url from index pos 0 until index pos (value of the spot where '#' is used. This will not include '#" itself). Basically it cleans up the url so that we can reappend a new value without it added more and more and more adddons to the url each click.
    
    newrl += "#" + ext ; //then we add on the append value from the menu item
    //we then overwrite the url with the new value. This does not call a page reload.
    history.pushState({
                id: ext
                }, ext, newrl );
    setTimeout(urlReset , 1000);//this calls the reset function which checks if any menu items have been activated or deactivated and then adjusts the url entry accordingly
    
});

$( ".subMenu" ).click(function() {
    
    var sext = $(this).attr('app');

    var stog = $(this).attr('sel');
    
    var sexc = ("#sc" + stog +"");
    
    $('.subContent:not(' + sexc + ')').slideUp();
    
    $( sexc ).slideToggle();
    
    $(".hide").slideUp();
    $(".more").slideDown(); 
    var current_location = window.location.href; 
    
    var mainUrl = current_location.split("#")[0];
    //all good here so far
    var subUrl = current_location.substr(current_location.indexOf("#"));
    
    trimUrl = subUrl.split("-")[0];
    
    var newUrl = mainUrl + trimUrl + "-" + sext ;
    
    
    history.pushState({
                id: sext
                }, sext, newUrl );
    setTimeout(subUrlReset , 1000);//this calls the reset function which checks if any menu items have been activated or deactivated and then adjusts the url entry accordingly
    //The above is similar to the main menu url handling although it also substrongs the url another layer so that it's guarenteed to store the menu category, then change the subMenu category. This way everyhing is built together and applied to the url. This accounts for any url changes or page state changes and is not dependant on a specific order of interactions within the site. Inputing a new history entry into the url system will function like a normal page site without reloading, unlike overwriting url location.
}); 


$( ".more" ).click(function() {
    $(this).closest("p").next("p").slideDown();
    $(this).slideUp();
});//the above selects the parent 'p' element that the link is within, and then finds the NEXT 'p' elment. This second 'p' elment is slid Down. This will only select "p" elements within the parent .content class and ONLY the very next 'P' element from the element which housed the .more link. This can be done because each .more item has a paired show/hide paragraph next in the dom.

//following below: this copies the url, removes the normal bit and then spilts it based on the specified # character. This works in that it has a simple in-out logic that then appends a new # to the beginning of each resulting substring. These variables are then used in order to open up the section of the site that are in the url. This means the url is a save state for the site so that specific content can be linked without needing a whole bunch of different pages. 
$(document).ready(function(){
    bgSwap();
    var urlInput = window.location.href; //creates a variable and copies url into it
    /*var urlExt01 = urlInput.substr( urlInput.indexOf("#") + 1);
    //this takes the urlInput string and removes everything before and including the # 
    var urlExt02 = urlExt01.substr( urlExt01.indexOf("-") + 1 );
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
        urlExt02 = urlExt02.substr( 0, urlExt02.indexOf("-") );
    }    //IF there's another #
    urlExt02 = ("." + urlExt02); //add id tag to val    
    $( urlExt02 ).slideDown();
    //removes everything after the # then stores in variable 2
    
    if ( urlExt03.includes('#') ) {
        urlExt03 = urlExt03.substr( 0, urlExt03.indexOf("#") );
    }    //IF there's another #
    urlExt03 = ("." + urlExt03); //add id tag to val    
    $( urlExt03 ).slideDown();
    //removes everything after the # then stores in variable 3*/
    
    
});

 function urlReset() {
        //this function fires 1 sec after a menu item is clicked and a .content item is toggled. If a .content item is open (visible), nothing happens. If all .content items are closed (hidden), then the url is cleaned of any hash tags and then updated to the main url.
        if ( ! $('.content').is(':visible') )  {
            var urlReset = window.location.href.split("#")[0];
            //alert("no content divs visible, urlReset = " + urlReset);
            //window.location.href = urlReset;
            history.pushState({
                id: 'home'
                }, 'Home', urlReset );
            }
}

 function subUrlReset() {
        //this function fires 1 sec after a menu item is clicked and a .content item is toggled. If a .content item is open (visible), nothing happens. If all .content items are closed (hidden), then the url is cleaned of any hash tags and then updated to the main url.
     //alert("subUrlReset Activated");
        if ( ! $('.subContent').is(':visible') )  {
            var urlReset = window.location.href.split("-")[0];
            
            history.pushState({
                id: 'home'
                }, 'Home', urlReset );
            }
}

function bgSwap() {
    var rdmImg = (function() {
    var images = ["bg_01.jpg","bg_02.jpg","bg_03.jpg"];
    return images[Math.floor(Math.random() * images.length)];
    })(); //this returns a random selection from the above array and replaces the bg image
    $('#bgWrapper').css("background-image", "url('/images/background/" + rdmImg + "')" );
//this then changes the image out by editing the css values, using the random image value as a return that selects the img to be loaded. Since this is simply editing the value, the image will not reload if the random image is the same as the default image to load.
}

