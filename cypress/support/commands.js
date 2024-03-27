// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('api_cleanClassifier', (classifier) => {
    cy.getCookie('untill_air_auth_token_test')
        .should('exist')
        .then((cookie) => {
            readAndCleanClassifier(cookie.value, classifier)
        })
})

const apiUrl = Cypress.env('testHost') + '/api/untill/airs-bp/' + Cypress.env('testWorkspaceID')

const readAndCleanClassifier = (authToken, classifier) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': decodeURI(authToken)
    }
    const rbody = {
        "args":{
            "Schema":classifier
        },
        "elements":[
            {
                "fields":[
                    "sys.ID",
                    "sys.IsActive",
                ]
            }
        ]
    }
    cy.request({
        method: 'POST',
        url: apiUrl + '/q.sys.Collection', 
        body: rbody,
        headers: headers
    }).then((response) => {
        const cuds = cudsFromResponse(response)
        execCud(cuds)
    })
}

const cudsFromResponse = (response) => {
    const cuds = []
    for (const element of response.body.sections[0].elements) {
        const id = element[0][0][0]
        const isActive = element[0][0][1]
        if (isActive) {
            cuds.push({
                "sys.ID": id,
                "fields": {"sys.IsActive": false}
            })
        }
    }
    return cuds
}

const execCud = (cuds) => {
    if (cuds.length === 0) {
        return
    }
    cy.request({
        method: 'POST',
        url: apiUrl + '/c.sys.CUD', 
        body: {
            "cuds": cuds
        },
        headers: headers
    })
}

