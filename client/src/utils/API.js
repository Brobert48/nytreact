import axios from "axios";

export default {
  // Gets articles that match query
  getArticles: function(topic,start,end) {
    return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=190dd056faa14437af4acaf18a4fb12a&q=${topic}&begin_date=${start}&end-date=${end}`);
  },
  // Gets the article with the given id
  // getArticle: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  getFavs: function(){
    return axios.get("/api/articles/");
  },
  postArticle: function(articleData) {
    return axios.post("/api/articles/",articleData);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  }
}