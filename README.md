# Beamchat

![Beamchat logo](./assets/readmeLogo.png)

Beamchat is a cutting-edge chat application built with React Native, designed for secure and efficient communication. It leverages end-to-end encryption using the Elliptic Curve Diffie-Hellman (ECDH) algorithm for generating a shared secret, ensuring that your messages remain private and secure.

#

- [Roadmap](#roadmap)
- [Features](#features)
- [Example](#example)
- [Backend](#backend)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)


## Roadmap

The development of this app is an ongoing journey, and while we've achieved significant milestones, our roadmap continues to guide us towards a more robust and feature-rich application.

- [x] Implement basic chat functionality with Socket.io for real-time messaging.
- [x] Message caching in the database, with fast retrieval through pagination for an efficient chat history experience.
- [x] End-to-end encryption using the secure Diffie-Hellman Elliptic Curve algorithm to ensure private conversations.
- [x] Basic user authentication flow for login and registration to establish user identity.
- [x] Basic notification system that informs users of new chat invitations for prompt communication.
- [x] Feature to accept chat invitations, allowing users to join conversations seamlessly.
- [ ] Functionality to reject chat invitations, giving users control over their chat engagement.
- [ ] Implement a ChatBOT integrated with a custom Large Language Model (LLM) for interactive conversations.
- [ ] Enhance secure end-to-end encryption logic to store data locally, akin to Signal and WhatsApp's security models.
- [ ] Password recovery system to assist users in regaining access to their accounts.
- [ ] Avatar and file update system to enable personalization and file sharing within chats.
- [ ] Single Sign-On (SSO) capabilities to allow users to access the chat with various identity providers.
- [ ] Push notifications to keep users informed of new messages and chat activities, even when they are not actively using the app.

## Features

- **Real-time messaging**: Instantly send and receive messages with Socket.IO.
- **End-to-end encryption**: Utilize ECDH for generating a shared secret for encrypting chats, ensuring complete privacy.
- **Cross-platform**: Built with React Native for seamless operation on both iOS and Android.
- **User-friendly interface**: An intuitive and sleek design for an optimal user experience.
- **Secure Authentication**: Protect user accounts and data with robust authentication mechanisms.

## Example

Chat secure with your friends!

![chat](./assets/chat.png)

## Backend

In order to run the project, it's necessary to run the backend side.

Clone the following repos and follow the instructions detailed in each one. It's important to run the backend first with Docker, and then this application.

Main backend, needed for business logic: [beamchat-backend](https://github.com/Beamersoft/beamchat-backend)

Socket.io backend, needed for the chat logic: [beamchat-socket](https://github.com/Beamersoft/beamchat-socket)

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- React Native CLI
- Android Studio or Xcode (for iOS development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Beamersoft/beamchat-frontend.git
cd beamchat-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install

## Make sure the patch for brorand inside ./patches is applied when installing modules.
```

3. Run the app:

```bash
npx expo run:android
# or
npx expo run:ios
```
