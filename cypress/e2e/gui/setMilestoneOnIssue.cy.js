import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set milestone on issue', options, () => {
  const issue = {
    title: `issue-${faker.number.int()}`,
    description: faker.word.words(3),
    project: {
      name: `project-${faker.string.uuid()}`,
      description: faker.word.words(5)
    }
  }

  const milestone = {
    title: `milestone-${faker.word.words()}`
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createMilestone(response.body.project_id, milestone)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => {
    cy.gui_setMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title)
  })
})
