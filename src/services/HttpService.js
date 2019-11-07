import 'whatwg-fetch'; //this is a library that makes web request for us.


//Create a function in this class that fetches a list of product from the api
export class HttpService {
    getProduct = async () => {
        const response = await fetch('http://localhost:5000/products');
        console.log(response)
        return response;
    }
}

export default HttpService;