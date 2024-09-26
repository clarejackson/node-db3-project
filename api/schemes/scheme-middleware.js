const scheme = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const schemeID = await scheme.findById(req.params.scheme_id)
    if (schemeID) {
      req.scheme = schemeID
      next()
    } else {
      res.status(404).json({
        message: `scheme with thescheme_id ${schemeID.id} not found`
      })
    }
  } catch (err) {
    next(err)
  }
    
  
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if ((!req.body.scheme_name) || (typeof req.body.scheme_name !== "string") || (req.body.scheme_name === "")) {
    return res.status(400).json({
      message: "invalid scheme_name"
    })
  }
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = () => {
  return (req, res, next) => {
    if (!req.body.instructions) {
      return res.status(400).json({
        message: "invalid step"
      })
    } else {
      if ((typeof req.body.instructions !== "string") || (req.body.instructions === "")) {
        return res.status(400).json({
          message: "invalid step"
        })
      }
      else if ((typeof req.body.step_number !== "number") || (req.body.step_number < 1)) {
        return res.status(400).json({
          message: "invalid step"
        })
      } else {
        next()
      }
    }
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
