(() => {
  "use strict";
  var e = {
      820: (e, t, s) => {
        s.r(t);
      },
      78: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.HierarchyManager = void 0);
        const a = s(100);
        t.HierarchyManager = class {
          constructor() {
            (this.stateManager = new a.StateManager()),
              (this.titleSelector = ".js-category-title"),
              (this.listSelector = ".js-category-list");
          }
          init() {
            this.addListeners(), this.initSaved(), this.openCurrentPath();
          }
          openPathAndSave(e) {
            this.openPath(e), this.stateManager.addOpenedPath(e);
          }
          openPath(e) {
            const t = document.querySelector(
              `${this.listSelector}[data-id="${e}"]`,
            );
            t &&
              (t.classList.add("_open"),
              t.parentNode
                ?.querySelector(this.titleSelector)
                ?.classList.add("_open"));
          }
          closePath(e) {
            const t = document.querySelector(
              `${this.listSelector}[data-id="${e}"]`,
            );
            t &&
              (t.classList.remove("_open"),
              t.parentNode
                ?.querySelector(this.titleSelector)
                ?.classList.remove("_open"),
              this.stateManager.removeOpenedPath(e));
          }
          closePathWithChildren(e) {
            this.closePath(e);
            const t = document.querySelector(
              `${this.listSelector}[data-id="${e}"]`,
            );
            if (!t) return;
            const s = t.querySelectorAll(this.listSelector);
            for (const e of s) this.closePath(e.dataset.id || "");
          }
          togglePath(e) {
            const t = document.querySelector(
              `${this.listSelector}[data-id="${e}"]`,
            );
            t &&
              (t.classList.contains("_open")
                ? this.closePathWithChildren(e)
                : this.openPathAndSave(e));
          }
          addListeners() {
            const e = document.querySelectorAll(
              '.js-category-title:not([data-id="root"])',
            );
            for (const t of e)
              t.addEventListener("click", () => {
                const e = t.dataset.id || "";
                this.togglePath(e);
              });
            this.addExpandListener(),
              this.addCollapseListener(),
              this.addTargetListener();
          }
          addExpandListener() {
            document
              .querySelector(".js-tree-expand")
              ?.addEventListener("click", () => {
                const e = document.querySelectorAll(this.listSelector);
                for (const t of e) {
                  const e = t.dataset.id || "";
                  this.openPathAndSave(e);
                }
              });
          }
          addCollapseListener() {
            document
              .querySelector(".js-tree-collapse")
              ?.addEventListener("click", () => {
                const e = document.querySelectorAll(this.listSelector);
                for (const t of e) {
                  const e = t.dataset.id || "";
                  this.closePath(e);
                }
              });
          }
          addTargetListener() {
            document
              .querySelector(".js-tree-target")
              ?.addEventListener("click", () => {
                this.openCurrentPath()?.scrollIntoView();
              });
          }
          initSaved() {
            const e = this.stateManager.getOpenedPaths();
            for (const t of e) this.openPath(t);
          }
          openCurrentPath() {
            const e = window.location.pathname.split("/"),
              t = `/${e[e.length - 2] || ""}/${e[e.length - 1] || ""}`,
              s = document.querySelector(`.js-category-link[data-id="${t}"]`);
            if (!s) return null;
            s.classList.add("_active");
            let a = s.closest(this.listSelector);
            for (; a; ) {
              const e = a.dataset.id || "";
              this.openPath(e), (a = a.parentNode.closest(this.listSelector));
            }
            return s;
          }
        };
      },
      100: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.StateManager = void 0);
        t.StateManager = class {
          constructor() {
            (this.openedPathLsKey = "opened-path-state"),
              (this.openedPaths = []);
            const e = localStorage.getItem("opened-path-state");
            this.openedPaths = e ? JSON.parse(e) : [];
          }
          addOpenedPath(e) {
            this.openedPaths.push(e), this.updateState();
          }
          removeOpenedPath(e) {
            (this.openedPaths = this.openedPaths.filter((t) => t !== e)),
              this.updateState();
          }
          getOpenedPaths() {
            return this.openedPaths;
          }
          updateState() {
            localStorage.setItem(
              this.openedPathLsKey,
              JSON.stringify(this.openedPaths),
            );
          }
        };
      },
    },
    t = {};
  function s(a) {
    var o = t[a];
    if (void 0 !== o) return o.exports;
    var r = (t[a] = { exports: {} });
    return e[a](r, r.exports, s), r.exports;
  }
  s.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  };
  (() => {
    const e = s(78);
    s(820);
    new e.HierarchyManager().init();
  })();
})();
