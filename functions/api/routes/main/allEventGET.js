const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');

module.exports = async (req, res) => {

  // 에러 트래킹을 위해 try / catch문을 사용합니다.
  // try문 안에서 우리의 로직을 실행합니다.
  try {

    const eventImage1 = await "https://user-images.githubusercontent.com/77378847/143384004-e4a03c4d-3bc0-4f94-aada-1a050769c2cd.png";
    const eventImage2 = await "https://user-images.githubusercontent.com/77378847/143384066-b7f85961-41ab-4b33-8617-86b18f304979.png";
    const eventImage3 = await "https://user-images.githubusercontent.com/77378847/143384105-3444df23-84bf-4a49-9c6d-3c7e1a7d3a26.png";

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_EVENT_SUCCESS, {eventImage1, eventImage2, eventImage3}));
    
    // try문 안에서 에러가 발생했을 시 catch문으로 error객체가 넘어옵니다.
    // 이 error 객체를 콘솔에 찍어서 어디에 문제가 있는지 알아냅니다.
    // 이 때 단순히 console.log만 해주는 것이 아니라, Firebase 콘솔에서도 에러를 모아볼 수 있게 functions.logger.error도 함께 찍어줍니다.
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    // 그리고 역시 response 객체를 보내줍니다.
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  }
};