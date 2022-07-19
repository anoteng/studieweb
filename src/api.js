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
        fetch(apiURL + 'login.php?magic='+link)
            .then(response =>response.json())
            .then(data => {
                console.log(data)
                return data
            })
    },
    orderMagicLink(email){
        const promise = new Promise(function (resolve, reject){
            fetch(apiURL + 'login.php?email='+ email)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        })
        return promise
    }
}

export {login}