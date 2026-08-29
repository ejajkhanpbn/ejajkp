Feature: Web form submission
  As a visitor
  I want to submit the web form
  So that I can verify the form response
  @webform
  Scenario: Open the web form
    Given I open the web form
    Then the page title should be "Web form"

  Scenario: Submit valid credentials
    Given I open the web form
    When I submit the form with name "Ejaj Khan" and password "khan"
    Then the form result should be "Received!"