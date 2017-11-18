

// heroku DB url
const dbUrl = "https://shielded-oasis-62403.herokuapp.com/api/v1/";

const httpHeaders = { 'Content-Type' : 'application/json', 'Accept-Charset' : 'utf-8', 'Accept' : 'application/json' };
let myHeaders = new Headers(httpHeaders);


function fetchGetRequest (type){
    const fetchInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'no-cors',
                   cache: 'default' };
    const dataRequest = async () => {
        const response = await fetch(`${dbUrl}${type}`,fetchInit);
        const json = await response.json();
        return json;
    };
    return dataRequest();
}

function fetchPostRequest (data,type){
    const fetchInit = { method: 'POST',
           headers: myHeaders,
           mode: 'no-cors',
           cache: 'default',
           body: data
       };
   const dataPost = async () => {
       const response = await fetch(`${dbUrl}${type}`,fetchInit);
       const json = await response.json();
       return json;
   };
   return dataPost();
}


Handlebars.registerHelper("compare", function(
      lvalue,
      operator,
      rvalue,
      options
    ) {
          if (arguments.length < 3)
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

          // var operator = options.hash ? option.hash.operator : ">=";

          var operators = {
            "==": function(l, r) {
              return l == r;
            },
            "===": function(l, r) {
              return l === r;
            },
            "!=": function(l, r) {
              return l != r;
            },
            "<": function(l, r) {
              return l < r;
            },
            ">": function(l, r) {
              return l > r;
            },
            "<=": function(l, r) {
              return l <= r;
            },
            ">=": function(l, r) {
              return l >= r;
            },
            typeof: function(l, r) {
              return typeof l == r;
            }
          };

          if (!operators[operator])
            throw new Error(
              "Handlerbars Helper 'compare' doesn't know the operator " + operator
            );

          var result = operators[operator](lvalue, rvalue);

          if (result) {
            //true
            return options.fn(this);
          } else {
            //false
            return options.inverse(this);
          }
});
export {
    dbUrl,
    fetchGetRequest,
    fetchPostRequest
    }
