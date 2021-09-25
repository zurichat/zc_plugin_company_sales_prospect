import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

// registerApplication(
//   "@single-spa/welcome",
//   () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   (location) => location.pathname.endsWith("/")
// );

// registerApplication({
//   name: "@zuri/navbar",
//   app: () => System.import("@zuri/navbar"),
//   activeWhen: ["/"]
// });

registerApplication({
  name: "@zuri/zuri-plugin-company-sales-prospects",
  app: () => System.import("@zuri/zuri-plugin-company-sales-prospects"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@zuri/zuri-sidebar",
  app: () => System.import("@zuri/zuri-sidebar"),
  activeWhen: ["/sidebar"],
});

// customRegister(window.isLocal ? "dev" : "prod");

// function customRegister(env) {
//   console.log({ isLocal: window.isLocal, env });

//   if (env === "dev") {
//     registerApplication({
//       name: "@zuri/zuri-plugin-company-sales-prospects",
//       app: () => System.import("//localhost:8200/static/zuri-zuri-plugin-company-sales-prospects.js"),
//       activeWhen: ["/"],
//     });
//   } else {
//     registerApplication({
//       name: "@zuri/zuri-plugin-company-sales-prospects",
//       app: () =>
//         System.import("https://sales.zuri.chat/static/zuri-zuri-plugin-company-sales-prospects.js"),
//       activeWhen: ["/"],
//     });
//   }
// }

start({
  urlRerouteOnly: true,
});
