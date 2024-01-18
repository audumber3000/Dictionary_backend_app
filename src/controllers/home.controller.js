const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Leaderboard = require("../models/Leaderboard");
const Competition = require("../models/competition")
const {wordCategory} = require("../models/wordCategory")

const { setUserWordCategory, userService } = require("../services");

const getHome = catchAsync(async (req, res) => {

    try {
       
        
        //competition and win
        const competitionData = await Competition.find({})

        const PopularWordCategory = await wordCategory.find({categoryType:"Popular"})


        //word of the day
        const wordOfTheDay = {
            'word':'calm',
            'meaning':'state of being silent'
        }


        //userprofile
        res.status(httpStatus.OK).send({
            status: "success",
            statusCode: httpStatus.OK,
            data: {wordOfTheDay,PopularWordCategory,competitionData},
            message: "Home Data retrieved successfully!",
          })
      } catch (error) {
        console.error('Error:', error);
        throw new ApiError(httpStatus.NOT_FOUND, "Data for Home Screen not found");
      }


});

module.exports = {
    getHome,
  }
