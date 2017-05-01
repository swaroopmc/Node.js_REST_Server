# Node.js_REST_Server



Get List of Contacts

Endpoint: GET /contacts
Parameter:
  q: search keywords (optional)
Response: Array of contact objects with _id, name, title, emails

Ex:{GET} /contacts?q=John 


Import List of Contacts

Endpoint: POST /contacts
Parameter:
  contacts: Array of contact objects with name, title, emails
Response: Status Code  


Merge two contacts

PUT /contacts/:id/merge/:id2
Parameter:
  id:  Unique ID of the master contact
  id2: Unique ID of the secondary contact
Response: The merged contact 

Ex: {PUT} /contacts/[contact1 ID]/merge/[contact2 ID]

Delete Contact

Endpoint: DELETE /contacts/:id
Parameter:
  id: Unique ID of the contact to be deleted



  contacts: 
  
  [
      
      {
        "name": {
          "first": "John",
          "last": "Mark"
        },
        "title": "CTO",
        "emails": [ "john@gmail.com", "john@trellsnow.com" ]
      },
      
      {
        "name": {
        "first": "Mike",
        "last": "Wolraich"
        },
        "title": "Freelancer",
        "emails": [ "wolraichui@gmail.com" ]
      },
      
      {
        "name": {
          "first": "Kat",
          "last": "Shuford"
        },
        "title": "Designer",
        "emails": [ "kat@gmail.com" ]
      },
      
    ]
