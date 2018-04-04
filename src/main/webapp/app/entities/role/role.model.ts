import { BaseEntity, User } from './../../shared';

export class Role implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public authorities?: BaseEntity[],
        public users?: User[],
    ) {
    }
}
