/**
 * @swagger
 * tags:
 *   - name: Currency Converter
 *     description: Endpoints for currency rates conversion
 */

/**
 * @swagger
 * paths:
 *   /rates:
 *     get:
 *       summary: Get Latest Rates
 *       description: |
 *         Endpoint to get the latest exchange rates.
 *       tags:
 *         - Currency Converter
 *       responses:
 *         200:
 *           description: Successfully retrieved the latest rates
 *           schema:
 *             type: object
 *             properties:
 *               rates:
 *                 type: object
 *                 description: Latest exchange rates
 *                 example: { "USD": 1.0, "EUR": 0.85, "GBP": 0.75 }
 *               timestamp:
 *                 type: integer
 *                 description: Timestamp of the latest rates
 *                 example: 1645626000
 *         500:
 *           description: Internal Server Error
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: Error message
 *                 example: Internal Server Error
 */

/**
 * @swagger
 * paths:
 *   /rates/symbols:
 *     get:
 *       summary: Get All Symbols
 *       description: |
 *         Endpoint to get the symbols used in the latest exchange rates.
 *       tags:
 *         - Currency Converter
 *       responses:
 *         200:
 *           description: Successfully retrieved the symbols
 *           schema:
 *             type: object
 *             properties:
 *               symbols:
 *                 type: array
 *                 description: List of currency symbols
 *                 example: {"MZN": "Mozambican Metical","NAD": "Namibian Dollar","NGN": "Nigerian Naira"}
 *         500:
 *           description: Internal Server Error
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 description: Error message
 *                 example: Internal Server Error
 */

/**
 * @swagger
 * tags:
 *   name: Currency Converter
 *   description: API for currency conversion
 * paths:
 *   /rates/convert:
 *     get:
 *       summary: Convert Currency
 *       description: |
 *         Endpoint to convert from one currency to another based on the latest exchange rates.
 *       tags:
 *         - Currency Converter
 *       parameters:
 *         - in: query
 *           name: from
 *           required: true
 *           description: The currency code to convert from (e.g., USD)
 *           schema:
 *             type: string
 *         - in: query
 *           name: to
 *           required: true
 *           description: The currency code to convert to (e.g., EUR)
 *           schema:
 *             type: string
 *         - in: query
 *           name: amount
 *           required: true
 *           description: The amount to convert
 *           schema:
 *             type: number
 *       responses:
 *         200:
 *           description: Successfully converted the currency
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   from:
 *                     type: string
 *                     description: The currency code converted from
 *                   to:
 *                     type: string
 *                     description: The currency code converted to
 *                   amount:
 *                     type: number
 *                     description: The converted amount
 *         400:
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Error message
 *                     example: Invalid input parameters
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Error message
 *                     example: Internal Server Error
 */
