// Boodschappenlijst: bewaard in de browser van deze bezoeker (localStorage).
window.Lijst = (function () {
  var KEY = 'kookboek-lijst';
  var mem = { recepten: [], afgevinkt: {} };

  function lees() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY));
      if (d && Array.isArray(d.recepten)) return d;
    } catch (e) {}
    return mem;
  }
  function schrijf(d) {
    mem = d;
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
    teller();
  }

  function voegToe(recept) {
    var d = lees();
    d.recepten = d.recepten.filter(function (r) { return r.url !== recept.url; });
    d.recepten.push(recept);
    schrijf(d);
  }
  function verwijder(url) {
    var d = lees();
    d.recepten = d.recepten.filter(function (r) { return r.url !== url; });
    schrijf(d);
  }
  function leeg() { schrijf({ recepten: [], afgevinkt: {} }); }

  function sleutel(i) { return (i.naam + '|' + (i.eenheid || '')).toLowerCase(); }

  // Zelfde ingrediënt (naam + eenheid) uit verschillende recepten optellen.
  function samengevoegd() {
    var d = lees(), map = {}, volgorde = [];
    d.recepten.forEach(function (r) {
      r.items.forEach(function (i) {
        var k = sleutel(i);
        if (!map[k]) { map[k] = { sleutel: k, naam: i.naam, eenheid: i.eenheid || '', hv: null, recepten: [] }; volgorde.push(k); }
        if (typeof i.hv === 'number') map[k].hv = (map[k].hv || 0) + i.hv;
        if (map[k].recepten.indexOf(r.titel) < 0) map[k].recepten.push(r.titel);
      });
    });
    return volgorde.map(function (k) { var x = map[k]; x.af = !!d.afgevinkt[k]; return x; });
  }
  function vink(k, aan) {
    var d = lees();
    if (aan) d.afgevinkt[k] = true; else delete d.afgevinkt[k];
    schrijf(d);
  }

  function fmt(x) {
    if (x >= 10) return String(Math.round(x));
    var r = Math.round(x * 2) / 2, heel = Math.floor(r);
    return r % 1 ? (heel ? heel + '½' : '½') : String(heel);
  }

  function teller() {
    var el = document.getElementById('lijstTeller');
    if (!el) return;
    var n = lees().recepten.length;
    el.textContent = n ? n : '';
    el.hidden = !n;
  }
  document.addEventListener('DOMContentLoaded', teller);

  return { lees: lees, voegToe: voegToe, verwijder: verwijder, leeg: leeg, samengevoegd: samengevoegd, vink: vink, fmt: fmt };
})();
