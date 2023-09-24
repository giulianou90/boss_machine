const checkMillionDollarIdea = (req,res,next) => {
    const totalValueOfIdea = req.query.weeklyRevenue*req.query.numWeeks;
    if(totalValueOfIdea>=1000000){
        next()
    }else{
        res.send("Not a million dollar idea!");
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
