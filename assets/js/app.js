/* ==========================================================================
   李宁宇 NY · AIGC 视觉创作者 — interactions
   Vanilla JS recreation of the original React/Framer Motion behaviour.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  var IMG = "assets/img/";
  var VID = "assets/videos/";
  var REL = "https://github.com/zhangshengchao3369/zhangsc-portfolio/releases/download/media/";

  /* ------------------------------- icons --------------------------------- */
  var svg = function (body, extra) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (extra || "") +
      ">" +
      body +
      "</svg>"
    );
  };

  var ICON = {
    expand: svg(
      '<path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="M21 16v5h-5"/><path d="M21 8V3h-5"/>' +
        '<path d="M3 16v5h5"/><path d="m3 21 6-6"/><path d="M3 8V3h5"/><path d="M9 9 3 3"/>'
    ),
    zoom: svg(
      '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>' +
        '<line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>'
    ),
    play: svg('<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>'),
    book: svg(
      '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>'
    ),
    sparkles: svg(
      '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>' +
        '<path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>'
    ),
    close: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
    smartphone: svg(
      '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>'
    ),
    external: svg('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    leaf: svg(
      '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'
    )
  };

  var esc = function (str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };

  /* -------------------------------- data --------------------------------- */
  var series = function (dir, prefix, count, ext) {
    var out = [];
    for (var i = 1; i <= count; i++) out.push(IMG + dir + "/" + prefix + "-" + i + "." + (ext || "webp"));
    return out;
  };

  var posterImages = series("posters", "poster", 8);
  var bannerImages = series("banners", "banner", 8);
  var ipImages = ["ip-1", "ip-7", "ip-4", "ip-3", "ip-9", "ip-10"].map(function (n) {
    return IMG + "ips/" + n + ".webp";
  });
  var typographyImages = series("typography", "typography", 8);
  var iconImages = series("icons", "icon", 2);
  var portraitImages = series("portraits", "portrait", 6);

  var galleries = {
    poster: { label: "海报", layout: "poster", alt: "海报", images: posterImages },
    banner: { label: "Banner", layout: "banner", alt: "Banner", images: bannerImages },
    ip: { label: "IP形象", layout: "ip", alt: "IP 形象", images: ipImages },
    typography: { label: "字体设计", layout: "typography", alt: "字体设计", images: typographyImages },
    icon: { label: "图标设计", layout: "icon", alt: "图标设计", images: iconImages },
    app: { label: "APP设计", layout: "app", alt: "APP 设计", images: [] },
    portrait: { label: "AI个人写真", layout: "portrait", alt: "个人写真", images: portraitImages }
  };

  var dramas = [
    {
      id: "abyssal-gale",
      title: "怒海狂渊",
      subtitle: "Abyssal Gale",
      videoSrc: REL + "abyssal-gale.mp4",
      poster: VID + "drama/abyssal-gale.jpg",
      synopsis: [
        "风暴海域，渡鸦号与黑棘号狭路相逢，炮火惊醒了深海中的克拉肯与利维坦。",
        "威戈与雷吉带领船员在敌船、风暴与巨兽之间挣扎求生，一场关于生存、背叛与自由的海上决战就此展开。"
      ],
      theme: "在巨兽与风暴面前，真正的敌人或许不是彼此，而是人心深处的恐惧。",
      wide16x9: true,
      concepts: [
        { src: IMG + "dramas/abyssal-gale/characters.webp", thumb: IMG + "dramas/abyssal-gale/characters-thumb.webp", label: "角色设定 · 威戈与雷吉" },
        { src: IMG + "dramas/abyssal-gale/supporting.webp", thumb: IMG + "dramas/abyssal-gale/supporting-thumb.webp", label: "配角设定 · 伊索尔德与船员" },
        { src: IMG + "dramas/abyssal-gale/ships.webp", thumb: IMG + "dramas/abyssal-gale/ships-thumb.webp", label: "场景设定 · 渡鸦号甲板" },
        { src: IMG + "dramas/abyssal-gale/boards.webp", label: "分镜概览 · 全片关键镜头" }
      ]
    },
    {
      id: "rivals-on-edge",
      title: "极速死局",
      subtitle: "Rivals on Edge",
      videoSrc: REL + "rivals-on-edge.mp4",
      poster: VID + "drama/rivals-on-edge.jpg",
      synopsis: [
        "夜色海岸，苏野与陆沉驾驶跑车展开一场没有退路的竞速，速度是这条路上唯一的规则。",
        "当引擎熄灭、硝烟散去，两人约定改日单挑，赢家通吃——胜负之外，真正的对手，或许也是唯一懂你的人。"
      ],
      theme: "速度决定输赢，选择决定结局。",
      wide16x9: true,
      conceptHeading: "剧照",
      concepts: [
        { src: IMG + "dramas/rivals-on-edge/race.webp", thumb: IMG + "dramas/rivals-on-edge/race-thumb.webp", label: "剧照 · 夜间竞速" },
        { src: IMG + "dramas/rivals-on-edge/characters.webp", thumb: IMG + "dramas/rivals-on-edge/characters-thumb.webp", label: "角色 · 苏野与陆沉" },
        { src: IMG + "dramas/rivals-on-edge/explosion.webp", thumb: IMG + "dramas/rivals-on-edge/explosion-thumb.webp", label: "剧照 · 爆炸终局" }
      ]
    },
    {
      id: "huang",
      title: "大黄",
      subtitle: "The Gravekeeper's Dog",
      videoSrc: REL + "huang.mp4",
      poster: VID + "drama/huang.jpg",
      synopsis: [
        "深秋墓园，新来的管理员第一次遇见大黄，把它当成野狗驱赶；老张拦下他：它不是流浪狗。",
        "老张病重，大黄守在床边；老张走后，它仍每天回到墓园，在墓碑前等一个不会再回来的人。"
      ],
      theme: "有些等待没有归期，但陪伴本身就是告别。",
      wide16x9: true,
      conceptHeading: "设定与剧照",
      concepts: [
        { src: IMG + "dramas/huang/characters.webp", thumb: IMG + "dramas/huang/keeper-thumb.webp", label: "角色设定 · 墓园管理员 / 老张 / 大黄" },
        { src: IMG + "dramas/huang/scenes.webp", thumb: IMG + "dramas/huang/scene-thumb.webp", label: "场景设定 · 秋日墓园 / 雪夜江桥 / 海边小院 / 病中卧室" },
        { src: IMG + "dramas/huang/still.webp", thumb: IMG + "dramas/huang/grave-thumb.webp", label: "剧照 · 雪夜守候" }
      ]
    }
  ];

  var tvcVideos = [
    { src: REL + "tvc-1.mp4", poster: VID + "tvc/tvc-1.jpg", title: "唯魅秀广告" },
    { src: REL + "tvc-2.mp4", poster: VID + "tvc/tvc-2.jpg", title: "S.DEER-TVC广告" },
    { src: REL + "tvc-3.mp4", poster: VID + "tvc/tvc-3.jpg", title: "S.DEER-TVC广告 (2)" },
    { src: REL + "tvc-4.mp4", poster: VID + "tvc/tvc-4.jpg", title: "S.DEER-TVC广告 (3)" }
  ];

  var shortVideos = [
    { src: REL + "short-1.mp4", poster: VID + "short/short-1.jpg", title: "微光" },
    { src: REL + "short-2.mp4", poster: VID + "short/short-2.jpg", title: "藏在责任里的爱" },
    { src: REL + "tangshan.mp4", poster: VID + "short/tangshan.jpg", title: "唐山文旅" }
  ];

  /* ------------------------- scroll locking ------------------------------ */
  var locks = 0;
  var saved = {};

  function lockScroll() {
    if (locks === 0) {
      var gap = window.innerWidth - document.documentElement.clientWidth;
      saved = {
        html: document.documentElement.style.overflow,
        body: document.body.style.overflow,
        pad: document.body.style.paddingRight
      };
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (gap > 0) document.body.style.paddingRight = gap + "px";
    }
    locks++;
  }

  function unlockScroll() {
    locks = Math.max(0, locks - 1);
    if (locks === 0) {
      document.documentElement.style.overflow = saved.html || "";
      document.body.style.overflow = saved.body || "";
      document.body.style.paddingRight = saved.pad || "";
    }
  }

  /* ------------------------------ reveal --------------------------------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px 0px 50px 0px", threshold: 0 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ------------------------------ lightbox ------------------------------- */
  var lightbox = $("#lightbox");
  var lbImg = $("[data-lb-img]");
  var lbCounter = $("[data-lb-counter]");
  var lbPrev = $("[data-lb-prev]");
  var lbNext = $("[data-lb-next]");
  var lbState = { images: [], index: 0, isOpen: false, returnFocus: null };
  var lbSets = {};

  function setLbImage(index, animate) {
    var total = lbState.images.length;
    if (!total) return;
    lbState.index = (index + total) % total;
    lbImg.src = lbState.images[lbState.index];
    lbImg.alt = "作品预览 " + (lbState.index + 1);
    lbCounter.textContent = lbState.index + 1 + " / " + total;
    var hasMany = total > 1;
    lbPrev.hidden = !hasMany;
    lbNext.hidden = !hasMany;
    if (animate) {
      lbImg.style.animation = "none";
      void lbImg.offsetWidth;
      lbImg.style.animation = "";
    }
    var next = lbState.images[(lbState.index + 1) % total];
    var prev = lbState.images[(lbState.index - 1 + total) % total];
    if (next) new Image().src = next;
    if (prev) new Image().src = prev;
  }

  function openLightbox(images, index, returnFocus) {
    if (!images || !images.length) return;
    lbState.images = images;
    lbState.isOpen = true;
    lbState.returnFocus = returnFocus || document.activeElement;
    setLbImage(index || 0, false);
    lightbox.hidden = false;
    lockScroll();
    $("[data-lb-close]", lightbox).focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lbState.isOpen) return;
    lbState.isOpen = false;
    lightbox.hidden = true;
    lbImg.removeAttribute("src");
    unlockScroll();
    if (lbState.returnFocus && lbState.returnFocus.focus) {
      lbState.returnFocus.focus({ preventScroll: true });
    }
  }

  if (lightbox) {
    $("[data-lb-close]", lightbox).addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () {
      setLbImage(lbState.index - 1, true);
    });
    lbNext.addEventListener("click", function () {
      setLbImage(lbState.index + 1, true);
    });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    $("[data-lb-stage]", lightbox).addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  /* ------------------------------ galleries ------------------------------ */
  var galleryStage = $("#galleryStage");

  function renderGallery(key) {
    var gallery = galleries[key];
    if (!gallery || !galleryStage) return;
    lbSets[key] = gallery.images;

    if (key === "app") {
      galleryStage.innerHTML = renderAppCard();
      return;
    }

    var cards = gallery.images
      .map(function (src, index) {
        return (
          '<button class="card" type="button" style="--i:' +
          index +
          '" data-gallery="' +
          key +
          '" data-index="' +
          index +
          '" aria-label="查看' +
          gallery.alt +
          " " +
          (index + 1) +
          ' 大图">' +
          '<img src="' +
          src +
          '" alt="' +
          gallery.alt +
          " " +
          (index + 1) +
          '" loading="lazy" decoding="async">' +
          '<span class="card__veil"><span class="card__zoom">' +
          ICON.expand +
          "</span></span></button>"
        );
      })
      .join("");

    galleryStage.innerHTML = '<div class="gallery gallery--' + gallery.layout + '">' + cards + "</div>";
  }

  function renderAppCard() {
    return (
      '<article class="app-card">' +
      '<a href="https://lnyvdstar-spec.github.io/food-guardian-website/" target="_blank" rel="noreferrer" aria-label="查看食材保卫战 APP 设计项目">' +
      '<div class="app-card__media">' +
      '<img src="' +
      IMG +
      'app-design/food-guardian.webp" alt="食材保卫战 APP 设计项目首页预览" loading="lazy" decoding="async">' +
      '<span class="app-card__shade"></span>' +
      '<span class="app-card__badge">' +
      ICON.smartphone +
      "APP UI / PRODUCT</span>" +
      '<span class="app-card__arrow">' +
      ICON.external +
      "</span>" +
      "</div>" +
      '<div class="app-card__content">' +
      "<div>" +
      '<div class="app-card__eyebrow">' +
      ICON.leaf +
      "<span>Food Management App</span></div>" +
      '<h3 class="app-card__title">食材保卫战</h3>' +
      '<p class="app-card__desc">围绕食材保质期管理、智能提醒与 AI 菜谱推荐打造的移动端产品体验，让每一种食材都在过期前被好好吃掉。</p>' +
      "</div>" +
      '<div class="app-card__tags"><span>UI/UX</span><span>APP DESIGN</span><span>AIGC</span></div>' +
      "</div>" +
      "</a>" +
      "</article>"
    );
  }

  function pulseStage(stage) {
    if (!stage) return;
    stage.classList.remove("panel-enter");
    void stage.offsetWidth;
    stage.classList.add("panel-enter");
  }

  function initGalleryTabs() {
    var tabs = $$("[data-cat]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        if (tab.classList.contains("is-active")) return;
        tabs.forEach(function (other) {
          other.classList.toggle("is-active", other === tab);
          other.setAttribute("aria-selected", other === tab ? "true" : "false");
        });
        renderGallery(tab.dataset.cat);
        pulseStage(galleryStage);
      });
    });
  }

  if (galleryStage) {
    galleryStage.addEventListener("click", function (event) {
      var card = event.target.closest("[data-gallery]");
      if (!card) return;
      var key = card.dataset.gallery;
      var images = lbSets[key] || [];
      openLightbox(images, parseInt(card.dataset.index, 10) || 0, card);
    });
  }

  /* ------------------------------- videos -------------------------------- */
  var videoStage = $("#videoStage");
  var videoTabs = {
    "ai-drama": function () {
      return renderDramas();
    },
    "tvc-ad": function () {
      return renderVideoGrid(tvcVideos);
    },
    "ai-short": function () {
      return renderVideoGrid(shortVideos);
    }
  };

  function renderDramas() {
    var cards = dramas
      .map(function (drama, index) {
        lbSets["drama-" + index] = drama.concepts.map(function (concept) {
          return concept.src;
        });
        var thumbs = drama.concepts
          .slice(0, 3)
          .map(function (concept, ci) {
            return (
              '<button class="concept" type="button" data-gallery="drama-' +
              index +
              '" data-index="' +
              ci +
              '" aria-label="查看 ' +
              esc(concept.label) +
              ' 大图">' +
              '<img src="' +
              (concept.thumb || concept.src) +
              '" alt="' +
              esc(concept.label) +
              '" loading="lazy" decoding="async">' +
              '<span class="concept__veil">' +
              ICON.zoom +
              "</span></button>"
            );
          })
          .join("");

        return (
          '<article class="drama" style="--i:' +
          index +
          '">' +
          '<div class="drama__inner">' +
          '<div class="drama__media"><div class="drama__frame">' +
          '<button class="drama__play" type="button" data-play-drama="' +
          index +
          '" aria-label="播放 ' +
          esc(drama.title) +
          '">' +
          '<img src="' +
          drama.poster +
          '" alt="' +
          esc(drama.title) +
          '" loading="lazy" decoding="async">' +
          '<span class="play-disc">' +
          ICON.play +
          "</span></button>" +
          "</div></div>" +
          '<div class="drama__info">' +
          '<h3 class="drama__title">' +
          esc(drama.title) +
          "</h3>" +
          '<p class="drama__subtitle">' +
          esc(drama.subtitle) +
          "</p>" +
          '<p class="drama__desc">' +
          esc(drama.synopsis[0]) +
          "</p>" +
          '<div class="drama__concepts">' +
          thumbs +
          "</div>" +
          '<button class="story-btn" type="button" data-story="' +
          index +
          '">' +
          ICON.book +
          "<span>查看故事设定</span></button>" +
          "</div></div></article>"
        );
      })
      .join("");

    return '<div class="drama-list">' + cards + "</div>";
  }

  function renderVideoGrid(videos) {
    var cards = videos
      .map(function (video, index) {
        return (
          '<div class="vcard" style="--i:' +
          index +
          '">' +
          '<div class="vcard__frame' +
          (video.vertical ? " vcard__frame--vertical" : "") +
          '">' +
          '<video src="' +
          video.src +
          '" poster="' +
          video.poster +
          '" preload="metadata" playsinline></video>' +
          '<button class="vcard__play" type="button" aria-label="播放 ' +
          esc(video.title) +
          '"><span class="play-disc">' +
          ICON.play +
          "</span></button>" +
          "</div>" +
          '<div class="vcard__title"><p>' +
          esc(video.title) +
          "</p></div>" +
          "</div>"
        );
      })
      .join("");

    return '<div class="video-grid">' + cards + "</div>";
  }

  function renderVideoCategory(key) {
    if (!videoStage || !videoTabs[key]) return;
    videoStage.innerHTML = videoTabs[key]();
    pulseStage(videoStage);
  }

  function initVideoTabs() {
    var tabs = $$("[data-vcat]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        if (tab.classList.contains("is-active")) return;
        tabs.forEach(function (other) {
          other.classList.toggle("is-active", other === tab);
          other.setAttribute("aria-selected", other === tab ? "true" : "false");
        });
        renderVideoCategory(tab.dataset.vcat);
      });
    });
  }

  if (videoStage) {
    videoStage.addEventListener("click", function (event) {
      var playDrama = event.target.closest("[data-play-drama]");
      if (playDrama) {
        var index = parseInt(playDrama.dataset.playDrama, 10);
        var drama = dramas[index];
        var frame = playDrama.parentNode;
        frame.innerHTML =
          '<video src="' +
          drama.videoSrc +
          '" poster="' +
          drama.poster +
          '" controls autoplay playsinline></video>';
        return;
      }

      var playCard = event.target.closest(".vcard__play");
      if (playCard) {
        var card = playCard.closest(".vcard");
        var video = $("video", card);
        playCard.remove();
        if (video) {
          video.controls = true;
          var playing = video.play();
          if (playing && playing.catch) playing.catch(function () {});
        }
        return;
      }

      var concept = event.target.closest("[data-gallery]");
      if (concept) {
        var key = concept.dataset.gallery;
        openLightbox(lbSets[key] || [], parseInt(concept.dataset.index, 10) || 0, concept);
        return;
      }

      var storyBtn = event.target.closest("[data-story]");
      if (storyBtn) {
        openStory(parseInt(storyBtn.dataset.story, 10), storyBtn);
      }
    });
  }

  /* ----------------------------- story modal ----------------------------- */
  var story = $("#story");
  var storyPanel = $("[data-story-panel]");
  var storyReturnFocus = null;

  function storyThumb(concept, index, dramaIndex, wide, wide16x9) {
    var mediaClass = wide ? "story-wide__media" : "story-thumb__media";
    var buttonClass = wide
      ? "story-wide" + (wide16x9 ? " story-wide--16x9" : "")
      : "story-thumb";
    return (
      '<button class="' +
      buttonClass +
      '" type="button" data-gallery="drama-' +
      dramaIndex +
      '" data-index="' +
      index +
      '" aria-label="查看 ' +
      esc(concept.label) +
      ' 大图">' +
      '<div class="' +
      mediaClass +
      '">' +
      '<img src="' +
      concept.src +
      '" alt="' +
      esc(concept.label) +
      '" loading="lazy" decoding="async">' +
      '<span class="story-thumb__veil">' +
      ICON.zoom +
      "</span></div>" +
      '<p class="story-thumb__label">' +
      esc(concept.label) +
      "</p></button>"
    );
  }

  function openStory(index, returnFocus) {
    if (!story || !storyPanel) return;
    var drama = dramas[index];
    if (!drama) return;
    storyReturnFocus = returnFocus || document.activeElement;

    lbSets["drama-" + index] = drama.concepts.map(function (concept) {
      return concept.src;
    });

    var concepts = drama.concepts;
    var last = concepts[concepts.length - 1];
    var rest = concepts.slice(0, concepts.length - 1);
    var restHtml =
      rest.length > 0
        ? '<div class="story__small-grid" data-count="' +
          concepts.length +
          '">' +
          rest
            .map(function (concept, ci) {
              return storyThumb(concept, ci, index, false);
            })
            .join("") +
          "</div>" +
          storyThumb(last, concepts.length - 1, index, true, drama.wide16x9)
        : storyThumb(last, 0, index, true, drama.wide16x9);

    storyPanel.innerHTML =
      '<button class="story__close" type="button" aria-label="关闭" data-story-close>' +
      ICON.close +
      "</button>" +
      '<div class="story__head"><h3 class="story__title">' +
      esc(drama.title) +
      "</h3><p class=\"story__subtitle\">" +
      esc(drama.subtitle) +
      "</p></div>" +
      '<div class="story__synopsis"><p class="story__label">故事简介</p>' +
      '<div class="story__copy">' +
      drama.synopsis
        .map(function (paragraph) {
          return "<p>" + esc(paragraph) + "</p>";
        })
        .join("") +
      '<p class="story__theme">' +
      ICON.sparkles +
      "<span>核心主题：" +
      esc(drama.theme) +
      "</span></p></div></div>" +
      '<div class="story__concepts"><p class="story__label">' +
      esc(drama.conceptHeading || "设定图") +
      "</p>" +
      restHtml +
      "</div>";

    story.hidden = false;
    lockScroll();
    var closeBtn = $("[data-story-close]", storyPanel);
    if (closeBtn) closeBtn.focus({ preventScroll: true });
    storyPanel.scrollTop = 0;
  }

  function closeStory() {
    if (!story || story.hidden) return;
    story.hidden = true;
    storyPanel.innerHTML = "";
    unlockScroll();
    if (storyReturnFocus && storyReturnFocus.focus) {
      storyReturnFocus.focus({ preventScroll: true });
    }
  }

  if (story) {
    story.addEventListener("click", function (event) {
      if (event.target.closest("[data-story-close]")) {
        closeStory();
        return;
      }
      if (event.target === story) {
        closeStory();
        return;
      }
      var thumb = event.target.closest("[data-gallery]");
      if (thumb) {
        var key = thumb.dataset.gallery;
        openLightbox(lbSets[key] || [], parseInt(thumb.dataset.index, 10) || 0, thumb);
      }
    });
  }

  /* --------------------------- keyboard support -------------------------- */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (lbState.isOpen) {
        closeLightbox();
      } else if (story && !story.hidden) {
        closeStory();
      }
      return;
    }
    if (!lbState.isOpen) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setLbImage(lbState.index + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setLbImage(lbState.index - 1, true);
    }
  });

  /* ----------------------------- hero tilt ------------------------------- */
  function initHeroTilt() {
    var zone = $(".hero__portrait");
    var inner = $(".hero__portrait-inner");
    if (!zone || !inner) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var padding = 150;
    var strength = 3;

    var reset = function () {
      inner.style.transition = "transform 0.6s ease-in-out";
      inner.style.transform = "translate3d(0px, 0px, 0px)";
    };

    var move = function (event) {
      var rect = inner.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var offsetX = event.clientX - centerX;
      var offsetY = event.clientY - centerY;
      var withinX = Math.abs(offsetX) < rect.width / 2 + padding;
      var withinY = Math.abs(offsetY) < rect.height / 2 + padding;
      if (withinX && withinY) {
        inner.style.transition = "transform 0.3s ease-out";
        inner.style.transform =
          "translate3d(" + offsetX / strength + "px, " + offsetY / strength + "px, 0px)";
      } else {
        reset();
      }
    };

    zone.addEventListener("mousemove", move);
    zone.addEventListener("mouseleave", reset);
  }

  /* ----------------------------- marquee --------------------------------- */
  function initMarquee() {
    var section = $(".marquee");
    var top = $('[data-marquee="posters"]');
    var bottom = $('[data-marquee="banners"]');
    if (!section || !top || !bottom) return;

    var posterRow = posterImages.concat(posterImages, posterImages);
    var bannerRow = bannerImages.concat(bannerImages, bannerImages);

    top.innerHTML = posterRow
      .map(function (src, index) {
        return (
          '<img src="' +
          src +
          '" alt="" aria-hidden="true" loading="lazy" decoding="async" width="270" height="360"' +
          (index >= posterImages.length ? ' data-clone="true"' : "") +
          ">"
        );
      })
      .join("");

    bottom.innerHTML = bannerRow
      .map(function (src, index) {
        return (
          '<img src="' +
          src +
          '" alt="" aria-hidden="true" loading="lazy" decoding="async" width="540" height="180"' +
          (index >= bannerImages.length ? ' data-clone="true"' : "") +
          ">"
        );
      })
      .join("");

    var ticking = false;

    var update = function () {
      ticking = false;
      var sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      var progress = (window.pageYOffset - sectionTop + window.innerHeight) * 0.3;
      var offset = progress - 200;
      top.style.transform = "translate3d(" + offset + "px, 0, 0)";
      bottom.style.transform = "translate3d(" + -offset + "px, 0, 0)";
    };

    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ------------------------------ navigation ----------------------------- */
  function initNav() {
    $$(".hero__nav-link").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href) return;
        event.preventDefault();
        if (href === "#top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        var target = document.getElementById(href.slice(1));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    var wechat = $("[data-wechat]");
    if (wechat) {
      wechat.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  }

  /* -------------------------------- boot --------------------------------- */
  function boot() {
    renderGallery("poster");
    renderVideoCategory("ai-drama");
    initGalleryTabs();
    initVideoTabs();
    initNav();
    initMarquee();
    initHeroTilt();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
