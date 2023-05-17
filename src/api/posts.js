import axios from 'axios';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get('refreshToken');

const uploadPost = async (formData) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer  ${refreshToken}`,
    },
  });
  console.log(response);
  return response.data;
};
//중고 매물
const allGoodsGet = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts`);
  console.log('allgoods',response.data)
  return response.data;
}

//인기 매물
const bestGoodsGet = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/best`);
  return response.data;
};



// 게시글 상세 조회
const getGoodsDetail = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/2`);
  return response.data;
};

// const getGoodsDetail = async () => {
//   const response = await axios.get("http://13.209.35.164:3000//api/posts/2");
//   return response;
// };

export { uploadPost, allGoodsGet, bestGoodsGet, getGoodsDetail };

