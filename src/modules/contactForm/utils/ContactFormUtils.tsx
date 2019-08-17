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
    eventsGreekStudents: state.eventsGreekStudents,
    eventsLatinoStudents: state.eventsLatinoStudents,
    eventsGraduateStudents: state.eventsGraduateStudents,
    receiveMonthlyNewsletter: state.receiveMonthlyNewsletter,
    registerAsParishioner: state.registerAsParishioner,
    englishBibleStudy: state.englishBibleStudy,
    spanishBibleStudy: state.spanishBibleStudy,
    freeFood: state.freeFood,
    guestSpeakers: state.guestSpeakers,
    musicMinistry: state.musicMinistry,
    socials: state.socials,
    retreats: state.retreats,
    intramuralSports: state.intramuralSports,
    proLifeClub: state.proLifeClub,
    RHC: state.RHC,
    servingAtMass: state.servingAtMass,
    teachReligiousEd: state.teachReligiousEd,
    serviceProjects: state.serviceProjects
  }

  return contactForm;
}