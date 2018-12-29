export interface Database {
    add(collection:string, entity:object):void;
    getCollection(collection:string):Promise<any>;
}
