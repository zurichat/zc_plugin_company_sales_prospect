import { createContext, useState } from "react";
import {
  createEmailTemplateURL,
  getEmailTemplateURL,
  updateEmailTemplateURL,
  deleteEmailTemplateURL,
} from "../axios";
import { useEffect } from "react";

export const PluginContext = createContext(null);
// export const PluginProvider = ({ children }) => {
//   const [templates, setTemplates] = useState(
//     customAxios.get(prospectsURL).catch((e) => console.log(e.response))
//   );

//   return (
//     <PluginContext.Provider value={{ templates, setTemplates }}>
//       {children}
//     </PluginContext.Provider>
//   );
// };
