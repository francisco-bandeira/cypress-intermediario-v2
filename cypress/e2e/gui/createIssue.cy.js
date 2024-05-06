import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(issue.project)
  })


  const issue = {
    title: `issue-${faker.number.int()}`,
    description: faker.word.words(3),
    project: {
      name: `project-${faker.string.uuid()}`,
      description: faker.word.words(5)
    }
  }


  it('successfully', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})
