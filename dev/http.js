import axios from "axios";

async function httpGet(url){
    const res = await axios({
      method: 'get',
      url: url
    });
    return res.data;
}
async function httpPost(url, data, headers){
  const res = await axios({
    method: 'post',
    url:url,
    data: data,
    headers: headers
  });
  return res.data;
}

export {
  httpGet,
  httpPost
}