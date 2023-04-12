import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock API DOCS: https://github.com/ctimmerm/axios-mock-adapter
// The delay response is emulating a slower network request
const mock = new MockAdapter(axios, { delayResponse: 1000 });

let userStudies = [
   { description: "This study is about diabetes", id: "st1", joined: false, name: "Diabetes", researcher: "Sano" },
   { description: "This study is about covid-19", id: "st2", joined: true, name: "Covid-19", researcher: "Astrazeneca" },
   { description: "This study is about Parkinsons", id: "st3", joined: null, name: "Parkinsons", researcher: "" },
   { description: "This study is about Acid reflux", id: "st4", joined: false, name: "Acid reflux", researcher: "Dr Yesseini" },
   { description: "This study is about Alzheimers", id: "st5", joined: false, name: "Alzheimers", researcher: "Sano" },
];

let joinedStatus = '';
// Example of a GET request
// mock.onGet("/users").reply(200, {
//    users: [{ id: 1, name: "John Smith" }],
// });

// TODO: Implement fetching a list of studies
mock.onGet("/home-test/users/1337/studies").reply(200, {
   "userStudies": userStudies
});
// TODO: Implement delete request for a user to leave the study
mock.onDelete(/\/home-test\/users\/1337\/studies\/st\d+/).reply(function(config){
   console.log("DELETE: ", config);
   userStudies = userStudies.filter(study => {
      if(study.id !== config.id){
         return study;
      }
   })
   return [204, {}]; 
});
// TODO: Implement join request for a user to join the study
mock.onPut(/\/home-test\/users\/1337\/studies\/st\d+/).reply(function(config){
   console.log(config);
   const bodyData = JSON.parse(config.data);
   userStudies = userStudies.map(study => {
      if(study.id === bodyData.id){
         return bodyData;
      }
      return study;
   })
   return [204, bodyData]; 
});

export { axios };
