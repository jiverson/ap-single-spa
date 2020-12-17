import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@ap-single-spa/navbar",
  app: () => System.import("@ap-single-spa/navbar"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@ap-single-spa/account-settings",
  app: () => loadWithoutAmd("@ap-single-spa/account-settings"),
  activeWhen: "/settings",
});

start();

// start({
//   urlRerouteOnly: true,
// });

// A lot of angularjs libs are compiled to UMD, and if you don't process them with webpack
// the UMD calls to window.define() can be problematic.
function loadWithoutAmd(name) {
  return Promise.resolve().then(() => {
    let globalDefine = window.define;
    delete window.define;
    return System.import(name).then((module) => {
      window.define = globalDefine;
      return module;
    });
  });
}
