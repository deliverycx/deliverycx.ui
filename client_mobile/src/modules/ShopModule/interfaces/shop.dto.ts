import { IsArray, IsNotEmpty } from 'class-validator';
import { ICategory, IProduct, IRequestNomeclature } from './shop.type';
import { mappersDTO } from 'application/helpers/mappersDTO';
import { validatorDTO } from 'application/helpers/validatorDTO';

export class ShopDTO {
  @IsNotEmpty()
  @IsArray()
  categoryes!: ICategory[];

  products!: IProduct[];
}

export const shopDTO = new ShopDTO();

export const ShopMapper = (
  p: IRequestNomeclature | IRequestNomeclature[],
): ShopDTO | ShopDTO[] => {
  return mappersDTO<IRequestNomeclature, ShopDTO>(p, (val) => {
    shopDTO.categoryes = val.categoryes;
    shopDTO.products = val.products;

    validatorDTO(shopDTO);
    return { ...shopDTO };
  });
};
