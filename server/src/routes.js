const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const LibraryController = require('./controllers/LibraryController')
const LibraryInvitationsController = require('./controllers/LibraryInvitationsController')
const BookController = require('./controllers/BookController')
const PersonalReadingController = require('./controllers/PersonalReadingController')
const LoanController = require('./controllers/LoanController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/enhancedregister',
    AuthenticationControllerPolicy.register,
    AuthenticationController.enhancedregister)
  app.get('/getAllUsers',
  AuthenticationController.getAllUsers)
  app.get('/getUserByEmailOrUsername/:query',
  AuthenticationController.getUserByEmailOrUsername)
  app.get('/getUserById/:UserId',
  AuthenticationController.getUserById)

  app.post('/login',
    AuthenticationController.login)
  app.get('/confirmation/:token', 
    AuthenticationController.validate)

app.post('/library',
  LibraryController.create)
app.get('/library/getAll',
  LibraryController.getAll)
app.post('/library/invite',
  LibraryController.invite)
app.get('/library/getLibrary/:name',
  LibraryController.getLibraryByName)
app.get('/library/getLibraryById/:id',
  LibraryController.getLibraryById)
app.get('/library/invite/:email/:libraryId', 
  LibraryController.userAcepted)
app.get('/library/getUserLibrarys/:userId', 
  LibraryController.getUserLibrarys)   
  

app.get('/getAllLibraryInvitations',
  LibraryInvitationsController.getAllLibraryInvitations)
app.get('/getAllLibraryInvitationsByLibraryId/:LibraryId',
  LibraryInvitationsController.getAllLibraryInvitationsByLibraryId)
app.post('/removeUserFromLibrary/:LibraryId/:UserId',
  LibraryInvitationsController.removeUserFromLibrary)
app.get('/books/getBooks',
  BookController.getBooks)
app.get('/books/getBook/:id',
  BookController.getBookById)
app.post('/books/newbook',
  BookController.newBook)
app.get('/books/search/:query',
  BookController.search)

app.get('/personalReading/getAllPersonalReading',
  PersonalReadingController.getAllPersonalReading)
  app.get('/personalReading/getPersonalReadingById/:PersonalReadingId',
PersonalReadingController.getPersonalReadingById)
app.get('/personalReading/getPersonalReading/:UserId/:LibraryId',
  PersonalReadingController.getPersonalReadingByLibraryUser)
app.post('/personalReading/newPersonalReading/',
  PersonalReadingController.newPersonalReading)
app.post('/personalReading/updateReading/:personalReadingId/:reading/:date',
  PersonalReadingController.updateReading)
app.post('/personalReading/updateComment/:personalReadingId/:comment',
  PersonalReadingController.updateComment)
app.get('/personalReading/findLastFinishedPersonalReading/:UserId',
  PersonalReadingController.findLastFinishedPersonalReading)
app.get('/personalReading/findCurrentlyReadingPersonalReading/:UserId',
  PersonalReadingController.findCurrentlyReadingPersonalReading)
app.get('/personalReading/findBooksReadFromLibraries/:UserId',
  PersonalReadingController.findBooksReadFromLibraries)
app.get('/personalReading/findAverages/:UserId',
  PersonalReadingController.findAverages)
  
app.get('/loan/getAll',
  LoanController.getAll)
app.post('/loan/create',
  LoanController.createLoan)
app.get('/loan/getLoansByUserId/:UserId',
  LoanController.getLoansByUserId) 
}
