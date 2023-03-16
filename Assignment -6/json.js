function start() {
  fetch(`data.json`)
    .then(function (repeat) {
      return repeat.json();
    })
    .then(function (val) {
      console.log(val);
      console.log(val.length);
      creatediv(val);
    });
}
start();
let num = 0;
function creatediv(number) {
  num = number.length;
  for (let a = 0; a < number.length; a++) {
    let box = document.createElement("div");
    document.getElementById("second").appendChild(box);
    box.setAttribute("class", "box");
    box.setAttribute("id", "main" + a);
    console.log(number[a]);
    box.innerHTML = `
                        <div id="root${a}" class="root">
                       <div id="image"><img src="${number[a].logo}"></div>
                       <div id="middle">
                       <div id="sub">
                   
                       <p id="heading">${number[a].company}</p>
                       <div class="new" id="${a}">NEW!</div>
                       <div class="feature" id="box${a}">FEATURED</div>
                      </div>
                       <p id="stream">${number[a].position}</p>
                       <ul id="detail">
                       <li class="det">${number[a].postedAt}</li>
                       <li>${number[a].contract}</li>
                       <li>${number[a].location}</li>
                       </ul>
                       </div>
                       <div class="last" id="last${a}">
                       <div id="role${a}" class="role" onclick="createList(this)">${number[a].role}</div>
                       <div id="level${a}" class="level" onclick="createList(this)">${number[a].level}</div>
                       </div>
                       </div>`;
    // console.log(this.last);
    if (number[a].new == false) {
      document.getElementById(a).style.display = "none";
    }
    if (number[a].featured == false) {
      document.getElementById("box" + a).style.display = "none";
    }
    let language = number[a].languages;
    for (let d = 0; d < language.length; d++) {
      let create = document.createElement("div");
      create.setAttribute("class", "lang");
      create.setAttribute("onclick", "createList(this)");
      create.setAttribute("id", "create" + d);
      create.innerText = language[d];
      document.getElementById("last" + a).appendChild(create);
    }
  }
}
let duplicate = [];
let count = 0;
function createList(ele) {
  if (!duplicate.includes(ele.innerText)) {
    let a = document.getElementById("hide");
    a.style.visibility = "visible";

    let list = document.createElement("div");
    list.setAttribute("class", "lists");
    let clr = document.createElement("div");
    clr.innerText = "X";
    clr.setAttribute("onclick", "del(this.parentNode,this.previousSibling)");
    clr.setAttribute("id", "clr");

    let clone = ele.cloneNode(true);
    duplicate.push(clone.innerText);
    list.appendChild(clone);
    list.appendChild(clr);
    //list.appendChild(clr);
    document.getElementById("inside").appendChild(list);

    sorting(duplicate);
  }
}
function deleteAll() {
  document.getElementById("inside").innerHTML = "";
  document.getElementById("hide").style.visibility = "hidden";
  document.getElementById("clear").style.visibility = "hidden";
  duplicate = [];
  sorting(duplicate);
}
function del(elem, word) {
  // console.log(elem);
  elem.remove();
  let text = word.innerText;
  let ind = duplicate.indexOf(text);
  duplicate.splice(ind, 1);
  // console.log(duplicate);
  sorting(duplicate);
}

function sorting(dup) {
  for (let x = 0; x < num; x++) {
    let answer = [];
    let count = 0;

    let s = document.getElementById("last" + x).childNodes;
    for (let d = 0; d < s.length; d++) {
      answer.push(s[d].innerText);
    }

    // console.log(answer);
    dup.map((val) => {
      answer.map((tex) => {
        if (val == tex) {
          count++;
        }
      });
    });
    // console.log(count);
    if (count == dup.length) {
      document.getElementById("main" + x).style.display = "block";
    } else {
      document.getElementById("main" + x).style.display = "none";
    }
  }
}
