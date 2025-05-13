import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    return axios.create({
      // baseURL: `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local`, // this is when you run the client in a k8s deployment
      baseURL: `http://himanshu123abc.com`,
      headers: req?.headers
    });
  } else {
    return axios.create({
      baseURL: "http://himanshu123abc.com"
    });
  }    
};