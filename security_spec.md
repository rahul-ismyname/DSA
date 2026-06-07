# Security Specification - DSA Dashboard Firestore

## Data Invariants
1. **User Ownership**: A user document must only be CRUD-accessible by the owner themselves.
2. **Sub-resource Access Control**: Problem progress and custom questions for a user ID can only be accessed and mutated by that specific authenticated user.
3. **Data Types and Sanitization**: All fields must strictly map to their types (e.g., difficulty must be one of Easy, Medium, Hard).

---

## The "Dirty Dozen" Payloads & Intercepts

Here are 12 specific payloads representing state/identity violation attempts against our Zero-Trust architecture:

1. **Splice Access Code Attack**: Creating user with foreign uid while impersonating someone else.
2. **Access Code Manipulation**: Modifying access token on an active user account.
3. **Ghost Creation Timestamp**: Spoofing standard `createdAt` field on profiles (non-request.time).
4. **Foreign Progress Injection**: Creating progress record in another user's progress subcollection.
5. **Ghost Question Poisoning**: Forging `leetcodeNumber` with 1MB payload in custom questions.
6. **Difficulty Level Override**: Setting question difficulty as "SuperHard" or "Extreme" instead of defined enums.
7. **Negative Completion Status**: Saving problem completion with `isCompleted: -1` or `null`.
8. **Spoofed Progress Timestamps**: Saving problem completion with a future timestamp instead of `request.time`.
9. **Anomalous Category Injection**: Adding a custom question under a JavaScript/HTML script tag.
10. **Admin Privilege Escalation**: Setting `isAdmin` property in a user profile.
11. **Foreign Custom Question Erasure**: Deleting custom questions belonging to a different user token.
12. **Blind Scraping Attempt**: Listing all completed problems for all other users via list queries.

---

## Rules Verification

Our rules strictly implement default-deny (`allow read, write: if false`) and authenticate that any user ID path variable corresponds to `request.auth.uid`. All state payloads are validated directly via custom rule assertions.
