const apiURL = 'https://org.ntnu.no/ibm/studier/'
const login = {
    checkApiKey(key) {

        fetch(apiURL + 'api.php/users?filter=login_token,eq,' + key, {
            mode: 'cors',
            headers: {
                'X-API-Key': key,
                credentials: 'include',
                referrerPolicy: 'no-referrer'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
    },
    exchangeLinkForKey(link){
        return new Promise(function (resolve,reject){
            fetch(apiURL + 'login.php?magic='+link)
                .then(response =>response.json())
                .then(data => {
                    console.log(data)
                    resolve(data)
                })
                .catch(err => reject(err))
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