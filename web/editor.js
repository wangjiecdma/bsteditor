var selectID = "";



$(function () {
    hideSelectView();
    updateMainContent();
    //
    //
    // $("#dianti_label").click(function (event) {
    //     alert( "Thanks for visiting!" );
    // });
});


document.onmouseup=function (ev) {
    console.log("document mose up ");
    showSelectView(selectID);
}



function selectView(x ,y) {
    var array =document.getElementsByClassName("dianti");
    for (index in array){
        var top = array[index].offsetTop;
        var left = array[index].offsetLeft;
        var w = array[index].offsetWidth;
        var h = array[index].offsetHeight;
        if (x>left && x<(left+w)){
            if(y>top && y < (top+h)){
                selectID = array[index].id;
                return ;
            }
        }
    }
    selectID = "";
}


function updateMainContent() {
    var obj = document.getElementById("main_content_parent");
    var x = obj.offsetLeft;
    var y = obj.offsetTop;
    var width = obj.offsetWidth;
    var height = obj.offsetHeight;
    var w = 1024;
    var h = 768;

    $("#main_content").css({'left':((width-w)/2) , 'top':10 , 'width':w , 'height':h});

}

function initNewView(id){
    $("#"+id).resizable({
        helper: "ui-resizable-helper"
    });
    $("#"+id).draggable({ helper: "original",
        cursor: "move"});


    $("#"+id).onmousedown = function (ev) {
        if (selectID.length>0){
            // $("#"+selectID).css("background", "#FFFFFF");
        }

        //当前被点击的控件改变背景色
        //$(this).css("background", "#588600");
        console.log("select ID is :"+$(this));
        selectID =  ev.target.id;
        showSelectView(selectID);
    }
    $("#"+id).click(function () {
        console.log("select ID is :"+$(this));
        selectID = $(this).attr('id');
        showSelectView(selectID);
    });

}

$(function() {
    var arrays =  document.getElementsByClassName("dianti");
    for (index in arrays){
        var id =arrays[index].id;
        initNewView(id);
    }
});

$("#dianti_label").bind("ondragend",dragEndCreateView);
$("#dianti_image").bind("ondragend",dragEndCreateView);
$("#dianti_video").bind("ondragend",dragEndCreateView);

function dragEndCreateView(event){

    var id = event.currentTarget.id;

    console.log("drag me :"+id);

    console.log("drag end :"+event.clientX+ " , "+event.clientY);
    var position = $("#main_content").position();
    var width = $("#main_content").width();
    var heith = $("#main_content").height();
    if (event.clientX<position.left || event.clientX > (position.left +width)){
        return ;
    }
    if (event.clientY<position.top || event.clientY > (position.top +heith)){
        return ;
    }
    console.log("drag end  need create one element ");
    var date = new Date();
    var id = "dianti"+date.getHours()+date.getMinutes()+date.getSeconds();
    if (event.currentTarget.id == 'dianti_label') {
        // $("#main_content").append('<p id="new_view"   ondrop="dragEndSelectView(this)" class="ui-widget-content  dianti DianTiText" style="position: absolute; left: 200px;top: 200px;  height: 30px;width: 200px;">' +
        //     'this is a testview </p>');

        $("#main_content").append('<div id="new_view"    class="ui-widget-content dianti  DianTiText" style="  background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;  position:absolute;  left: 100px; top: 100px; height: 100px;width: 100px;">' +
            '  <p id="textlabel" >this is a testview</p>  </div>');


    }else if (event.currentTarget.id == 'dianti_picture') {
        $("#main_content").append('<div id="new_view"    class="ui-widget-content dianti  DianTiImage" style=" background-image:url(img/zhanwei.png); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;  position:absolute;  left: 100px; top: 100px; height: 100px;width: 100px;"></div>');

    }else if(event.currentTarget.id == 'dianti_moive'){
        $("#main_content").append('<div id="new_view"    class="ui-widget-content dianti DianTiVideo" style=" background-image:url(img/videozhanwei.png); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;  position:absolute;  left: 100px; top: 100px; height: 100px;width: 100px;"></div>');
    }
    $("#new_view").attr('id',id);

    document.getElementById(id).onmousedown=function (ev) {
        console.log("click me :"+$(this).attr('id'));
        selectID = $(this).attr('id');
        showSelectView($(this).attr('id'));
    }


    initNewView(id);
    var x = event.clientX - position.left;
    var y =  event.clientY - position.top -100;
    $('#'+id).css({'left':x,'top':y});
    selectID = id;
    showSelectView(selectID);
}

function dragEndSelectView(obj){

    console.log("dragEndSelectView");

    showSelectView(obj.id);
}

document.onkeydown=doKey;

function doKey(e) {
    console.log("dokey :"+e.keyCode);
    if (e.keyCode  == 46){
        if(selectID.length >0){
            $("#"+selectID).remove();
            selectID = "";
            showSelectView(selectID);
        }
    }else if(e.keyCode == 13){
        var eleID= document.activeElement.id;


        if (eleID== "dianti_x"){
            var value =document.getElementById("dianti_x").value +"px";
            $("#"+selectID).css({"left":value});
            setTimeout("updateSelectView()",0);
        } else if(eleID== "dianti_y"){
            var value =document.getElementById("dianti_y").value+"px";
            $("#"+selectID).css({"top":value});
            setTimeout("updateSelectView()",0);
        }else if(eleID== "dianti_w"){
            var value =document.getElementById("dianti_w").value-2+"px";
            $("#"+selectID).css({"width":value});
            setTimeout("updateSelectView()",0);
        }else if(eleID== "dianti_h"){
            var value =document.getElementById("dianti_h").value-2+"px";
            $("#"+selectID).css({"height":value});
            setTimeout("updateSelectView()",0);

        }
    }
}

function hideSelectView() {
    $('#editFocusFrameBOTTOM').hide();
    $('#editFocusFrameTOP').hide();
    $('#editFocusFrameRIGHT').hide();
    $('#editFocusFrameLEFT').hide();
}

function updateSelectView() {
    showSelectView(selectID);
}

function showSelectView(id) {

    if(id.length ==0){
        hideSelectView();
        return ;
    }

    var obj = document.getElementById(id);
    var x = obj.offsetLeft;
    var y = obj.offsetTop;
    var width = obj.offsetWidth;
    var height = obj.offsetHeight;


    $('#editFocusFrameLEFT').css({'left':(x-6),'top':(y-6),'height':height+8});
    $('#editFocusFrameRIGHT').css({'left':(x+width),'top':(y-6),'height':height+8});
    $('#editFocusFrameTOP').css({'left':(x-6),'top':(y-6),'width':width+8});
    $('#editFocusFrameBOTTOM').css({'left':(x-6),'top':(y+height),'width':width+8});

    $('#editFocusFrameBOTTOM').show();
    $('#editFocusFrameTOP').show();
    $('#editFocusFrameRIGHT').show();
    $('#editFocusFrameLEFT').show();

    console.log("update select view :"+x +" , "+y+ "  , "+width + " , "+height);

    if( document.getElementById(id).classList.contains("DianTiText")){
        $("#dianti_type").html("文字");
    }else if( document.getElementById(id).classList.contains("DianTiImage")){
        $("#dianti_type").html ("图片");

    }else if( document.getElementById(id).classList.contains("DianTiVideo")){
        $("#dianti_type").html ( "视频");
    }

    dijit.byId("dianti_name").setValue(id);
    dijit.byId("dianti_x").setValue(x);
    dijit.byId("dianti_y").setValue(y);
    dijit.byId("dianti_w").setValue(width);
    dijit.byId("dianti_h").setValue(height);



}