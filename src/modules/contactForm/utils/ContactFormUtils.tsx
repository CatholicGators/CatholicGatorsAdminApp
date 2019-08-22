import { NewContactReq, ContactStatus } from '../../../services/contactFormService'

export var steps = ['Personal information', 'Parent\'s information', 'Your interests'];

export function filterState(state : any): NewContactReq {
    var newContactReq = {
        firstName: state.firstName,
        lastName: state.lastName,
        gender: state.gender,
        email: state.email,
        phoneNumber: state.phoneNumber,
        graduationSemester: state.graduationSemester,
        graduationYear: state.graduationYear,
        school: state.school,
        permanentAddress: state.permanentAddress,
        city: state.city,
        state: state.state,
        zipCode: state.zipCode,
        housingComplex: state.housingComplex,
        parentName: state.parentName,
        parentPhone: state.parentPhone,
        parentEmail: state.parentEmail,
        interests: state.interests,
        status: ContactStatus.NOT_CALLED,
        createdAt: new Date()
    }

    return newContactReq;
}
