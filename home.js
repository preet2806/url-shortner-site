var linklist=JSON.parse(localStorage.getItem("allurl"));
window.onload = () => {
    if(linklist==null){
        linklist={list:[]};
        console.log("null");
    }
    else{
        for (var i = 0; i < linklist.list.length; i++)
        {
            console.log("s");

            htmlString ='<div class="outputlink"><div class="input"><h6></h6></div><div class="output"><h6 id="result">'+linklist.list[i]+'</h6><button class="copy" id="'+i+'" onclick="copyto('+i+')">copy</button></div></div>';
            document.getElementById("outputDiv").innerHTML+=(htmlString);
        }
    }
}

const shorten = () => 
{
    var data = {
        "url":document.getElementById("userlink").value
    };
     console.log(data.url) 
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() 
        {
          if(this.readyState === 4) 
          {
              if(this.status==200 || this.status==201)
              {
        
                    let newData = JSON.parse(this.responseText)

                    console.log("https://rel.ink/"+newData.hashid)
                    
                    console.log(linklist);
                    linklist.list.push("https://rel.ink/"+newData.hashid);
                    var j=linklist.list.indexOf("https://rel.ink/"+newData.hashid);
                    htmlString ='<div class="outputlink"><div class="input"><h6></h6></div><div class="output"><h6 id="result">https://rel.ink/'+newData.hashid+'</h6><button class="copy" id="'+j+'" onclick="copyto('+j+')">copy</button></div></div>'
                    outputDiv.innerHTML+=htmlString;
                    localStorage.setItem("allurl",JSON.stringify(linklist))
                    //get data
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://rel.ink/api/links/"+newData.hashid); //shortened link
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send();
                    xhr.onload=function()
                    {
                      if(this.status==200)
                      {
                        var data=JSON.parse(this.responseText)
                        
                      }
                      else
                      {
                        var data=JSON.parse(this.responseText)
                        
                      }
                    }
                    //get data
              }
          }
        });
        xhr.open("POST", "https://rel.ink/api/links/");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        
        
}

const getStarted = () => {
    console.log("working");
    var elemt=document.getElementById("scroll");
    elemt.scrollIntoView();
    
};
const thumbsup = () => {
    document.getElementById("hiddencircle").style.opacity="0";
    document.getElementById("hiddenrect").style.opacity="0";
    
    
}
const thumbsdown = () => {
    document.getElementById("hiddencircle").style.opacity="1";
    document.getElementById("hiddenrect").style.opacity="1";
}
const copyto = (n) => {
    
    //Before we copy, we are going to select the text.
    var text = document.getElementById(n).previousSibling;
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
    document.getElementById(n).innerHTML="copied!";
    document.getElementById(n).style.backgroundColor="#1a2e35";
    alert("copied link: "+text.innerHTML)
    
}
