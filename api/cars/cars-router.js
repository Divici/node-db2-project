const CarsModel = require('./cars-model')
const router = require('express').Router()
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} =require('./cars-middleware')

router.get('/', (req, res, next) =>{
    CarsModel.getAll()
        .then((cars) => {
            res.json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) =>{
    res.json(req.car);
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) =>{
    try {
        const newCar = await CarsModel.create(req.body)
        res.status(201).json(newCar);
    }
    catch (err){
        next(err);
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack
    })
  })
  
  module.exports = router;