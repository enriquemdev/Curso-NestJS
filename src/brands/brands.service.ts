import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      createdAt: new Date().getTime(),
      name: name,
    };

    this.brands.push(brand);
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (!brand)
      throw new NotFoundException(
        'No se ha encontrado la brand que se ha buscado.',
      );

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    this.findOne(id);

    this.brands = this.brands.map( brand => {
      if (brand.id === id) {
        return {
          ...brand,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
        };
      }

      return brand;
    });
  }

  remove(id: string) {
    this.brands =  this.brands.filter(brand => brand.id !== id);
  }
}
