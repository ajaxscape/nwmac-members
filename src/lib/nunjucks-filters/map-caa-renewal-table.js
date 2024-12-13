export default (members) => {
  return members.map(
    ({ memberName, operatorId, memberId, confirmedWithCaa }) => {
      return [
        { text: memberName },
        { text: 'GBR-OP-' + operatorId },
        {
          html: `
        <div class="govuk-checkboxes govuk-checkboxes--small nwmac-renewal-checkbox" data-module="govuk-checkboxes" data-govuk-checkboxes-init="">
          <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="confirmedWithCaa-${memberId}" name="confirmedWithCaa-${memberId}" type="checkbox" value="${confirmedWithCaa}" ${confirmedWithCaa ? 'checked disabled' : ''}>
              <label class="govuk-label govuk-checkboxes__label" for="confirmedWithCaa-${memberId}"></label>
          </div>    
        </div>
        `,
          classes: 'nwmac-renewal-column'
        }
      ]
    }
  )
}
