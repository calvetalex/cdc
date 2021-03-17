# CDC

---
## Summary:
- introduction
- documentation
- how to use

---
## Introduction

The goal of this project is to create a CDC (Connected Device Configuration) to create different profiles for clients. Each client can select a profile and the render will follow the given configuration.

![screen of a profile with 4 sub modules](./.images/Screenshot_multiple_module_profile.png)

---
## Documentation
*source: ./doc*

**structure.pdf**: The clients will call an nginx service which will send the request back to the back. The latter will verify the identity of the client: if it is an administrator, the latter will have access to the configuration panel, otherwise he will have the choice to display one of the profiles. The server will make the link between the database and the ancillary services (such as twitter, weather ...) in order to provide the information necessary for the operation of each profile.

**bdd.pdf**: database information. How it's built and how it's working.

---
## How to use

To start this project for the first time please run `sudo docker-compose build && sudo docker-compose up`. If you already used *build* command you can just use `sudo docker-compose up`.

The server is host on :8080

Client is host on :8081

To access to the database go on :8890
