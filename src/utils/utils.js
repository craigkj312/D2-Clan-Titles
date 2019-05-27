import { getProfile, getActivities } from './api';

export let checkDates = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() && date1.getYear() === date2.getYear()
}

export let getRaidCount = (membershipId) => new Promise((resolve, reject) => {

    let raidCount = 0
    const currentDate = new Date()

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) { 
            let raidMap = Object.keys(profileResponse.characters.data).map((characterId, i) => {
                const character = profileResponse.characters.data[characterId]
                return getActivities(character, 250, 4, 0, currentDate)
            })
            let results = Promise.all(raidMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.flat(1)
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, currentDate) &&
                                activity.values.completed.basic.value === 1) {
                                raidCount = raidCount + 1
                            }
                        }
                    })
                }
                resolve(raidCount)
            })  
        } else { resolve(0) }
    })
})

export let getCrucibleWins = (membershipId) => new Promise((resolve, reject) => {

    let crucibleWins = 0
    const currentDate = new Date()

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) { 
            let pvpMap = Object.keys(profileResponse.characters.data).map((characterId, i) => {
                const character = profileResponse.characters.data[characterId]
                return getActivities(character, 250, 5, 0, currentDate)
            })
            let results = Promise.all(pvpMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.flat(1)
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, currentDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.standing.basic.value === 0 &&
                                activity.values.efficiency.basic.value !== 0) {
                                crucibleWins = crucibleWins + 1
                            }
                        }
                    })
                }
                resolve(crucibleWins)
            })
        } else { resolve(0) }
    })
})

export let getGambitWins = (membershipId) => new Promise((resolve, reject) => {

    let gambitWins = 0
    const currentDate = new Date()

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) { 
            let gambitMap = Object.keys(profileResponse.characters.data).map((characterId, i) => {
                const character = profileResponse.characters.data[characterId]
                return getActivities(character, 250, 64, 0, currentDate)
            })
            let results = Promise.all(gambitMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.flat(1)
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, currentDate) &&
                                activity.values.completed.basic.value === 1 &&
                                activity.values.standing.basic.value === 0 &&
                                activity.values.efficiency.basic.value !== 0) {
                                    gambitWins = gambitWins + 1
                            }
                        }
                    })
                }
                resolve(gambitWins)
            })
        } else { resolve(0) }
    })
})

export let getStrikeCount = (membershipId) => new Promise((resolve, reject) => {

    let count = 0
    const currentDate = new Date()

    getProfile(4, membershipId, [200])
    .then(profileResponse => {
        if (profileResponse) { 
            let strikeMap = Object.keys(profileResponse.characters.data).map((characterId, i) => {
                const character = profileResponse.characters.data[characterId]
                return getActivities(character, 250, 18, 0, currentDate)
            })
            let results = Promise.all(strikeMap)
            results.then(activitiesResponse => {
                let allActivites = activitiesResponse.flat(1)
                if (allActivites.length > 0) {
                    allActivites.forEach((activity) => {
                        if (activity) {
                            const activityDate = new Date(activity.period)
                            if (checkDates(activityDate, currentDate) &&
                                activity.values.completed.basic.value === 1) {
                                count = count + 1
                            }
                        }
                    })
                }
                resolve(count)
            })  
        } else { resolve(0) }
    })
})