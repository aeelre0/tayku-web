# Tayku Client Registry Architecture

Tayku client is not designed as the classical `npm` package logic, instead Tayku Client is only package-manager-like system for Tayku Web Utilities. This means that, users will be install tehir packages and modules from at least a soruce (just like package managers of Linux).

Therefore we have to design a source system named registry.

___

# 1. Scope
- **in-scope:**
    * Explain how the Tayku Client communicates with registry sources.
    * Explain which configurations are required by the Tayku Client when creating or adding a registry source.
    * Explain the package discovery logic of the Tayku Client.
    * Explain the difference between a package and a module.
    * Explain the package retrieval process from a registry source.
    * Explain the requirements for publishing a package to a registry source.

- **out-of-scope:**
    * This document describes only the registry logic of the Tayku Client. The configuration and architecture of the Tayku Web Registry (Backend) are out of scope.

___ 

# 2. Architecture 

This section explains the Architecture of Tayku Web Client Registry module in a detailed way.

## 2.1 Definitions 

- **Tayku Web Module:**
    - Official repositories published by Tayku Web Developers. These are located in the native registry source.

- **Tayku Web Inner Module:**
    - Tayku Web Client Modules that using while developing of client. These modules don't publish in the official registry soruce(s).

- **Tayku Web Package:**
    - Un-official repositories of Tayku Web Environment. These repositories are located in an external registry source. 

- **Tayku Web Registry:**
    - The source that contains packages or modules. These sources have to obey some configuration rules for being a registry soruce.

## 2.2 Logic 

Tayku Client Registry Module has own configuration file in the config directory, named `registry.config.json`. These file defines the registry sources inside. In this version, Tayku Web Client has two official registry soruce;
    1. Tayku Web Frontend Registry Source = Covers the frontend modules inside just like `hero`, `header`, etc...
    2. Tayku Web Backend Registry Source = Covers the backend modules inside just like `CRM`, `CMS`, etc...

Users can add external repositories inside of the `registry.config.json` file. Whenever new registry soruce added, Tayku Web Client Registry Module can search packages inside these sources just like official sources.

Tayku Web Client Registry Module handle its functions by communicating with these registries from `registry.config.json` file. These functions contains install new package to project, remove a package from project, publish new package, listing all available packages, look at the man file of package and etc...

___ 

# 3. Interface 
- **inputs**
    - `package-name` : The name of package that you want to download, remove or view its man page (or etc...).
    - `registry-source` : The source of the registry that you want to access.
    - `tayku-package.json` : A file that you have to define if you want to publish new package.

- **outputs**
    - `TAYKU-STATUS-CODE` 
    - `package-list` : An object which is listing two or more packages inside.

## 3.1 Dependencies 
    - `registry.config.json` file for viewing its own registry sources.

## 3.2 Contract

```js
/**
 * Initializes the registry source list in RAM.
 *
 * The registry sources are loaded into memory when the client starts.
 * This function manages the initial loading process.
 *
 * If a new registry source is added while the client is running,
 * the registry source list MUST be reinitialized.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function initialize_registry_list() {...}


/**
 * Contains the configured registry sources.
 *
 * @type {string[]}
 */
let registry_source_list = []


/**
 * Returns a copy of the current registry source list.
 *
 * The function MUST NOT modify registry_source_list.
 * The returned list is written to the provided output parameter.
 *
 * @param {string[]} out Output parameter for the registry source list.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function get_registry_sources(out) {...}


/**
 * Adds a new registry source to the registry source list.
 *
 * The new registry source will be persisted to the registry
 * configuration before the client exits.
 *
 * @param {string} src Source link of the registry.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function add_registry_source(src) {...}


/**
 * Removes a registry source from the registry source list.
 *
 * The registry source will be removed from the registry
 * configuration before the client exits.
 *
 * @param {string} src Source link of the registry.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function remove_registry_source(src) {...}


/**
 * Searches the configured registry sources for a package.
 *
 * The function searches each configured registry source
 * until the requested package is found.
 *
 * @param {string} package_name Name of the package to search for.
 * @param {object} out Output parameter for the search result.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function search_package(package_name, out) {...}


/**
 * Retrieves a package from its registry source.
 *
 * The function resolves the package location and provides
 * the required package information to the caller.
 *
 * @param {string} package_name Name of the package to retrieve.
 * @param {object} out Output parameter for the package information.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function get_package(package_name, out) {...}


/**
 * Lists all packages available from the configured registry sources.
 *
 * @param {object} out Output parameter for the package list.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function list_packages(out) {...}


/**
 * Publishes a package to the selected registry source.
 *
 * @param {string} package_path Path of the package to publish.
 * @param {string} registry_source Registry source where the package will be published.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function publish_package(package_path, registry_source) {...}
```

# 3.3 Registry Contract 

A source have to obey some rules for being a registry source. These rules provides the standardization and Tayku Web Client Registry Module uses this standardization while handle its functions. These standardizations and rules are specified at the below;

### 3.3.1 Registry Structure

A registry MUST contain a registry manifest that named `manifest.json`.

The registry manifest MUST define:

- registry name
- registry version
- available packages
- available modules

```json
{
    "name": "tayku-web-frontend-registry",
    "version": "1.0.0",
    "packages": [...],
    "modules": [...]
}
```

### 3.3.2 Package Retrieval

A registry MUST provide a retrieval mechanism for every package
defined in its `manifest.json`.

The Tayku Client MUST be able to retrieve a package using the
information provided by the registry.

Each package entry MUST provide a `source` field containing a URI
from which the package can be retrieved.

For example:

```json
{
    "name": "tayku-web-frontend-registry",
    "version": "1.0.0",
    "packages": [
        {
            "name": "hero",
            "source": "https://example.com/packages/hero"
        },
        {
            "name": "header",
            "source": "https://example.com/packages/header"
        }
    ],
    "modules": []
}
```

The URI MAY reference a local or remote resource, including a resource
hosted by the registry itself.

The registry implementation MUST NOT be required to use Git.

### 3.3.3 Package Metadata

Every package MUST contain a `tayku-package.json` file.

The tayku-package.json file MUST define the package metadata required
by the Tayku Client.

For example:
```json
{
    "name": "hero",
    "version": "1.0.0",
    "type": "package"
}
```

### 3.3.4 Layout Independence

A registry MAY organize its packages and modules in any directory
structure.

The Tayku Client MUST NOT depend on a specific directory structure
when retrieving a package or module.

The `manifest.json` MUST provide sufficient information for the Tayku
Client to locate the requested package or module.

### 3.3.5 Package Identity

Every package and module MUST have a unique name within the registry.

The package or module name defined in `manifest.json` MUST match the
name defined in its `tayku-package.json`.

A registry MUST NOT contain multiple packages or modules with the same
name and version.

### 3.3.6 Package Versioning

Every package and module MUST define a version.

The version defined in `manifest.json` MUST match the version defined
in its `tayku-package.json`.

The Tayku Client MUST be able to distinguish different versions of the
same package or module.

### 3.3.7 Manifest Consistency

Every package and module listed in `manifest.json` MUST be retrievable
from the source specified by its manifest entry.

A registry MUST NOT list a package or module that cannot be retrieved.

The information provided by `manifest.json` MUST be consistent with the
metadata provided by the corresponding package.

### 3.3.8 Package Signing

Every package and module MUST be signed by its developer before being
published to a registry.

The registry MUST provide the signature together with the package.

The Tayku Client MUST verify the signature before installing the package
or module.

A package or module with an invalid, missing, or unverifiable signature
MUST NOT be considered secure by the Tayku Client (see [[verifier.architecture.md]]).

> [!Note] Publishing
> Publishing is one way to distribute your packages; however, the registry may not allow it. This does not prevent it from being a registry source.

___ 

# 4. Data Flow 

Data flow is designed as one-directional;
`Caller -> Tayku Web Client Registry Module -> Registry Source -(Handle process)-> Tayku Web Client Registry Module`

___

# 5. Error Handling 

- If `registry.js` returns `NOT FOUND` during the package operations, this means that the package that you want, couldn't found. You can try to control if there is spelling mistake and try again.
- If `registry.js` returns `NOT FOUND` during the registry source operations, this means that the source that you want, couldn't found and accessed. Generally the problem is the connection of URL.
- If `registry.js` returns `NOT VALID` during the registry source operations, this means that even the url is accessible, its structure is not valid for being a registry source. You have to fix this registry according to our standardizations.
- If `registry.js` return `NOT SECURE` during the downloading packag, this means that, the package that you want to download, is not signed or their hashes is not matches with expected. Even thoug you can continue if you want, we don't recommend that.

___

# 6. Security
- **Malware Security**
    - Tayku Web Registry has own security rules for publishing packages. Even thoug, it's not means that, packages are fully secure. We coulddespiten't interfere codes of all of the packages. Therefore,you have to inspect (thanks to GPLv3 Licensing) the code and publisher carefully. 

    - Also beside the signature security mechaism of Tayku Web Registry, users can continue by their own free will.

    - Despite these warnings, Tayku Web guarentees the security of official packages (means that modules).

- **Thread Safety** 
    - Tayku Web Client Registry Module was designed as synchronously due to the verifying mechanism, in this version.

___ 

# 7. Devlog

- v0.0.0 - 18 SEP 2026
    - Base of contract was designed.
    - Primitive Architecture was designed.

___ 

# 8. TO-DO & Roadmap

* [x] Create a protocol for `registry.config.json`.
* [x] Create a protocol for `manifest.json`.
* [x] Create a protocol for `tayku-package.json`.
* [x] Decide the architecture of registry sources.
* [x] Setup the primitive architecture. 
* [ ] Import the logic of the function in the `registry.js` file. 
* [ ] Test 

___
