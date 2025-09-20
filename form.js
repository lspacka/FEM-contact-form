const body = document.querySelector('body')
const form = document.querySelector('form')
const modal = document.querySelector('.submit-modal')

body.addEventListener('click', () => {
    modal.style.display = 'none'
})

function validateField(field) {
    const errorEl = field.type == 'radio'
        ? field.closest('fieldset').querySelector('.error-message')
        : field.parentElement.querySelector('.error-message')

    if (!field.validity.valid) {
        errorEl.textContent = field.dataset.error || "This field is required"
        return false
    }

    errorEl.textContent = ""
    
    return true
}

form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input)
    })
})

form.addEventListener('submit', e => {
    e.preventDefault()

    let is_valid = true
    const fields = form.querySelectorAll('input, textarea')

    fields.forEach(field => {
        const field_valid = validateField(field)
        if (!field_valid)
            is_valid = false
    })

    if (is_valid) {
        modal.style.display = 'block'
        form.reset()
    }
    else {
        form.querySelector(':invalid').focus()
    }
})