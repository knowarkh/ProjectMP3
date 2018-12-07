function requestGet(url, callback){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status = 200){
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
    if(this.readyState == 4 && this.status = 200){
      callback(this.responseText);
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(values);
}
