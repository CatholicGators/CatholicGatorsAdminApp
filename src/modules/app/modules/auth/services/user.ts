import Document from "../../../../../models/document";

export default interface User extends Document {
    name: String;
    email: String;
    photoUrl: String;
    isApproved: boolean;
    isAdmin: boolean;
}
