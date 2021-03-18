# CDC

---

## Summary:

- introduction
- documentation
- how to use

---

## Introduction

The goal of this project is to create a CDC (Connected Device Configuration) to create different profiles for clients. Each client can select a profile and the render will follow the given configuration.

Current modules:

- **Text** : display a message and his title if one is provided
- **IMG** : display an image (or a list of images if multiple src are provided)
- **VIDEO**: insert a ytb video (auto update every 5min)
- **TWITTER** : display the last 20 tweets about a chosen subject
- **IMGUR**: display the most viral content (auto update every 5min)
- **WEATHER**: display the current weather or the forecast weather for a chosen city (auto update every 5min)

_Example of a profile with 4 modules:_
![screen of a profile with 4 sub modules](https://github.com/calvetalex/cdc/blob/main/doc/.images/Screenshot_multiple_module_profile.png?raw=true)

---

## Documentation

_source: ./doc_

**structure.pdf**: The clients will call an nginx service which will send the request back to the back. The latter will verify the identity of the client: if it is an administrator, the latter will have access to the configuration panel, otherwise he will have the choice to display one of the profiles. The server will make the link between the database and the ancillary services (such as twitter, weather ...) in order to provide the information necessary for the operation of each profile.

**bdd.pdf**: database information. How it's built and how it's working.

![Server UML]()

---

## How to use

To start this project for the first time please run `sudo docker-compose build && sudo docker-compose up`. If you already used _build_ command you can just use `sudo docker-compose up`.

The server is host on :8080

Client is host on :8081

To access to the database go on :8890
