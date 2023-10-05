const checkMillionDollarIdea = (req,res,next) => {
    const totalValueOfIdea = req.query.weeklyRevenue*req.query.numWeeks;
    if(totalValueOfIdea>=1000000){
        return next();
    }else{
        res.status(400).send("Not a million dollar idea!");
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
