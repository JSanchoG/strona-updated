const urlParams = new URLSearchParams(window.location.search);
const guildName = urlParams.get("guildName");
const gNameTag = document.getElementById("gNameTag");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function searchBar() {
  let input = document.getElementById("search").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("ign");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].closest(".playerElem-body").style.display = "none";
    } else {
      x[i].closest(".playerElem-body").style.display = "block";
    }
  }
}
fetch(
  `https://api.hypixel.net/guild?key=480b23e1-8603-4d38-96aa-f3045e54e134&name=${guildName}`
)
  .then((response) => response.json())
  .then((data) => {
    let gName = data.guild.name;
    let gTag = data.guild.tag;
    console.log(
      `Guild Name: ${gName} [${gTag}]\nMembers: ${data.guild.members.length}/125`
    );
    gNameTag.innerText = `${gName} [${gTag}]`;
    const cards = document.getElementsByClassName("cards")[0];
    data.guild.members.forEach((member) => {
      let div1 = document.createElement("div");
      div1.classList.add("playerElem-body");
      let img = document.createElement("img");
      img.src = `https://mc-heads.net/avatar/${member.uuid}/36.png`;
      img.setAttribute(
        "onclick",
        `window.open("https://sky.shiiyu.moe/${member.uuid}")`
      );
      // if (member.uuid == "4b71487207474374b7be97362d56fa17") {
      //   img.classList.add("rainbow");
      // }
      let h3 = document.createElement("h3");
      h3.classList.add("ign");
      let p1 = document.createElement("p");
      p1.classList.add("gRank");
      p1.innerText = `Ranga: ${member.rank}`;
      let div2 = document.createElement("div");
      div2.classList.add("elem-footer");
      let p2 = document.createElement("p");
      p2.classList.add("footer-stats");

      let s = new Date(member.joined).toLocaleDateString("pl-PL");
      fetch(`https://api.ashcon.app/mojang/v2/user/${member.uuid}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          h3.innerText = data.username;
          p2.innerText = `Dołączył do gildii ${s}`;
          console.log(
            `[${member.rank}] \x1b[36m${data.username}\x1b[37m joined the guild at \x1b[33m${s}`
          );
        });
      div1.appendChild(img);
      div1.appendChild(h3);
      div2.appendChild(p1);
      div2.appendChild(p2);
      div1.appendChild(div2);
      cards.appendChild(div1);
    });
  })
  .catch(function () {
    document.getElementById("search").style.display = "none";
    gNameTag.style.color = "#ed1444";
    gNameTag.innerText = "Wystąpił Bład: Nieprawidłowa nazwa gildii";
    setTimeout(function () {
      document.getElementById("onE").style.display = "block";
      document.getElementById("onE").style.opacity = "1";
    }, 200);
  });
