export default class applicationRouter{

    constructor(){
    this.routes = [];
    }

    register(method, pattern, handler){
        if(typeof pattern== "string"){
            pattern = new URLPattern({pathname: pattern});
        }
        this.routes.push({method, pattern, handler});

    }

    get(...args){
        this.register("GET", ...args);
    }

    post(...args){
        this.register("POST", ...args);
    }

    handle({request}){
       const route = this.routes.find(({method, pattern}) => {

        return request.method == method && pattern.test(request.url);

       });

       return route.handler({request});

    }

}