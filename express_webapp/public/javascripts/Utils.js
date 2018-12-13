function requestGet(url, callback){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    //     if (this.readyState == 4 && this.status == 200) {

    if(this.readyState == 4 && this.status == 200){
      callback(this.responseText);
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
* values - Json
*/
function requestPost(url, values, callback){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      callback(this.responseText);
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(values);
}


function calculeDuree(duree){
    var minutes = Math.floor(duree / 60);
    var seconds = duree - minutes * 60;
    return minutes + ":" + str_pad_left(seconds,'0',2);
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}
