import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OpcionMenu } from './menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';



@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(OpcionMenu)
    private readonly menuRepository: Repository<OpcionMenu>,
  ) {}

  getAllMenu() {
    return this.menuRepository.find();
  }

  getMenuByCategory(category: string) {
    return this.menuRepository.find({ where: { category } });
  }

  searchMenuByIngredient(ingredientes: string) {
    return this.menuRepository.find({ where: { ingredientes: ILike(`%${ingredientes}%`) } });
  }

  createMenu(createMenuDto: CreateMenuDto) {
    const { title, category, image, description, ingredientes, price, valoration, tipo } = createMenuDto;
    const newMenu = this.menuRepository.create({ title, category, image, description, ingredientes, price: parseFloat(price), valoration: parseFloat(valoration), tipo });
    return this.menuRepository.save(newMenu);
  }

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
    const menuToUpdate = await this.menuRepository.findOne({ where: { id } });
    if (!menuToUpdate) {
      
      throw new Error('No se encontró el menú');
    }    
    
    Object.assign(menuToUpdate, updateMenuDto);
    await this.menuRepository.save(menuToUpdate);
     
    return menuToUpdate;
  }

  async deleteMenu(id: number) {
    return this.menuRepository.delete(id);
  }
}
