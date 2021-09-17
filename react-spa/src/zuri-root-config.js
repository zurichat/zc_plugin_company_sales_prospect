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
//     System.import("https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   (location) => location.pathname.endsWith('/'),
// );

// registerApplication({
//   name: "@zuri/navbar",
//   app: () => System.import("@zuri/navbar"),
//   activeWhen: ["/"]
// });

registerApplication({
  name: "@zuri/epictetus",
  app: () => System.import("@zuri/epictetus"),
  activeWhen: ["/"]
});

start({
  urlRerouteOnly: true,
});
