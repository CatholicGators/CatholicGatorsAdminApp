import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { FirestoreDatabase } from '../../src/database/FirestoreDatabase';

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

    // IMPROVEMENT: make this update the same doc that the 'add' test makes
    it('should update a doc', () => {
        return db.update('collection', 'updateTestEntity', {}).should.be.fulfilled;
    });
  });
});
