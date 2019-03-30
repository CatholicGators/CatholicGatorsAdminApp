import Document from './document';

export default interface User extends Document {
    name: String;
    email: String;
    photoURL: String;
    isApproved: boolean;
    isAdmin: boolean;
}
