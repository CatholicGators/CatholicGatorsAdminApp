export var steps = ['Personal information', 'Parent\'s information', 'Your interests'];

export const filterState = (state : any) => {
  var contactForm = {
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
    interests: state.interests
  }

  return contactForm;
}
