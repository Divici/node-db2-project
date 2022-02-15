// STRETCH
const cars = [
    {
        vin: '1111111111111',
        make: 'toyota',
        model: 'prius',
        mileage: 151000,
        title: 'clean',
        transmission: 'automatic',
    },
    {
        vin: '1111111111291',
        make: 'mazda',
        model: 'CX-5',
        mileage: 29000,
        transmission: 'automatic',
    },
    {
        vin: '1111111111771',
        make: 'tesla',
        model: 'model-Y',
        mileage: 72435,
        title: 'clean',
    },
]

exports.seed = function(knex) {
    return knex('cars')
        .truncate().then(()=>{
            return knex('cars').insert(cars)
        })  
}