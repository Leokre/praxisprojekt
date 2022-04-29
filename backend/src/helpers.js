exports.wrapRoute = async (req, res, next) => {
    try {
        // run controllers logic
        await fn(req, res, next)
    } catch (e) {
        // if an exception is raised, do not send any response
        // just continue performing the middleware chain
        next(e)
    }
}

exports.getDaysBetween = (start,end) => {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}