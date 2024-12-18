import { apiError } from "../helpers/apiError.helper.js"
import { apiResponse } from "../helpers/apiResponse.helper.js"


const errorMiddleware = (error, req, res, next) => {
  let { code, data, errors, stack } = error

  if (!(error instanceof apiError)) {
    code = 500
    data = "Something went wrong"
    errors = []
  }

  // Send error response to the user
  res.status(code).json({
    ...new apiResponse(code, data),
    ...(process.env.NODE_ENV == 'development' && {stack})
  })
}

export default errorMiddleware