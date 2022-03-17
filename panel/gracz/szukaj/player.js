const urlParams = new URLSearchParams(window.location.search);
const ignParam = urlParams.get("ign");

const svgLoaderDiv = document.getElementById("preloader");
const dataIgn = document.getElementById("data-ign");
const dataUuid = document.getElementById("data-uuid");
const daneDla = dataIgn.parentElement;
const wbgHeader = document.getElementsByClassName("wbg")[0];
const leftCard = document.getElementById("cb-l");

const gElem = document.getElementById("guildName");

gElem.addEventListener(
  "click",
  () => {
    let uuidT = dataUuid.innerText;
    gElem.innerText = `Wczytywanie...`;
    fetch(
      `https://api.hypixel.net/guild?key=480b23e1-8603-4d38-96aa-f3045e54e134&player=${uuidT}`
    )
      .then((response) => response.json())
      .then((data) => {
        let gName = data.guild.name;
        let gTag = data.guild.tag;
        gElem.innerText = `${gName} [${gTag}]`;
      });
  },
  { once: true }
);

function ready() {
  svgLoaderDiv.style.transform = "translateX(-100vw)";
  setTimeout(function () {
    svgLoaderDiv.style.display = "none";
    document.getElementsByClassName("card-right")[0].style.opacity = "100%";
    daneDla.display = "block";
    wbgHeader.style.display = "block";
    setTimeout(function () {
      wbgHeader.style.height = "50px";
      leftCard.style.display = "block";
      setTimeout(function () {
        leftCard.style.height = "400px";
      }, 75);
    }, 20);
    // $(wbgHeader).slideDown("slow", function () {
    //   $(document.getElementsByClassName("card-body")[0]).slideDown("slow");
    // });
  }, 350);
}

function error(e) {
  document.getElementsByClassName("card-right")[0].style.opacity = "100%";
  daneDla.style.color = "#ed1444";
  daneDla.innerText = "Wystąpił Bład: Nieprawidłowa nazwa gracza";
  wbgHeader.style.borderRadius = "1rem";
  svgLoaderDiv.style.transform = "translateX(-100vw)";
  setTimeout(function () {
    svgLoaderDiv.style.display = "none";
    setTimeout(function () {
      wbgHeader.style.display = "block";
      setTimeout(function () {
        wbgHeader.style.height = "50px";
      });
    }, 100);
  }, 300);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// const userImage = document.getElementById("user-image");
// userImage.src = `https://minotar.net/helm/${ignParam}/64.png`;

// fetch(`https://api.mojang.com/users/profiles/minecraft/${ignParam}`)
// .then((data) => {
//     let name = JSON.parse(data).name;
//     if (name == ignParam.toLowerCase()) {
//         console.log("even");
//     }
// });

fetch(`https://api.mojang.com/users/profiles/minecraft/${ignParam}`)
  .then((response) => response.json())
  .then((data) => {
    let name = data.name;
    let uuid = data.id;
    if (!name) error();
    if (name.toLowerCase() == ignParam.toLowerCase()) {
      dataIgn.innerText = name;
      dataUuid.innerText = uuid;
    } else error();

    fetch(
      `https://api.hypixel.net/skyblock/profiles?key=480b23e1-8603-4d38-96aa-f3045e54e134&uuid=${uuid}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.profiles == null) return;
        let saves = [];
        let profileIds = [];
        let cuteName = [];
        data.profiles.forEach((memberData) => {
          saves.push(parseInt(memberData.members[`${uuid}`].last_save));
          profileIds.push(memberData.profile_id);
          cuteName.push(memberData.cute_name);
        });
        // let currentProfileId =
        //   profileIds[saves.indexOf(Math.max.apply(Math, saves))];
        currentProfileCuteName =
          cuteName[saves.indexOf(Math.max.apply(Math, saves))];

        fetch(
          `https://sky.shiiyu.moe/api/v2/dungeons/${name}/${currentProfileCuteName}`
        )
          .then((response) => response.json())
          .then((data) => {
            let cataLevel =
              data.dungeons.catacombs.level.levelWithProgress.toFixed(2);
            let healerLevel =
              data.dungeons.classes.healer.experience.levelWithProgress;
            let mageLevel =
              data.dungeons.classes.mage.experience.levelWithProgress;
            let berserkLevel =
              data.dungeons.classes.berserk.experience.levelWithProgress;
            let archerLevel =
              data.dungeons.classes.archer.experience.levelWithProgress;
            let tankLevel =
              data.dungeons.classes.tank.experience.levelWithProgress;
            document.getElementById("cata-level").innerText = cataLevel;
            document.getElementById("healer-level").innerText =
              healerLevel.toFixed(2);
            healerProgress = Number(
              (healerLevel - Math.trunc(healerLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "healerProgress"
            ).style.width = `${healerProgress}%`;

            document.getElementById("mage-level").innerText =
              mageLevel.toFixed(2);
            mageProgress = Number(
              (mageLevel - Math.trunc(mageLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "mageProgress"
            ).style.width = `${mageProgress}%`;

            document.getElementById("berserk-level").innerText =
              berserkLevel.toFixed(2);
            berserkProgress = Number(
              (berserkLevel - Math.trunc(berserkLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "berserkProgress"
            ).style.width = `${berserkProgress}%`;

            document.getElementById("archer-level").innerText =
              archerLevel.toFixed(2);
            archerProgress = Number(
              (archerLevel - Math.trunc(archerLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "archerProgress"
            ).style.width = `${archerProgress}%`;

            document.getElementById("tank-level").innerText =
              tankLevel.toFixed(2);
            tankProgress = Number(
              (tankLevel - Math.trunc(tankLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "tankProgress"
            ).style.width = `${tankProgress}%`;
            ready();
          });
      });
  })
  .catch(function () {
    error();
  });
