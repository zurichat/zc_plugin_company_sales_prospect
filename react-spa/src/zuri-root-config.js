import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication(
  "@single-spa/welcome",
  () =>
    System.import("https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  (location) => location.pathname.endsWith('/'),
);

// registerApplication({
//   name: "@zuri/navbar",
//   app: () => System.import("@zuri/navbar"),
//   activeWhen: ["/"]
// });

registerApplication({
  name: "@zuri/zuri-plugin-company-sales-prospects",
  app: () => System.import("@zuri/zuri-plugin-company-sales-prospects"),
  activeWhen: ["/sales"]
});

start({
  urlRerouteOnly: true,
});
