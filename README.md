# Coding-Challenge
Coding Challenge for HEB Digital by Cooper Wineberg

---
# Usage:
depoloyed to a [heroku app](https://hebcodingchallengenodejs.herokuapp.com/)
---
# Gets

```
/                             Default page
/customers                    Returns HTTP 200 OK with a JSON 
                              response containing all customer data
/customers?city="Some City"   Returns a HTTP 200 OK with a JSON 
                              response body containing only customers 
                              that live in a specified city.
/customers/{customerId}       Returns HTTP 200 OK with a JSON 
                              response containing customer data 
                              for the specified customer.

```
---
# Posts:

```
/customers                    Returns a HTTP 200 OK with a JSON 
                              response body including the customer 
                              data and its identifier provided by 
                              the persistent data store.
                              
                              Body must be json.

```
---
example json
```
{
    "First_Name": "John",
    "Last_Name": "A",
    "Email": "email@email.com",
    "Address": "adress",
    "City": "Austin",
    "State": "Texas",
    "Zip": "12345"
}
```
