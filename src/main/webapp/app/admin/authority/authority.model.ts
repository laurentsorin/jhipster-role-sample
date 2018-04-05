import { BaseEntity } from './../../shared';

export class Authority implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public roles?: BaseEntity[],
    ) {
    }
}
