import { getActivities, getFromHash, getPGCR } from './api';
import { checkDates, createCharactersMap } from './utils';

let knownWeapons = {}

export let getRaidCount = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let raidCount = 0

    let characters = createCharactersMap(member, atDate)
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
        console.log('GET Raid Activities Error : ', name, err);
        resolve({name, count: raidCount})
    });
})

export let getCrucibleWins = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let crucibleWins = 0

    let characters = createCharactersMap(member, atDate)
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
        console.log('GET Crucible Activities Error : ', name, err);
        // reject('GET Activities Error');
        resolve({name, count: crucibleWins})
    });
})


export let getGambitWins = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let gambitWins = 0

    let characters = createCharactersMap(member, atDate)
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
        console.log('GET Gambit Activities Error : ', name, err);
        // reject('GET Activities Error');
        resolve({name, count: gambitWins})
    });
})

export let getStrikeCount = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let strikeCount = 0

    let characters = createCharactersMap(member, atDate)
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
        console.log('GET Strikes Activities Error : ', name, err);
        // reject('GET Activities Error');
        resolve({name, count: strikeCount})
    });  
})

export let getMenagerieCount = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let menagerieCount = 0

    let characters = createCharactersMap(member, atDate)
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
        console.log('GET Menagerie Activities Error : ', name, err);
        resolve({name, count: menagerieCount})
    });
})

export let getCoSCount = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let raidCount = 0

    let characters = createCharactersMap(member, atDate)
    let raidMap = characters.map((character) => {
        return getActivities(character, 50, 4, 0, atDate)
    })
    let results = Promise.all(raidMap)
    results.then(activitiesResponse => {
        let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
        if (allActivites.length > 0) {
            let activityNames = []
                allActivites.forEach((activity) => {
                if (activity) {
                    const activityDate = new Date(activity.period)
                    if (checkDates(activityDate, atDate) &&
                        activity.values.completed.basic.value === 1 &&
                        activity.values.completionReason.basic.displayValue !== 'Failed') {
                        activityNames.push(getFromHash("DestinyActivityDefinition", activity.activityDetails.directorActivityHash))
                    }
                }
            })
            if (activityNames.length === 0) { resolve({name, count: raidCount}) }
            else {
                let names = Promise.all(activityNames)
                names.then(hashResponse => {
                    hashResponse.forEach((a) => {
                        if (a) {
                            let name = a.displayProperties.name
                            if (name === "Crown of Sorrow: Normal") {
                                raidCount = raidCount + 1
                            }
                        }
                    })
                    resolve({name, count: raidCount})
                })
                .catch((err) => {
                    console.log('GET CoS Raid Activity Hash Error : ', name, err);
                    resolve({name, count: raidCount})
                });
            }
        }
        else { resolve({name, count: raidCount}) }
    })  
    .catch((err) => {
        console.log('GET CoS Raid Activities Error : ', name, err);
        resolve({name, count: raidCount})
    });
})

export let getPvPSniperKills = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let sniperKills = 0

    let characters = createCharactersMap(member, atDate)
    let pvpMap = characters.map((character) => {
        return getActivities(character, 200, 5, 0, atDate)
    })
    let results = Promise.all(pvpMap)
    results.then(activitiesResponse => {
        let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
        if (allActivites.length > 0) {
            let PGCRPromises = []
            allActivites.forEach((activity) => {
                if (activity) {
                    // console.log(activity);
                    const activityDate = new Date(activity.period)
                    if (checkDates(activityDate, atDate) && activity.values.efficiency.basic.value !== 0) {
                        PGCRPromises.push(getPGCR(activity.activityDetails.instanceId))
                    }
                }
            })
            if (PGCRPromises.length === 0) { resolve({name, count: sniperKills}) }
            else {
                let PGCRs = Promise.all(PGCRPromises)
                PGCRs.then(PGCRResponse => {
                    let weaponKills = {}
                    PGCRResponse.forEach((pgcr) => {
                        if (pgcr) {
                            let player = pgcr.entries.filter((entry) => { return entry.player.destinyUserInfo.membershipId === member.profile.data.userInfo.membershipId })[0]
                            // console.log(player)
                            if (player.extended.weapons) {
                                player.extended.weapons.forEach((weapon) => {
                                    if (knownWeapons[weapon.referenceId] && knownWeapons[weapon.referenceId] === "Sniper Rifle") {
                                        sniperKills += weapon.values.uniqueWeaponKills.basic.value
                                    } else if (knownWeapons[weapon.referenceId] && knownWeapons[weapon.referenceId] !== "Sniper Rifle") {
                                        // ignore weapon
                                    } else {
                                        if (weaponKills[weapon.referenceId]) { 
                                            weaponKills[weapon.referenceId] += weapon.values.uniqueWeaponKills.basic.value
                                        } else {
                                            weaponKills[weapon.referenceId] = weapon.values.uniqueWeaponKills.basic.value
                                        }
                                    }
                                })
                            }
                        }
                    })
                    let weaponHashPromises = []
                    Object.keys(weaponKills).forEach((key) => { weaponHashPromises.push(getFromHash("DestinyInventoryItemDefinition", key)) })
                    if (weaponHashPromises.length === 0) { resolve({name, count: sniperKills}) }
                    else {
                        let weaponData = Promise.all(weaponHashPromises)
                        weaponData.then((weaponDataResponse) => {
                            weaponDataResponse.forEach((weapon) => {
                                // console.log(weapon)
                                knownWeapons[weapon.hash] = weapon.itemTypeDisplayName
                                if (weapon.itemTypeDisplayName === "Sniper Rifle") { sniperKills += weaponKills[weapon.hash] }
                            })
                            resolve({name, count: sniperKills})
                        })
                        .catch((err) => {
                            console.log('GET Weapon Data Error : ', name, err);
                            resolve({name, count: sniperKills})
                        });
                    }
                })
                .catch((err) => {
                    console.log('GET PGCR Error : ', name, err);
                    resolve({name, count: sniperKills})
                });
            }
        }
        else { resolve({name, count: sniperKills}) }
    })
    .catch((err) => {
        console.log('GET Crucible Sniper Activities Error : ', name, err);
        // reject('GET Activities Error');
        resolve({name, count: sniperKills})
    });
})

export let getLoWKills = (member, atDate) => new Promise((resolve, reject) => {

    let name = member.profile.data.userInfo.displayName
    let lowKills = 0

    let characters = createCharactersMap(member, atDate)
    let pvpMap = characters.map((character) => {
        return getActivities(character, 200, 5, 0, atDate)
    })
    let results = Promise.all(pvpMap)
    results.then(activitiesResponse => {
        let allActivites = activitiesResponse.reduce((acc, val) => acc.concat(val), []);
        if (allActivites.length > 0) {
            let PGCRPromises = []
            allActivites.forEach((activity) => {
                if (activity) {
                    // console.log(activity);
                    const activityDate = new Date(activity.period)
                    if (checkDates(activityDate, atDate) && activity.values.efficiency.basic.value !== 0) {
                        PGCRPromises.push(getPGCR(activity.activityDetails.instanceId))
                    }
                }
            })
            if (PGCRPromises.length === 0) { resolve({name, count: lowKills}) }
            else {
                let PGCRs = Promise.all(PGCRPromises)
                PGCRs.then(PGCRResponse => {
                    PGCRResponse.forEach((pgcr) => {
                        if (pgcr) {
                            let player = pgcr.entries.filter((entry) => { return entry.player.destinyUserInfo.membershipId === member.profile.data.userInfo.membershipId })[0]
                            if (player.extended.weapons) {
                                player.extended.weapons.forEach((weapon) => {
                                    if (weapon.referenceId === 3413860063) {
                                        lowKills += weapon.values.uniqueWeaponKills.basic.value
                                    }
                                })
                            }
                        }
                    })
                    resolve({name, count: lowKills})
                })
                .catch((err) => {
                    console.log('GET PGCR Error : ', name, err);
                    resolve({name, count: lowKills})
                });
            }
        }
        else { resolve({name, count: lowKills}) }
    })
    .catch((err) => {
        console.log('GET Crucible Sniper Activities Error : ', name, err);
        // reject('GET Activities Error');
        resolve({name, count: lowKills})
    });
})