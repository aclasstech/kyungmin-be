import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { DataSource, ObjectType, Repository } from "typeorm";

/**
 * Truy vấn xem giá trị của một trường nhất định có tồn tại trong bảng dữ liệu không
 */
@ValidatorConstraint({ name: "entityItemExist", async: true })
@Injectable()
export class EntityExistConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: string, args: ValidationArguments) {
    let repo: Repository<any>;

    if (!value) return true;
    let field = "id";
    if ("entity" in args.constraints[0]) {
      field = args.constraints[0].field ?? "id";
      repo = this.dataSource.getRepository(args.constraints[0].entity);
    } else {
      repo = this.dataSource.getRepository(args.constraints[0]);
    }
    const item = await repo.findOne({ where: { [field]: value } });
    return !!item;
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.constraints[0]) return "Model chưa được chỉ định!";

    return `Tất cả thực thể của ${args.constraints[0].name} đã tồn tại trong database!`;
  }
}

/**
 * Kiểm tra đã có dữ liệu hay chưa
 * @param entity Thực thể
 * @param validationOptions
 */
function IsEntityExist(
  entity: ObjectType<any>,
  validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void;

function IsEntityExist(
  condition: { entity: ObjectType<any>; field?: string },
  validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void;

function IsEntityExist(
  condition: ObjectType<any> | { entity: ObjectType<any>; field?: string },
  validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [condition],
      validator: EntityExistConstraint,
    });
  };
}

export { IsEntityExist };
