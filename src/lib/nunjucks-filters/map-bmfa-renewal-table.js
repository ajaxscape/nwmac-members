export default (members) => {
  return members.map(
    ({ memberName, bmfaNumber, memberId, confirmedWithBmfa, fees }) => {
      return [
        { text: memberName },
        { text: bmfaNumber },
        { text: fees.bmfaMembersCard ? 'Yes' : '' },
        {
          html: `
        <div class="govuk-checkboxes govuk-checkboxes--small nwmac-renewal-checkbox" data-module="govuk-checkboxes" data-govuk-checkboxes-init="">
          <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="confirmedWithBmfa-${memberId}" name="confirmedWithBmfa-${memberId}" type="checkbox" value="${confirmedWithBmfa}" ${confirmedWithBmfa ? 'checked' : ''}>
              <label class="govuk-label govuk-checkboxes__label" for="confirmedWithBmfa-${memberId}"></label>
          </div>    
        </div>
        `,
          classes: 'nwmac-renewal-column'
        }
      ]
    }
  )
}
