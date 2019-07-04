import { getProfile, getActivities } from './api';

export let checkDates = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() && date1.getYear() === date2.getYear()
}

export let isNewerDate =(date1, date2) => {
    return date1.getYear() > date2.getYear() || (date1.getYear() === date2.getYear() && date1.getMonth() > date2.getMonth())
}

export let isNewerOrEqualDate =(date1, date2) => {
    return date1.getYear() > date2.getYear() || (date1.getYear() === date2.getYear() && date1.getMonth() >= date2.getMonth())
}

export let getDate = (m, y) => {
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ]

    return new Date(monthNames[m] + ' ' + y)
} 

export let formatDate = (date) => {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ]
  
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + year;
}

export let createCharactersMap = (profile, atDate) => {
    let characters = Object.keys(profile.characters.data).map((characterId, i) => {
        return profile.characters.data[characterId]
    })
    return characters.filter((c) => isNewerOrEqualDate(new Date(c.dateLastPlayed), atDate))
}

export let getRaidCount = (name, membershipId, atDate) => new Promise((resolve, reject) => {

    let raidCount = 0

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) {
            let characters = createCharactersMap(profileResponse, atDate)
            let raidMap = characters.map((character) => {
                return getActivities(character, 50, 4, 0, atDate)
            })
            let results = Promise.all(raidMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, atDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.completionReason.basic.displayValue !== 'Failed') {
                                raidCount = raidCount + 1
                            }
                        }
                    })
                }
                resolve({name, count: raidCount})
            })  
            .catch((err) => {
                console.log('GET Raid Activities Error : ', name);
                resolve({name, count: raidCount})
            });
        } else { resolve({name, count: raidCount}) }
    })
    .catch((err) => {
        console.log('GET Profile Error : ', name);
        resolve({name, count: raidCount})
    });
})

export let getCrucibleWins = (name, membershipId, atDate) => new Promise((resolve, reject) => {

    let crucibleWins = 0

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) {
            let characters = createCharactersMap(profileResponse, atDate)
            let pvpMap = characters.map((character) => {
                return getActivities(character, 200, 5, 0, atDate)
            })
            let results = Promise.all(pvpMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, atDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.standing.basic.value === 0 &&
                                activity.values.efficiency.basic.value !== 0) {
                                crucibleWins = crucibleWins + 1
                            }
                        }
                    })
                }
                resolve({name, count: crucibleWins})
            })
            .catch((err) => {
                console.log('GET Crucible Activities Error : ', name);
                // reject('GET Activities Error');
                resolve({name, count: crucibleWins})
            });
        } else { resolve({name, count: crucibleWins}) }
    })
    .catch((err) => {
        console.log('GET Profile Error : ', name);
        // reject('Domain token error. No response.data.');
        resolve({name, count: crucibleWins})
    });
})


export let getGambitWins = (name, membershipId, atDate) => new Promise((resolve, reject) => {

    let gambitWins = 0

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) {
            let characters = createCharactersMap(profileResponse, atDate)
            let gambitMap = characters.map((character) => {
                return getActivities(character, 100, 64, 0, atDate)
            })
            let results = Promise.all(gambitMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, atDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.standing.basic.value === 0 &&
                                activity.values.efficiency.basic.value !== 0) {
                                    gambitWins = gambitWins + 1
                            }
                        }
                    })
                }
                resolve({name, count: gambitWins})
            })
            .catch((err) => {
                console.log('GET Gambit Activities Error : ', name);
                // reject('GET Activities Error');
                resolve({name, count: gambitWins})
            });
        } else { resolve({name, count: gambitWins}) }
    })
    .catch((err) => {
        console.log('GET Profile Error : ', name);
        // reject('Domain token error. No response.data.');
        resolve({name, count: gambitWins})
    });
})

export let getStrikeCount = (name, membershipId, atDate) => new Promise((resolve, reject) => {

    let strikeCount = 0

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) {
            let characters = createCharactersMap(profileResponse, atDate)
            let strikeMap = characters.map((character) => {
                return getActivities(character, 100, 18, 0, atDate)
            })
            let results = Promise.all(strikeMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, atDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.efficiency.basic.value > 0) {
                                strikeCount = strikeCount + 1
                            }
                        }
                    })
                }
                resolve({name, count: strikeCount})
            })
            .catch((err) => {
                console.log('GET Strikes Activities Error : ', name);
                // reject('GET Activities Error');
                resolve({name, count: strikeCount})
            });  
        } else { resolve({name, count: strikeCount}) }
    })
    .catch((err) => {
        console.log('GET Profile Error : ', name);
        // reject('Domain token error. No response.data.');
        resolve({name, count: strikeCount})
    });
})

export let getMenagerieCount = (name, membershipId, atDate) => new Promise((resolve, reject) => {

    let menagerieCount = 0

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) {
            let characters = createCharactersMap(profileResponse, atDate)
            let menagerieMap = characters.map((character) => {
                return getActivities(character, 50, 77, 0, atDate)
            })
            let results = Promise.all(menagerieMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, atDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.completionReason.basic.displayValue !== 'Failed') {
                                menagerieCount = menagerieCount + 1
                            }
                        }
                    })
                }
                resolve({name, count: menagerieCount})
            })  
            .catch((err) => {
                console.log('GET Menagerie Activities Error : ', name);
                resolve({name, count: menagerieCount})
            });
        } else { resolve({name, count: menagerieCount}) }
    })
    .catch((err) => {
        console.log('GET Profile Error : ', name);
        resolve({name, count: menagerieCount})
    });
})