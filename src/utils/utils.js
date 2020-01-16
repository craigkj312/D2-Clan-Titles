export let checkDates = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() && date1.getYear() === date2.getYear()
}

export let isNewerDate =(date1, date2) => {
    return date1.getYear() > date2.getYear() || (date1.getYear() === date2.getYear() && date1.getMonth() > date2.getMonth())
}

export let isNewerOrEqualDate =(date1, date2) => {
    return date1.getYear() > date2.getYear() || (date1.getYear() === date2.getYear() && date1.getMonth() >= date2.getMonth())
}

export let isNewerOrEqualDateWithDay =(date1, date2) => {
    return date1.getYear() > date2.getYear() || 
            (date1.getYear() === date2.getYear() && date1.getMonth() > date2.getMonth()) ||
            (date1.getYear() === date2.getYear() && date1.getMonth() === date2.getMonth() && date1.getDate() >= date2.getDate())
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