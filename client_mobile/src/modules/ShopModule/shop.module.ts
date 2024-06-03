import { organizationModel } from 'modules/OrganizationModule/organization.module';
import { ShopModel } from './domain/shop.model';
import { ShopUseCase } from './useCase/shop.useCase';

export const shopModel = new ShopModel();

export const shopUseCase = new ShopUseCase(shopModel, organizationModel);
