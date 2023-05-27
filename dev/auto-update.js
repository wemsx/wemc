import axios from "axios";

var updater = async (version, callback) => {
  axios.get("https://registry.npmjs.org/wemc/latest").then((res) => {
    var npmjsV = res.data.version.toString();

    var npmjsV_a = npmjsV.toString().split(".");
    var version_a = version.toString().split(".");

    var isLTS = () => {
      if (npmjsV_a[0] > version_a[0]) {
        return { isLTS: false, type: "major", error: null };
      } else if (npmjsV_a[1] > version_a[1]) {
        return { isLTS: false, type: "minor", error: null };
      } else if (npmjsV_a[2] > version_a[2]) {
        return { isLTS: false, type: "patch", error: null };
      } else if (
        (npmjsV_a[0] == version_a[0]) &
        (npmjsV_a[1] == version_a[1]) &
        (npmjsV_a[2] == version_a[2])
      ) {
        return { isLTS: true, error: null };
      } else return { error: true };
    };

    var result = isLTS();
    if (result.error) {
      callback("啊？");
    }
    if (result.isLTS == true) {
      callback("已经是最新版的wemc了。");
    } else if (result.isLTS === false) {
      callback(`有更新的${result.type}版本！`);
    }
  });
};
export { updater };
