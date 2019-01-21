// const chai = require('chai').use(require('chai-as-promised'));
// chai.should();

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { FirestoreDatabase } from '../../server/database/FirestoreDatabase';

chai.use(chaiAsPromised).should();

describe('FirestoreDatabase', () => {
  describe('add()', () => {
    let db:any;

    before(() => {
        db = new FirestoreDatabase();
    });

    it('should add to database', () => {
        return db.add('collection', {}).should.be.fulfilled;
    });

    it('should get a collection', () => {
        return db.getCollection('collection').should.eventually.be.an('object');
    });

    it('should update a doc', () => {
        return db.update('collection', 'updateTestEntity', {}).should.be.fulfilled;
    });
  });
});
