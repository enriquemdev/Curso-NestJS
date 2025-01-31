import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id) {
    return this.cars[id];
  }

  findOneById(id: string) {
    let car = this.cars.find((car) => car.id === id);

    if (!car)
      throw new NotFoundException(
        'El id ingresado no corresponde con ningun carro válido',
      );

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  update(id: string, UpdateCarDto: UpdateCarDto) {
    let existingCar = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        existingCar = { ...existingCar, ...UpdateCarDto };
        return existingCar;
      }

      return car;
    });

    return existingCar;
  }

  delete(id: string) {
    let existingCar = this.findOneById(id);

    this.cars = this.cars.filter(car => {
      return (car.id !== id);
    });

    return {message: 'Item succesfully deleted.'}
  }

  fillCarsWithSeedData (cars: Car[]) {
    this.cars = cars;
  }
}
