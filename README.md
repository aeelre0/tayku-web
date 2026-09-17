# Tayku Web CLI

This client is designed for distributing backend and frontend modules of Tayku Systems.

___

# 1. Scope 
- **in-scope:**
    - This client sets the environment for Tayku modules (just like the necessity folders etc...)
    - This client provides a visual referance of Tayku modules
    - This client provides the secure downloading system for Tayku modules 

- **out-of-scope:**
    - This client doesn't provide an interface for editing modules
    - This client doesn't provide an interface for personalization of registry source.
    - This client doesn't contains the modules inside, instead of fetch them from a source.
___

# 2. Dependencies 
- `npm` : Single distribution source of Tayku CLI for now.
- `node` : Default JavaScript runtime environment of Tayku CLI.

> [!WARNING]
> This dependencies are using for the Tayku CLI. This means that, whenever you want to add modules from Tayku Frontend or Tayku Backend, you have to be carefull about its dependencies also.

___ 

# 3. Testing and Verification Strategy
- **Mocking Strategy:**
    - Tayku CLI needs a project for setting up all environment. Therefore, our mocking strategy is creating a dummy project for tesing the properties of Tayku CLI.

- **Test Scenerios:**
    * [ ] Verify if Tayku CLI can read the modules lists of Tayku Modules from sources dynamically.
    * [ ] Verify that the Tayku CLI can validate and compare the expected and actual signatures and hashes for security purposes.
    * [ ] Verify if Tayku CLI can initialize a project. 
    * [ ] Verify if Tayku CLI can feth the modules from sources.

___ 

# 4. TO-DO & Roadmap 
* [ ] Create the folder structure of CLI.
* [ ] Decide which files will be created later.
* [ ] Finish up the architecture 
* [ ] Test 

___

# 5. Design Revision History (Changelog)

| Version | Date       | Description of Changes                                             | Author        |
| :------ | :--------- | :----------------------------------------------------------------- | :------------ |
| v0.0.1  | 2026-09-16 | Initial layer architecture definitions and boundaries established. | Ali Emre Arlı |
| v0.0.2  | 2026-09-17 | `cli.js` was created and decided the contract.                     | Ali Emre Arlı |
| v0.0.3  | 2026-09-17 | `commands.js` and `commands.json` was created and their contract   | Ali Emre Arlı |
|         |            | was established (primitive).                                                       |
___

# LICENSE 

This project is licensed under the GNU General Public License v3.0 or later.

___
