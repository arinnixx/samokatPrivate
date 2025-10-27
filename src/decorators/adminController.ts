import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_CONTROLLER = 'is_admin_controller';
export const AdminController = () => SetMetadata(IS_ADMIN_CONTROLLER, true);