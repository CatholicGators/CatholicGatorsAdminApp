import DocumentNotFoundError from './documentNotFoundError';

describe('DocumentNotFoundError', () => {
    it('gives the default message when no document ID is passed', () => {
        const err = new DocumentNotFoundError();
        expect(err.message).toEqual('Document does not exist in database');
    });

    it('gives a custom message when a document ID is passed', () => {
        const err = new DocumentNotFoundError('docId');
        expect(err.message).toEqual('Document docId does not exist in database');
    });
});
