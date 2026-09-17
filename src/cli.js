/**
 * Parse command-line arguments.
 *
 * @param {number} argc
 * @param {string[]} argv
 * @param {object} out
 * @returns {number} TAYKU_STATUS_CODE
 */
function parseArgs(argc, argv, out) {}

/**
 * Dispatch a parsed command.
 *
 * @param {object} command
 * @param {object} out
 * @returns {number} TAYKU_STATUS_CODE
 */
function dispatchCommand(command, out) {}

/**
 * Send a Common Message to a Tayku component.
 *
 * @param {object} message
 * @param {object} out
 * @returns {number} TAYKU_STATUS_CODE
 */
function sendMessage(message, out) {}

/**
 * Receive a Common Message from a Tayku component.
 *
 * @param {object} connection
 * @param {object} out
 * @returns {number} TAYKU_STATUS_CODE
 */
function receiveMessage(connection, out) {}

/**
 * Print a response to the user.
 *
 * @param {object} response
 * @returns {number} TAYKU_STATUS_CODE
 */
function printOutput(response) {}

/**
 * Terminate the CLI process.
 *
 * @param {number} code
 */
function exit(code) {}
