/* Browser Back on quiz step 23 opens the $11.90 offer. Earlier steps are unchanged. */
(function () {
  var armed = false;

  function isLast() {
    return /\/esquizz1?\/e23\/?$/.test(location.pathname);
  }

  function go() {
    if (!armed) return;
    armed = false;
    try { sessionStorage.setItem("vireon_backredirect", "1"); } catch (e) {}
    location.href = "/backredirect" + (location.search || "") + (location.hash || "");
  }

  function sync() {
    if (!isLast()) {
      armed = false;
      return;
    }
    try { sessionStorage.removeItem("vireon_backredirect"); } catch (e) {}
    if (armed) return;
    armed = true;
    try { history.pushState({ vireonBack: 1 }, "", location.href); } catch (e) {}
  }

  ["pushState", "replaceState"].forEach(function (name) {
    var original = history[name];
    if (!original) return;
    history[name] = function () {
      var result = original.apply(this, arguments);
      sync();
      return result;
    };
  });

  window.addEventListener("popstate", go);
  sync();
  setTimeout(sync, 400);
  setTimeout(sync, 1200);
})();

