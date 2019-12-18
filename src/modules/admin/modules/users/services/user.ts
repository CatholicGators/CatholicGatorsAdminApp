import Document from '../../../../../models/document';

export default interface User extends Document {
    name: String;
    email: String;
    photoURL: String;
    isApproved: boolean;
    isAdmin: boolean;
}
