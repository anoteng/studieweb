import {userInfo} from "@/userInfo";

const baseURL = 'https://org.ntnu.no/ibm/studier/'
const apiURL = baseURL + 'api.php/'
const login = {
    checkApiKey(key) {

        return new Promise(function (resolve, reject){
            fetch(baseURL + 'api.php/status/ping', {
                credentials: "include",
                headers: {
                    'X-API-Key': key,
                }
            })
                .then(response => response.json())
                .then(data => {resolve(data)})
                .catch(err => reject(err))
        })

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
                  const user = data.records[0]
                  let accessLevel = 0
                  if(user.allow_login){
                      accessLevel = 1
                  }

                  userInfo.set('plopenr', user.plopenr)
                  userInfo.set('last_name', user.last_name)
                  userInfo.set('first_name', user.first_name)
                  userInfo.set('email', user.email)
                  userInfo.set('accessLevel', accessLevel)
                  userInfo.set('accessToken', key)

              })
              .then(() =>{
                  login.checkAdminLevel(userInfo.plopenr, userInfo.accessToken)
                      .then(result => {
                          userInfo.set('accessInfo', result)
                          if(result.departmentAdmin.length>0){
                              userInfo.set('accessLevel', 2)
                          }
                          if(result.facultyAdmin){
                              userInfo.set('accessLevel', 3)
                          }
                          if(result.superAdmin){
                              userInfo.set('accessLevel', 4)
                          }
                          console.log(result)
                      })
              })
              .then(data => {
                  console.log(data)
                  resolve(data)
              })

              .catch(err => reject(err))
        })
    },
    checkAdminLevel(plopenr, key){
        return new Promise(function (resolve, reject){
            let departmentAdmin = false
            let facultyAdmin = false
            let superAdmin = false
            fetch(apiURL + 'records/departmentadmin?filter=plopenr,eq,' + plopenr + '&join=department', {
                headers: {
                    'X-API-Key': key
                }
            })
                .then(response => response.json())
                .then(data =>{
                    data = data.records
                    if(data.length > 0){
                        departmentAdmin = data
                    }
                })
                .catch(err => reject(err))
                .then(()=> {
                    fetch(apiURL + 'records/facultyadmin?filter=plopenr,eq,' + plopenr + '&join=faculty', {
                        headers: {
                            'X-API-Key': key
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            data = data.records
                            if (data.length > 0) {
                                facultyAdmin = data
                            }
                        })
                        .catch(err => reject(err))
                        .then(() => {
                            fetch(apiURL + 'records/superadmin?filter=plopenr,eq,' + plopenr, {
                                headers: {
                                    'X-API-Key': key
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    data = data.records
                                    if (data.length > 0 && data[0].active === true) {
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