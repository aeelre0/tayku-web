/**
 * Contains the configured registry sources.
 *
 * @type {string[]}
 */
let registry_source_list = []

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
function initialize_registry_list() {}

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
function get_registry_sources(out) {}

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
function add_registry_source(src) {}

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
function remove_registry_source(src) {}

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
function search_package(package_name, out) {}

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
function get_package(package_name, out) {}

/**
 * Lists all packages available from the configured registry sources.
 *
 * @param {object} out Output parameter for the package list.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function list_packages(out) {}

/**
 * Publishes a package to the selected registry source.
 *
 * @param {string} package_path Path of the package to publish.
 * @param {string} registry_source Registry source where the package will be published.
 *
 * @returns {number} TAYKU_STATUS_CODE
 */
function publish_package(package_path, registry_source) {}
