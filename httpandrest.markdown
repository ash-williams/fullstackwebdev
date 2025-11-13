---
layout: page
title: HTTP and RESTful APIs
permalink: /foundational-concepts/
---

# Full-Stack Web Development: Lab 1 – RESTful APIs

## 🎯 Learning Objectives
- Understand Full-Stack architecture
- Recap RESTful API concepts
- Practice interacting with a complex REST API

---

## 🌐 What is Full-Stack Development?
<details>
<summary>Click to expand</summary>

Full-stack development involves both **front-end** and **back-end**:
- **Front-end**: Runs in the browser (HTML, CSS, JS)
- **Back-end**: Runs on the server (Node.js, Java, PHP)
- Communication via **APIs** (Application Programming Interface)

![Client-Server Diagram](images/client-server.png)

</details>

---

## 🔍 RESTful API Basics
- **REST** = Representational State Transfer
- Uses **HTTP methods**: GET, POST, PUT, DELETE
- Data format: JSON or XML

---

### ✅ HTTP Methods and CRUD Operations
| HTTP Method | CRUD Operation | Description |
|-------------|---------------|-------------|
| GET         | Read          | Retrieve data |
| POST        | Create        | Add new data |
| PUT         | Update        | Modify existing data |
| DELETE      | Delete        | Remove data |

---

## 🛠 Tools for API Testing
- **Postman**: GUI tool for sending HTTP requests
- **Swagger**: API documentation and testing

---

## 🔐 Security and Headers
- Use **Authorization headers** for secure endpoints
- Common headers: `Content-Type`, `Accept`

---

## ✅ Exercise 1: Test a GET Request
```http
GET /movies HTTP/1.1
Host: localhost:8080
```
**Task**: Use Postman to send this request and observe the response.

---

## ✅ Exercise 2: Create a New Resource
```http
POST /movies HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "title": "Inception",
  "year": 2010
}
```
**Task**: Send this request and verify the response.

---

## 🧠 Quiz: HTTP Status Codes
Which status code means "Created"?
- [ ] 200
- [x] 201
- [ ] 404

---

## 📚 Additional Resources
- [MDN Web Docs: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)

---

## 🖼 Diagrams and Visuals
*(Add diagrams for request-response cycle, CRUD operations, and API architecture here)*

