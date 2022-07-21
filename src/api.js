
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
            .then(data => {return(data)})

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
        return new Promise(function (resolve, reject){
            fetch(baseURL + 'login.php?email='+ email)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        })
    },
    getSetUserInfo(key){
        return new Promise(function (resolve, reject){
          fetch(apiURL + 'records/users?filter=login_token,eq,' + key, {
              headers: {
                  'X-API-Key': key
              }
          })
              .then(data => data.json())
              .then(data => {
                  console.log(data)
                  resolve(data)
              })
              .catch(err => reject(err))
        })
    },
    checkAdminLevel(plopenr){
        return new Promise(function (resolve, reject){
            let departmentAdmin = false
            let facultyAdmin = false
            let superAdmin = false
            fetch(apiURL + 'records/departmentadmin?filter=plopenr,eq,' + plopenr + '&join=department')
                .then(response => response.json())
                .then(data =>{
                    if(data.length > 0){
                        departmentAdmin = data
                    }
                })
                .catch(err => reject(err))
                .then(()=> {
                    fetch(apiURL + 'records/facultyadmin?filter=plopenr,eq,' + plopenr + '&join=faculty')
                        .then(response => response.json())
                        .then(data => {
                            if (data.length > 0) {
                                facultyAdmin = data
                            }
                        })
                        .catch(err => reject(err))
                        .then(() => {
                            fetch(apiURL + 'records/superadmin?filter=plopenr,eq,' + plopenr)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.length > 0 && data[0].active === 1) {
                                        superAdmin = true
                                    }
                                })
                                .catch(err => reject(err))
                                .then(() => {
                                    const result = {
                                        departmentAdmin: departmentAdmin,
                                        facultyAdmin: facultyAdmin,
                                        superAdmin: superAdmin
                                    }
                                    resolve(result)
                                })
                        })
                })
        })
    }
}

export {login}