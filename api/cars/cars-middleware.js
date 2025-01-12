const CarsModel = require('./cars-model')
const vinValidator = require('vin-validator');
const db = require('../../data/db-config');

const checkCarId = async (req, res, next) => {
  try {
    const car = await CarsModel.getById(req.params.id)
    if(!car){
      res.status(404).json({message: `car with id ${req.params.id} is not found`})
    }
    else{
      req.car = car;
      next()
    }
  }
  catch (err){
    res.status(500).json({message: 'problem finding car'})
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;
  if(!vin){
    return next({status: 400, message: "vin is missing"})
  }
  if(!make){
    return next({status: 400, message: "make is missing"})
  }
  if(!model){
    return next({status: 400, message: "model is missing"})
  }
  if(!mileage){
    return next({status: 400, message: "mileage is missing"})
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  const {vin} = req.body;
  const isValidVin = vinValidator.validate(vin);
  if(!isValidVin){
    res.status(400).json({message: `vin ${vin} is invalid`})
  }
  else{
    req.vin = vin;
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const found = await db('cars')
      .where('vin', req.body.vin).first()
    
      if(found){
        res.status(400).json({message: `vin ${req.body.vin} already exists`})
      }
      else{
        next()
      }
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
