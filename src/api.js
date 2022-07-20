const baseURL = 'https://org.ntnu.no/ibm/studier/'
const apiURL = baseURL + 'api.php/'
const login = {
    checkApiKey(key) {

        fetch(baseURL + 'api.php/status/ping', {
            credentials: "include",
            headers: {
                'X-API-Key': key,
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
    },
    exchangeLinkForKey(link){
        return new Promise(function (resolve,reject){
            fetch(baseURL + 'login.php?magic='+link)
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
            fetch(baseURL + 'login.php?email='+ email)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        })
        return promise
    },
    getSetUserInfo(key){
        return new Promise(function (resolve, reject){
          fetch(apiURL + 'records/users?filter=login_token,eq,' + key)
              .then(data => data.json())
              .then(data => {
                  console.log(data)
                  resolve(data)
              })
              .catch(err => reject(err))
        })
    }
}

export {login}