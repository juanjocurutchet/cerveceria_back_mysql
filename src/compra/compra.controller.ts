import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Controller('compras')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get()
  getAllCompras() {
    return this.compraService.getAllCompras();
  }

  @Post()
  createCompra(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.createCompra(createCompraDto);
  }

  @Put(':id')
  updateCompra(@Param('id') id: number, @Body() updateCompraDto: UpdateCompraDto) {
    return this.compraService.updateCompra(id, updateCompraDto);
  }

  @Delete(':id')
  deleteCompra(@Param('id') id: number) {
    return this.compraService.deleteCompra(id);
  }
}
