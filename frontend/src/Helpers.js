exports.readableDate = (rawDate) => {
    let a = new Date(rawDate)
    let out = a.getDate() + "." + (parseInt(a.getMonth()) +1) + "." + a.getFullYear()
    return out
}