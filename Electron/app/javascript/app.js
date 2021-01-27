$(function () {
  //? MENU
  getFlux();

  // Menu construction data
  function getFlux() {
    const path = api + "/utilisateur/1/flux";
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        const res = JSON.parse(httpRequest.response);
        if (res.status === 200) {
          buildMenu(res.data);
          initMenu();
        } else {
          alert("error");
        }
      }
    };
    httpRequest.open("GET", path);
    httpRequest.send();
  }

  // Menu construction dom
  function buildMenu(data) {
    let menu = document.querySelector("#menu-item");
    menu.innerHTML = "";
    data.forEach((flux) => {
      let item = document.createElement("a");
      item.setAttribute("fluxId", flux.id);
      item.innerText = flux.nom;
      item.classList.add("item");

      menu.appendChild(item);
    });
  }

  // Menu init
  function initMenu() {
    $(".ui.secondary.vertical.pointing.menu").on("click", ".item", function () {
      if (!$(this).hasClass("dropdown")) {
        $(this).addClass("active").siblings(".item").removeClass("active");
      }
      getFluxRss($(this).attr("fluxId"));
    });
  }

  //? FLUX

  // Flux get feed
  function getFluxRss(fluxId) {
    const path = api + "/flux/" + fluxId + "/feed";
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        const res = JSON.parse(httpRequest.response);
        if (res.status === 200) {
          buildFeed(res.data.items);
          initFeed();
        } else {
          alert("fuck");
        }
      }
    };

    httpRequest.open("GET", path);
    httpRequest.send();
  }

  function buildFeed(items) {
    let container = document.querySelector("#feed");
    container.innerHTML = "";
    items.forEach((item) => {
      let card = document.createElement("div");
      card.classList.add("ui");
      card.classList.add("card");

      let content = document.createElement("div");
      content.classList.add("content");
      card.appendChild(content);

      let header = document.createElement("div");
      header.classList.add("header");
      header.innerHTML = item.title;
      content.appendChild(header);

      let meta = document.createElement("div");
      meta.classList.add("meta");
      meta.innerHTML = item.pubDate;
      content.appendChild(meta);

      let description = document.createElement("div");
      description.classList.add("description");
      content.appendChild(description);

      let p = document.createElement("p");
      p.innerHTML = item.content;
      description.appendChild(p);

      let extra = document.createElement("div");
      extra.classList.add("extra");
      extra.classList.add("content");
      card.appendChild(extra);

      let author = document.createElement("div");
      author.classList.add("right");
      author.classList.add("floated");
      author.classList.add("author");
      author.innerHTML = item.author;
      extra.appendChild(author);

      container.appendChild(card);
    });
  }

  function initFeed() {}
});
