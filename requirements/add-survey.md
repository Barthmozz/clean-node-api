# Add Survey

> ## Success Cases

- [ ] Receives a **POST** request on the **/api/surveys** route 
- [ ] Validates if the request was made by an **admin**
- [ ] Validates required data **question** and **answers**
- [ ] **Creates** a survey with the provided data
- [x] Returns **204** with no content

> ## Exceptions

- [ ] Returns **404** if API does not exist
- [ ] Returns **403** if user is not an admin
- [x] Returns **400** if question or answers are not provided by the client
- [x] Returns **500** if an error occurs when trying to create an survey
