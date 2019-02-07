import * as Promise from 'bluebird';

export interface Database {
    add(collection:string, entity:object):Promise<any>;
    getCollection(collection:string):Promise<any>;
    update(collection:string, docId:string, entity:object):Promise<any>;
}
