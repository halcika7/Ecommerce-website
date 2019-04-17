exports.validateicon = str => {
  if (str < 10) {
    return { error: "At least one subcategory required!" };
  }
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  const pattern2 = new RegExp(
    "(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)"
  );
  if (!pattern.test(str) || !pattern2.test(str)) {
    return { error: "Provided URL for icon is not correct" };
  }
};
