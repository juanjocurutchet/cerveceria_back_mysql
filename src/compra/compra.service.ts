import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './compra.entity';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
  ) {}

  getAllCompras() {
    return this.compraRepository.find();
  }

  createCompra(createCompraDto: CreateCompraDto) {
    const newCompra = this.compraRepository.create(createCompraDto);
    return this.compraRepository.save(newCompra);
  }

  async updateCompra(id: number, updateCompraDto: UpdateCompraDto) {
    await this.compraRepository.update(id, updateCompraDto);
    return this.compraRepository.findOne({ where: { id } });
  }
  

  async deleteCompra(id: number) {
    return this.compraRepository.delete(id);
  }
}
