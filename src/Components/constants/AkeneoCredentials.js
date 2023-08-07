// export const data = JSON.stringify({
//   grant_type: "password",
//   client_id: JSON.parse(localStorage.getItem("selectedIntegeration"))?.clientId,
//   client_secret: JSON.parse(localStorage.getItem("selectedIntegeration"))
//     ?.secret,
//   username: JSON.parse(localStorage.getItem("selectedIntegeration"))?.userName,
//   password: JSON.parse(localStorage.getItem("selectedIntegeration"))?.password,
// });
import React, { useContext } from "react";
import { ImportStatusContext } from "./ImportStatusContext";

export function AkeneoCredentials() {
  const { importStatus, updateImportStatus, sharedState } =
    useContext(ImportStatusContext);

  const { selectedIntegeration, setSelectedIntegeration } = sharedState;

  const data = JSON.stringify({
    grant_type: "password",
    client_id: selectedIntegeration.clientId,
    client_secret: selectedIntegeration.secret,
    username: selectedIntegeration.userName,
    password: selectedIntegeration.password,
  });

  return data;
}
