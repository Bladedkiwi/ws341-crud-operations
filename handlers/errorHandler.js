/**
 * CatchErrors
 *
 * Takes a function and it's parameters that were passed in and runs that function
 * Essentially a try/catch function - seems like a version of a closure function because it wraps everything into some sort of burrito
 *
 * -found via Wes Bos tutorials and adjusted/understood through trial and error
 *
 * @param givenFunction
 * @returns {function(*, *, *): Promise<ResultType> | Promise<ResultType> | Promise<any>}
 */

exports.catchErrors = (givenFunction) => {
    return function(req, res, next) {
        return givenFunction(req, res, next).catch(next);
    };
};


exports.notFound = (req, res, next) => {
    const errNothing = new Error('Sorry, this page escaped.');
    errNothing.status = 404;
    next(errNothing);

};

/**
 * Development Errors
 * A nicely displayed package of errors to unwrap
 *
 * -found via Wes Bos tutorials and adjusted/understood through trial and error
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
exports.developmentErrors = (err, req, res,next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status || 500,
        stack: err.stack
    };
    res.status(err.status || 500).send(errorDetails);
}