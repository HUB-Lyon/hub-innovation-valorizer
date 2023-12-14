/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const msalConfig = {
    auth: {
        clientId: "ec27360f-3bd6-44d8-b80e-7150e6492462",
        authority: "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
