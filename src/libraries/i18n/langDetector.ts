
export default {
  install: (app: any, options: any) => {

    function translate(){
      let currentURL = (window.location.href);
      let splitURL = currentURL.toString().split("/");
      let href = splitURL[3];
      let lang = ""
      if(href == 'en' || href == 'de') {
        lang = href
      }else{
        lang = navigator.language.split('-')[0]
      }
      return lang
    }
    app.config.globalProperties.$translate = translate;

    app.provide("langDetector", {translate});
  }
}
