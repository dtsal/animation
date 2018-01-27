
var tl_tab;
var tl ;



function ChangeTexts(textOpacity,tabState){

  //  var opacityTransitionValueSmooth = "opacity "+0.5+"s, visibility 0s";
  //  var opacityTransitionValueInstant ="opacity "+ 0+"s, visibility 0s";
    var opacityTransitionTime = [];

    DevText = document.getElementById("Development");
    AdaptText = document.getElementById("Adaptation");
    PromoText = document.getElementById("Promotion");

   switch (true){

        case tabState == "dev":
             opacityTransitionTime = [0.15,0,0];
             break;
        case tabState == "adapt":
             opacityTransitionTime = [0,0.15,0];
             break;
        case  tabState == "promo":
             opacityTransitionTime = [0,0,0.15];
             break;
   }

    DevText.style.opacity = textOpacity[0];
    DevText.style.transition = "opacity "+opacityTransitionTime[0]+"s, visibility 0s";
    AdaptText.style.opacity = textOpacity[1];
    AdaptText.style.transition = "opacity "+opacityTransitionTime[1]+"s, visibility 0s";
    PromoText.style.opacity = textOpacity[2];
    PromoText.style.transition =  "opacity "+opacityTransitionTime[2]+"s, visibility 0s";


}


// Geetting the right position of animation by clicking tabs
//Moving tween to appropriate time label.

function onClickTab(e,id) {

    var textOpacity=[];

    switch (id){

        case "dev":
            tl.tweenTo(2,{ease: Power0.easeNone});
            tl_tab.tweenTo(0,{ease: Power0.easeNone})
            textOpacity = [1,0,0]

            ChangeTexts(textOpacity,id);
            break;
        case "adapt":
            tl.tweenTo(4,{ease: Power0.easeNone});
            tl_tab.tweenTo(0.15,{ease: Power0.easeNone})
            textOpacity=[0,1,0]
            ChangeTexts(textOpacity,id);

            break;
        case "promo":
            tl.tweenTo(9.5,{ease: Power0.easeNone});
            tl_tab.tweenTo(0.5,{ease: Power0.easeNone})
            textOpacity=[0,0,1]
            ChangeTexts(textOpacity,id);
            break;
    }

}


window.onload =function() {
// Get the Object by ID

   var browser = null;
//figuring out the type of browser
    function get_name_browser(){

        var ua = navigator.userAgent;


        if (ua.search(/Edge/) > 0) return 'Edge';
        if (ua.search(/Chrome/) > 0) return 'Chrome';
        if (ua.search(/Firefox/) > 0) return 'Firefox';
        if (ua.search(/Opera/) > 0) return 'Opera';
        if (ua.search(/Safari/) > 0) return 'Safari';
        if (ua.search(/MSIE/) > 0) return 'Internet Explorer';


        return 'undefined';
    }

// getting the browser name
    browser = get_name_browser();

    var a = document.getElementById("desktop_svg");
// Get the SVG document inside the Object tag
    svgDoc = a.contentDocument;
    var afterheader = document.getElementById("afterheader");


    //Creating arrays of figures

    var circles_text=["bl_circle_1","gr_circle_2","gr_circle_3","br_circle_4","bl_circle_5","gr_circle_6"];
    var circles = [];
    var tab_circles = [];
    var tab_circles_text = ['tab_circle_1','tab_circle_2','tab_circle_3'];  //array of circle figures;
    var triangles_text = ["bl_triangle_1","gr_triangle_2","gr_triangle_3","gr_triangle_4","bl_triangle_5","bl_triangle_6","bl_triangle_7","gr_triangle_8","gr_triangle_9","bl_triangle_10",
                          "bl_triangle_11","bl_triangle_12","gr_triangle_13","gr_triangle_14","gr_triangle_15","gr_triangle_16"];
    var triangles = [];
    var squares_text = ["gr_sq_1","gr_sq_2","br_sq_3","gr_sq_4","gr_sq_5","bl_sq_6","bl_sq_desktop_3"];
    var squares = [];

    var polygons_text = ["bl_polygon_1","br_polygon_2","bl_polygon_3","gr_polygon_4","br_polygon_5","bl_polygon_6"];
    var polygons = [];
    var lines_text = ["gr_line_desktop_1","gr_line_desktop_2","gr_line_desktop_3","gr_line_desktop_4","gr_line_desktop_5","gr_line_desktop_6","gr_line_desktop_7","gr_line_desktop_8","gr_line_desktop_9"];
    var lines = [];

    var dashed_line_text = ["gr_dash_line_desktop_1","gr_dash_line_desktop_2","gr_dash_line_desktop_3","gr_dash_line_desktop_4","gr_dash_line_desktop_5","gr_dash_line_desktop_6","gr_dash_line_desktop_7"];
    var dashed_line = [];
    var desktop_border;
    var star;
    var desktop = svgDoc.getElementById("desktop");


    // create time lines

    var vert_line;


// Create addEventListener
    if (svgDoc.addEventListener && afterheader.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+
            svgDoc.addEventListener("wheel", onWheel);
            afterheader.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            svgDoc.addEventListener("mousewheel", onWheel);
            afterheader.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            svgDoc.addEventListener("MozMousePixelScroll", onWheel);
            afterheader.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        svgDoc.attachEvent("onmousewheel", onWheel);
        afterheader.attachEvent("onmousewheel", onWheel);
    }


//



    function onWheel(e) {
        e = e || window.event;



        var progress = tl.progress();
        //var tab_progress = tl_tab.progress();
        var progressStep;
       // var tab_progressStep;
        var newTime;
        e.preventDefault();

        // the manipulation with tl_tab tween to get the right position of blue dots

        var tabSwitchTimeArray = [[0.15,0.5],[0,0.15]];
        var tabSwitchTime = [];
        var direction;
        var textOpacity = [];

        // define direction of scroll and timeline keypoints for switch
        switch (true) {

            case e.deltaY > 0:
                tabSwitchTime = [0.15,0.5];
                direction = "forward";
                break;

            case e.deltaY < 0:
                tabSwitchTime = [0,0.15];
                direction = 'backward';
                break;
        }
        // switch tabs to key timeline points and text ( changing opactity)
        var tabState;
        switch (true) {
                case progress >= 0.25 && progress < 0.35 && direction == "forward":
                    tl_tab.tweenTo(tabSwitchTime[0], {ease: Power0.easeInOut});
                             textOpacity = [0,1,0];
                             tabState = "adapt";
                             ChangeTexts(textOpacity,tabState);
                             break;

                case progress >= 0.60 && progress <= 0.7 && direction == "forward" :
                    tl_tab.tweenTo(tabSwitchTime[1], {ease: Power0.easeInOut});
                             textOpacity = [0,0,1];
                             tabState ="promo"
                             ChangeTexts(textOpacity,tabState);
                             break;

                case progress >= 0.25 && progress < 0.35 && direction == "backward":
                    tl_tab.tweenTo(tabSwitchTime[0], {ease: Power0.easeInOut});
                             textOpacity = [1,0,0];
                             tabState = "dev";
                             ChangeTexts(textOpacity,tabState);
                                break;

                case progress >= 0.60 && progress <= 0.7 && direction == "backward" :
                    tl_tab.tweenTo(tabSwitchTime[1], {ease: Power0.easeInOut});
                             textOpacity = [0,1,0];
                             tabState = "adapt";
                             ChangeTexts(textOpacity,tabState);
                               break;

        }

        // Moving the animation to the next step by wheel scrolling
        if (browser == "Firefox")
        {
            progressStep = e.deltaY / 50;
        }
        else
        {
            progressStep = e.deltaY / 3000;
        }
        newTime = (progress + progressStep) * tl.duration();
        if (newTime < 0) newTime = 0;
        tl.tweenTo(newTime, {ease: Power0.easeNone});

    }



    for (var i=0; i<3; i++){

        tab_circles[i] = document.getElementById(tab_circles_text[i])
    }


    for (var i = 0; i<6; i++) {


        circles[i] = svgDoc.getElementById(circles_text[i]);
        console.log(circles[i]);


    } ;

    for (var i = 0; i<16; i++) {


        triangles[i] = svgDoc.getElementById(triangles_text[i]);
        console.log(triangles[i]);


    } ;

    for (var i = 0; i<7; i++) {


        squares[i] = svgDoc.getElementById(squares_text[i]);
        console.log(squares[i]);


    } ;
    for (var i = 0; i<6; i++) {


        polygons[i] = svgDoc.getElementById(polygons_text[i]);
        console.log(polygons[i]);


    } ;
    for (var i = 0; i<9; i++) {


        lines[i] = svgDoc.getElementById(lines_text[i]);
        console.log(lines[i]);


    } ;
    for (var i = 0; i<7; i++) {


        dashed_line[i] = svgDoc.getElementById(dashed_line_text[i]);
        console.log(dashed_line[i]);

    } ;

    var star = svgDoc.getElementById("star");
    var ThreeSquareAndStar = svgDoc.getElementById("ThreeSquareAndStar");





    //tl.set(a,{scale:1.2});
    // creating timline

    tl = new TimelineMax;
    tl_tab = new TimelineMax;

    tl.set(star,{x:160.5,y:88,scale:0.5,opacity:0});
    tl.pause();
    tl_tab.pause();

    // -----------------------------making border visible-----------------------------------------
    desktop_border = svgDoc.getElementById("desktop_border");
    tl.to(desktop_border,2,{x:0 , y:0 ,delay:1,opacity:1},0);
    tl.to(desktop_border,2,{x:0 , y:0 ,delay:1,opacity:0},4.5);

    // ---------------------------------- to refactore  -------------------------------------------
    tl_tab.to(tab_circles[0],0.5,{x:0,y:350},0);
    tl_tab.to(tab_circles[1],0.5,{x:0,y:350},0);
    tl_tab.to(tab_circles[2],0.5,{x:0,y:350},0);

    // Moving circles[0] from x98.2 y186.2 to x48 y163.9  so x98.2 - x48 = x50.2  y186.2 - 163.9 = y22.3
    tl.to(circles[0],2,{x: -50.2, y:-22.3,opacity:1},0)
      .to(circles[0],1.5,{x: -50.2, y:-22.3,scale:0,opacity:1},2.5);
    // Moving circles[4] from 234.9,90.8 to M48,124.5  so x48 - x234.9 = x(-186.9)  y124.5 - y90.8 = y33.7

    tl.to(circles[4],2,{x: -186.9, y:33.7,opacity:1},0)
       .to(circles[4],1.5, {x: -186.9, y:33.7,scale:0,opacity:1},2.5);

    // Moving bl_sq_6 to the place of gr_sq_desktop_6  72.1,145.9  33,85.1  so x33-72.1= x(-39.1) x85.1-145.9= -60.8


    tl.to(circles[1],2,{x: 70, y: 30, ease: 'Linear.easeNone',opacity: 0},0);
    tl.to(circles[2],2,{x: 60, y: -20, opacity: 0,ease: 'Linear.easeNone'},0);
    tl.to(circles[3],2,{x: 0, y: 60, opacity: 0,ease: 'Linear.easeNone'},0);
    tl.to(circles[5],2,{x: 20, y: -20, opacity: 0,ease: 'Linear.easeNone'},0);

    // --------------------------------------------------------------------------------------------------

    tl.to(squares[5],2,{x:-39.1  ,y: -60.8},0);


    // Moving bl_polygon_6 to the place of bl_polygon_desktop_1  269.6,55 42.3,25.4l x42.3-x269.6 = -227    y25.41-y55 = -29.59

    tl.to(polygons[5],2,{x: -227,y: -29.59 ,rotation: '360', transformOrigin: "center center"},0)
      .to(polygons[5],1.5,{x: -227,y: -29.59 ,scale:0,rotation: '360', transformOrigin: "center center"},2.5);

    tl.to(polygons[0],2,{x:-200, y:0, opacity:0},0);
    tl.to(polygons[1],2,{x:-180,y:0,opacity:0,rotation: '360', transformOrigin: "center center",ease: 'Linear.easeNone'},0);
    tl.to(polygons[2],2,{x:-160,y:0,opacity:0,rotation: '360', transformOrigin: "center center",ease: 'Linear.easeNone'},0);
    tl.to(polygons[3],2,{x:-140,y:0,opacity:0,rotation: '360', transformOrigin: "center center",ease: 'Linear.easeNone'},0);
    tl.to(polygons[4],2,{x:-120,y:0,opacity:0,rotation: '360', transformOrigin: "center center",ease: 'Linear.easeNone'},0);





    // --------------------------------Making and Hiding the horizontal lines ------------------

    tl.to (lines[0],2,{opacity:1},0)
      .to (lines[0],1.5,{opacity:0},2.5)
    tl.to (lines[1],2,{opacity:1},0)
      .to (lines[1],1.5,{attr:{x1: 52 , x2:85.5 , y1: 215.2, y2: 215.2},opacity:1},2.5)
        .to (lines[1],0.5,{opacity:0},4.5)

    tl.to (lines[2],2,{opacity:1},0)
      .to (lines[2],1.5,{attr:{x1: 52 , x2:85.5 , y1: 210.7, y2: 210.7},opacity:1},2.5)
        .to (lines[2],0.5,{opacity:0},4.5)

    tl.to (lines[3],2,{opacity:1},0)
      .to (lines[3],1.5,{attr:{x1: 52 , x2:85.5 , y1: 206.2, y2: 206.2},opacity:1},2.5)
        .to (lines[3],0.5,{opacity:0},4.5)

    tl.to (lines[4],2,{opacity:1},0)
        .to (lines[4],1.5,{attr:{x1: 38.8 , x2:38.8 , y1: 151.2, y2: 151.2},opacity:1},2.5)

    tl.to (lines[5],2,{opacity:1},0)
        .to (lines[5],1.5,{attr:{x1: 63.8 , x2:63.8 , y1: 143.7, y2: 143.7},opacity:1},2.5)


    tl.to (lines[6],2,{opacity:1},0)
      .to (lines[6],1.5,{attr:{x1: 63.8 , x2:63.8 , y1: 136.2, y2: 136.2},opacity:1},2.5);
    tl.to (lines[7],2,{opacity:1},0)
      .to (lines[7],1.5,{attr:{x1: 63.8 , x2:63.8 , y1: 128.7, y2: 128.7},opacity:1},2.5);

    // ------------------------------------------------------------------------------------------
    // ---------------------------Making the stair from lines -----------------------------------

    linesAttributes = [[2.8,83,[63.8,63.8,168.7,168.7],[63.8,102.8,168.7,168.7]],
                        [43.2,123,[61.8,61.8,128.7,128.7],[61.8,61.8,128.7,88.7]],
                        [43.2,123,[61.8,61.8,88.7,88.7],[61.8,101.8,88.7,88.7]],
                        [43.2,123,[101.8,101.8,88.7,88.7],[101.8,101.8,88.7,48.7]],
                        [43.2,123,[101.8,101.8,48.7,48.7],[101.8,141.8,48.7,48.7]],
                        [43.2,123,[141.8,141.8,48.7,48.7],[141.8,141.8,48.7,8.7]],
                        [43.2,123,[141.8,141.8,8.7,8.7],[141.8,181.8,8.7,8.7]],
                        [43.2,123,[181.8,181.8,8.7,8.7],[181.8,181.8,8.7,-31.3]],
                        [43.2,123,[181.8,181.8,-31.3,-31.3],[181.8,221.8,-31.3,-31.3]]];


    for (var i=0;i<9; i++){
        var start= 5.5+i/10;

        tl.set(lines[i],{x: linesAttributes[i][0],y:linesAttributes[i][1]},5.5)

            .to(lines[i],0,{attr:{x1: linesAttributes[i][2][0], x2: linesAttributes[i][2][1] , y1: linesAttributes[i][2][2] , y2:linesAttributes[i][2][3] },opacity:1},5.5)
            .to(lines[i],0.1,{attr:{x1: linesAttributes[i][3][0] , x2: linesAttributes[i][3][1], y1: linesAttributes[i][3][2], y2: linesAttributes[i][3][3]},opacity:1},start);
        tl.to(lines[i],0.5,{opacity:0},8.6);
    }

    //------------------------------------------------------------------------------------------------
    // ---------------------------- to refactor ---------------------------------------------------------

// bl_triangle_10   turns   to bl_triangle_desktop_7    141.5,210.4  to 185.7,105.4  x:185.7-141.5 = 44.2  y:105.4-210.4= -105
   tl.to(triangles[9],2,{x:34.2,y:-104,rotation:540 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
     .to(triangles[9],1.5,{x:34.2,y:-104,rotation:540 ,transformOrigin: "center center",ease: 'Linear.easeNone',opacity: 0},2.5);
// bl_triangle_7 turns to bl_triangle_desktop_8        220.2,210.4  to 189.1,106.4  x: 189.1-220.2 = -31.1   y:106,4-210,4 = -104

   tl.to(triangles[6],2,{x:-31.1,y:-104,rotation:720 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
    .to(triangles[6],1.5,{x:-31.1,y:-104,rotation:720 ,transformOrigin: "center center",ease: 'Linear.easeNone',opacity: 0},2.5);
   //bl_triangle_12 turns to bl_triangle_desktop_5  229.6,28   212,105.4  x: -17.6 y: 78.4
    tl.to(triangles[11],2,{x:-32.3,y:62.9,rotation:450 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
       .to(triangles[11],1.5,{x:-192.1,y:77.1,rotation:90,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},2.5)
       .to(triangles[11],0.8,{x:-192.1,y:77.1,rotation:90,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0},4.5)
    //bl_triangle_1 turns to bl_triangle_desktop_6  205.7,73.2   215.3,106.4  x:9.6  y: 33.2
    tl.to(triangles[0],2,{x:19.9,y:32.2,rotation:180 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
       .to(triangles[0],1.5,{x:-145.1,y:46.3,rotation:180,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},2.5)
       .to(triangles[0],0.8,{x:-145.1,y:46.3,rotation:180,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0},4.5)
    //bl_triangle_6 turns to bl_triangle_desktop_3  74.4,73.2  215.3,106.4  x: 140.9 y 33.2

    tl.to(triangles[5],2,{x:163.8,y:32.2,rotation:360 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
       .to(triangles[5],1.5,{x:-5.6,y:46.4,rotation:360,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},2.5)
        .to(triangles[5],0.8,{x:-5.6,y:46.4,rotation:360,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0},4.5)
    //bl_triangle_5 turns to bl_triangle_desktop_4  100.7,73.2  241.6,106.4  x:241.6-100.7 = 140.9 y:106.4-100.7 = 5.7

    tl.to(triangles[4],2,{x:151.3,y:32,rotation:540 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
       .to(triangles[4],1.5,{x:-23.1,y:46.4,rotation:180,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},2.5)
       .to(triangles[4],0.8,{x:-23.1,y:46.4,rotation:180,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0},4.5)
    //bl_triangle_11 turns to bl_triangle_desktop_1  256,28 264.5,105.4  x: -8.5 y: 77.4

    tl.to(triangles[10],2,{x:-6,y:62.9,rotation: 450 ,transformOrigin: "center center",ease: 'Linear.easeNone'},0)
       .to(triangles[10],1.5,{x:-185.1,y:77,rotation:450,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},2.5)
       .to(triangles[10],0.8,{x:-185.1,y:77,rotation:450,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0},4.5);
    //bl_triangle_8 turns to bl_triangle_desktop_2   267.8,106.4  194.1,210.4 x: 73.3 y:104

    tl.to(triangles[7],2,{x:73.3,y:-104,rotation:720,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},0)
      .to(triangles[7],1.5,{x:-110.1,y:-90,rotation:360,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone'},2.5)
      .to(triangles[7],0.8,{x:-110.1,y:-90,rotation:360,scale: 0.7,fill: "#718CC7",transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0},4.5);
    // bl_triangle_14 turns to bl_triangle_desktop_9   224.7,151.8  to 146.7,78.9  x: -78 y: -72.9
    tl.to(triangles[13],2,{x: -78.9, y: -83,rotation: 180 ,transformOrigin: "center center",ease: 'Linear.easeNone' },0)
        .to(triangles[13],1.5,{x: -78.9, y: -83,rotation: 180 ,transformOrigin: "center center",ease: 'Linear.easeNone',opacity:0 },2.5);
    // bl_triangle_15 turns to bl_triangle_desktop_10   198.6,151.8 to 145.7,55.7  x: -52.9 y: -96.1
    tl.to(triangles[14],2,{x: -52.9, y: -96.1,ease: 'Linear.easeNone' },0)
      .to(triangles[14],1.5,{x: -52.9, y: -96.1,ease: 'Linear.easeNone',opacity:0 },2.5);



    tl.to(triangles[1],2,{x: 70, y: 30, opacity: 0,ease: 'Linear.easeNone' },0);
    tl.to(triangles[2],2,{x: 60, y: -20, opacity: 0,ease: 'Linear.easeNone' },0);
    tl.to(triangles[3],2,{x: 0, y: 60, opacity: 0,ease: 'Linear.easeNone' },0);
    tl.to(triangles[8],2,{x: 20, y: -20, opacity: 0,ease: 'Linear.easeNone' },0);
    tl.to(triangles[1],2,{x: 70, y: 30, opacity: 0,ease: 'Linear.easeNone' },0);
    tl.to(triangles[12],2,{x: 60, y: -20, opacity: 0,ease: 'Linear.easeNone' },0);
    tl.to(triangles[15],2,{x: 0, y: 60, opacity: 0,ease: 'Linear.easeNone' },0);

    // -------------------------------------------------------------------------------------



    // -----------------------dash line and vert_line  -------------------------------------

    function dashedLine(value,index,arg){
            tl.to(value,2,{opacity:1},0)
              .to(value,1.5,{opacity:0},2.5);

    }

    dashed_line.forEach(dashedLine);


    vert_line=svgDoc.getElementById("gr_vert_line_desktop_1");
    tl.to(vert_line,2,{opacity:1},0)
      .to(vert_line,1.5,{opacity:0},2.5);

    //------------------------------------------------------------------------------

   // ---------------------------------to refactor ----------------------------------

    // gr_sq_4  turns to gr_sq_desktop_1  94.6,123.4  188.5,115.4  x: 188.5-94.6 = 93.9  y: 8
    tl.to(squares[3],2,{attr:{x:188.5,y:165.4,width:76,height:76,strokeWidth:2}},0)
        .to(squares[3],1.5,{attr:{x:55.3,y:173.5,width:26.9,height:26.9,strokeWidth:2}},2.5)  //26.9
        .to(squares[3],2.5,{attr:{x:25,y:215,width:40,height:40,strokeWidth:2}},4.5)
        .to(squares[3],0.5,{attr:{x:65,y:250,width:162,height:162,strokeWidth:2}},8.5)


    tl.to(squares[2],2,{attr:{x:199.1,y:176.1,width:54,height:54,strokeWidth:2,stroke:"#000002",ease: Power0.easeNone}},0)
        .to(squares[2],1.5,{attr:{x:59,y:177.3,width:19.2,height:19.2,strokeWidth:2,stroke:"#000002",ease: 'Linear.easeNone'}},2.5)
        .to(squares[2],2.5,{attr:{x:29.5,y:219.5,width:31,height:31,strokeWidth:2,stroke:"#000002",ease: 'Linear.easeNone'}},4.5)  //25
        .to(squares[2],0.5,{attr:{x:88,y:273.5,width:116,height:116,strokeWidth:2,stroke:"#000002",ease: 'Linear.easeNone'}},8.5)
    tl.to(squares[4],2,{attr:{x:33.1, y:104.6,rx:0,ry:0,width:103.5,height:24,strokeWidth:2,stroke:"#000002",ease: Power0.easeNone},opacity:1},0)
        .to(squares[4],1.5,{attr:{x:40.1, y:70.6,rx:5, ry:5, width:122,height:62,stroke:"#5E6060",ease: Power0.easeNone},strokeWidth:5,rotation: '90',transformOrigin: "10% 90%",opacity:1},2.5)
        .to(squares[4],0.8,{attr:{x:40.1, y:20.6},opacity:0},4.5)
    tl.to(squares[1],2,{attr:{x:175.6, y:104.6,width:103.5,height:24,strokeWidth:2,stroke:"#000002",ease: Power0.easeNone},opacity:1},0)
        .to(squares[1],1.5,{attr:{x:46.2, y:135.6,width:43.7,height:14,strokeWidth:2,stroke:"#000002",ease: Power0.easeNone},opacity:1},2.5)
        .to(squares[1],0.8,{attr:{x:46.2, y:85.6,width:43.7,height:14,strokeWidth:2,stroke:"#000002",ease: Power0.easeNone},opacity:0,scale:0},4.5)
    tl.to(squares[0],2,{attr:{x:88.1,y:135,width:48.5,height:25,strokeWidth:2,stroke:"#969697",ease: Power0.easeNone},opacity:1},0)
        .to(squares[0],1.5,{attr:{x:52.1,y:220.7,width:33,height:17,strokeWidth:2,ease: Power0.easeNone},opacity:1},2.5)
        .to(squares[0],0.8,{attr:{x:52.1,y:170.7,width:33,height:17,strokeWidth:2,ease: Power0.easeNone},opacity:0},4.5)

    tl.to(squares[5],2,{attr:{y:135,width:48.5,height:25,strokeWidth:2,stroke:"#969697",ease: Power0.easeNone},opacity:1},0)
        .to(squares[5],1.5,{attr:{width:48.5,height:25,strokeWidth:2,stroke:"#969697",ease: Power0.easeNone},opacity:0},2.5)

    tl.to(squares[6],2,{attr:{x:208.3,y:185.8,width:35.4,height:35.4,strokeWidth:1,ease: Power0.easeNone},opacity:1},0)
        .to(squares[6],1.5,{attr:{x:62.4,y:180.7,width:12.5,height:12.5,strokeWidth:2,ease: Power0.easeNone},opacity:1},2.5)
        .to(squares[6],2.5,{attr:{x:33.5,y:223.5,width:23,height:23,strokeWidth:2,ease: Power0.easeNone},opacity:1},4.5)  //16
        .to(squares[6],0.5,{attr:{x:108,y:294,width:75.7,height:75.7,strokeWidth:2,ease: Power0.easeNone},opacity:1},8.5)

    tl.to(star,1.5,{x:13,y:80.5,opacity:1,scale:0.18},2.5)
    tl.to(star,2.5,{x:-15.5,y:123.5,opacity:1,scale:0.35},4.5)
    tl.to(star,0.5,{x:65,y:200,scale:1},8.5)

    // ------------------------------------------------------------------------------------------------

    // the threeSquareAndstar moving up by stair;

    var threeStarRotationArray = ["bottom right","top left"];
    var rotationAngle = 90;
    var rotationTime = 5.5;
    var rotationSide;
    for (var i=1;i<6; i++) {
         rotationTime += 0.5;
         if (i & 1)
         {rotationSide = threeStarRotationArray[0];}
         else
         {rotationSide = threeStarRotationArray[1];}
        tl.to(ThreeSquareAndStar, 0.3, {rotation: rotationAngle, transformOrigin: rotationSide}, rotationTime);
        rotationAngle += 180;
    }

    //-------------------------------------------------------------------------------------
    tl.timeScale(1);

};








