import DocumentNotFoundError from './documentNotFoundError';

describe('DocumentNotFoundError', () => {
    it('gives a custom message when a document ID is passed', () => {
        const err = new DocumentNotFoundError('docId');
        expect(err.message).toEqual('Document docId does not exist in database');
    });
});
