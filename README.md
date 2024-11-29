# BallotGo - E-Voting Application Backend

[Frontend Repository for BallotGo](https://github.com/BallotGo/BallotGo_Frontend)

Welcome to the backend repository for **BallotGo**, an e-voting application designed for secure, verifiable, and user-friendly electronic voting processes. This backend supports core functionalities, including authentication, candidate and election management, and vote processing with blind signatures for added security.

## Features

- **User Authentication:** Secure login and role-based access control (JWT).
- **Election and Candidate Management:** Creation, updating, and deletion of elections and candidates.
- **Vote Submission with Verification:** OTP verification and blind signatures to confirm votes securely.
- **Database Management:** Utilizing Sequelize ORM for PostgreSQL integration.

## Project Overview

BallotGo provides a secure, verifiable environment for digital voting. It combines modern cryptographic techniques to ensure user privacy, data integrity, and vote verifiability. Key cryptographic methods include **blind signatures**, **JWT-based role authentication**, and **OTP verification**.

### Cryptographic Techniques

1. **Blind Signatures for Vote Privacy and Integrity**  
   Blind signatures are employed in BallotGo to enhance the security and confidentiality of the voting process. This method allows voters to submit their votes without revealing them directly, ensuring the vote remains anonymous while still verifiable by the election authority. In BallotGo:
   
   - Each vote is "blinded" using a cryptographic function that hides its content.
   - The blinded vote is signed by the election authority, confirming its validity without accessing the actual vote.
   - After signing, the voter "unblinds" the vote and submits it for counting. Since the signature remains valid, the vote can be verified as legitimate without compromising voter anonymity.

2. **JWT-Based Role Authentication**  
   JSON Web Tokens (JWT) are used to manage secure, role-based access within the application. JWTs ensure that only users with the correct permissions can access or modify specific parts of the application, such as creating or managing elections and candidates. Key aspects include:

   - **User Authentication**: Upon login, users receive a token containing their user ID and role, securely signed with a secret key defined in `.env`.
   - **Role Verification**: The token is checked on every restricted route, ensuring only users with roles like "admin" or "election official" can access administrative actions, while general users can only participate in voting.

3. **OTP Verification for Enhanced Security**  
   BallotGo uses One-Time Passwords (OTPs) as an additional layer of security to confirm the identity of each voter. The OTP system works as follows:

   - **Dynamic OTP Generation**: Upon registration or login, a unique OTP is generated and sent to the user via their registered communication method.
   - **Time-Limited Validity**: OTPs are valid for a limited time, adding security by ensuring that only recent OTPs can be used for authentication.
   - **Verification on Vote Submission**: Before a user casts a vote, the OTP must be validated, preventing unauthorized voting and ensuring that each voter is authenticated before submitting their vote.

### Enhanced Security Features

BallotGo is designed with advanced cryptographic principles to safeguard each vote's confidentiality, authenticity, and integrity. Key features include **end-to-end encryption**, **individual verifiability**, and **universal verifiability** to ensure both privacy and transparency in the voting process.

1. **End-to-End Encryption (E2EE) for Secure Vote Transmission**  
   End-to-end encryption (E2EE) is implemented in BallotGo to protect votes during transmission from the voter’s device to the backend server. This ensures that each vote remains confidential and cannot be intercepted or altered:

   - **Encryption on Device**: Votes are encrypted on the user's device using a secure key, making the data unintelligible to anyone except the intended recipient (the backend server).
   - **Secure Decryption**: Only the backend server has the decryption keys to read the submitted votes, ensuring that no intermediary or unauthorized entity can access the contents.
   - **Enhanced Voter Privacy**: This encryption layer guarantees that votes are safe from any network-based threats, preserving voter privacy and the integrity of transmitted data.

2. **Individual Verifiability for Voter Assurance**  
   Individual verifiability enables each voter to verify that their vote has been correctly recorded in the election without revealing the vote content:

   - **Unique Voting Receipt**: Upon successful submission of a vote, each voter receives a unique receipt or token. This token is proof of their vote’s inclusion in the election without disclosing the vote itself.
   - **Anonymous Verification**: Using this receipt, voters can verify on a secure platform (like a public bulletin or via the backend) that their vote was counted without compromising anonymity.
   - **Proof of Integrity**: By allowing voters to confirm the existence and correctness of their votes in the final tally, individual verifiability increases voter trust in the system.

3. **Universal Verifiability for Public Confidence**  
   Universal verifiability enables any third party to verify that all recorded votes are accurately counted and that the final tally reflects the actual votes submitted:

   - **Public Ledger of Votes**: Using a secure, anonymized ledger, BallotGo makes it possible for observers and auditors to review encrypted and anonymized vote records to ensure that all votes are included.
   - **Independent Verification**: Observers can independently validate the election outcome using cryptographic proofs that confirm each recorded vote was authenticated and signed.
   - **Transparency in Election Results**: Universal verifiability assures the public that the election results are tamper-free and based solely on legitimate votes, providing transparency and fostering public trust in the system.

### Summary of Cryptographic Security in BallotGo

The combination of end-to-end encryption, individual verifiability, and universal verifiability ensures that BallotGo maintains a secure, private, and transparent digital voting environment. Voters can confidently submit and verify their votes, while public observers can verify the election results without access to individual vote data.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or above)
- **PostgreSQL** (Ensure the database is set up and accessible)
- **Git** (optional, for cloning the repo)

### Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/username/ballotgo-backend.git
   cd ballotgo-backend
2. **Install Dependencies**
   ```bash
   npm install
3. **Environment Variables**
    Create a .env file in the root directory of the project and add the following data:
    ```bash
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=
    DB_PORT=
    
    EMAIL=
    BALLOTGO_EMAIL=
    BALLOTGO_EMAIL_PASSWORD=
    JWT_SECRET=
    
    ADMIN_ID=
    ADMIN_PASSWORD=
    ADMIN_ROLE=
    ADMIN_NAME=
    ADMIN_MOBILE_NUMBER=
    ADMIN_RESIDENCE_ID=
    ADMIN_EMAIL=
    ADMIN_DATE_OF_BIRTH=
  4. **Run the Application**
     ```bash
     npm run dev

---

## Contribution

   1. > [Udara Wijesinghe](https://github.com/Udaramalinda)
   2. > [Vishvadini Kurukulasooriya](https://github.com/Zury7)
   3. > [Sanuja Edirisinghe](https://github.com/sanujaediri)
