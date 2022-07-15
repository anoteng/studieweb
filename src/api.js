const apiURL = 'https://org.ntnu.no/ibm/studier/'
const login = {
    checkApiKey(key) {

        fetch(apiURL + 'api.php/users?filter=login_token,eq,' + key, {
            headers: {
                'X-API-Key': key
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
    },
    exchangeLinkForKey(link){

    }
}

export {login}