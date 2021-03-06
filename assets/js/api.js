import {
  accept,
  base,
  body,
  createFetch,
  createStack,
  method,
  params,
  parse
} from "http-client";

import config from "config";

const commonStack = createStack(
  base(config.apiBaseUrl),
  accept("application/json"),
  parse("json", "jsonData")
);

const Preview = {
  create: postBody => {
    const payload = {
      post: {
        body: postBody
      }
    };
    const fetch = createFetch(
      commonStack,
      method("POST"),
      body(JSON.stringify(payload), "application/json")
    );

    return fetch("/preview");
  }
};

const UploadSignature = {
  create: (filename, mimetype) => {
    const payload = {
      upload: {
        filename,
        mimetype
      }
    };
    const fetch = createFetch(
      commonStack,
      method("POST"),
      body(JSON.stringify(payload), "application/json")
    );

    return fetch("/upload_signature");
  }
};

const Api = {
  Preview,
  UploadSignature
};

export default Api;
