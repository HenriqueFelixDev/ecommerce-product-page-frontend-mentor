const numberFormat = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

export const formatCurrency = value => numberFormat.format(value)